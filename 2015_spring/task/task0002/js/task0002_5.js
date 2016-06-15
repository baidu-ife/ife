var leftDiv=$(".left");
var rightDiv=$(".right");
var rightBlockX=rightDiv.offsetLeft;
var z=1;

//初始化
init();

function init(){
	//初始化左右两个方块
	positionBlock(leftDiv);
	positionBlock(rightDiv);
	
	//鼠标拖拽事件
	delegateEvent(leftDiv,"div","mousedown",drag);
	delegateEvent(rightDiv,"div","mousedown",drag);
}


/*
 * 初始化左右方块的位置
 */
function positionBlock(div){
	for(var i=0;i<div.children.length;i++){
		div.children[i].style.top=1+60*i+"px";
	}
}

function drag(e){
	var ev=e||window.event;
	var target=ev.target||ev.srcElement;
	if(target.className.toLowerCase()!="move"){
		return;
	}
	var disX=ev.clientX;
	var disY=ev.clientY;
	//方块的位置
	var divPositionLeft=target.offsetLeft;
	var divPositionTop=target.offsetTop;
	//方块的状态
	target.style.opacity=0.5;
	target.style.border="1px solid black";
	
	//zindex++
	target.style.zindex=z++;
	
	var parent=target.parentNode;
	var firstMove=true;
	//鼠标移动
	document.onmousemove=function(e){
		if(firstMove){
			target.parentNode.removeChild(target);
			$(".drag-block").appendChild(target);
		}
		firstMove=false;
		var ev=e||window.event;
		if(isOverScreen(ev)){
			target.parentNode.removeChild(target);
			parent.appendChild(target);
			if(parent.className.search("left")!=-1){
				target.style.left= 1+"px";
			}else if(parent.className.search("right")!=-1){
				target.style.left=1+rightBlockX+"px";
			}
			positionBlock(target.parentNode);
			document.onmousemove=null;
		}else{
			target.style.left=ev.clientX+divPositionLeft-disX+"px";
			target.style.top=ev.clientY+divPositionTop-disY+"px";
			positionBlock(parent);
		}
		
	}
	//鼠标抬起
	document.onmouseup=function(e){
		document.onmousemove=null;
		document.onmouseup=null;
		var ev=e||window.event;
		target.style.opacity=1;
		target.style.border="none";
		target.style.borderBottom="1px solid black";		
		target.parentNode.removeChild(target);
		if(judgePosition(ev,leftDiv)){
			leftDiv.appendChild(target);
			target.style.left=1+"px";
			positionBlock(leftDiv);
		}else if(judgePosition(ev,rightDiv)){
			rightDiv.appendChild(target);
			target.style.left=1+rightBlockX+"px";
			positionBlock(rightDiv);
		}else{
			parent.appendChild(target);
			if(parent.className.search("left")!=-1){
				target.style.left= 1+"px";
			}else if(parent.className.search("right")!=-1){
				target.style.left=1+rightBlockX+"px";
			}
			positionBlock(parent);
		}
		
	}
	
}

//判断拖拽方块是否出界
function isOverScreen(ev){
	var maxW=document.documentElement.clientWidth||document.body.clientWidth;
	var maxH=document.documentElement.clientHeight||document.body.clientHeight;
	return  ev.clientX<0||ev.clientX>maxW||ev.clientY<0||ev.clientY>maxH;
}


//判断拖拽的方块是否在左右两个Div内
function judgePosition(ev,block){
	var x0=getPosition(block).x;
	var x1=getPosition(block).x+block.offsetWidth;
	var y0=getPosition(block).y;
	var y1=getPosition(block).y+block.offsetHeight;
	return ev.clientX>x0&&ev.clientX<x1&&ev.clientY>y0&&ev.clientY<y1;
}

