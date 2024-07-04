/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images-na.ssl-images-amazon.com",
      "img.icons8.com",
      "podcast.urbital.io",
    ], // Add your domains here
  },
};

export default nextConfig;
