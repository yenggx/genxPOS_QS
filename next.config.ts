// THIS IS THE ORIGINAL FILE CREATED BY THE NEXT.JS CLI
// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   devIndicators: false,
//   allowedDevOrigins: ['gxpos-fnb.geniex.tech'],
//   images: {
//     unoptimized: true
//   }
// };

// export default nextConfig; 

// AM USING THIS FOR DEV
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['gxpos-fnb.geniex.tech', '192.168.8.46'],
  images: {
    unoptimized: true
  },
  
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: "/kds=1", destination: "/kds?kds=1", permanent: false },
      { source: "/kds=2", destination: "/kds?kds=2", permanent: false },
      { source: "/kds=3", destination: "/kds?kds=3", permanent: false },
    ];
  },

};

export default nextConfig;