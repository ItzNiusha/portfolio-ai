/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  images: {
    domains: ['itzniusha.cc'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;