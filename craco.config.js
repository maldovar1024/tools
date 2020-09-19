const { loaderByName, addBeforeLoader } = require('@craco/craco');
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure(config) {
      addBeforeLoader(config, loaderByName('file-loader'), {
        test: /\.md$/,
        use: ['raw-loader'],
      });

      return config;
    },
  },
};
