var path = require('path')
var utils = require('./utils')
var config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  output: {
    // 设置 sourcemap 的前缀，以在多个webpack编译环境中区分不同工程的同位置文件.
    // ps: devtoolNamespace 通过 devtoolModuleFilenameTemplate 中占位符 namespace 来更改前缀；所以两者要同时设定
    devtoolNamespace: config.appName,
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
  },
  resolve: {
    extensions: ['.jsx', 'ts', 'tsx', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.js', '.less', '.css'],
    modules: [
      resolve('src'),
      'node_modules',
   ],
    alias: {
      '@/components': resolve('src/components'),
      '@/helper': resolve('src/helper'),
      '@/utils': resolve('src/utils'),
      '@/layouts': resolve('src/layouts'),
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   loader: 'ts-loader'
      // },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [
          // antd-mobile svg
          // require.resolve('antd-mobile').replace(/warn\.js$/, ''),
          path.resolve(__dirname, 'static/svg'),
        ]
      },
      {
        test: /\.(png|jpe?g|gif|msi|xlsx?)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    // noParse: [new RegExp('node_modules/localforage/dist/localforage.js')]
  },
  performance: {
    hints: false
  }
}
