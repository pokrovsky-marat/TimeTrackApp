const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "webpack.bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        //For js files
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      //For css files
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      //For SCSS and SASS
      {
        // Регулярное выражение которое позволяет выбрать как .scss, так и .sass
        test: /\.s[ca]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  //Path relative to <entry: "./src/index.js">
  plugins: [new MiniCssExtractPlugin({filename:"../css/style.css"})],
  devServer: {
    open: true,
  },
};
