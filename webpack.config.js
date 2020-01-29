const path = require('path');
const uglifyJS = require('./webpack/uglifyjs');
const lintJS = require('./webpack/jsLint');
const merge = require('webpack-merge');
const devServer = require('./webpack/devserver');

const PATHS = {
  source: path.join(__dirname, 'dev'),
  build: path.join(__dirname, 'build'),
};

const common = merge([
  {
    entry: {
      'index': PATHS.source + '/js/app.js',
    },
    output: {
      path: PATHS.build,
      filename: 'js/[name].min.js',
    },
  },
  lintJS({paths: PATHS.source}),
]);

module.exports = function(env) {
  if(env === 'production') {
    return merge([
      common,
      uglifyJS(),
    ]);
  }
  if(env === 'development') {
    return merge([
      common,
      devServer(),
    ]);
  }
};