#!/usr/bin/env node

/**
 * Clean webpack cache files after build to avoid Cloudflare Pages 25MB limit
 */

const fs = require('fs');
const path = require('path');

const cacheDirs = [
  'cache',
  '.next/cache',
  'node_modules/.cache',
];

console.log('Cleaning cache directories...');

cacheDirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    console.log(`Removing: ${dir}`);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
});

console.log('Cache cleanup complete!');




