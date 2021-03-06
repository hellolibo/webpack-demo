var gulp = require('gulp')
var webpack = require('webpack')
var serve = require('browser-sync')
var del = require('del')
var gutil = require('gulp-util')

var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var proxyMiddleware = require('http-proxy-middleware')
var colorsSupported = require('supports-color')

var buildConfig = require('./build/config')

gulp.task('serve', () => {
    const config = require('./build/webpack.config.dev')
    const mainEntry = config.entry.main

    if (Array.isArray(mainEntry)) {
        config.entry.main.unshift('webpack-hot-middleware/client?reload=true')
    } else {
        config.entry.main = ['webpack-hot-middleware/client?reload=true', config.entry.main]
    }

    var compiler = webpack(config)
    var devMiddleware = webpackDevMiddleware(compiler, {
        stats: {
            colors: colorsSupported,
            chunks: false,
            modules: false
        },
        publicPath: config.output.publicPath
    })

    var hotMiddleware = webpackHotMiddleware(compiler)

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({
                action: 'reload'
            })
            cb()
        })
    })

    var middlewares = [
        devMiddleware,
        hotMiddleware
    ]

    var proxys = config.devServer.proxy || {}

    Object.keys(proxys).forEach(function (path) {
        middlewares.push(proxyMiddleware(path, proxys[path]));
    })

    serve({
        port: process.env.PORT || 8080,
        open: true,
        server: {
            baseDir: config.output.publicPath
        },
        serveStatic: [{
            route: buildConfig.staticRoute,
            dir: buildConfig.staticDir
        }],
        middleware: middlewares
    })
})

gulp.task('build', ['clean'], (cb) => {
    const config = require('./build/webpack.config.prod')

    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err)
        }

        gutil.log('[webpack]', stats.toString({
            colors: colorsSupported,
            chunks: false,
            errorDetails: true
        }))

        cb()
    })
})

gulp.task('clean', (cb) => {
    del([buildConfig.destDir]).then(function (paths) {
        gutil.log('[clean]', paths)
        cb()
    })
})
