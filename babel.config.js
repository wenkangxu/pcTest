module.exports = function(api) {
api.cache.using(() => process.env.NODE_ENV);
const presets = [
    [
      "@babel/preset-env", {
        modules: false
      }
    ],
    '@babel/preset-react'
  ];
  const plugins = [
    [
      'import', {
        libraryName: 'antd',
        style: true
      }
    ],
    // [
    //   "@babel/plugin-transform-runtime", {
    //     "corejs": 3
    //   }
    // ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  ];
  return {
    presets,
    plugins
  }
}