const sharp = require('sharp');
const fs = require('fs');

async function generateHighResAssets() {
  const masterLogo = 'Thanmay_Collections_Print_Ready_6144x4096.png';

  console.log('Extracting pristine transparent logo at high resolution...');
  const { data, info } = await sharp(masterLogo)
    .resize({ width: 3200, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const out = Buffer.alloc(width * height * 4);

  // Background is dark maroon / burgundy / near black
  // RGB: r <= 85, g <= 14, b <= 26
  // Foreground is gold, white, cream, amber, ruby
  for (let i = 0; i < width * height; i++) {
    const src = i * 4;
    const dst = i * 4;

    const r = data[src];
    const g = data[src + 1];
    const b = data[src + 2];

    let alpha = 0;

    if (g <= 12 && r <= 85 && b <= 28) {
      alpha = 0;
    } else {
      const goldStrength = (g - 12) / 20; // gold has high G
      const redStrength = (r - 90) / 30;  // ruby/bright red
      const brightness = r * 0.299 + g * 0.587 + b * 0.114;
      const brightStrength = (brightness - 35) / 25;

      const strength = Math.max(goldStrength, Math.min(redStrength, brightStrength));

      if (strength <= 0) {
        alpha = 0;
      } else if (strength >= 1.0) {
        alpha = 255;
      } else {
        const t = Math.max(0, Math.min(1, strength));
        alpha = Math.round(t * t * (3 - 2 * t) * 255);
      }
    }

    if (alpha === 0) {
      out[dst] = 0;
      out[dst + 1] = 0;
      out[dst + 2] = 0;
      out[dst + 3] = 0;
    } else if (alpha < 255) {
      const aNorm = alpha / 255;
      const bgR = 55 * (1 - aNorm);
      const bgG = 2 * (1 - aNorm);
      const bgB = 14 * (1 - aNorm);

      out[dst] = Math.min(255, Math.max(0, Math.round((r - bgR) / aNorm)));
      out[dst + 1] = Math.min(255, Math.max(0, Math.round((g - bgG) / aNorm)));
      out[dst + 2] = Math.min(255, Math.max(0, Math.round((b - bgB) / aNorm)));
      out[dst + 3] = alpha;
    } else {
      out[dst] = r;
      out[dst + 1] = g;
      out[dst + 2] = b;
      out[dst + 3] = 255;
    }
  }

  console.log('Trimming to pure logo bounds...');
  const trimmed = await sharp(out, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 10 })
    .toBuffer({ resolveWithObject: true });

  console.log(`Pristine trimmed dimensions: ${trimmed.info.width}x${trimmed.info.height}`);

  // 1. Save thanmay-logo-transparent.png (width 800 - crisp on retina screens)
  await sharp(trimmed.data, { raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 } })
    .resize({ width: 800, withoutEnlargement: true })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/images/thanmay-logo-transparent.png');

  // 2. Also save to public/images/logo.png for compatibility
  await sharp(trimmed.data, { raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 } })
    .resize({ width: 800, withoutEnlargement: true })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/images/logo.png');

  // 3. Save navigation logo
  await sharp(trimmed.data, { raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 } })
    .resize({ width: 400, withoutEnlargement: true })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/images/logo-nav.png');

  // 4. Update favicons and app icons
  await sharp(trimmed.data, { raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 } })
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/apple-touch-icon.png');

  await sharp(trimmed.data, { raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 } })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/favicon-32x32.png');

  await sharp(trimmed.data, { raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 } })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('src/app/icon.png');

  await sharp(trimmed.data, { raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 } })
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('src/app/apple-icon.png');

  console.log('All brand assets successfully updated!');
}
generateHighResAssets();
