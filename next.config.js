/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.ibb.co", "i.imgur.com", "imgur.com"],
  },
  env: {
    // BACKEND_API: "http://localhost:5000/api/v1",
    BACKEND_API: "https://insta-clone-backend-dipper.onrender.com/api/v1",
  },
  // experimental
};

module.exports = nextConfig;
