const path = require('path')
const webpack = require('webpack')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const basicConfig = require('./config')

const config = {
    entry: {
        calculator: './src/calculator.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: basicConfig.appPublicPath,
        library: 'calculator',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve('src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin('css/[name].css')
    ]
}

if (basicConfig.report) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    config.plugins.push(new BundleAnalyzerPlugin())
}

if (basicConfig.externals.length) {
    config.plugins.push(new HtmlWebpackExternalsPlugin({
        externals: basicConfig.externals
    }))
}

module.exports = config
