window.onload = function(){
	var timer = null;
	var carousel = function(){//轮播主函数
		var turns = getRadioValueByName("turns"),
			loop = getRadioValueByName("loop"),
			during = $("#during").value || 2,
			divs = $(".img-con").getElementsByTagName("div"),
		    lis = $(".side").getElementsByTagName("li");
		if(divs.length !== lis.length){
			return;
		}
		var len=lis.length,index = 0;
		for(var i = 0;i < len; i++){
			lis[i].id = i;
			lis[i].onmouseover = function(){ //悬挂在小圆点上
				clearInterval(timer);
				changeOption(this.id);
			}
			lis[i].onmouseout = function(){ //移出小圆点
				timer = setInterval(autoPlay,parseInt(during)*1000);
			}
		}
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		timer = setInterval(autoPlay,parseInt(during)*1000);

		function autoPlay(){//自动运行
			if(turns == "left"){ //若为正序
				index++;
				if(index >= len){
					if(loop != "looped"){
						return;
					}
					index = 0;
				}
			}else{ //逆序
				index--;
				if(index < 0){
					if(loop != "looped"){
						return;
					}
					index = len - 1;
				}

			}
			changeOption(index);
		}

		function changeOption(curIndex){  //当前图片为选中图片的操作
			for(var j =0; j < len; j++){
				lis[j].className = "";
				divs[j].style.display = "none";
			}
			lis[curIndex].className = "active";
			divs[curIndex].style.display = "block";
		}
	}
	carousel();
	$("#turns-btn").onclick = function(){
		clearInterval(timer);
		carousel();
	}
	$("#loop-btn").onclick = function(){
		clearInterval(timer);
		carousel();
	}
	$("#dur-btn").onclick = function(){
		clearInterval(timer);
		carousel();
	}
}
//获取不同name下radio的值
function getRadioValueByName(name){
	var its = document.getElementsByName(name);
	if(!its){
		return;
	}
	var len = its.length;
	for(var i=0; i<len;i++){
		if(its[i].checked){
			return its[i].value;
		}
	}
}


