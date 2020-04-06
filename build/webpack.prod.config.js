var _ = require('lodash');
var path = require('path')
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var baseWebpackConfig = require('./webpack.base.config');
var { external, getExternalFiles } = require('./externals');
var utils = require('./utils')
var config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var umdPath = path.join(config.build.assetsSubDirectory, 'js', 'umd');

var cssLoaders = utils.getCSSLoaders({
  disableCSSModules: !config.cssModules,
  sourceMap: config.dev.cssSourceMap
});

var lessConfig = utils.getLessConfig();

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    index: './src/app.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: config.build.assetsPublicPath,
    // jsonpFunction: `${config.appName}_${entry.name}_Jsonp`,
  },
  externals: external,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: config.src
      },
      {
        test: /\.css$/,
        include: config.src,
        use: [
          MiniCssExtractPlugin.loader
        ].concat(cssLoaders.own)
      },
      {
        test: /\.less$/,
        include: config.src,
        use: [
          MiniCssExtractPlugin.loader
        ].concat(cssLoaders.own).concat({
          loader: 'less-loader',
          options: lessConfig
        })
      },
      {
        test: /\.css$/,
        include: config.appNodeModules,
        use: [
          MiniCssExtractPlugin.loader
        ].concat(cssLoaders.nodeModules)
      },
      {
        test: /\.less$/,
        include: config.appNodeModules,
        use: [
          MiniCssExtractPlugin.loader
        ].concat(cssLoaders.nodeModules).concat({
          loader: 'less-loader',
          options: lessConfig
        })
      }
    ]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  optimization: {
    namedModules: true,
    namedChunks: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ],
    splitChunks: {
      name: true,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: (module => module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0 ),
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: 'single'
  },
  plugins: [
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      inject: true,
      template: `index.html`,
      // chunks: ['runtime', 'vendor', 'index'],
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*', 'font/iconfont/*']
      },
      ...getExternalFiles().map(
        (external) => ({
          from: external.path,
          to: path.posix.join(umdPath, external.to),
          flatten: true,
        }),
      ),
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: _.map(
        getExternalFiles(),
        (external) => path.posix.join(umdPath, external.to),
      ),
      append: false,
      publicPath: config.build.assetsPublicPath,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ]
});
