/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", 
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images-na.ssl-images-amazon.com", "img.icons8.com"], // Add your domains here
  },
};

export default nextConfig;
