const path = require('path')
const webpack = require('webpack')

const basicConfig = require('./config')

const config = {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: basicConfig.appPublicPath,
        library: 'calculator',
        libraryTarget: 'umd'
    },
    devtool: 'cheap-module-eval-source-map',
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('testing')
            }
        })
    ]
}

module.exports = config
