const { merge } = require('webpack-merge');
const BaseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(BaseWebpackConfig, {
  // BUILD config
  mode: 'production',
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
