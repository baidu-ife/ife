var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var allData = [
"text",
"text1",
"text2",
"text3",
"text12",
"text32",
"text11",
"text2345",
"text1123",
"text555",
"aaa"
]
router.post('/api', function(req, res, next) {
  var name = req.param('sug');
  var result = [];
  var allLength = allData.length;
  for(var i=0;i<allLength;i++){
  	if(allData[i].indexOf(name)>= 0 ){
  		result.push(allData[i]);
  	}
  }
  res.json({
  	data :result
  });
});

module.exports = router;
