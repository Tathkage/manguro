/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Add @svgr/webpack loader for SVG files
      config.module.rules.push({
        test: /\.svg$/, // Target SVG files
        use: ['@svgr/webpack'], // Use @svgr/webpack loader
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  