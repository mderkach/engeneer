const Path = require('path');
const Fs = require('fs');
const Glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

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

// BASE config
module.exports = {
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
    ],
  },
  resolve: {
    alias: {
      '~': PATHS.src,
    },
  },
  plugins: [
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
    // Automatic creation any html pages (Don't forget to RERUN dev server)
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PATHS.pages}/${page.replace(/\.pug/, '')}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
          chunks: ['app', `${page.replace(/\.pug/, '')}`],
        }),
    ),
  ],
};
