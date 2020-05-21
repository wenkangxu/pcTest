const path = require('path');
const crypto = require('crypto');
// const isObject = require('lodash/isObject');
const config = require('../config');
// const chalk = require('chalk');
const isDev = process.env.NODE_ENV === 'development';

const LESS_CONFIG = {
  // 'icon-url': process.env.NODE_ENV === 'development'
  //   ? '"/static/font/anticon/iconfont"' : '"/fspa/static/font/anticon/iconfont"',
  // 修复极个别IE11下中文乱码的问题
  'font-feature-settings-base': 'normal',
  'pagination-item-size': '28px',
  'font-size-base': '12px',
  'checkbox-size': '14px',
  'btn-height-base': '30px',
  'btn-height-lg': '32px',
  'btn-height-sm': '22px',
  'input-height-base': '30px',
  'input-height-lg': '32px',
  'input-height-sm': '22px',
  'ant-prefix': 'ant',
  'primary-color': '#108ee9',
  'text-color': '#333',
  'btn-default-color': '#4a4a4a',
  'border-radius-base': '4px',
  'border-color-base': '#ccc',
};

exports.assetsPath = function (_path) {
  const assetsSubDirectory = isDev
    ? config.dev.assetsSubDirectory
    : config.build.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path)
}

/** less配置 */
exports.getLessConfig = function () {
  return {
    modifyVars: LESS_CONFIG,
    javascriptEnabled: true
  }
};

exports.getCSSLoaders = function (options) {
  let own = [];
  let nodeModules = [];

  options = options || {}

  let baseOptions = {
    sourceMap: options.sourceMap,
    importLoaders: 1
  };

  let ownOptions = Object.assign({}, baseOptions);

  let cssModulesConfig = {
    modules: {
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
      getLocalIdent: (context, localIdentName, localName, options) => {
        const md5 = crypto.createHash('md5');
        const basename = path.basename(context.resourcePath, '.less');
        const dirname = path.basename(path.dirname(context.resourcePath));
        const hashValue = md5.update(context.resourcePath).digest('hex').substr(0, 5);

        if (isDev) {
          return dirname + '__' + basename + '__' + localName + '__' + hashValue;
        } else {
          return localName + '__' + hashValue;
        }
      }
    }
  };

  if (!options.disableCSSModules) {
    ownOptions = Object.assign(
      ownOptions,
      cssModulesConfig
    );
  }

  let postcssOptions = {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        // browsers: [
        //   '>1%',
        //   'last 4 versions',
        //   'Firefox ESR',
        //   'not ie < 10',
        // ],
        flexbox: 'no-2009'
      })
   ]
  };

  own.push({
    loader: 'css-loader',
    options: ownOptions
  });
  nodeModules.push({
    loader: 'css-loader',
    options: baseOptions
  });

  // own.push('resolve-url-loadr');
  own.push({
    loader: 'postcss-loader',
    options: postcssOptions
  });

  return {
    own,
    nodeModules,
  };
}
