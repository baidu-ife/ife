_            = require("lodash")
fs           = require("fs")
path         = require("path")
vinylFs      = require("vinyl-fs")
async        = require("async")
through      = require("through2")

Readable     = require("stream").Readable

trace        = require("./trace")
exportModule = require("./export")
util         = require("./util")

firstChunk = (stream, callback) ->

  settled = false
  stream
    .on("data", (data) ->
      if not settled
        settled = true
        callback(null, data)
      return
    ).on("end", ->
      if not settled
        callback()
      return
    ).on("error", (err) ->
      if not settled
        settled = true
        callback(err)
      return
    )
  return


collectModules = (module, omitInline = true) ->
# Depth-first search over the module dependency tree

  outputBuffer = []

  collector = (currentModule) ->

    currentModule.deps.forEach( (depModule) ->
      collector(depModule)
    )
    if not (omitInline and currentModule.isInline) and not _.any(outputBuffer, name : currentModule.name)
      outputBuffer.push(currentModule)

  collector(module)

  return outputBuffer


mergeOptionsFile = (file, options = {}) ->

  return _.merge(
    {}
    Function("""
      var output,
        requirejs = require = function() {},
        define = function () {};
      require.config = function (options) { output = options; };
      #{file.contents.toString("utf8")};
      return output;
      """)()
    options
  )


defaultLoader = (fileBuffer, options) ->

  return (name, callback, asPlainFile) ->

    addJs = (!asPlainFile) and '.js' or ''

    if options.baseUrl and file = _.detect(fileBuffer, path : path.resolve(options.baseUrl, name + addJs))
      callback(null, file)
    else if file = _.detect(fileBuffer, relative : path.join(options.baseUrl, name + addJs))
      callback(null, file)
    else if options.loader
      options.loader(name, callback)
    else
      module.exports.loader()(path.join(options.baseUrl, name + addJs), callback)



module.exports = rjs = (entryModuleName, options = {}) ->

  # Default options
  options = _.defaults(
    options, {
      baseUrl : ""
      configFile : null
      exclude : []
      excludeShallow : []
      # include : []
      findNestedDependencies : false
      # wrapShim : true
      loader : null
      preserveComments : false
    }
  )

  # Fix sloppy options
  if _.isString(options.exclude)
    options.exclude = [options.exclude]

  if _.isString(options.excludeShallow)
    options.excludeShallow = [options.excludeShallow]

  # Prepare config file stream
  if _.isString(options.configFile) or _.isArray(options.configFile)
    configFileStream = vinylFs.src(options.configFile)
  else if _.isObject(options.configFile)
    configFileStream = options.configFile

  fileBuffer = []

  # Go!
  mainStream = through.obj(
    # transform
    (file, enc, done) ->
      fileBuffer.push(file)
      done()

    # flush
    (done) ->

      async.waterfall([

        (callback) ->
          # Read and merge external options

          if configFileStream
            configFileStream.pipe(
              through.obj(
                (file, enc, done) ->
                  options = mergeOptionsFile(file, options)
                  done()
                -> callback()
              )
            )

          else
            callback()

        (callback) ->

          # Trace entry module
          trace(entryModuleName, options, null, defaultLoader(fileBuffer, options), callback)

        (module, callback) ->

          # Flatten modules list
          callback(null, collectModules(module))


        (modules, callback) ->

          # Find excluded modules
          if _.isArray(options.exclude)
            async.map(
              options.exclude
              (moduleName, callback) ->
                trace(moduleName, options, null, defaultLoader(fileBuffer, options), callback)

              (err, excludedModules) ->
                if err
                  callback(err)
                else
                  callback(null, modules, _(excludedModules)
                    .map((module) -> collectModules(module))
                    .flatten()
                    .pluck("name")
                    .unique()
                    .value())
            )
          else
            callback(null, modules, [])



        (modules, excludedModuleNames, callback) ->
          # printTree(module)

          # Remove excluded modules
          modules = _.reject(modules, (module) ->
            return _.contains(excludedModuleNames, module.name) or
            _.contains(options.excludeShallow, module.name)
          )

          # Fix and export all the files in correct order
          exportStream = exportModule(options)
          exportStream
            .on("data", (file) ->
              mainStream.push(file)
            )
            .on("end", -> callback())
            .on("error", callback)

          modules.forEach(exportStream.write.bind(exportStream))
          exportStream.end()

          # Done!

      ], done)

  )

  return mainStream


module.exports.src = (moduleName, options) ->

  source = rjs(moduleName, options)
  process.nextTick -> source.end()
  return source


module.exports.loader = (filenameResolver, pipe) ->

  (moduleName, callback) ->

    # console.log(filenameResolver(moduleName))
    if filenameResolver
      filename = filenameResolver(moduleName)
    else
      filename = moduleName

    source = vinylFs.src(filename).pipe(through.obj())

    if pipe
      source = source.pipe(pipe())

    firstChunk(source, callback)
    return
