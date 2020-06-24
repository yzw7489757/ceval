const { resolve } = require('path');
const base = require('./webpack.base');

const umdConfig = {
  ...base,

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'none',

  devtool: 'source-map',
}

module.exports = [{
  ...umdConfig,

  entry: {
    'index': resolve(__dirname, '../src/index.ts'),
  },
}]
