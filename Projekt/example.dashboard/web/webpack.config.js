const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ZipWebpackPlugin = require("zip-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, "src"),
    entry: {
        'index': './index.ts'
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, "../app/example/dashboard/webcontent"),
        filename: '[name].js'
    },
    target: ["web", "es5"],
    externals: {
        smartdesign: 'smartdesign'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', ".css"],
    },
    plugins : [
        new CleanWebpackPlugin({
            dry: false,
            dangerouslyAllowCleanPatternsOutsideProject: true
        }),
        new HtmlWebpackPlugin({
            template : 'index.html'
        }),
        new ZipWebpackPlugin({
            path: path.resolve(__dirname, "./dist"),
            filename: 'webcontent.zip'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" }
                ]
            }

        ]
    }
}
