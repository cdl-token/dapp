/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
