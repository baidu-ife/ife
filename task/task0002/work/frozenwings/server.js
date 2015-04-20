var http = require('http'),
    parse = require('url').parse,
    join = require('path').join,
    fs = require('fs'),
    util = require('util');

var root = __dirname;

var getFile = function(path,req,res){
    util.log('Requested path:' + path);        
    fs.stat(path,function(err,stat){
        if(err){
            if('ENOENT' == err.code){
                res.statusCode = 404;
                res.end('文件不存在');
            }else{
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }else{
            var stream = fs.createReadStream(path);
            res.setHeader('Content-Length',stat.size);
            stream.pipe(res);
            stream.on('error',function(err){
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        }
    });  
}

var server = http.createServer(function(req,res){
    var urlObject = parse(req.url);
    var path;
    if(req.url === '/getNames'){
        path = join(root,'names.json');
    }
    else{
        path = join(root,urlObject.pathname);           
    }    
    getFile(path,req,res);
});
server.listen(8000);
util.log('Server running on 8000.');