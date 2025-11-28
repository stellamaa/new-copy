#!/usr/bin/env node

/**
 * Script to upload large media files to Cloudflare R2
 * 
 * Prerequisites:
 * 1. Install @aws-sdk/client-s3: npm install @aws-sdk/client-s3
 * 2. Set up R2 bucket and get credentials from Cloudflare dashboard
 * 3. Set environment variables (see .env.example)
 */

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // e.g., https://your-bucket.r2.dev

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error('❌ Missing required environment variables!');
  console.error('Please set: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME');
  process.exit(1);
}

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// Files to upload (all files over 25MB)
const filesToUpload = [
  'public/assets/stellavideo.mov',
  'public/assets/Up and onward master.wav',
  'public/assets/GenderLondon.mp4',
  'public/assets/stellaoldvideo.mp4',
  'public/assets/rielavideo.mp4',
  'public/assets/fionavideo.mp4',
  'public/assets/nynspacevideo.mp4',
  'public/assets/sculpture.mov',
];

async function uploadFile(filePath) {
  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath);
  const contentType = getContentType(fileName);

  try {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: contentType,
    });

    await s3Client.send(command);
    const publicUrl = R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${fileName}` : `https://${R2_BUCKET_NAME}.r2.dev/${fileName}`;
    console.log(`✅ Uploaded: ${fileName}`);
    console.log(`   URL: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
    throw error;
  }
}

function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const types = {
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
  };
  return types[ext] || 'application/octet-stream';
}

async function main() {
  console.log('🚀 Starting R2 upload...\n');
  
  const uploadedUrls = {};
  
  for (const filePath of filesToUpload) {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}, skipping...`);
      continue;
    }
    
    const fileName = path.basename(filePath);
    try {
      const url = await uploadFile(filePath);
      uploadedUrls[fileName] = url;
    } catch (error) {
      console.error(`Failed to upload ${fileName}`);
    }
  }
  
  console.log('\n📝 Upload Summary:');
  console.log(JSON.stringify(uploadedUrls, null, 2));
  
  // Save URLs to a file for reference
  fs.writeFileSync(
    'r2-urls.json',
    JSON.stringify(uploadedUrls, null, 2)
  );
  console.log('\n✅ URLs saved to r2-urls.json');
}

main().catch(console.error);

