(function() {
	var picture_template = "<div class=\"gallery-picture\" order=\"{{order}}\" style=\"background:url({{url}});\"></div>";
	//var all_picture = [];
	var _options = {};
	var _width,_height,total;
	var now_picture = 0;
	function init(options) {
		_options = options; 
		_width = parseInt(options.width.replace(/px/,""));
		_height = parseInt(options.height.replace(/px/,""));
		total = options.picture.length;
		$("#gallery").style.width = options.width;
		$("#gallery").style.height = options.height;
		$("#gallery").innerHTML = "";
		for(var i = 0; i < total ; i++){
			$("#gallery").innerHTML = $("#gallery").innerHTML + picture_template.replace(/{{url}}/,options.picture[i]).replace(/{{order}}/,i.toString());
			$("[order=" + i.toString() +"]").style.left = (i*_width).toString() + "px";
			//all_picture.push($("[order=" + i.toString() +"]"));
		}
	}

	function gotoFirst(){
		for(var i = 0; i <total ; i++){
				$("[order=" + i.toString() +"]").style.left = (i*_width).toString() + "px";
		}
		now_picture = 0;
	}

	function gotoLast(){
		for(var i = 0; i <total ; i++){
				$("[order=" + i.toString() +"]").style.left = ((i-total+1)*_width).toString() + "px";
		}
		now_picture = total - 1;
	}



	function turnLeft(){
		now_picture++;
		if(now_picture<total){
			for(var i = 0; i <total ; i++){
				$("[order=" + i.toString() +"]").style.left = (parseInt($("[order=" + i.toString() +"]").style.left.replace(/px/,"")) - _width).toString() + "px";
			}
		}
		if(now_picture == total && _options.loop){
			gotoFirst();
		}
		
		//all_picture[0].style.display = "none";
		// each(all_picture,function(item,index){
		// 	item.style.left = (parseInt(item.style.left.replace(/px/,"")) - parseInt(_options.width.replace(/px/,""))).toString() + "px";
		// })
	console.log(now_picture);
	}

	function turnRight(){
		now_picture--;
		if(now_picture>=0){
			for(var i = 0; i < _options.picture.length ; i++){
				$("[order=" + i.toString() +"]").style.left = (parseInt($("[order=" + i.toString() +"]").style.left.replace(/px/,"")) + _width).toString() + "px";
			}
		}
		if(now_picture == -1 && _options.loop){
			gotoLast();
		}
	}


	function go(x){
		var step = now_picture - x;
		console.log(step);
		if(step<0){
			for(var i = 0 ; i < Math.abs(step) ; i++){
				gallery.turnLeft();
			}
		}else{
			for(var i = 0 ; i < step ; i++){
				gallery.turnRight();
			}
		}
	}

	function auto(){
		if(_options.backwards){
			setInterval(function(){
				turnRight();
			},_options.timeout)
		}else{
			setInterval(function(){
				turnLeft();
			},_options.timeout)
		}
	}

	gallery = {
		init : init,
		turnRight : turnRight,
		turnLeft : turnLeft,
		auto : auto,
		go : go
	}
	window.gallery = gallery;
})()





gallery.init({
	width:"800px",
	height:"600px",
	picture:["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"],
	loop:true,
	timeout:2000,
	backwards:true
})
gallery.auto();



