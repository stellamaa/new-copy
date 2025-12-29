/**
 * Utility to get media file URL
 * Uses R2 URL for large files (over 25MB) to avoid Cloudflare Pages file size limit
 */

// Public R2 bucket URL - files are hosted here to avoid 25MB limit
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_URL || 'https://media.stellamathioudakis.com';

// Files that should be loaded from R2 (files over 25MB)
const R2_FILES = [
  'stellavideo.mov',
  'Upandonwardmaster.wav',
  'GenderLondon.mp4',
  'stellaoldvideo.mp4',
  'rielavideo.mp4',
  'fionavideo.mp4',
  'nynspacevideo.mp4',
  'sculpture.mov',
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

