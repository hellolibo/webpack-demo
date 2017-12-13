const https = require('https')
const path = require('path')

const packageConfig = require('../package.json')

const config = {
    appName: packageConfig.name,
    appPublicPath: 'https://static.51offer.com/mod/app/' + packageConfig.name,
    destDir: 'dist',
    staticRoute: '/assets',
    staticDir: './assets',
    report: true,
    proxy: {
        // '/': {
        //     target: '',
        //     changeOrigin: true,
        //     agent: https.globalAgent,
        //     secure: false,
        //     onProxyReg: function (proxyReq, req) {
        //         proxyReq.setHeader('cookie', '')
        //     }
        // }
    },
    externals: [{
        module: 'jquery',
        entry: 'https://static.51offer.com/mod/npm/jquery@3.2.1/dist/jquery.min.js',
        global: 'jQuery',
    }]
}

module.exports = config