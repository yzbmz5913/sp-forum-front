module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://127.0.0.1:8999',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                },
                debug: true
            },
        }
    }
}