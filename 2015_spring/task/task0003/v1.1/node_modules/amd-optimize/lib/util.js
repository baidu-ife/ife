(function() {
  var fixModuleName, logger, path, printTree, through;

  path = require("path");

  through = require("through2");

  module.exports.printTree = printTree = function(currentModule, prefix) {
    var depPrefix;
    if (prefix == null) {
      prefix = "";
    }
    console.log(prefix, currentModule.name, "(" + (path.relative(process.cwd(), currentModule.file.relative)) + ")");
    depPrefix = prefix.replace("├", "|").replace("└", " ").replace(/─/g, " ");
    return currentModule.deps.forEach(function(depModule, i) {
      if (i + 1 < currentModule.deps.length) {
        return printTree(depModule, depPrefix + " ├──");
      } else {
        return printTree(depModule, depPrefix + " └──");
      }
    });
  };

  module.exports.logger = logger = function() {
    return through.obj(function(file, enc, callback) {
      console.log(">>", path.relative(process.cwd(), file.path));
      return callback(null, file);
    });
  };

  module.exports.fixModuleName = fixModuleName = function(moduleName) {
    return moduleName.replace(/\\/g, '/');
  };

}).call(this);
