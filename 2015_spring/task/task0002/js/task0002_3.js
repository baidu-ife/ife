var imgList=$(".img-list");
var timer=null;
var interTimer=null;
var activeId=1;
var nexId=null;
var imgWidth=$("img").offsetWidth;
var aArr=$(".circle").getElementsByTagName("a");

for(var i=0;i<aArr.length;i++){
	aArr[i].index=i+1;
	
}
//实现移动到某一个位置
function startMove(target){
	clearInterval(interTimer);
	interTimer=setInterval(function(){
		var speed=(target-imgList.offsetLeft)/6;
		
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		//console.log(speed);
		imgList.style.left=imgList.offsetLeft+speed+"px";
		//console.log(imgList.offsetLeft);
	},30);
}  

//图片移动一次
function rotate(ID){
	if(ID){
		nexId=ID;
	}else{
		nexId=activeId>4?1:activeId+1;
	}
	//aArr[nexId-1].addClass("active");
	addClass(aArr[nexId-1],"active");
	//aArr[activeId-1].removeClass("active");
	removeClass(aArr[activeId-1],"active");
	startMove("-"+(nexId-1)*imgWidth);
	//console.log("-"+(nexId-1)*imgWidth);
	activeId=nexId;
}

timer=setInterval(rotate,3000);

$.delegate(".circle","a","click",function(e){
	clearInterval(timer);
	var clID=this.index;
	console.log(clID);
	rotate(clID);
	
	timer=setInterval(rotate,3000);
});