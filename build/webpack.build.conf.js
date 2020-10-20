const Path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssNano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BaseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(BaseWebpackConfig, {
  // BUILD config
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          outputPath: `./${BaseWebpackConfig.externals.paths.assets}`,
          publicPath: './',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: `./${BaseWebpackConfig.externals.paths.assets}/css`,
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: `${BaseWebpackConfig.externals.paths.build}/postcss.config.js`,
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 2018,
          module: true,
          sourceMap: false, // Must be set to true if using source-maps in production
          compress: {
            drop_console: true,
            drop_debugger: true,
            ecma: 2018,
            module: true,
          },
          format: {
            comments: false,
            indent_level: 2,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: CssNano,
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendorJs: {
          name: 'vendor-js',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
        vendorStyles: {
          name: 'app',
          test: /src[\\/]scss/,
          chunks: 'all',
          enforce: true,
        },
        pages: {
          name(module, chunks) {
            return chunks.map((item) => item.name).join('');
          },
          test(module) {
            return (
              module.resource &&
              module.resource.endsWith('.js') &&
              module.resource.includes(`${Path.sep}pages${Path.sep}`)
            );
          },
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) => {
        `${BaseWebpackConfig.externals.paths.assets}css/${name.replace('/js/', '/css/')}.css`;
      },
    }),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
