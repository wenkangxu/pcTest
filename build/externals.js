/* eslint-disable import/no-extraneous-dependencies */

var _ = require('lodash');
var path = require('path');

var externals = [
  {
    name: 'react',
    fileName: 'umd/react.production.min.js',
  },
  {
    name: 'react-dom',
    fileName: 'umd/react-dom.production.min.js',
  },
];

var external = {
  'react': 'React',
  'react-dom': 'ReactDOM',
};

function getExternalFiles() {
  let finalExternals = [
    {
      name: '@babel/polyfill',
      fileName: 'dist/polyfill.min.js',
    },
    ...externals,
  ];

  return _.map(
    finalExternals,
    (pkg) => {
      if (!_.isEmpty(pkg)) {
        var {
          name,
          fileName,
        } = pkg;
        // eslint-disable-next-line
        var packJSON = require(name + '/package.json');
        var version = packJSON.version;
        var fileNameIndex = (fileName || packJSON.unpkg).indexOf('/');
        var outputName = (fileName || packJSON.unpkg).substring(fileNameIndex + 1);
        return {
          name,
          fileName,
          path: path.posix.join(
            'node_modules',
            name,
            (fileName || packJSON.unpkg),
          ),
          to: outputName.replace(/\.js$/, `_${version}.js`),
        };
      }
      // 非字符串情况待扩展，目前场景不需要支持
      return null;
    },
  );
}


exports.getExternalFiles = getExternalFiles;
exports.external = external;
