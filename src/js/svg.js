// import all svg
// if (process.env.NODE_ENV !== 'production') {
const requireAll = function (r) {
  r.keys().forEach(r);
};

requireAll(require.context('../assets/svg/', true, /\.svg$/));
if (process.env.NODE_ENV !== 'production') {
  console.log(`svg sprite ready in current mode: ${process.env.NODE_ENV}`);
}
// }
