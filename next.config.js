/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
  },
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
  // Configure async components to use SWR for data fetching
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;