import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/generate",
        destination: "http://t3-age-publi-uembkg5pse1q-2090016753.us-east-1.elb.amazonaws.com/generate",
      },
    ];
  },
};

// next.config.js
// module.exports = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/generate",
  //       destination: "http://t3-age-publi-uembkg5pse1q-2090016753.us-east-1.elb.amazonaws.com/generate",
  //     },
  //   ];
  // },
// };


export default nextConfig;
