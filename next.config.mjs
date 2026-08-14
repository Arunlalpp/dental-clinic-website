/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // live-site assets, in case any are referenced during migration
      { protocol: "https", hostname: "carewelldentalclinicvengara.dialndial.com" },
      { protocol: "https", hostname: "dialndial.com" },
    ],
  },
  reactStrictMode: true,
};
export default nextConfig;
