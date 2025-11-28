/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable webpack cache in production to prevent large cache files
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache for production builds to avoid 25MB limit on Cloudflare Pages
    if (!dev) {
      config.cache = false;
      // Also disable persistent caching
      if (config.optimization) {
        config.optimization.moduleIds = 'deterministic';
      }
    }
    return config;
  },
}

module.exports = nextConfig







