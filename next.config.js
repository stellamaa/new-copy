/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable webpack cache completely to prevent large cache files
  webpack: (config, { dev, isServer }) => {
    // Completely disable webpack cache for all builds to avoid 25MB limit on Cloudflare Pages
    config.cache = false;
    
    // Remove any cache-related plugins
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        plugin => !(plugin && plugin.constructor && plugin.constructor.name === 'CachePlugin')
      );
    }
    
    return config;
  },
}

module.exports = nextConfig







