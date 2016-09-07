(function() {
  var Module, VinylFile, _, async, fs, parse, path, traceModule, util;

  _ = require("lodash");

  fs = require("fs");

  path = require("path");

  async = require("async");

  VinylFile = require("vinyl");

  parse = require("./parse");

  util = require("./util");

  Module = (function() {
    function Module(name, file1, deps1) {
      this.name = name;
      this.file = file1;
      this.deps = deps1 != null ? deps1 : [];
      this.name = util.fixModuleName(this.name);
      this.isShallow = false;
      this.isShimmed = false;
      this.isAnonymous = false;
      this.isInline = false;
      this.hasDefine = false;
      this.astNodes = [];
    }

    return Module;

  })();

  module.exports = traceModule = function(startModuleName, config, allModules, fileLoader, callback) {
    var emitModule, foundModuleNames, resolveInlinedModule, resolveModule, resolveModuleFileName, resolveModuleName, resolveModules, textFiles;
    if (allModules == null) {
      allModules = [];
    }
    foundModuleNames = [];
    textFiles = {};
    resolveModuleName = function(moduleName, relativeTo) {
      var eligiblePath, isText, relativeToFileName, slashIdx;
      if (relativeTo == null) {
        relativeTo = "";
      }
      isText = moduleName.indexOf('text!') !== -1;
      if (isText) {
        moduleName = moduleName.replace('text!', '');
      }
      if (config.paths && !config.paths[moduleName]) {
        slashIdx = moduleName.indexOf("/");
        if (slashIdx > 0) {
          eligiblePath = config.paths[moduleName.substr(0, slashIdx)];
          if (eligiblePath) {
            moduleName = eligiblePath + moduleName.substr(slashIdx);
          }
        }
      }
      relativeToFileName = resolveModuleFileName(relativeTo);
      if (moduleName[0] === ".") {
        moduleName = util.fixModuleName(path.join(path.dirname(relativeToFileName), moduleName));
      }
      if (config.map && config.map[relativeTo] && config.map[relativeTo][moduleName]) {
        moduleName = config.map[relativeTo][moduleName];
      }
      if (isText) {
        textFiles[moduleName] = true;
      }
      return moduleName;
    };
    resolveModuleFileName = function(moduleName) {
      if (config.paths && config.paths[moduleName]) {
        moduleName = config.paths[moduleName];
      }
      if (/!|^exports$|^require$|^module$|^empty:/.test(moduleName)) {

      } else {
        return moduleName;
      }
    };
    resolveModules = function(moduleNames, callback) {
      async.mapSeries(moduleNames, resolveModule, callback);
    };
    resolveInlinedModule = function(moduleName, deps, astNode, vinylFile, callback) {
      async.waterfall([
        function(callback) {
          return resolveModules(deps, callback);
        }, function(modules, callback) {
          var module;
          module = new Module(moduleName, vinylFile, _.compact(modules));
          module.hasDefine = true;
          module.isInline = true;
          module.astNodes.push(astNode);
          emitModule(module);
          return callback();
        }
      ], callback);
    };
    resolveModule = function(moduleName, callback) {
      var fileName, isTextFile, module;
      module = _.detect(allModules, {
        name: moduleName
      });
      if (module) {
        callback(null, module);
        return;
      }
      fileName = resolveModuleFileName(moduleName);
      if (!fileName) {
        module = new Module(moduleName);
        module.isShallow = true;
        callback(null, emitModule(module));
        return;
      }
      if (_.contains(foundModuleNames, moduleName)) {
        callback(new Error("Circular dependency detected. Module '" + moduleName + "' has been processed before."));
        return;
      } else {
        foundModuleNames.push(moduleName);
      }
      module = null;
      isTextFile = !!textFiles[moduleName];
      async.waterfall([
        function(callback) {
          return fileLoader(fileName, callback, isTextFile);
        }, function(file, callback) {
          if (arguments.length === 1) {
            callback = file;
            file = null;
          }
          if (file) {
            return callback(null, file);
          } else {
            return callback(new Error("No file for module '" + moduleName + "' found."));
          }
        }, function(file, callback) {
          file.stringContents = file.contents.toString("utf8");
          if (isTextFile) {
            file.stringContents = 'define(function(){ return ' + JSON.stringify(file.stringContents) + '; });';
          }
          module = new Module(moduleName, file);
          return callback(null, file);
        }, parse.bind(null, config), function(file, definitions, callback) {
          if (_.filter(definitions, function(def) {
            return def.method === "define" && def.moduleName === void 0 && def.argumentsLength > 0;
          }).length > 1) {
            callback(new Error("A module must not have more than one anonymous 'define' calls."));
            return;
          }
          module.hasDefine = _.any(definitions, function(def) {
            return def.method === "define" && (def.moduleName === void 0 || def.moduleName === moduleName);
          });
          return async.mapSeries(definitions, function(def, callback) {
            def.deps = def.deps.map(function(depName) {
              var ref;
              return resolveModuleName(depName, (ref = def.moduleName) != null ? ref : moduleName);
            });
            if (def.method === "define" && def.moduleName !== void 0 && def.moduleName !== moduleName) {
              async.waterfall([
                function(callback) {
                  return resolveInlinedModule(def.moduleName, def.deps, def.node, file, callback);
                }, function(callback) {
                  return callback(null, []);
                }
              ], callback);
            } else {
              module.astNodes.push(def.node);
              resolveModules(def.deps, callback);
            }
          }, callback);
        }, function(unflatModules, callback) {
          return callback(null, _.compact(_.flatten(unflatModules)));
        }, function(depModules, callback) {
          var ref;
          (ref = module.deps).push.apply(ref, depModules);
          module.isAnonymous = true;
          async.waterfall([
            function(callback) {
              var additionalDepNames, shim;
              additionalDepNames = null;
              if (config.shim && (shim = config.shim[module.name])) {
                if (module.hasDefine) {
                  console.log("[warn]", "Module '" + module.name + "' is shimmed even though it has a proper define.");
                }
                module.isShimmed = true;
                if (shim.exports) {
                  module.exports = shim.exports;
                }
                if (_.isArray(shim)) {
                  additionalDepNames = shim;
                } else if (shim.deps) {
                  additionalDepNames = shim.deps;
                }
              }
              if (additionalDepNames) {
                return resolveModules(additionalDepNames, callback);
              } else {
                return callback(null, []);
              }
            }, function(depModules, callback) {
              var ref1;
              (ref1 = module.deps).push.apply(ref1, depModules);
              return callback(null, emitModule(module));
            }
          ], callback);
        }
      ], callback);
    };
    emitModule = function(module) {
      if (!_.any(allModules, {
        name: module.name
      })) {
        allModules.push(module);
      }
      return module;
    };
    resolveModule(startModuleName, callback);
  };

}).call(this);
