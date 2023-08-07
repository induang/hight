const path = require('path');

module.exports = {
  entry: {
    contentScript: path.resolve(__dirname, 'src/hights/index.ts'),
    background: path.resolve(__dirname, 'src/background/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'assets/scripts'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }],
  },
  watch: true,
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
