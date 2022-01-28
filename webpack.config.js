const path = require("path");
module.exports = {
  mode: "development",
  target: "web",

  // for drawio io development

  entry: "./ontopanelSource/ontopanel.js",
  output: {
    filename: "ontopanel.js",
    path: path.resolve(
      __dirname,
      "drawio/src/main/webapp/plugins/ontopanelPlugin"
    ),
  },

  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    static: path.resolve(__dirname, "drawio/src/main/webapp"),
  },

  // write gui

  // entry: "./ontopanelSource/gui.js",
  // output: {
  //   filename: "gui.js",
  //   path: path.resolve(__dirname, "./ontopanelSource/dist"),
  // },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.xml$/,
        use: [
          {
            loader: "raw-loader",
          },
        ],
      },
    ],
  },
};
