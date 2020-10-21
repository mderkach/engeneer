const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BaseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(BaseWebpackConfig, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    compress: true,
    contentBase: BaseWebpackConfig.externals.paths.dist,
    port: 8080,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          outputPath: `./${BaseWebpackConfig.externals.paths.assets}`,
          publicPath: './assets/',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: `${BaseWebpackConfig.externals.paths.build}/postcss.config.js`,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new Webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/',
        notify: false,
      },
      {
        reload: false,
      },
    ),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
