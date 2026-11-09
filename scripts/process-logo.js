const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processLogo() {
  const inputLogo = path.resolve(__dirname, '../Thanmay_Collections_Print_Ready_6144x4096.png');
  const publicDir = path.resolve(__dirname, '../public');
  const imagesDir = path.resolve(publicDir, 'images');
  const appDir = path.resolve(__dirname, '../src/app');

  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

  console.log('Inspecting source image...');
  const metadata = await sharp(inputLogo).metadata();
  console.log('Metadata:', metadata.width, 'x', metadata.height, 'channels:', metadata.channels);

  // Generate web logo (width 800 for high DPI display)
  console.log('Generating public/images/logo.png (web optimized)...');
  await sharp(inputLogo)
    .trim()
    .resize({ width: 900, withoutEnlargement: true })
    .png({ quality: 95 })
    .toFile(path.join(imagesDir, 'logo.png'));

  // Generate smaller navbar logo
  console.log('Generating public/images/logo-nav.png...');
  await sharp(inputLogo)
    .trim()
    .resize({ height: 120, withoutEnlargement: true })
    .png({ quality: 95 })
    .toFile(path.join(imagesDir, 'logo-nav.png'));

  // Generate square app icon / favicon
  console.log('Generating square favicon & icons...');
  await sharp(inputLogo)
    .trim()
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(inputLogo)
    .trim()
    .resize(192, 192, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(inputLogo)
    .trim()
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  // Also write Next.js App router icon files
  fs.copyFileSync(path.join(publicDir, 'favicon.png'), path.join(appDir, 'icon.png'));
  fs.copyFileSync(path.join(publicDir, 'apple-touch-icon.png'), path.join(appDir, 'apple-icon.png'));

  console.log('All logo and favicon assets processed successfully!');
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});
