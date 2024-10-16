/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '47.129.182.111',
        pathname: '**',
      },
    ],
    
},
};

export default nextConfig;
