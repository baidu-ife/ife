//2015年5月7日
//图片轮播
window.onload = function(){
	var container = document.getElementById("container");
	var list = document.getElementById("list");
	var buttons = document.getElementById("buttons").getElementsByTagName("span");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1;
	var animated = false;
	var timer;

	function showButton(){
		for(var i = 0;i<buttons.length;i++){
			if(buttons[i].className == "on"){
				buttons[i].className = "";
				break;
			}
		}

		buttons[index - 1].className = "on";
	}
	function animate(offset){
		animated = true;
		var newLeft = parseInt(list.style.left) + offset;
		var time = 500;//位移总时间
		var interval = 10; //位移间隔时间
		var speed = offset/(time/interval);//每次位移量

		function go(){
			if((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)){
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go,interval);
			}
			else{
				animated = false;
				list.style.left = newLeft +"px";
	     		if(newLeft > -520){
					list.style.left = -2600 + "px";
				}
				if(newLeft < -2600){
					list.style.left = -520 + "px";
				}
			}
		}
		go();
	}

	function play(){
		timer = setInterval(function(){
			next.onclick();
		},3000);
	}
	function stop(){
		clearInterval(timer);
	}

	next.onclick = function(){
		if(index == 5){
			index = 1;
		}
		else{
			index = index + 1;
		}
		showButton();
		
		if(animated == false){
			animate(-520);
		}
	}
	prev.onclick = function(){
		if(index == 1){
			index = 5;
		}
		else{
			index = index - 1;
		}
		showButton();
		if(animated == false){
			animate(520);
		}
	}

	for(var i = 0;i < buttons.length;i++){
		buttons[i].onclick = function(){
			if(this.className == "on"){
				return;
			}
			var myIndex = parseInt(this.getAttribute("index"));
			var offset = -520 * (myIndex - index);
			index = myIndex;
			showButton();
			if(animated == false){
				animate(offset);
			}	
		}
	}

	container.onmouseover = stop;
	container.onmouseout = play;
	play();
}