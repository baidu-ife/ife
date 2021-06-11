// JavaScript Document
function $(str){
	if(/^[a-z]{1,10}$/.test(str)){
		return document.getElementsByTagName(str); 
		}
	else{
		switch(str[0]){
		case "#":
			return document.getElementById(str.slice(1));
		case ".":
			return document.getElementsByClassName(str.slice(1));
		default: return;
		}
	}
}

var picindex = 0;
var auot = true;
var directleft = true;

window.onload = function(){
	var index = 0;
	var auto = true;
	var directleft = true;
	var slide = $('#slide');
	var imgs = $('#imgs');
	var btns = $('a');
	var timer;
	
	function animate(offset){
		var newleft = parseInt(imgs.style.left)+offset;
		var time = 300;
		var Interval = 20;
		var speed = offset/(time/Interval);
		
		function go(){
			if((speed<0 && parseInt(imgs.style.left)>newleft)||(speed>0 && parseInt(imgs.style.left)<newleft)){
				imgs.style.left = parseInt(imgs.style.left) + speed + 'px';
				setTimeout(go,Interval);
			}
			else{
				imgs.style.left = newleft +'px';
				if(newleft>-600){
					imgs.style.left = -3600 + 'px';
				}
				if(newleft<-3600){
					imgs.style.left = -600 + 'px';
				}
			}
		}
		go();
		
	}
	
	function play(){
		timer = setInterval(function(){
			if( directleft == true){
				if(index==5) index=0;
				else index+=1;
				showbotton();
				animate(-600);
			}
			else{
				if(index==0) index=5;
				else index-=1;
				showbotton();
				animate(600);
			}
		},3000)
	}
	function stopplay(){
		clearInterval(timer);
	}
	function showbotton(){
		for(var i=0;i<btns.length;i++){
			if(btns[i].className=='on'){
				btns[i].className = '';
				break;
			}
		}
		btns[index].className = 'on';
	}
	
	for(var i=0;i<btns.length;i++){
		btns[i].onclick = function(){
			if(this.className=='on')
				return;
			auto = false;
			var myIndex = parseInt(this.getAttribute('index'));
			var move = -600*(myIndex-index);
			index = myIndex;
			animate(move);
			showbotton();
			auto = true;
		}
	}
	$("#left").onclick = function(){
		auto = false;
		directleft = true;
		auto = true;
	}
	$("#right").onclick = function(){
		auto = false;
		directleft = false;
		auto = true;
	}
	
	if(auto==true) play();
	else {console.log(auto);stopplay();}
}

