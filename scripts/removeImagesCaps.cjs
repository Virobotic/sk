const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const orig = path.join(publicDir, 'Images');

if (!fs.existsSync(orig)) {
  console.log('No Images folder found, nothing to remove.');
  process.exit(0);
}

try {
  fs.rmSync(orig, { recursive: true, force: true });
  console.log('Removed', orig);
} catch (err) {
  console.error('Failed to remove', orig, err);
  process.exit(1);
}
