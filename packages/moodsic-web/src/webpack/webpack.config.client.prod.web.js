const path = require('path');

const paths = require('./paths');
const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  devtool: 'source-map',
  entry: {
    client: path.resolve(paths.src, 'client/ClientApp.tsx'),
    react: ['react', 'react-dom'],
  },
  mode: 'production',
  optimization: {
    minimize: true,
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    chunkFilename: 'chunk.[chunkhash].js',
    filename: '[name].[chunkhash].js',
    path: paths.dist,
    publicPath: '/',
  },
};

module.exports = Object.assign({}, webpackConfigClientWeb, config);
