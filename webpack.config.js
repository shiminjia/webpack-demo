const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getHtmlConfig = function (name, title) {
    return {
        template: './src/' + name + '/' + name + '.html',
        filename: name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]     //将 common.js 和 [name].js 的script添加到该html中
    }
}

//环境变量的配置，"development" | "production" | "none"
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'development';
console.log("WEBPACK_ENV:" + WEBPACK_ENV);

module.exports = {
    mode: WEBPACK_ENV,
    entry: {                                     // 所需要打包的js文件
        auth: './src/auth/auth.js',
        book: './src/book/book.js',
        common: './src/common/common.js',
        index: './src/index/index.js',
        share: './src/share/share.js',
    },
    devtool: 'inline-source-map',                 // 开发工具，用于报错时寻找错误位置
    module: {
        rules: [
            {
                test: /\.css$/,                   // 将css加载到html中
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,     // 将图片加载到html中
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: {
            auth: path.resolve(__dirname, 'src/auth/'),
            book: path.resolve(__dirname, 'src/book/'),
            common: path.resolve(__dirname, 'src/common/'),
            index: path.resolve(__dirname, 'src/index/'),
            share: path.resolve(__dirname, 'src/share/')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),                 // 每次build前都先清空dist
        new HtmlWebpackPlugin(getHtmlConfig("auth", "auth")),    // 将html文件打包并添加js
        new HtmlWebpackPlugin(getHtmlConfig("book", "book")),
        new HtmlWebpackPlugin(getHtmlConfig("index", "index")),
        new HtmlWebpackPlugin(getHtmlConfig("share", "share")),
    ],
    output: {                                     // 打包后输出的js文件
        filename: 'js/[name].bundle.js',          // 输出js文件名字
        chunkFilename: 'js/[name].bundle.js',     // ？？动态导入
        path: path.resolve(__dirname, 'dist'),    // 输出位置
    },
    optimization: {
        splitChunks: {                            // 去除重复的js模块
            chunks: 'all',
        },
    },
};
