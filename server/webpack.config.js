/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: [path.resolve(__dirname, "src/index.ts")],
  devtool: "cheap-source-map",
  target: "node",
  node: {
    // By setting these to false, webpack will leave them in our code
    // allowing us to use them at runtime. Otherwise they will be undefined
    __dirname: false,
    __filename: false,
  },
  externals: [
    nodeExternals({
      allowlist: ["shared"],
    }),
  ],
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: { projectReferences: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin({
      // This loads the .env file in then starts the service
      script: path.resolve(__dirname, "app-dist/bundle.js"),
      watch: path.resolve(__dirname, "app-dist/bundle.js"),
    }),
  ],
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  stats: "errors-only",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "app-dist"),
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
  },
};
