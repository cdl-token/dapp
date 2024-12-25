/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.moralis.io'], // Allow images from this domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "(s2.coinmarketcap.com)",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
