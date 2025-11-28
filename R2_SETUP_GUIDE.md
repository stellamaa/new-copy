# Cloudflare R2 Setup Guide

This guide will help you host large media files on Cloudflare R2 and update your application to use them.

## Step 1: Create R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** in the sidebar
3. Click **Create bucket**
4. Enter a bucket name (e.g., `stellanew-media`)
5. Choose a location (closest to your users)
6. Click **Create bucket**

## Step 2: Get R2 Credentials

1. In your R2 bucket, go to **Settings**
2. Scroll down to **R2 API Tokens**
3. Click **Create API token**
4. Give it a name (e.g., "Upload Script")
5. Set permissions:
   - **Object Read & Write** (or just **Object Write** for uploads)
6. Click **Create API Token**
7. **IMPORTANT**: Copy the **Access Key ID** and **Secret Access Key** immediately (you won't see them again!)

## Step 3: Make Bucket Public (Optional but Recommended)

To serve files directly from R2:

1. Go to your bucket **Settings**
2. Find **Public Access** section
3. Enable **Public Access**
4. Note the public URL (format: `https://your-bucket-name.r2.dev`)

**OR** set up a custom domain:
1. Go to **Settings** → **Custom Domains**
2. Add your custom domain
3. Follow DNS setup instructions

## Step 4: Install Dependencies

```bash
npm install @aws-sdk/client-s3 dotenv
```

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your R2 credentials:
   ```
   R2_ACCOUNT_ID=your_account_id_here
   R2_ACCESS_KEY_ID=your_access_key_id_here
   R2_SECRET_ACCESS_KEY=your_secret_access_key_here
   R2_BUCKET_NAME=your-bucket-name
   R2_PUBLIC_URL=https://your-bucket.r2.dev
   ```

   **To find your Account ID:**
   - Go to any Cloudflare page
   - Look at the URL or sidebar - it's usually visible
   - Or go to R2 → Your bucket → Settings → it's in the API endpoint

## Step 6: Upload Files to R2

Run the upload script:

```bash
node scripts/upload-to-r2.js
```

This will:
- Upload all files over 25MB to R2
- Generate public URLs for each file
- Save URLs to `r2-urls.json`

## Step 7: Update Your Code

After uploading, you'll need to update file references in your code. The script creates `r2-urls.json` with all the URLs.

### Files to Update:

1. **`app/constants/mediaFiles.js`** - Update video file paths
2. **`app/components/ArtPage.js`** - Update audio/video file paths

### Example Update:

**Before:**
```javascript
{ src: '/assets/rielavideo.mp4', type: 'video', ... }
```

**After:**
```javascript
{ src: process.env.NEXT_PUBLIC_R2_URL + '/rielavideo.mp4', type: 'video', ... }
```

Or use the URLs directly from `r2-urls.json`.

## Step 8: Update Environment Variables for Deployment

Add to your Cloudflare Pages environment variables:
- `NEXT_PUBLIC_R2_URL` = Your R2 public URL (e.g., `https://your-bucket.r2.dev`)

## Alternative: Manual Upload via Cloudflare Dashboard

If you prefer to upload manually:

1. Go to your R2 bucket in Cloudflare dashboard
2. Click **Upload**
3. Upload each file
4. Click on each file to get its public URL
5. Update your code with these URLs

## Cost

Cloudflare R2 pricing (as of 2024):
- **Storage**: $0.015 per GB/month
- **Class A Operations** (writes): $4.50 per million
- **Class B Operations** (reads): $0.36 per million
- **Egress**: Free (unlimited)

For a portfolio site, this is typically very affordable (often under $1/month).

## Troubleshooting

### "Access Denied" Error
- Check your API token has correct permissions
- Verify bucket name is correct
- Ensure Account ID is correct

### Files Not Accessible
- Make sure bucket has public access enabled
- Check CORS settings if accessing from browser
- Verify the public URL is correct

### CORS Issues
If you get CORS errors when loading media:

1. Go to R2 bucket → Settings → CORS Policy
2. Add this CORS configuration:
```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

