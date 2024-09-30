/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      // Add SVG support
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      // Important to handle server-side rendering (SSR) properly
      if (!isServer) {
        config.resolve.fallback.fs = false;
      }
  
      return config;
    },
  };
  
export default nextConfig;