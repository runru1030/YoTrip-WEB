/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        destination: "https://www.koreaexim.go.kr/:path*",
        source: "/koreaxim/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
