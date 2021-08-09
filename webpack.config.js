const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/app.js",
  mode: "production",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      favicon: "./favicon.ico",
      title: "Online Japa meditation",
      meta: {
        robots: "all",
        "content-type": {
          "http-equiv": "content-type",
          content: "text/html; charset=UTF-8",
        },
        "X-UA-Compatible": {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge,chrome=1",
        },
        ScreenOrientation: {
          "http-equiv": "ScreenOrientation",
          content: "autoRotate:disabled",
        },
        referrer: "no-referrer-when-downgrade",
        author: "Āryāshree Pritikṛṣṇa",
        description:
          "Japa (Sanskrit: जप) is the meditative repetition of a mantra or a divine name. It is a practice found in Hinduism, Jainism, Sikhism, Buddhism, and Shintōism. The mantra or name may be spoken softly, enough for the practitioner to hear it, or it may be spoken within the reciter's mind. Japa may be performed while sitting in a meditation posture, while performing other activities, or as part of formal worship in group settings.",
        title: "Online Japa meditation.",
        keywords:
          "Japa, Japa 108, Japa box, Rounds, Japa mala, Mala, Prayer beads, Online japa, Counter, Maha Mantra, Maha Mantra meditation, online japa mala counter, Hare Krishna",
        viewport: "width=device-width, initial-scale=1",
        "theme-color": "#01abfd",
      },
      template: "./src/index.html",
      filename: "./index.html", //relative to root of the application
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|svg|gif|png|eot|woff|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "img",
            esModule: false,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: ["$", "jQuery"],
            },
          },
        ],
      },
    ],
  },
};
