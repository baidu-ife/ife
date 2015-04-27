var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(['name1', 'name2', 'name3']);
});

app.use('/api', router);

app.listen(port);
console.log("Node.js Server is Running on port " + port);