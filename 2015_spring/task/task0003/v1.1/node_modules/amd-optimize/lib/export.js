(function() {
  var _, b, escodegen, fixModule, path, through, vinylSourcemapsApply;

  _ = require("lodash");

  b = require("ast-types").builders;

  escodegen = require("escodegen");

  through = require("through2");

  path = require("path");

  vinylSourcemapsApply = require("vinyl-sourcemaps-apply");

  module.exports = fixModule = function(options) {
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      wrapShim: true
    });
    return through.obj(function(module, enc, done) {
      var ast, defineBody, defineCall, defineReturnStatement, generatedCode, sourceFile;
      if (module.isShallow) {
        done();
        return;
      }
      ast = module.file.ast;
      delete module.file.ast;
      if (!module.hasDefine) {
        defineReturnStatement = b.returnStatement(module.exports ? b.identifier(module.exports) : null);
        if (options.wrapShim && module.isShimmed) {
          defineBody = ast.body.concat([defineReturnStatement]);
        } else {
          defineBody = [defineReturnStatement];
        }
        defineCall = b.callExpression(b.identifier("define"), [
          b.literal(module.name), b.arrayExpression(module.deps.map(function(dep) {
            return b.literal(dep.name);
          })), b.functionExpression(null, [], b.blockStatement(defineBody))
        ]);
        if (options.wrapShim && module.isShimmed) {
          ast.body = [b.expressionStatement(defineCall)];
        } else {
          ast.body.push(b.expressionStatement(defineCall));
        }
      } else if (module.isAnonymous) {
        module.astNodes.forEach((function(_this) {
          return function(astNode) {
            if (astNode.callee.name === "define" && (astNode["arguments"].length === 1 || (astNode["arguments"].length === 2 && astNode["arguments"][0].type === "ArrayExpression"))) {
              return astNode["arguments"] = [
                b.literal(module.name), b.arrayExpression(module.deps.map(function(dep) {
                  return b.literal(dep.name);
                })), _.last(astNode["arguments"])
              ];
            }
          };
        })(this));
      }
      if (module.hasDefine && module.isShimmed) {
        ast.body = [b.expressionStatement(b.callExpression(b.memberExpression(b.functionExpression(null, [], b.blockStatement(ast.body)), b.identifier("call"), false), [b.thisExpression()]))];
      }
      sourceFile = module.file.clone();
      sourceFile.sourceMap = module.file.sourceMap;
      if (sourceFile.sourceMap) {
        generatedCode = escodegen.generate(ast, {
          comment: options.preserveComments,
          sourceMap: true,
          sourceMapWithCode: true,
          file: sourceFile.sourceMap.file
        });
        sourceFile.contents = new Buffer(generatedCode.code, "utf8");
        vinylSourcemapsApply(sourceFile, generatedCode.map.toJSON());
      } else {
        sourceFile = module.file.clone();
        sourceFile.contents = new Buffer(escodegen.generate(ast, {
          comment: options.preserveComments
        }), "utf8");
      }
      this.push(sourceFile);
      return done();
    });
  };

}).call(this);
