const webpack = require('webpack');
const { resolve } = require('path')

const { name, version } = require('../package.json')

const base = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  output: {
    library: name,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, '../lib'),
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                ["@babel/proposal-decorators", { "legacy": true }],
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-async-generator-functions',
                "@babel/plugin-proposal-optional-chaining",
                ['@babel/plugin-transform-runtime', {
                  'regenerator': true,
                  'helpers': false
                }]
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              quiet: true,
              failOnError: false,
              fix: false
            }
          }
        ]
      },
      {
        test: /\.less|css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true, javascriptEnabled: true},
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin({banner: `${name}@${version}`})
  ],

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-router-dom': {
      root: 'ReactRouterDOM',
      commonjs2: 'react-router-dom',
      commonjs: 'react-router-dom',
      amd: 'ReactRouterDOM',
    },
    'lodash': {
      root: '_',
      commonjs2: 'lodash',
      commonjs: 'lodash',
      amd: 'lodash',
    },
    antd: {
      root: 'antd',
      commonjs2: 'antd',
      commonjs: 'antd',
      amd: 'antd',
    },
    'moment': 'moment',
    'moment/locale/zh-cn' : 'moment.locale',
  },
}

module.exports = base;
