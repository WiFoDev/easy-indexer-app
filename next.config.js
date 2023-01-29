/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["static.alchemyapi.io"],
  },
};

module.exports = nextConfig;
