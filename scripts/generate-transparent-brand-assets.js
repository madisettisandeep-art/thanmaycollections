const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateTransparentBrandAssets() {
  const inputLogo = path.resolve(__dirname, '../Thanmay_Collections_Print_Ready_6144x4096.png');
  const publicDir = path.resolve(__dirname, '../public');
  const imagesDir = path.resolve(publicDir, 'images');
  const appDir = path.resolve(__dirname, '../src/app');

  console.log('Loading 6144x4096 master image...');
  // Resize to a sharp working resolution of 2400px width for supreme fidelity
  const { data, info } = await sharp(inputLogo)
    .resize({ width: 2400, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Working image resolution: ${width}x${height}`);

  const out = Buffer.alloc(width * height * 4);

  // Background is dark maroon/burgundy/black where:
  // r <= 85, g <= 16, b <= 22
  // Foreground gold/white/ruby:
  // - Gold: g >= 25, r >= 100
  // - Ruby/Red accents: r >= 110
  // - Highlights: r, g, b high
  for (let i = 0; i < width * height; i++) {
    const src = i * channels;
    const dst = i * 4;

    const r = data[src];
    const g = data[src + 1];
    const b = data[src + 2];

    // Compute foreground confidence
    // Background color typically: r ~ 55, g ~ 2, b ~ 12
    let alpha = 0;

    if (g <= 12 && r <= 85 && b <= 20) {
      // Pure background
      alpha = 0;
    } else {
      // Metric for gold/highlight:
      // g component is strong in gold (g > 25)
      // r component is strong in gold and ruby (r > 90)
      const gMetric = (g - 10) / 25; // 0 at g=10, 1 at g=35
      const rMetric = (r - 78) / 38; // 0 at r=78, 1 at r=116

      // Take the dominant indicator
      const strength = Math.max(gMetric, rMetric);

      if (strength <= 0) {
        alpha = 0;
      } else if (strength >= 1.0) {
        alpha = 255;
      } else {
        // Smooth cubic ease for pristine anti-aliasing
        const t = Math.max(0, Math.min(1, strength));
        const smooth = t * t * (3 - 2 * t);
        alpha = Math.round(smooth * 255);
      }
    }

    // Color de-contamination (Unmultiplying dark background):
    // If pixel is semi-transparent, remove the dark maroon bias so edges are pure gold
    if (alpha > 0 && alpha < 255) {
      const aNorm = alpha / 255;
      // Background estimate
      const bgR = 55 * (1 - aNorm);
      const bgG = 2 * (1 - aNorm);
      const bgB = 12 * (1 - aNorm);

      out[dst] = Math.min(255, Math.max(0, Math.round((r - bgR) / aNorm)));
      out[dst + 1] = Math.min(255, Math.max(0, Math.round((g - bgG) / aNorm)));
      out[dst + 2] = Math.min(255, Math.max(0, Math.round((b - bgB) / aNorm)));
      out[dst + 3] = alpha;
    } else {
      out[dst] = r;
      out[dst + 1] = g;
      out[dst + 2] = b;
      out[dst + 3] = alpha;
    }
  }

  console.log('Trimming transparent borders to extract only the pure logo mark...');
  const trimmedBuffer = await sharp(out, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 5 })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log(`Trimmed pure logo dimensions: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // 1. Save main transparent logo (high-res width 1200)
  console.log('Generating public/images/logo.png (pure transparent logo)...');
  await sharp(trimmedBuffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ quality: 100 })
    .toFile(path.join(imagesDir, 'logo.png'));

  // 2. Save navbar logo
  console.log('Generating public/images/logo-nav.png...');
  await sharp(trimmedBuffer)
    .resize({ height: 200, withoutEnlargement: true })
    .png({ quality: 100 })
    .toFile(path.join(imagesDir, 'logo-nav.png'));

  // 3. Generate square favicons and icons
  console.log('Generating square favicons & touch icons...');
  await sharp(trimmedBuffer)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(trimmedBuffer)
    .resize(192, 192, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(trimmedBuffer)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  // Copy to app dir
  fs.copyFileSync(path.join(publicDir, 'favicon.png'), path.join(appDir, 'icon.png'));
  fs.copyFileSync(path.join(publicDir, 'apple-touch-icon.png'), path.join(appDir, 'apple-icon.png'));

  console.log('All transparent logo brand assets generated successfully with ZERO box design!');
}

generateTransparentBrandAssets().catch(err => {
  console.error('Error generating transparent brand assets:', err);
  process.exit(1);
});
