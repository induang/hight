const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/hights/index.ts"),
  output: {
    path: path.resolve(__dirname, "assets/scripts"),
    filename: "hight.bundle.js",
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }],
  },
  watch: true,
  mode: "production",
  resolve: {
    extensions: [".ts", ".js"],
  },
};
