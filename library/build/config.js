
const packageConfig = require('../package.json')

const config = {
    appName: packageConfig.name,
    // 配置线上地址
    appPublicPath: '',
    destDir: 'dist',
    staticRoute: '/assets',
    staticDir: './assets',
    report: false,
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
    externals: [
        // 外部引用框架
        //     {
        //     module: 'jquery',
        //     entry: 'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js',
        //     global: 'jQuery'
        // }
    ]
}

module.exports = config
