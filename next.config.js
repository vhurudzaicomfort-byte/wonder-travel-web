/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' }
    ]
  },
  experimental: {
    cpus: 1,
    workerThreads: false
  }
};

module.exports = nextConfig;
