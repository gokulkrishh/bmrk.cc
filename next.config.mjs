/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
    minimumCacheTTL: 60,
  },
  experimental: {
    ppr: true,
  },
};

export default nextConfig;
