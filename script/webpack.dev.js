const { resolve } = require('path')
const WebpackNotifier = require('webpack-notifier');

const {name} = require('../package.json');
const base = require('./webpack.base');

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
    open: true,
    openPage: '?dev',
    historyApiFallback: true
  },

  devtool: 'cheap-module-eval-source-map',

  externals: {
    ...base.externals,
    [name]: {
      root: name,
      commonjs2: name,
      commonjs: name,
      amd: name,
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
    library: name,
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
