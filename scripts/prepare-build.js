const fs = require('fs');
const path = require('path');

// Files that are served from R2 and should be excluded from build
const filesToExclude = [
  'public/assets/Up and onward master.wav',
  // Add other large files here if needed
];

console.log('Preparing build: Removing large files that are served from R2...');

filesToExclude.forEach((filePath) => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`✓ Removed: ${filePath}`);
    } catch (error) {
      console.error(`✗ Error removing ${filePath}:`, error.message);
    }
  } else {
    console.log(`- Not found (already removed): ${filePath}`);
  }
});

console.log('Build preparation complete.');
