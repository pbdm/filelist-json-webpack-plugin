// inspect from https://github.com/ArikMaor/extended-define-webpack-plugin/blob/master/index.js

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var tree = function(filepath) {
  filepath = path.normalize(filepath);

  var result = [];

  var files = fs.readdirSync(filepath);

  for (key in files) {
    file = files[key];
    if (files[key].substr(-2,2) === 'md') {
      result.push ({
        date:  files[key].substr(0,10),
        fullpath:  encodeURIComponent(filepath + '/' + files[key]),
        path: encodeURIComponent(files[key].slice(11,-3).toLowerCase()),
        title: files[key].slice(11,-3)
      });
    }
  }

  return result;
}

var Plugin = function(options) {
  //this.options = options;
  var output = {}
  var outputJSON = {};
  var paths = options.paths || {};
  var keys = Object.keys(paths);
  for (var i = 0; i < keys.length; i++ ) {
    outputJSON[keys[i]] = tree(paths[keys[i]]);
  }
  var key = options.key || 'pbdm';
  output[key] = JSON.stringify(outputJSON);
  return new webpack.DefinePlugin(output);
}

/*
Plugin.prototype.apply = function(compiler) {
  console.log(compiler);    
  console.log(this.options)
  debugger;
  compiler.plugin('compile', function(params){
    console.log(params);
  })

  compiler.plugin('emit', function(compilation, callback) {
    console.log('emit');
    callback();
  });
  compiler.plugin('done', function() {
    console.log('Hello World!'); 
  });
  debugger;
};
*/

module.exports = Plugin;
