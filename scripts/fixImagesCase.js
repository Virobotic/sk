const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const src = path.join(publicDir, 'Images');
const dest = path.join(publicDir, 'images');

if (!fs.existsSync(src)) {
  console.error('Source folder not found:', src);
  process.exit(1);
}

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

const files = fs.readdirSync(src);
files.forEach((file) => {
  const s = path.join(src, file);
  const d = path.join(dest, file);
  try {
    fs.copyFileSync(s, d);
  } catch (err) {
    console.error('Failed copy', s, err);
  }
});

console.log('Copied', files.length, 'files to', dest);
