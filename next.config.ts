/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ramsint.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "**", // allow any port on localhost
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "**", // allow any port on 127.0.0.1
      },
      {
        protocol: "http",
        hostname: "192.168.68.137",
        port: "8010", // allow this specific IP and port
      },
    ],
  },
};

export default nextConfig;
