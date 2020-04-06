const path = require('path');

const localPort = '9088';
// 测试环境的开发转发环境地址
const SERVER_FORWARD_URL = 'http://192.168.1.192:5086';
// DOClever的接口mock地址
const MOCK_FORWARD_URL = 'http://192.168.1.192:5090';
// 后端本地联调接口地址
const LOCAL_FORWARD_URL = 'http://192.168.1.192:8082';

const TARGET_URL = SERVER_FORWARD_URL;

function isDebugMode() {
  if (process.argv[2] && process.argv[2].indexOf('DEBUG') > -1) {
    return true;
  }
  return false;
}

function generateProxy(proxyList) {
  const result = {};
  const len = proxyList.length;
  for (let i = 0; i < len; i += 2) {
    result[proxyList[i]] = proxyList[i + 1];
  }
  return result;
}

module.exports = {
  build: {
    // env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/pcTest/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    // env: require('./dev.env'),
    port: localPort,
    enableHardSourceCache: false,
    page: 'pcTest',
    // page: 'fsp/login?iv-user=002332',
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: generateProxy([
      '/api',
      {
        target: isDebugMode() ? LOCAL_FORWARD_URL : TARGET_URL,
        pathRewrite: isDebugMode() ? { '^/api': '' } : null,
      },
    ]),
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    mock: false, // 本地
    // 是否开启HMR
    enableHMR: true,
  },
  cssModules: true,
  src: [path.resolve(__dirname, '../src')],
  appNodeModules: path.resolve(__dirname, '../node_modules'),
  appName: 'pcTest',
};
