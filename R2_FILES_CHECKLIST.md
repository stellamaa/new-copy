# R2 Files Checklist

## Files that MUST be uploaded to R2 bucket

These files exceed Cloudflare Pages' 25MB limit and must be hosted on R2:

1. ✅ `rielavideo.mp4` (53MB) - Used in mediaFiles.js
2. ✅ `fionavideo.mp4` (40MB) - Used in mediaFiles.js  
3. ✅ `nynspacevideo.mp4` (28MB) - Used in mediaFiles.js
4. ✅ `stellaoldvideo.mp4` (55MB) - Used in mediaFiles.js
5. ✅ `sculpture.mov` (26MB) - Used in ArtPage.js
6. ✅ `GenderLondon.mp4` (63MB) - Used in ArtPage.js
7. ✅ `Up and onward master.wav` (86MB) - Used in ArtPage.js
8. ⚠️ `stellavideo.mov` (86MB) - Check if used in codebase

## R2 Bucket URL
**Public URL**: `https://pub-7a5f5483ebe64449a38b9dcb92d4618c.r2.dev`

## How to Upload Files

### Option 1: Via Cloudflare Dashboard (Easiest)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** → Your bucket (`stellanew-media`)
3. Click **Upload**
4. Upload each file from the list above
5. Files will be accessible at: `https://pub-7a5f5483ebe64449a38b9dcb92d4618c.r2.dev/[filename]`

### Option 2: Via Upload Script
1. Set up `.env` file with R2 credentials (see GET_R2_CREDENTIALS.md)
2. Run: `npm run upload-r2`

## Verification

After uploading, verify files are accessible:
- `https://pub-7a5f5483ebe64449a38b9dcb92d4618c.r2.dev/rielavideo.mp4`
- `https://pub-7a5f5483ebe64449a38b9dcb92d4618c.r2.dev/fionavideo.mp4`
- `https://pub-7a5f5483ebe64449a38b9dcb92d4618c.r2.dev/nynspacevideo.mp4`
- `https://pub-7a5f5483ebe64449a38b9dcb92d4618c.r2.dev/stellaoldvideo.mp4`
- `https://pub-7a5f5483ebe64449a38b9dcb92d4618c.r2.dev/sculpture.mov`
- `https://pub-7a5f5483ebe64449a38b9dcb92d4618c.r2.dev/GenderLondon.mp4`
- `https://pub-7a5f5483ebe64449a38b9dcb92d4618c.r2.dev/Up and onward master.wav`

## Code Status

✅ Code has been updated to use R2 URLs for all large files:
- `app/utils/getMediaUrl.js` - Uses R2 URL for large files
- `app/constants/mediaFiles.js` - Uses getMediaUrl() for video files
- `app/components/ArtPage.js` - Uses direct R2 URLs for audio/video

## Important Notes

- Large files are in `.gitignore` so they won't be committed
- Files must be uploaded to R2 before deployment
- The code will automatically use R2 URLs for large files
- Small files (<25MB) still use local paths

