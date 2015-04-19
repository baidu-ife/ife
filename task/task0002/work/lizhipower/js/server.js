/**
 * Created by Zhi_LI on 2015/4/19.
 */
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');