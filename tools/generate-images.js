/*
 * Image generation script
 * Purpose: Generate responsive variants and LQIP placeholders for large decorative images.
 * Usage: `npm run generate:images` — writes files to `public/decoration` and updates `image-manifest.json`.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// images to process
const images = [
  'public/decoration/know-your-funding-element-highRes.png',
  'public/decoration/know-your-funding-element-highResLandscape.png',
];

const outDir = path.join(process.cwd(), 'public', 'decoration');
const sizes = [420, 768, 1024, 1400];

async function processImage(srcPath) {
  const base = path.basename(srcPath, path.extname(srcPath));
  const meta = { src: srcPath.replace(/^public\//, '/'), variants: [], placeholder: null };

  // generate resized PNG and WebP
  for (const w of sizes) {
    const outPng = path.join(outDir, `${base}-${w}.png`);
    const outWebp = path.join(outDir, `${base}-${w}.webp`);

    await sharp(srcPath).resize({ width: w }).toFile(outPng);
    await sharp(srcPath).resize({ width: w }).webp({ quality: 80 }).toFile(outWebp);

    meta.variants.push({ width: w, png: outPng.replace(/^public\//, '/'), webp: outWebp.replace(/^public\//, '/') });
  }

  // LQIP placeholder (tiny blurred webp)
  const lqipBuffer = await sharp(srcPath).resize(20).webp({ quality: 40 }).toBuffer();
  const lqipBase64 = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;
  meta.placeholder = lqipBase64;

  return { base, meta };
}

(async () => {
  const manifest = {};
  for (const img of images) {
    const fullPath = path.join(process.cwd(), img);
    if (!fs.existsSync(fullPath)) {
      console.warn('Skipping missing file:', fullPath);
      continue;
    }
    const { base, meta } = await processImage(fullPath);
    manifest[base] = meta;
    console.log('Processed', base);
  }

  fs.writeFileSync(path.join(outDir, 'image-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Wrote image-manifest.json');
})();
