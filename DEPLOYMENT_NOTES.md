# Cloudflare Pages Deployment - Large Files Issue

## Problem
Cloudflare Pages has a 25MB file size limit. The following files exceed this limit:

1. `stellavideo.mov` - 86MB
2. `Up and onward master.wav` - 86MB
3. `GenderLondon.mp4` - 63MB
4. `stellaoldvideo.mp4` - 55MB
5. `rielavideo.mp4` - 53MB
6. `fionavideo.mp4` - 40MB
7. `nynspacevideo.mp4` - 28MB
8. `sculpture.mov` - 26MB
9. `stellaoldsite.mov` - 278MB (already in .gitignore)

## Solutions

### Option 1: Host Large Files on External CDN (Recommended)
1. Upload large files to:
   - Cloudflare R2 (compatible with Pages)
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Vercel Blob Storage
   - Any CDN service

2. Update file references in:
   - `app/constants/mediaFiles.js`
   - `app/components/ArtPage.js`
   - Any other components using these files

### Option 2: Compress Files
Use video/audio compression tools to reduce file sizes below 25MB:
- HandBrake for videos
- FFmpeg for audio/video compression
- Online tools like CloudConvert

### Option 3: Use Different Platform
Consider deploying to:
- **Vercel** - No file size limit for static assets
- **Netlify** - 100MB file size limit
- **AWS Amplify** - Larger limits

### Option 4: Remove Unused Files
Check if all files are actually used in the application and remove unused ones.

## Files Currently Used in Codebase

Based on code analysis:
- `rielavideo.mp4` - Used in mediaFiles.js
- `fionavideo.mp4` - Used in mediaFiles.js
- `nynspacevideo.mp4` - Used in mediaFiles.js
- `stellaoldvideo.mp4` - Used in mediaFiles.js
- `sculpture.mov` - Used in ArtPage.js
- `GenderLondon.mp4` - Used in ArtPage.js
- `Up and onward master.wav` - Used in ArtPage.js
- `stellavideo.mov` - Not found in codebase (may be unused)
- `stellaoldsite.mov` - Already ignored

