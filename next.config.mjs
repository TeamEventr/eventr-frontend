/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'avatar.iran.liara.run',
            pathname: '**',
          },
        ],
    
      },

};

export default nextConfig;
