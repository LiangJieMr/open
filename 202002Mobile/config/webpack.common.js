/*
 * @Author: 梁杰
 * @Date: 2020-01-06 11:43:10
 * @LastEditors: 梁杰
 * @LastEditTime: 2020-01-06 15:28:56
 * @Description: 
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rules = require("./webpack.rules.conf.js")
const glob = require("glob");
const devMode = process.env.NODE_ENV !== 'prod';

const getEntry = function (){
    let entry = {};
    glob.sync('./src/assets200208/js/*.js')
        .forEach(function (name,index) {
        	const key = name.split('./src/assets200208/js/')[1]
        				.split('.')[0];
            entry[key] = name;
        });
    return entry;
};

const entryObj = getEntry();

module.exports = {
  entry: entryObj,
	output: {
	    filename: 'assets200208/js/[name].js',
	    path: path.resolve(__dirname, '../dist'),
	    publicPath: './'
	},
  module: {
    rules: [...rules]
  },
  resolve: {
    alias: {
        '@': path.resolve(__dirname, '../src')
    }
  },
  plugins: [

  ]
}

const getHtmlConfig = function (name, chunks) {
    return {
        template: `./src/${name}.html`, 
        filename: `${name}.html`,
        inject: false,
//      hash: false, //开启hash  ?[hash]
        chunks: chunks,
        minify: devMode ? {} : {
            removeComments: true,
            removeTagWhitespace:true,
            collapseInlineTagWhitespace:true,
            collapseWhitespace:true,
            removeTagWhitespace:true
        }
    };
};

const htmlArray = [];
Object.keys(entryObj).forEach(element => {
    htmlArray.push({
        _html: element,
        title: '',
        chunks: [element]
    })
});

//自动生成html模板
htmlArray.forEach((element) => {
    module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})
