const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'prod';
const cssLoader = {
	'development':["style-loader", "css-loader", "sass-loader"],
	'prod':[MiniCssExtractPlugin.loader,"css-loader",{
        loader: "postcss-loader",
    },"sass-loader"]
}[process.env.NODE_ENV];

const rules = [
	{
        test: /\.(css|scss|sass)$/,
        // 区别开发环境和生成环境
        use: cssLoader
    },
    {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [{
            loader: "babel-loader"
        }]
    },
    {
        test: /\.(png|jpg|gif)$/,
        use: [{
            // 需要下载url-loader
            loader: "url-loader",
            options: {
                limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
                // 图片文件输出的文件夹
                publicPath: "./img",
                outputPath: devMode ? "img/" : "active/img" 
            }
        }]
    },
    {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: './fonts/',
              outputPath: devMode ? "fonts/" : "active/fonts" 
            }
          }
        ]
    },
    {
        test: /\.html$/,
        // html中的img标签
        use: ['html-loader?interpolate']
    }
];

module.exports = rules;