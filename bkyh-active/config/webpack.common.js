const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rules = require("./webpack.rules.conf.js")
const glob = require("glob");

const getEntry = function (){
    let entry = {};
    glob.sync('./src/**/index.js')
        .forEach(function (name) {
            var start = name.indexOf('src/') + 4,
                end = name.length - 3;
//          var eArr = [];
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
//          eArr.push(name);
            entry[n] = name;
        });
    return entry;
};

const entryObj = getEntry();

module.exports = {
  entry: entryObj,
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '../'
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
        template: `./src/${name}/index.html`, 
        filename: `${name}/index.html`,
        inject: 'head',
//      hash: false, //开启hash  ?[hash]
        chunks: chunks,
		// minify: { // 压缩HTML文件
		// 	removeComments: true, // 移除HTML中的注释
		// 	collapseWhitespace: true, // 删除空白符与换行符
		// 	minifyCSS: true// 压缩内联css
		// },
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

