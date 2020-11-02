const path = require("path");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "production";

const WebpackNotifierPlugin = require("webpack-notifier");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const styleLoader = {
  loader: "style-loader",
  options: {
    sourceMap: true
  }
};

const cssLoader = {
  loader: "css-loader",
  options: {
    sourceMap: true
  }
};

const sassLoader = {
  loader: "sass-loader",
  options: {
    sourceMap: true
  }
};

const resolveUrlLoader = {
  loader: "resolve-url-loader",
  options: {
    sourceMap: true
  }
};

const miniCssLoader = {
  loader: MiniCssExtractPlugin.loader
};

const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    bundle: "./assets/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          miniCssLoader,
          cssLoader,
          resolveUrlLoader
        ],
      },
      {
        test: /\.scss$/,
        use: [
          miniCssLoader,
          cssLoader,
          resolveUrlLoader,
          sassLoader
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[hash:6].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[hash:6].[ext]"
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      proxy: "http://drupalvm.test"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new StylelintPlugin({
      configFile: ".stylelintrc.json",
      context: "assets",
      files: "css/**/*.scss",
      failOnError: false,
      quiet: false
    })
  ]
};

if (isProduction) {
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new CleanWebpackPlugin(),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

module.exports = config;
