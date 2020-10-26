const Path = require('path');
const Fs = require('fs');
const Glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssNano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProd = function () {
  if (process.argv.includes('production')) {
    return true;
  }

  return false;
};

// Main const
const PATHS = {
  src: Path.join(__dirname, '../src'),
  build: Path.join(__dirname, '../build'),
  dist: Path.join(__dirname, '../dist'),
  pages: Path.join(__dirname, '../src/views/pages'),
  assets: 'assets/',
};

// Pages const for HtmlWebpackPlugin
// fetch directories
const getDirectories = (source) =>
  Fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
const PAGES_DIR = getDirectories(PATHS.pages);
// push directories to array based on .pug in derectories
const PAGES = [];
PAGES_DIR.forEach((dir) => {
  PAGES.push(
    ...Fs.readdirSync(`${PATHS.pages}/${dir}`).filter((fileName) => fileName.endsWith('.pug')),
  );
});

// entry points
const MAIN_ENTRY = {
  app: `${PATHS.src}/main.js`,
};

const DYNAMIC_ENTRY = Glob.sync(`${PATHS.pages}/**/*.js`).reduce((acc, path) => {
  const entry = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
  acc[entry] = path;
  return acc;
}, {});

const entryPoints = { ...MAIN_ENTRY, ...DYNAMIC_ENTRY };

// plugins
const plugins = [
  // Automatic creation any html pages (Don't forget to RERUN dev server)
  ...PAGES.map(
    (page) =>
      new HtmlWebpackPlugin({
        template: `${PATHS.pages}/${page.replace(/\.pug/, '')}/${page}`,
        filename: `./${page.replace(/\.pug/, '.html')}`,
        chunks: ['app', `${page.replace(/\.pug/, '')}`],
      }),
  ),
  // load svg sprite
  new SpriteLoaderPlugin({
    plainSprite: true,
  }),
  // copy assets to dist
  new CopyWebpackPlugin({
    patterns: [
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      // { from: `${PATHS.src}/${PATHS.assets}css`, to: `${PATHS.assets}css` },
      { from: `${PATHS.src}/static`, to: '' },
    ],
  }),
];

if (isProd()) {
  plugins.push(
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => `${PATHS.assets}css/${chunk.name.replace('/js/', '/css/')}.css`,
    }),
    new BundleAnalyzerPlugin(),
  );
}

// BASE config
module.exports = {
  mode: isProd() ? 'production' : 'development',
  externals: {
    paths: PATHS,
  },
  entry: entryPoints,
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: `${PATHS.assets}img/svg/`,
            },
          },
          // '@svgr/webpack',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
          'svg-transform-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          outputPath: `./${PATHS.assets}`,
          publicPath: isProd() ? '../' : './assets/',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProd()
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: (resourcePath, context) => {
                    return Path.relative(Path.dirname(resourcePath), context) + '/';
                  },
                },
              }
            : 'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: `${PATHS.build}/postcss.config.js`,
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
  resolve: {
    alias: {
      '~': PATHS.src,
    },
  },
  plugins: plugins,
};
