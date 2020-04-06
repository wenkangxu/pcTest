const path = require('path');
const express = require('express');

const config = require('../config');
// const mockRouter = require('./mock')

exports.config = {
  contentBase: path.join(__dirname, 'dist'),
  publicPath: config.dev.assetsPublicPath,
  compress: true,
  hot: true,
  injectHot: true,
  port: config.dev.port,
  historyApiFallback: true,
  open: true,
  openPage: config.dev.page,
  proxy: config.dev.proxyTable,
  quiet: true,
  setup: function(app) {
    console.log('> Starting dev server...')

    // if (config.dev.mock) {
    //   app.use('/', mockRouter);
    // }
    // serve pure static assets
    const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
    app.use(staticPath, express.static('./static'))
    // server umd js file
    const umdPath = path.posix.join(config.dev.assetsPublicPath, 'umd', 'node_modules');
    app.use(umdPath, express.static('./node_modules'))

  },
  after: function(_, server) {
    console.log(`> Listening at ${server.options.port}`);
  }
};
