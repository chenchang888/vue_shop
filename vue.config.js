const px2rem = require('postcss-px2rem');
module.exports = {
    devServer: {
        compress: true,
        // open: true,
        proxy: {
            "/api": {
                target: "http://localhost:4000",
                pathRewrite: { "^/api": "" }
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    px2rem({
                        rootValue: 37.5,  // 换算的基数 remUnit
                        exclude: /node_modules/
                    })
                ]
            }
        }
    }
};