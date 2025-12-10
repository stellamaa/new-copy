/**
 * Post-build script to restore large media files to public/assets
 * (Optional - only needed if you want files back for local development)
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');
const TEMP_DIR = path.join(process.cwd(), '.temp-large-files');

function restoreFiles() {
  if (!fs.existsSync(TEMP_DIR)) {
    console.log('No temp directory found. Nothing to restore.');
    return;
  }

  console.log('Restoring large media files to public/assets...');
  
  const files = fs.readdirSync(TEMP_DIR);
  let restoredCount = 0;

  files.forEach(fileName => {
    const tempPath = path.join(TEMP_DIR, fileName);
    const filePath = path.join(PUBLIC_ASSETS_DIR, fileName);
    
    if (fs.existsSync(tempPath)) {
      try {
        // Move file back to public/assets
        fs.renameSync(tempPath, filePath);
        console.log(`  ✓ Restored ${fileName}`);
        restoredCount++;
      } catch (error) {
        console.error(`  ✗ Error restoring ${fileName}:`, error.message);
      }
    }
  });

  // Clean up temp directory if empty
  try {
    const remainingFiles = fs.readdirSync(TEMP_DIR);
    if (remainingFiles.length === 0) {
      fs.rmdirSync(TEMP_DIR);
      console.log('  ✓ Removed empty temp directory');
    }
  } catch (error) {
    // Ignore errors cleaning up
  }

  console.log(`Restored ${restoredCount} file(s)`);
}

restoreFiles();








