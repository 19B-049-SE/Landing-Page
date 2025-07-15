/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add this webpack configuration
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

const path = require('path');

module.exports = nextConfig;