import path from 'path';
import webpack from 'webpack';

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

// const extractPlugin = new ExtractTextPlugin({
//   filename: 'main.css'
// });

// require('dotenv').config();
// const envsDefinePlugin = new webpack.DefinePlugin({
  // 'process.env.NEWS_API_KEY': JSON.stringify(process.env.NEWS_API_KEY),
// });

export default {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/client/index')
  ],
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'client')
  // },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client'),
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.scss$/,
        // use: extractPlugin.extract({
        //   use: ['css-loader', 'sass-loader']
        // })
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.html$/,
      //   use: ['html-loader']
      // },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'url-loader',
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name].[ext]',
        //       outputPath: 'img/',
        //       publicPath: 'img/'
        //     }
        //   }
        // ]
      },
    ],
  },
  plugins: [
    // extractPlugin,
    // envsDefinePlugin,
    // new HtmlWebpackPlugin({
    //   template: 'client/index.html'
    // }),
    // new CleanWebpackPlugin(['dist']),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    dns: 'empty'
  },
};
