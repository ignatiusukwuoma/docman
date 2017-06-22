import path from 'path';
import webpack from 'webpack';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
process.env.NODE_ENV = 'production';
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

export default {
  devtool: 'source-map',
  entry: path.join(__dirname, '/client/index'),
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: 'client/dist'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client'),
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    dns: 'empty'
  }
};
