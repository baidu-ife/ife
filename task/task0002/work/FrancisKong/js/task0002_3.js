var max=3;
var isClick=false;	//判断是否点击以清除现有的计时器
var t;
//实现图片切换 传入偏移量
function animate(offest) {
	var btns=document.getElementsByTagName("li");
	for(var i=0;i<btns.length;i++){
				btns[i].className="";
	}
	btns[Math.abs(offest/600)].className="on";
	var slide=document.getElementById("slide-img");
	var time=300;		//切换时间
	var interval=10;	//间隔时间
	var speed=offest/(time/interval);	//切换偏移量
	function go() {
		if((speed<0&&parseInt(slide.style.left)>offest)||(speed>0&&parseInt(slide.style.left)<offest)){
			slide.style.left=parseInt(slide.style.left)+speed+"px";
			setTimeout(go, interval);
		}
		else{
			slide.style.left=offest+"px";
		}
	}
	go();
}
function init(){
	var len=document.getElementsByTagName("img").length;
	var str="";
	//根据图片数量自动生成按钮
	for(var i=0;i<len;i++){
		str+="<li index="+i+"></li>";
	}
	var btn=document.getElementById("slide-btn");
	btn.innerHTML=str;
	play(0);
	//使用事件代理为所有按钮添加事件
	btn.addEventListener("click",function (e) {
		if(e.target&&e.target.tagName == "LI"){
			var index=parseInt(e.target.getAttribute("index"));
			isClick=true;
			play(index);
		}
	});
}
//自动播放 传入按钮的位置
function play(index) {
	if(index>=max){
		index=0;
	}
	if(isClick){
		clearTimeout(t);
		isClick=false;
	}
	animate(index*-600);
	index+=1;
	t=setTimeout("play("+index+")", 5000);
}
init();

