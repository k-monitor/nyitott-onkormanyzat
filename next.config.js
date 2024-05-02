const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const withPlugins = require('next-compose-plugins');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,  output: 'export',
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/leaflet/dist/images',
            to: path.resolve(__dirname, 'public', 'leaflet', 'images')
          },
        ],
      }),
    )
    return config
  }
}

//module.exports = nextConfig;

const withSvgr = () => (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
            },
          },
        ],
      });
      return config;
    },
  };
};

module.exports = withPlugins([withSvgr()]);
