(function() {
  var _, acorn, escodegen, parseRequireDefinitions, valuesFromArrayExpression, walk;

  _ = require("lodash");

  acorn = require("acorn");

  escodegen = require("escodegen");

  walk = require("acorn/util/walk");

  valuesFromArrayExpression = function(expr) {
    return expr.elements.map(function(a) {
      return a.value;
    });
  };

  module.exports = parseRequireDefinitions = function(config, file, callback) {
    var ast, comments, definitions, err, tokens;
    try {
      if (config.preserveComments) {
        comments = [];
        tokens = [];
        ast = acorn.parse(file.stringContents, {
          sourceFile: file.relative,
          locations: file.sourceMap != null,
          ranges: true,
          onComment: comments,
          onToken: tokens
        });
        escodegen.attachComments(ast, comments, tokens);
      } else {
        ast = acorn.parse(file.stringContents, {
          sourceFile: file.relative,
          locations: file.sourceMap != null
        });
      }
    } catch (_error) {
      err = _error;
      if (err instanceof SyntaxError) {
        err.filename = file.path;
        err.message += " in " + file.path;
      }
      callback(err);
      return;
    }
    file.ast = ast;
    definitions = [];
    walk.ancestor(ast, {
      CallExpression: function(node, state) {
        var defineAncestors, deps, isInsideDefine, moduleName;
        if (node.callee.name === "define") {
          switch (node["arguments"].length) {
            case 1:
              if (node["arguments"][0].type === "FunctionExpression" && node["arguments"][0].params.length > 0) {
                deps = ['require', 'exports', 'module'];
                walk.simple(node["arguments"][0], {
                  CallExpression: function(node) {
                    if (node.callee.name === "require" || node.callee.name === "requirejs") {
                      return deps.push(node["arguments"][0].value);
                    }
                  }
                });
              }
              break;
            case 2:
              switch (node["arguments"][0].type) {
                case "Literal":
                  moduleName = node["arguments"][0].value;
                  break;
                case "ArrayExpression":
                  deps = valuesFromArrayExpression(node["arguments"][0]);
              }
              break;
            case 3:
              moduleName = node["arguments"][0].value;
              deps = valuesFromArrayExpression(node["arguments"][1]);
          }
          definitions.push({
            method: "define",
            moduleName: moduleName,
            deps: deps != null ? deps : [],
            argumentsLength: node["arguments"].length,
            node: node
          });
          isInsideDefine = true;
        }
        if ((node.callee.name === "require" || node.callee.name === "requirejs") && node["arguments"].length > 0 && node["arguments"][0].type === "ArrayExpression") {
          defineAncestors = _.any(state.slice(0, -1), function(ancestorNode) {
            return ancestorNode.type === "CallExpression" && (ancestorNode.callee.name === "define" || ancestorNode.callee.name === "require" || ancestorNode.callee.name === "requirejs");
          });
          if (config.findNestedDependencies || !defineAncestors) {
            return definitions.push({
              method: "require",
              moduleName: void 0,
              deps: valuesFromArrayExpression(node["arguments"][0]),
              node: node
            });
          }
        }
      }
    });
    callback(null, file, definitions);
  };

}).call(this);
