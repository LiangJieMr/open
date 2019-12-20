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
    stats: 'errors-only',
    host: 'localhost',
    port: '8080',
    overlay: true,
    open:true
  },
  plugins: [
    new webpack.DefinePlugin({
      
    })
  ]
})
