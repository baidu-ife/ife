$.click('#clk button',function(){
	var to = $('#clk input').value;
	var now = new Date();
    var inew = new Date(2015,5,2,18,35,20);
    console.log(now);
    console.log(inew-now);
});