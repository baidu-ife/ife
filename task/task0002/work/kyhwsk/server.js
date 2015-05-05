/**
 * Created by wsk on 15/4/27.
 * extra need: add form process module
 */
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;

function notFound(res) {
    res.statusCode = 404;
    res.end("Not found");
}
function BadRequest(res) {
    res.statusCode = 400;
    res.end("Bad Request");
}
function showFile(path, res)
{
    fs.stat(path, function(err, stats){
        if(err){
            if(err.code == 'ENOENT'){
                notFound(res);
            }
            res.statusCode = 500;
            res.end("Internal server error");
        }else{
            res.setHeader('Content-Length', stats.size);
            var stream = fs.createReadStream(path);
            stream.pipe(res);

        }
    });
}
function EchoPost(res)
{
    res.end("Echo POST");
}
function processGet(url, res)
{
    var path = '';
    if(url === '/getJSON'){
        path = join(root, '/javascript/resource.json');
    }else {
        path = join(root, url);
    }
        showFile(path, res);

}
var server = http.createServer(function (req, res) {
    var url = parse(req.url);
    console.log(req.url);
        switch (req.method) {
            case 'GET':
                processGet(req.url, res);
                break;

            case 'POST':
                EchoPost(res);
                break;

            default :
                BadRequest(res);
        }
});


server.listen(8888);
