const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

import './style.css';

module.exports = {
  entry: join(__dirname, 'index.js'), 
  output: {
      path: join(__dirname, 'build'), 
      filename: 'index.min.js'
  }
}