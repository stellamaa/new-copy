/**
 * Pre-build script to remove large media files from public/assets
 * These files are hosted on R2, so they don't need to be in the build output
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');
const TEMP_DIR = path.join(process.cwd(), '.temp-large-files');

// Files that should be removed before build (hosted on R2)
// Include both variations of filenames (with and without spaces)
const LARGE_FILES = [
  'stellavideo.mov',
  'Up and onward master.wav',  // Local filename with spaces
  'Upandonwardmaster.wav',     // R2 filename without spaces
  'GenderLondon.mp4',
  'stellaoldvideo.mp4',
  'rielavideo.mp4',
  'fionavideo.mp4',
  'nynspacevideo.mp4',
  'sculpture.mov',
];

function prepareBuild() {
  console.log('Preparing build: Removing large media files from public/assets...');
  
  // Create temp directory if it doesn't exist
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }

  let movedCount = 0;
  
  LARGE_FILES.forEach(fileName => {
    const filePath = path.join(PUBLIC_ASSETS_DIR, fileName);
    const tempPath = path.join(TEMP_DIR, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        // Move file to temp directory
        fs.renameSync(filePath, tempPath);
        console.log(`  ✓ Moved ${fileName} to temp directory`);
        movedCount++;
      } catch (error) {
        console.error(`  ✗ Error moving ${fileName}:`, error.message);
      }
    }
  });

  console.log(`Moved ${movedCount} large file(s) to temp directory`);
  console.log('Build preparation complete!\n');
}

prepareBuild();

