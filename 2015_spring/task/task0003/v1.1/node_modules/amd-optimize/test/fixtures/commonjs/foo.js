define(function(require, exports, module) {
  var bar = require('./bar');
  module.exports = function () {
    return bar.baz();
  };
});
