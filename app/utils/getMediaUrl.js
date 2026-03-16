/**
 * Utility to get media file URL
 * Uses R2 URL for large files (over 25MB) to avoid Cloudflare Pages file size limit
 */

// Public R2 bucket URL - files are hosted here to avoid 25MB limit
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_URL || 'https://media.stellamathioudakis.com';

// Files that should be loaded from R2 (files over 25MB)
// Note: "Up and onward master.wav" may be stored as "Upandonwardmaster.wav" on R2
const R2_FILES = [
  'AshleySavillevideo.mov',
  'stellavideo.mov',
  'Upandonwardmaster.wav',
  'Up and onward master.wav',
  'GenderLondon.mp4',
  'stellaoldvideo.mp4',
  'rielavideo.mp4',
  'fionavideo.mp4',
  'nynspacevideo.mp4',
  'sculpture.mov',
  'jeromevideo.mp4',
];

export function getMediaUrl(localPath) {
  // Extract filename from path (e.g., '/assets/rielavideo.mp4' -> 'rielavideo.mp4')
  const fileName = localPath.split('/').pop();
  
  // If file should be loaded from R2, use R2 URL (encode filename for spaces/special chars)
  if (R2_FILES.includes(fileName)) {
    return `${R2_BASE_URL}/${encodeURIComponent(fileName)}`;
  }
  
  // Otherwise use local path
  return localPath;
}

