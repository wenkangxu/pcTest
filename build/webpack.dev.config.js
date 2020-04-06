var path = require('path')
var webpack = require('webpack');
var HappyPack = require('happypack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var baseWebpackConfig = require('./webpack.base.config');
var utils = require('./utils')
var { external, getExternalFiles } = require('./externals');
var config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var cssLoaders = utils.getCSSLoaders({
  disableCSSModules: !config.cssModules,
  sourceMap: config.dev.cssSourceMap
});

var lessConfig = utils.getLessConfig();

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: {
    index: './src/app.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: config.dev.assetsPublicPath,
    // jsonpFunction: `${config.appName}_${entry.name}_Jsonp`,
  },
  devServer: require('./dev-server').config,
  externals: external,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=jsx',
        include: config.src
      },
      {
        test: /\.css$/,
        include: config.src,
        use: ['style-loader'].concat(cssLoaders.own)
      },
      {
        test: /\.less$/,
        include: config.src,
        use: ['style-loader'].concat(cssLoaders.own).concat({
          loader: 'less-loader',
          options: lessConfig
        })
      },
      {
        test: /\.css$/,
        include: config.appNodeModules,
        use: ['style-loader'].concat(cssLoaders.nodeModules)
      },
      {
        test: /\.less$/,
        include: config.appNodeModules,
        use: ['style-loader'].concat(cssLoaders.nodeModules).concat({
          loader: 'less-loader',
          options: lessConfig
        })
      }
    ]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  stats: 'minimal',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: [{
        loader: 'babel-loader',
        options: {
          configFile: resolve('babel.config.js'),
        }
      }],
    }),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      inject: true,
      template: `index.html`,
      // chunks: [entry.mode === 'app' ? `${entry.name}_standalone`: entry.name],
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: getExternalFiles().map(
        external => path.posix.join('umd', external.path)
        ),
      append: false,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ]
});
