const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const ReloadPlugin = require('reload-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const basicConfig = require('./config')

const config = {
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[chunkhash:8].js',
        publicPath: basicConfig.appPublicPath
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                })
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
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            minChunks: function (module, count) {
                return module.resource && module.resource.indexOf(path.resolve(__dirname, '../src')) === -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new HtmlWebpackExternalsPlugin({
            externals: basicConfig.externals
        }),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin("css/[name].[contenthash:8].css"),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../assets'),
            to: 'assets',
            ignore: ['.*']
        }]),
        new HtmlWebpackPlugin({
            template:'index.html'
        })
    ]
}


if (basicConfig.report) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    config.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = config