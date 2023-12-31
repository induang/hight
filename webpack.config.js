const path = require('path');

module.exports = {
  entry: {
    contentScript: path.resolve(__dirname, 'src/hights/index.ts'),
    background: path.resolve(__dirname, 'src/background/index.ts'),
    sidePanel: path.resolve(__dirname, 'src/sidePanel/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'assets/scripts'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      { test: /\.tsx$/, use: 'ts-loader' },
      { test: /\.css$/, use: 'css-loader' },
    ],
  },
  watch: true,
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
};
