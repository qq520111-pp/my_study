var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var VueLoaderPlugin = require("vue-loader/lib/plugin");
//路径不能是相对路径
module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.(css|less|scss)$/,
            use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        outputPath: "./images",
                        name: "[name]_[hash].[ext]",
                        esModule: false
                        // 当模板文件里面有图片的时候, 也可以正常的挪到上述目录里面
                    }
                }
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/, // 排除这个文件
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [[
                        "@babel/preset-env",
                        {
                            useBuiltIns: "usage" // 用到了就转义, 没用到就不管
                        }
                    ]]
                }
            }]

        },
        {
            test: /\.vue$/,
            use: ['vue-loader']
        }]
    },
    plugins: [ //添加的是插件的实例
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin() //vue-loader插件
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue', '.scss', '.css'] // 可以省略指定文件的后缀名
    }
}