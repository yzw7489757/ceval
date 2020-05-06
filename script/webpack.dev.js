const { resolve } = require('path')
const WebpackNotifier = require('webpack-notifier');

const {name} = require('../package.json');
const base = require('./webpack.base');
const { library } = require('./library');

const IN_HTTPS = !!process.env.HTTPS;

const devBaseConfig = {
  ...base,
  
  mode: 'development',

  devServer: {
    disableHostCheck: true,
    contentBase: resolve(__dirname, '../entry'),
    https: IN_HTTPS,
    port: 8400,
    host: '0.0.0.0',
    stats: 'minimal',
  },

  devtool: 'cheap-module-eval-source-map',

  externals: {
    ...base.externals,
    [name]: {
      root: library,
      commonjs2: name,
      commonjs: name,
      amd: library,
    },
  },

  plugins: [
    ...base.plugins,
    new WebpackNotifier({
      title: name,
      excludeWarnings: true,
      skipFirstNotification: true
    })
  ]
};

module.exports = [{
  ...devBaseConfig,

  entry: {
    index: resolve(__dirname, '../src/index.ts'),
  },

  output: {
    library,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, '../lib')
  },
}, {
  ...devBaseConfig,

  entry: {
    xindex: resolve(__dirname, '../entry/index.tsx'),
  },

  output: {
    // library,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, '../lib')
  },
}]
