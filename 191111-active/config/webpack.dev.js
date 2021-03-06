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
    host: '0.0.0.0',
    port: '8080',
    overlay: true,
    open:true,
    proxy: {
      '/home': {
      	target:'http://10.100.136.174:8081',
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
