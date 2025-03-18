/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static image imports
  images: {
    domains: ['localhost'], // Add any other domains you need
    unoptimized: true
  },
  // Ensure webpack handles CSS properly
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    });
    return config;
  }
};

module.exports = nextConfig;
