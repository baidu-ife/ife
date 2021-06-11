// JavaScript Document
function getE(str){
	switch(str[0]){
	case "#":
		return document.getElementById(str.slice(1));
	case ".":
		return document.getElementsByClassName(str.slice(1));
	default: return;
	}
}
//alert(getE(".redbox"));
//鼠标点在某个红色模块上
var mouseOffsetX = 0;
var mouseOffsetY = 0;
var isDragging = false;
var OriginalX =  0;
var OriginalY =  0;
var OriginalID = "";



function Mousedown(selector){
	if(isDragging == false){
		if(selector.addEventListener){
			selector.addEventListener('mousedown',mousedown,false)
		}
		else if(selector.attachEvent){
			selector.attachEvent('onmousedown',mousedown)
		}
		else{
			selector['mousedown']=mousedown;
		}
	}
	function mousedown(ev){
		OriginalID = selector;
		selector.id="redbox";
		var ev = ev || winddow.event;
		OriginalX =  ev.pageX;
		OriginalY =  ev.pageY;
		mouseOffsetX = OriginalX - getE("#redbox").offsetLeft;
		mouseOffsetY = OriginalY - getE("#redbox").offsetTop;
		getE("#redbox").style.position= "absolute";
		isDragging = true;
	}
}

//鼠标移动
document.onmousemove = function(ev){
	var ev = ev || window.event;
	var mouseX =  ev.pageX;
	var mouseY =  ev.pageY;
	
	var moveX = 0;
	var moveY = 0;
	
	if(isDragging == true){
		moveX = mouseX - mouseOffsetX;
		moveY = mouseY - mouseOffsetY;
		
		console.log(isDragging);
		
		getE("#redbox").style.left= moveX +"px";
		getE("#redbox").style.top = moveY +"px";
	}
}
	
//鼠标松开
document.onmouseup = function(ev){
	var ev = ev || winddow.event;
	
	if(isDragging == true){
		if((ev.pageX-mouseOffsetX)> 150){
			if(getE("#redbox").parentNode.id=="col1"){
				var temp=getE("#redbox");
				getE("#col1").removeChild(temp);
				getE("#col2").appendChild(temp);
			}
			getE("#redbox").style.position="static";
			getE("#redbox").style.float= "left";
			getE("#redbox").style.left= 0;
			getE("#redbox").style.top= 0;
			getE("#redbox").id=OriginalID;
		}
		else{
			if(getE("#redbox").parentNode.id=="col2"){
				var temp=getE("#redbox");
				getE("#col2").removeChild(temp);
				getE("#col1").appendChild(temp);
			}
			getE("#redbox").style.position="static";
			getE("#redbox").style.float= "left";
			getE("#redbox").style.left= 0;
			getE("#redbox").style.top= 0;
			getE("#redbox").id=OriginalID;
		}
	}
	isDragging = false;
}

window.onload = function(){
	Mousedown(getE("#b1"));
	Mousedown(getE("#b2"));
	Mousedown(getE("#b3"));
	Mousedown(getE("#b4"));
}