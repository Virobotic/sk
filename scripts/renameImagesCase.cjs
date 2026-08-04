const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const orig = path.join(publicDir, 'Images');
const temp = path.join(publicDir, '_Images_temp_rename');
const dest = path.join(publicDir, 'images');

if (!fs.existsSync(orig)) {
  console.error('Original folder not found:', orig);
  process.exit(1);
}

try {
  fs.renameSync(orig, temp);
  if (fs.existsSync(dest)) {
    // remove existing dest
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.renameSync(temp, dest);
  console.log('Renamed Images -> images');
} catch (err) {
  console.error('Rename failed', err);
  process.exit(1);
}
