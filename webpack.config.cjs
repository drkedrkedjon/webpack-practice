// Path is to have acces to files and folders
const path = require("path");
// HtmlWebpackPlugin: to create a html file
const HtmlWebpackPlugin = require("html-webpack-plugin");
// MiniCssExtractPlugin: to create a css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, argv) => ({
  // Entry file
  entry: "./src/index.js",
  //  Output configuration
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // ESM6 modules configuration
  experiments: {
    outputModule: true,
  },
  // Server configuration
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  // Create source-map for development
  devtool: argv.mode === "development" ? "source-map" : false,
  // Loaders configuration - modulos
  module: {
    rules: [
      // Por defecto para ficheros JS
      {
        test: /\.n?js$/,
        exclude: /node_modules/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      // Babel configuration for JS shit
      {
        test: /\.(ts|tsx|js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // For CSS and SCSS
      {
        test: /\.css|s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          argv.mode === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      // For assets. Also in generator part we config assets folder and use of original names
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp3|wav|mp4|webm)$/,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
      // Configure HTML
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: ["html-loader"],
      },
    ],
  },
  // Configuración de los plugins
  plugins: [
    // Se pone la configuración de html
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      scriptLoading: "module",
    }),
    // Se pone la configuración de css
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
});
