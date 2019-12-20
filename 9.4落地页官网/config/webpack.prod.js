const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js')

module.exports =  merge(common, {
  mode: 'production',
  devtool: 'none',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          // compress: { properties: false },
          ie8: true,
          mangle:true,
          output: {
            comments: false,
            beautify: false,
            quote_keys: false
          }
        }
      })
    ]
  },
  plugins: [
  	new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: "[name]/index.css",
        publicPath:'../'
    }),
    new webpack.DefinePlugin({
      
    }),
//  new CopyWebpackPlugin([
//  	{ 
//  		from: 'src/assets', 
//  		to: path.resolve(__dirname, '../dist/assets'),
//  		force:true
//  	}
//  ])
  ]
})
