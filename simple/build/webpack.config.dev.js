const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const ReloadPlugin = require('reload-html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

import basicConfig from './config'

const config = {
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[hash:8].[ext]'
                    }
                }]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new HtmlWebpackExternalsPlugin({
            externals: basicConfig.externals
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true
        }),
        new ReloadPlugin(),
        new FriendlyErrorsPlugin()
    ],
    devServer: {
        proxy: basicConfig.proxy
    }
}


module.exports = config