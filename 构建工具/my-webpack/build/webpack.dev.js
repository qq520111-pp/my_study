var path = require('path');
var merge = require("webpack-merge");
var common = require("./webpack.common");
let webpack = require("webpack");
module.exports = merge(common, {
    mode: "development",
    devServer: {
        contentBase: "./",
        hot: true,
        port: 8081,
        open: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //热更新文件
    ]
})