process.env.VUE_APP_VERSION = process.env.BITBUCKET_BUILD_NUMBER || 'local';

module.exports = {
  publicPath: '/kete',
  configureWebpack: {
    devtool: 'source-map'
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
    },
  },
};
