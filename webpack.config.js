const fs = require('fs');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProd = process.argv.indexOf('--debug') === -1;

module.exports = {
    mode: 'production',
    entry: './src/plugin.js',
    output: {
        filename: 'plugin-nickserv.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: [{loader: 'exports-loader'}, {loader: 'babel-loader'}],
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: [ 'vue-style-loader', 'css-loader', 'less-loader' ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './res/locales'),
                to: 'plugin-nickserv/locales/',
                ignore: ['.*']
            }
        ])
    ],
    devtool: isProd ? '' : 'source-map',
    devServer: {
        filename: 'plugin-nickserv.js',
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};
