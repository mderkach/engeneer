const autoprefixer = require('autoprefixer');
// const mqpacker = require('css-mqpacker');
const combinemq = require('postcss-combine-media-query');
const removeDuplicates = require('postcss-discard-duplicates');

module.exports = (api) => ({
  syntax: 'postcss-scss',
  plugins: [autoprefixer, /*mqpacker,*/ combinemq, removeDuplicates],
});
