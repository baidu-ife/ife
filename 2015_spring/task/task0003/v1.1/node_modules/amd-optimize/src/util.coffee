path    = require("path")
through = require("through2")

module.exports.printTree = printTree = (currentModule, prefix = "") ->

  console.log(prefix, currentModule.name, "(#{path.relative(process.cwd(), currentModule.file.relative)})")

  depPrefix = prefix
    .replace("├", "|")
    .replace("└", " ")
    .replace(/─/g, " ")
  currentModule.deps.forEach((depModule, i) ->

    if i + 1 < currentModule.deps.length
      printTree(depModule, "#{depPrefix} ├──")
    else
      printTree(depModule, "#{depPrefix} └──")
  )


module.exports.logger = logger = ->
  return through.obj((file, enc, callback) ->
    console.log(">>", path.relative(process.cwd(), file.path))
    callback(null, file)
  )


module.exports.fixModuleName = fixModuleName = (moduleName) ->
  return moduleName.replace(/\\/g, '/')
