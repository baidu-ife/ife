_                    = require("lodash")
b                    = require("ast-types").builders
escodegen            = require("escodegen")
through              = require("through2")
path                 = require("path")
vinylSourcemapsApply = require("vinyl-sourcemaps-apply")

module.exports = fixModule = (options = {}) ->

  options = _.defaults(options,
    wrapShim : true
  )

  through.obj( (module, enc, done) ->

    if module.isShallow
      done()
      return

    ast = module.file.ast
    delete module.file.ast

    if not module.hasDefine

      defineReturnStatement = b.returnStatement(
        if module.exports
          b.identifier(module.exports)
        else
          null
      )

      if options.wrapShim and module.isShimmed
        defineBody = ast.body.concat([defineReturnStatement])
      else
        defineBody = [defineReturnStatement]

      defineCall = b.callExpression(
        b.identifier("define")
        [
          b.literal(module.name)
          b.arrayExpression(module.deps.map( (dep) -> b.literal(dep.name) ))
          b.functionExpression(
            null
            []
            b.blockStatement(defineBody)
          )
        ]
      )

      if options.wrapShim and module.isShimmed
        ast.body = [b.expressionStatement(
          defineCall
        )]

      else
        ast.body.push(
          b.expressionStatement(defineCall)
        )

    else if module.isAnonymous

# define("foo")
# define(["123"], ->)

      module.astNodes.forEach((astNode) =>
        if astNode.callee.name == "define" and
        (
          astNode.arguments.length == 1 or
          (astNode.arguments.length == 2 and astNode.arguments[0].type == "ArrayExpression")
        )

          astNode.arguments = [
            b.literal(module.name)
            b.arrayExpression(module.deps.map( (dep) -> b.literal(dep.name) ))
            _.last(astNode.arguments)
          ]
      )

    if module.hasDefine and module.isShimmed
      ast.body = [b.expressionStatement(
        b.callExpression(
          b.memberExpression(
            b.functionExpression(
              null
              []
              b.blockStatement(
                ast.body
              )
            )
            b.identifier("call")
            false
          )
          [b.thisExpression()]
        )
      )]

    # TODO: Handle shimmed, mapped and relative deps

    # console.log escodegen.generate(module.file.ast, sourceMap : true).toString()


    sourceFile = module.file.clone()
    sourceFile.sourceMap = module.file.sourceMap

    if sourceFile.sourceMap
      generatedCode = escodegen.generate(
        ast,
        comment: options.preserveComments
        sourceMap : true
        sourceMapWithCode : true
        file : sourceFile.sourceMap.file
      )

      sourceFile.contents = new Buffer(generatedCode.code, "utf8")
      vinylSourcemapsApply(sourceFile, generatedCode.map.toJSON())

    else
      sourceFile = module.file.clone()
      sourceFile.contents = new Buffer(escodegen.generate(ast, { comment: options.preserveComments }), "utf8")

    @push(sourceFile)
    done()

  )
