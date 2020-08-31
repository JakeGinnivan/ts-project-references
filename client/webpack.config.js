/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    mode: isDevelopment ? 'development' : 'production',
    devtool: 'source-map',
    output: {
        filename: isDevelopment
            ? 'assets/js/[name].bundle.js'
            : 'assets/js/[contenthash].bundle.js',
        chunkFilename: isDevelopment
            ? 'assets/js/[name].bundle.js'
            : 'assets/js/[contenthash].bundle.js',
        path: path.resolve(__dirname, './app-dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.webpack.js', '.web.js', '.mjs', '.js', '.json'],
    },
    module: {
        rules: [
            // https://github.com/graphql/graphql-js/issues/1272#issuecomment-393903706
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: { projectReferences: true },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.htm'),
        }),
        ...(isDevelopment
            ? // Development only plugins
              []
            : // Production only plugins
              []),
    ],
    stats: 'errors-only',
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        // hot: true,
    },
}
