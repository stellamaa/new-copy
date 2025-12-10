/**
 * Utility to get media file URL
 * Uses R2 URL for large files (over 25MB) to avoid Cloudflare Pages file size limit
 */

// Public R2 bucket URL - files are hosted here to avoid 25MB limit
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_URL || 'https://media.stellamathioudakis.com';

// Files that should be loaded from R2 (files over 25MB or all large media files)
const R2_FILES = [
  'stellavideo.mov',
  'Up and onward master.wav',
  'Upandonwardmaster.wav',
  'GenderLondon.mp4',
  'stellaoldvideo.mp4',
  'rielavideo.mp4',
  'fionavideo.mp4',
  'nynspacevideo.mp4',
  'sculpture.mov',
  'KT.mov',
  'WAVES OF VIOLENCE.mp3',
  'loop1.mp3',
  'in a world in amazon FINAL.mp3',
  'jeromevideo.mp4',
];

export function getMediaUrl(localPath) {
  // Extract filename from path (e.g., '/assets/rielavideo.mp4' -> 'rielavideo.mp4')
  const fileName = localPath.split('/').pop();
  
  // If file should be loaded from R2, use R2 URL
  if (R2_FILES.includes(fileName)) {
    return `${R2_BASE_URL}/${fileName}`;
  }
  
  // Otherwise use local path
  return localPath;
}

