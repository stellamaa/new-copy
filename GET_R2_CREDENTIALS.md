# How to Get R2 API Credentials

Based on your information:
- **Account ID**: `24a52f2208fab0de762199f2e4ec0029`
- **Bucket Name**: `stellanew-media`
- **Public URL**: `https://media.stellamathioudakis.com`

## Step-by-Step: Create R2 API Token

### Step 1: Go to R2 API Tokens
1. Open [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **R2** in the left sidebar
3. Click **Manage R2 API Tokens** (this is a link/button, usually at the top or in settings)

### Step 2: Create API Token
1. Click **Create API token** button
2. Fill in the form:
   - **Token name**: Give it a name like "stellanew-upload" or "portfolio-upload"
   - **Permissions**: Select **Object Read & Write** (or at minimum **Object Write**)
   - **TTL**: Leave as "Never expire" or set a custom expiration
   - **Bucket access**: 
     - Select **Allow access to specific buckets**
     - Choose your bucket: **stellanew-media**
3. Click **Create API Token**

### Step 3: Copy Your Credentials
**IMPORTANT**: You'll see the credentials ONCE. Copy them immediately!

You'll see:
- **Access Key ID**: A long string (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)
- **Secret Access Key**: Another long string (looks like: `x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4`)

**⚠️ WARNING**: Copy these NOW - you won't be able to see the Secret Access Key again!

### Step 4: Save to .env File

Create or edit your `.env` file with:

```env
R2_ACCOUNT_ID=24a52f2208fab0de762199f2e4ec0029
R2_ACCESS_KEY_ID=your_access_key_id_here
R2_SECRET_ACCESS_KEY=your_secret_access_key_here
R2_BUCKET_NAME=stellanew-media
R2_PUBLIC_URL=https://media.stellamathioudakis.com
```

Replace `your_access_key_id_here` and `your_secret_access_key_here` with the values you copied.

### Step 5: For Cloudflare Pages Deployment

Add this environment variable in Cloudflare Pages:
- **Variable name**: `NEXT_PUBLIC_R2_URL`
- **Value**: `https://media.stellamathioudakis.com`

## Alternative: If You Can't Find "Manage R2 API Tokens"

1. Go to **R2** → Your bucket (`stellanew-media`)
2. Click on **Settings** tab
3. Scroll down to find **R2 API** section
4. Click **Create API token** or **Manage API tokens**

## Troubleshooting

**Can't find the API tokens section?**
- Make sure you're on the R2 page (not Workers or other services)
- Look for "API" or "Tokens" in the settings
- Some accounts might have it under Account Settings → API Tokens

**Need to see existing tokens?**
- Go to R2 → Manage R2 API Tokens
- You'll see a list of tokens, but you can only see the Secret Access Key when you first create it
- If you lost it, you'll need to create a new token

