_         = require("lodash")
fs        = require("fs")
path      = require("path")
async     = require("async")
VinylFile = require("vinyl")

parse     = require("./parse")
util      = require("./util")


class Module
  constructor : (@name, @file, @deps = []) ->

    @name = util.fixModuleName(@name)
    @isShallow = false
    @isShimmed = false
    @isAnonymous = false
    @isInline = false
    @hasDefine = false
    @astNodes = []



module.exports = traceModule = (startModuleName, config, allModules = [], fileLoader, callback) ->

  foundModuleNames = []
  textFiles = {}

  resolveModuleName = (moduleName, relativeTo = "") ->

    isText = (moduleName.indexOf('text!') != -1)

    # get rid of text! prefix
    if (isText)
      moduleName = moduleName.replace('text!', '')

    # deal with module path prefixes
    if config.paths and !config.paths[moduleName]
      slashIdx = moduleName.indexOf("/")
      if slashIdx > 0
        eligiblePath = config.paths[moduleName.substr(0, slashIdx)];
        if eligiblePath
          moduleName =  eligiblePath + moduleName.substr(slashIdx)

    relativeToFileName = resolveModuleFileName(relativeTo)

    if moduleName[0] == "."
      moduleName = util.fixModuleName(path.join(path.dirname(relativeToFileName), moduleName))

    if config.map and config.map[relativeTo] and config.map[relativeTo][moduleName]
      moduleName = config.map[relativeTo][moduleName]

    # add resolved name to list of text files
    if (isText)
      textFiles[moduleName] = true

    return moduleName


  resolveModuleFileName = (moduleName) ->

    if config.paths and config.paths[moduleName]
      moduleName = config.paths[moduleName]

    if /!|^exports$|^require$|^module$|^empty:/.test(moduleName)
      return
    else
      return moduleName



  resolveModules = (moduleNames, callback) ->

    async.mapSeries(moduleNames, resolveModule, callback)
    return


  resolveInlinedModule = (moduleName, deps, astNode, vinylFile, callback) ->

    async.waterfall([

      (callback) -> resolveModules(deps, callback)

      (modules, callback) ->
        module = new Module(moduleName, vinylFile, _.compact(modules))
        module.hasDefine = true
        module.isInline = true
        module.astNodes.push(astNode)
        emitModule(module)
        callback()

    ], callback)
    return


  resolveModule = (moduleName, callback) ->

    module = _.detect(allModules, name : moduleName)
    if module
      callback(null, module)
      return

    fileName = resolveModuleFileName(moduleName)
    if not fileName
      module = new Module(moduleName)
      module.isShallow = true
      callback(null, emitModule(module))
      return

    if _.contains(foundModuleNames, moduleName)
      callback(new Error("Circular dependency detected. Module '#{moduleName}' has been processed before."))
      return
    else
      foundModuleNames.push(moduleName)

    module = null
    isTextFile = !!textFiles[moduleName]

    # console.log("Resolving", moduleName, fileName)

    async.waterfall([

      (callback) ->
        fileLoader(fileName, callback, isTextFile)

      (file, callback) ->

        if arguments.length == 1
          callback = file
          file = null

        if file
          callback(null, file)
        else
          callback(new Error("No file for module '#{moduleName}' found."))

      (file, callback) ->

        file.stringContents = file.contents.toString("utf8")

        if (isTextFile)
          file.stringContents = 'define(function(){ return ' + JSON.stringify(file.stringContents) + '; });'

        module = new Module(moduleName, file)
        callback(null, file)

      parse.bind(null, config)

      (file, definitions, callback) ->

        if _.filter(definitions, (def) -> return def.method == "define" and def.moduleName == undefined and def.argumentsLength > 0).length > 1
          callback(new Error("A module must not have more than one anonymous 'define' calls."))
          return


        module.hasDefine = _.any(definitions, (def) ->
          return def.method == "define" and (def.moduleName == undefined or def.moduleName == moduleName)
        )

        async.mapSeries(
          definitions
          (def, callback) ->

            def.deps = def.deps.map( (depName) -> resolveModuleName(depName, def.moduleName ? moduleName) )

            if def.method == "define" and def.moduleName != undefined and def.moduleName != moduleName
              async.waterfall([
                (callback) -> resolveInlinedModule(def.moduleName, def.deps, def.node, file, callback)
                (callback) -> callback(null, [])
              ], callback)

            else
              module.astNodes.push(def.node)
              resolveModules(def.deps, callback)
            return
          callback
        )


      (unflatModules, callback) ->

        callback(null, _.compact(_.flatten(unflatModules)))


      (depModules, callback) ->

        module.deps.push(depModules...)
        module.isAnonymous = true

        async.waterfall([

          (callback) ->

            additionalDepNames = null

            if config.shim and shim = config.shim[module.name]

              if module.hasDefine
                console.log("[warn]", "Module '#{module.name}' is shimmed even though it has a proper define.")

              module.isShimmed = true

              if shim.exports
                module.exports = shim.exports

              if _.isArray(shim)
                additionalDepNames = shim
              else if shim.deps
                additionalDepNames = shim.deps

            if additionalDepNames
              resolveModules(additionalDepNames, callback)
            else
              callback(null, [])


          (depModules, callback) ->

            module.deps.push(depModules...)
            callback(null, emitModule(module))

        ], callback)
        return

    ], callback)
    return


  emitModule = (module) ->

    if not _.any(allModules, name : module.name)
      allModules.push(module)
    return module


  resolveModule(startModuleName, callback)

  return

