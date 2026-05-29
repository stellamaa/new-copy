/**
 * Utility to get media file URL
 * Uses R2 URL for large files (over 25MB) to avoid Cloudflare Pages file size limit
 */

// Public R2 bucket URL - files are hosted here to avoid 25MB limit
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_URL || 'https://media.stellamathioudakis.com';

// Files that should be loaded from R2 (files over 25MB)
// Note: "Up and onward master.wav" may be stored as "Upandonwardmaster.wav" on R2
const R2_FILES = [
  'AshleySaville.mov',
  'batu-video.mov',
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
  'WellVideo.mov',
  '2023.mov',
];

// Only these exist in public/assets during local dev — serve locally instead of R2
const DEV_LOCAL_FILES = new Set([
  'AshleySaville.mov',
  'batu-video.mov',
  'rielavideo.mp4',
  'fionavideo.mp4',
  'jeromevideo.mp4',
  'nynspacevideo.mp4',
  'stellaoldvideo.mp4',
  'GenderLondon.mp4',
  'sculpture.mov',
  'stellavideo.mov',
]);

export function getMediaUrl(localPath) {
  const fileName = localPath.split('/').pop();
  const localUrl = localPath.startsWith('/') ? localPath : `/${localPath}`;

  if (R2_FILES.includes(fileName)) {
    if (process.env.NODE_ENV === 'development' && DEV_LOCAL_FILES.has(fileName)) {
      return localUrl;
    }
    return `${R2_BASE_URL}/${encodeURIComponent(fileName)}`;
  }

  return localUrl;
}

