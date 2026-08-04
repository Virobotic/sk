const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'dist', 'Images');
const destDir = path.join(root, 'public', 'images');

if (!fs.existsSync(src)) {
  console.error('Source dist/Images not found:', src);
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(src);
files.forEach((file) => {
  const s = path.join(src, file);
  const d = path.join(destDir, file);
  try {
    fs.copyFileSync(s, d);
  } catch (err) {
    console.error('Failed to copy', s, err);
  }
});

console.log('Restored', files.length, 'files to', destDir);
