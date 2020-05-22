const { resolve } = require('path');
const base = require('./webpack.base');

const { library } = require('./library');

const umdConfig = {
  ...base,

  mode: process.env.BUILD_ENV ? 'production' : 'none',

  devtool: 'source-map',
}

module.exports = [{
  ...umdConfig,

  entry: {
    'index': resolve(__dirname, '../src/index.ts'),
  },

  output: {
    library,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, '../lib'),
  },
}]
