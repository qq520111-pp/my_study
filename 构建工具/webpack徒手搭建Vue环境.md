#  Vue环境自我搭配

## 1. 项目初始化

### 1.1 npm 环境配置

输入

```bash
npm init -y 
```

### 1.2 配置基本项目目录

![image-20200327132527621](Vue%E7%8E%AF%E5%A2%83%E8%87%AA%E6%88%91%E6%90%AD%E9%85%8D.assets/image-20200327132527621.png)

- build目录 里面存放的是webpack的配置文件
- dist目录 里面存放的是打包后的项目文件
- src目录 里面存放的是源代码文件
  - components: 存放vue的基本组件
  - css: 存放公共css的文件
  - images: 存放图片素材
  - js: 存放公共js工具库
  - router: 存放vue的路由系统
  - vuex: 存放vue的 通用数据

## 2. 配置基本文件

### 2.1: 设置主html,js文件

![image-20200327135609580](Vue%E7%8E%AF%E5%A2%83%E8%87%AA%E6%88%91%E6%90%AD%E9%85%8D.assets/image-20200327135609580.png)

<center>主html模板文件</center>

![image-20200327140003510](Vue%E7%8E%AF%E5%A2%83%E8%87%AA%E6%88%91%E6%90%AD%E9%85%8D.assets/image-20200327140003510.png)

<center>主js入口文件</center>

![image-20200327140208821](Vue%E7%8E%AF%E5%A2%83%E8%87%AA%E6%88%91%E6%90%AD%E9%85%8D.assets/image-20200327140208821.png)

<center>webpack配置文件</center>

### 2.2 安装基本的组件

整个组件分为几个大类:

1. webpack的工具类
   - webpack   : webpack核心组件
   - webpack-cli  : 提供相关的webpack指令
   - webpack-dev-server : 开启开发模式, 可以启用热更新等技术
   - webpack-merge : 可以合并多个webpack的配置
   - clean-webpack-plugin : 每次打包后, 清空原来打包出来的数据
   - html-webpack-plugin: 配置项目的模板html
2. 基本的loader
   - node-sass: node环境下的sass编译器
   - sass-loader: 加载scss文件
   - css-loader:  加载css
   - file-loader:  加载各种文件
   - style-loader:  配置内联样式
3. babel转义类的
   - babel-loader
   - @babel/core
   - @babel/polyfill
   - @babel/preset-env
4. 兼容性工具
   - postcss-loader:css样式兼容
   - autoprefixer: 上述工具的预处理
   - html-withimg-loader:  当模板文件里面有图片的时候, 也可以正常的挪到指定的目录
5. vue相关
   - vue : 核心框架
   - vue-loader:  .vue文件的加载器
   - vue-router :  vue的路由模块
   - vue-template-compiler: vue的模板编译器
   - vuex : vue的数据存储系统

根据上述列表, 我们逐个进行安装

### 2.3 配置webpack的配置文件

![image-20200327203407460](Vue%E7%8E%AF%E5%A2%83%E8%87%AA%E6%88%91%E6%90%AD%E9%85%8D.assets/image-20200327203407460.png)

我们把配置文件分成三个部分

 	1. 通用部分, 配置通用的加载器等信息
 	2. dev部分, 配置在开发模式的下配置, 比如热更新等等
 	3. prod部分, 配置生成模式下的配置



webpack.common.js

```javascript
let path = require("path");// 导入node的path模块, 为后面的文件路径相关业务做准备
let htmlWebpackPlugin = require("html-webpack-plugin");// 导入 webpack的html模板模块
let VueLoaderPlugin = require("vue-loader/lib/plugin");//导入 vue-loader的插件
//配置基本的打包信息, 比如, 出入口, 比如基本项目文件的加载器及插件
module.exports ={
    entry: {
        bundle:path.resolve(__dirname,"../src/index.js")
        // 用path模块的resolve功能把当前webpack配置文件所在的目录, 与传进去的目录进行整合成一个绝对路径
        // 打包后的文件名是 bundle.js
    },
    output: {
        path: path.resolve(__dirname,"../dist"),// 打包的文件最终放在主目录下的dist目录中
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,// 排除node_modules目录里面引用的模块
                use:[
                        {
                            loader:"babel-loader", // 使用babelloader进行转译
                            options: {
                                "presets":[ // 预处理
                                    [
                                        "@babel/preset-env",
                                        {
                                            useBuiltIns:"usage" // 用到了就转义, 没用到就不管
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
            },
            {
                test:/\.(png|jpe?g|gif|svg)$/,
                use:[
                    {
                        loader:"file-loader",
                        options: {
                            outputPath:"./images",
                            name:"[name]_[hash].[ext]",
                            esModule:false
                            // 当模板文件里面有图片的时候, 也可以正常的挪到上述目录里面
                        }
                    }
                ]
            },{
                test:/\.(css|scss)/,
                use:[
                    "vue-style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname,"../index.html") //设置基本的模板文件
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
    	extensions: ['.js', '.json', '.vue', '.scss', '.css'] // 可以省略指定文件的后缀名
	}
}
```

webpack.dev.js

```javascript
let merge = require("webpack-merge");
let commonConfig = require("./webpack.common");
let webpack = require("webpack");
let path = require("path");
module.exports=merge(commonConfig,{
    mode:"development",
    devtool:"inline-source-map",
    devServer:{
        contentBase:path.resolve(__dirname,"../dist"),// 配置开发模式时指向的本地文件目录
        port:8080, // 本地模拟服务器的端口
        open:true, // 运行开发模式后, 打开浏览器
        hot:true, // 开启热更新模式
        hotOnly:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin() //启用热更新组件
    ]
});

```

webpack.pro.js

```javascript
const commonConfig = require("./webpack.common");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");// 每次打包文件, 都清除上一次打包的内容
const path = require("path");

module.exports=merge(commonConfig,{
    mode:"production",
    devtool:"source-map",
    plugins:[
        new CleanWebpackPlugin() //启用清除组件
    ]
})

```

![image-20200327214948633](Vue%E7%8E%AF%E5%A2%83%E8%87%AA%E6%88%91%E6%90%AD%E9%85%8D.assets/image-20200327214948633.png)

配置postcss.config.js

```javascript
module.exports={
    plugins:[
        require("autoprefixer")
    ]
}
```



### 2.4:配置npm 运行的指令

我们根据上面配置的文件, 

package.json

```javascript
{
  "name": "readerApp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "prod": "webpack --config ./build/webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^4.0.2",
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3",
    "webpack-merge": "^4.2.2"
  },
  "dependencies": {
    "@babel/core": "^7.9.0",
    "@babel/polyfill": "^7.8.7",
    "@babel/preset-env": "^7.9.0",
    "autoprefixer": "^9.7.5",
    "babel-loader": "^8.1.0",
    "css-loader": "^3.4.2",
    "file-loader": "^6.0.0",
    "node-sass": "^4.13.1",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^8.0.2",
    "style-loader": "^1.1.3",
    "vue": "^2.6.11",
    "vue-loader": "^15.9.1",
    "vue-router": "^3.1.6",
    "vue-template-compiler": "^2.6.11",
    "vuex": "^3.1.3"
  }
}

```



## 3. 项目测试

![image-20200327211902565](Vue%E7%8E%AF%E5%A2%83%E8%87%AA%E6%88%91%E6%90%AD%E9%85%8D.assets/image-20200327211902565.png)

App.vue

```vue
<template>
    <div>
        <h1 class="title">
            {{msg}}
        </h1>
        <img src="./images/1.jpg" alt="">
    </div>
</template>
<script>
    export default {
        name:"App",
        data(){
            return{
                msg:"hello world"
            }
        }
    }
</script>
<style lang="scss">
    @import "css/header";
    .title{
        text-align: center;
        color: aquamarine;
    }
</style>
```

index.js

```javascript
import Vue from "vue";
import App from "./App";

new Vue({
    el:"#app",
    render:h=>h(App)
})
```

