/*
 * @Author: 梁杰
 * @Date: 2020-01-06 11:43:10
 * @LastEditors: 梁杰
 * @LastEditTime: 2020-01-06 15:26:11
 * @Description: 
 */
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase:path.resolve(__dirname,'../src'),
    publicPath:'/',
    historyApiFallback: false,
    inline: true,
//  hot: true,
    stats: 'errors-only',
    host: '127.0.0.1',
    port: '8082',
    overlay: true,
    open:true,
    proxy: {
      '/api': {
      	target:'http://test.iopen.com.cn/',
      	changeOrigin: true
      }
    }
  },
  plugins: [
//	new webpack.HotModuleReplacementPlugin()
//		new webpack.NamedModulesPlugin()
//  new webpack.DefinePlugin({
//    
//  })
  ]
})
