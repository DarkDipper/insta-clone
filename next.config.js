/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.ibb.co", "i.imgur.com", "imgur.com"],
  },
};

module.exports = nextConfig;
