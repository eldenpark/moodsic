const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const paths = require('./paths');
const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  devtool: 'source-map',
  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(paths.src, 'client/ClientApp.tsx'),
    ],
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = merge(webpackConfigClientWeb, config);
