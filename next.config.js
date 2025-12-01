/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // ← THIS is the missing magic line
  images: {
    unoptimized: true, // required for static export
  },
  webpack: (config, { dev, isServer }) => {
    config.cache = false
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        plugin => !(plugin && plugin.constructor && plugin.constructor.name === 'CachePlugin')
      )
    }
    return config
  },
}

module.exports = nextConfig
