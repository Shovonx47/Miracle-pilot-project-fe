/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static image imports
  images: {
    domains: ['localhost'], // Add any other domains you need
    unoptimized: true
  }
};

module.exports = nextConfig;
