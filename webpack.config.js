const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devServer = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/cssExtract');
const uglifyJS = require('./webpack/uglifyjs');
const images = require('./webpack/images');
const lintJS = require('./webpack/jsLint');
const favicon = require('./webpack/favicons');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build'),
};

const common = merge([
  {
    entry: {
      'index': PATHS.source + '/pages/index/index.js',
      'blog': PATHS.source + '/pages/blog/blog.js',
    },
    output: {
      path: PATHS.build,
      filename: 'js/[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATHS.source + '/pages/index/index.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog', 'common'],
        template: PATHS.source + '/pages/blog/blog.pug',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
      }),
    ],
  },
  pug(),
  images(),
  lintJS({paths: PATHS.source}),
]);

module.exports = function(env) {
  if(env === 'production') {
    return merge([
      common,
      extractCSS(),
      uglifyJS(),
      favicon(),
    ]);
  }
  if(env === 'development') {
    return merge([
      common,
      devServer(),
      sass(),
      css(),
      favicon(),
    ]);
  }
};