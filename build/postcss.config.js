const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const removeDuplicates = require('postcss-discard-duplicates');

module.exports = (api) => ({
  syntax: 'postcss-scss',
  plugins: [autoprefixer, mqpacker, removeDuplicates],
});
