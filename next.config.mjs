/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', "images.unsplash.com",'media.istockphoto.com','plus.unsplash.com']
    },
};

//personal changes
// next.config.js
module.exports = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
      },
  };

  
export default nextConfig;
