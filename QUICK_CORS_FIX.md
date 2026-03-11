# Quick CORS Fix - Step by Step

## The Problem
Your videos from `https://media.stellamathioudakis.com` are blocked by CORS when loading from `localhost:3001`.

## Critical: Use Array Format!
Cloudflare R2 **requires** the CORS policy to be a JSON **array** `[{...}]`, not a single object `{...}`. If you pasted just the object, it won't work.

### Step 1: Open Cloudflare Dashboard
1. Go to: https://dash.cloudflare.com
2. Log in if needed

### Step 2: Navigate to Your R2 Bucket
1. Click **R2** in the left sidebar
2. Click on your bucket: **`stellanew-media`**

### Step 3: Open CORS Settings
1. Click the **Settings** tab (at the top of the bucket page)
2. Scroll down to find **CORS Policy** section
3. Click **Edit CORS Policy** or **Configure CORS**

### Step 4: Add CORS Configuration
Copy and paste this **exact** JSON. **The outer `[ ]` brackets are required**—R2 expects an array of rules:

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

**Important:** 
- The policy must be wrapped in `[ ]` (array). A bare `{ }` object will not work.
- Make sure the JSON is valid (no extra commas, proper brackets).

### Step 5: Save
1. Click **Save** or **Update CORS Policy**
2. Wait 30-60 seconds for changes to propagate

### Step 6: Test
1. Go back to your `localhost:3001` page
2. Hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
3. Check the console - CORS errors should be gone!

## Verify CORS is Working

After configuring, test a video URL directly:
- Open: `https://media.stellamathioudakis.com/rielavideo.mp4` in a new tab
- It should load (or show a video player)

Or check in browser console:
- Open DevTools → Network tab
- Reload your page
- Look for video requests - they should return **200 OK** instead of CORS errors

## Still Not Working?

1. **Double-check the JSON** - Make sure it's valid JSON (no syntax errors)
2. **Wait longer** - Sometimes takes 1-2 minutes to propagate
3. **Clear browser cache** - Cmd+Shift+Delete → Clear cached images and files
4. **Check bucket name** - Make sure you're editing the correct bucket (`stellanew-media`)
5. **Verify public access** - Make sure your bucket has public access enabled

## Alternative: Restrict to Specific Domains (More Secure)

If you want to restrict CORS to only your domains:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "https://stellamathioudakis.com",
      "https://www.stellamathioudakis.com"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Replace with your actual production domain when you deploy.
