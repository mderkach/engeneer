const { merge } = require('webpack-merge');
const BaseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(BaseWebpackConfig, {
  // BUILD config
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
