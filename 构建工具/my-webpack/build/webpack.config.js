var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'sss.js'
    },
    devServer: {
        contentBase: "./",
        hot: true,
        port: 8081
    },
    module: {
        rules: [{
            test: /\.(css|less|scss)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
            test: /\.(jpg|png|webp)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'image/213123.[ext]'
                }
            }]

        }]
    },
    plugins: [ //添加的是插件的实例
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}