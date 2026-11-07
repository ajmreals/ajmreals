/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Kept for when real photography is added. No remotePatterns: all images
    // will be served from this app, so nothing external is whitelisted.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
