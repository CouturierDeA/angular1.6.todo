var path = require('path');
var utils = require('./utils');
var config = require('../config');
var SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  performance: {
  	maxEntrypointSize:400000
  },
  plugins: [
    new SVGSpritemapPlugin({
      src: 'src/svg/**/*.svg',
      filename: '/icons-test.svg',
      prefix: '',
      svgo: {removeTitle: true}
    })
  ],
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','scss'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'src': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader?exportAsEs65Default',
          options: {
            minimize: true
          }
        }],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.scss/,
        loader: 'babel-loader!css!sass?includePaths[]=' +
        (path.resolve(__dirname, "./node_modules"))
      },
      {test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [resolve('src'), resolve('test')]
      // },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};
