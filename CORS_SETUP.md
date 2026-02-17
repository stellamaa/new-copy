# Fix CORS Errors for R2 Videos

## The Problem
Videos from `https://media.stellamathioudakis.com` are being blocked by CORS policy when loading from `localhost:3001` (or your production domain).

## Solution: Configure CORS on R2 Bucket

### Step 1: Go to R2 Bucket Settings
1. Open [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** → Your bucket (`stellanew-media`)
3. Click **Settings** tab
4. Scroll to **CORS Policy** section

### Step 2: Add CORS Configuration
Click **Edit CORS Policy** and paste this JSON:

```json
[
  {
    "AllowedOrigins": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

**For Production (More Secure):**
If you want to restrict to specific domains only:

```json
[
  {
    "AllowedOrigins": [
      "https://stellamathioudakis.com",
      "https://www.stellamathioudakis.com",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

### Step 3: Save and Test
1. Click **Save** or **Update CORS Policy**
2. Wait a few seconds for changes to propagate
3. Refresh your localhost page
4. Videos should now load without CORS errors

## Alternative: Temporary Workaround for Local Dev

If you can't configure CORS right now, the code has been updated to handle this gracefully. However, **you should still configure CORS** for production.

## Verify CORS is Working

After configuring CORS, check the browser console - you should see:
- ✅ Videos loading successfully
- ✅ No CORS errors
- ✅ Videos playing in 3D view

If you still see CORS errors:
1. Make sure you saved the CORS policy
2. Wait 1-2 minutes for propagation
3. Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)
4. Check that the CORS policy JSON is valid
