/**
 * @author Administrator
 */
addEvent(window,"load",function(){//写这段程序的时候状态不好，头昏脑胀的，写了一天程序了，
	var oFind=$("#find");   //而且还感冒了，写的乱码七糟的，不过功能也算实现了，写这么恶心，我也不是故意的>.<
	var oMain=$("#main");
	var calHigh=function(){//计算哪个为高亮
		var lis=$("li");
		for(var i=0;i<lis.length;i++){
			if(lis[i].getAttribute("class")=="high"){
				return i;
			}
		}
		return -1;
	};
	var changeHigh=function(index){//将当前索引转为高亮
		var lis=$("li");
		for(var i=0;i<lis.length;i++){
			lis[i].removeAttribute("class");
		}
		if(index>=$("li").length-1){
			index=$("li").length-1;
		}
		if(index<=0){
			index=0;
		}
		lis[index].setAttribute("class","high");
	};
	var changeValue=function(index){
		var lis=$("li");
		if(index>=$("li").length-1){
			index=$("li").length-1;
		}
		if(index<=0){
			index=0;
		}
		oFind.value=lis[index].innerHTML;
		$("#ul").style.display="none";
	};
	addEvent(oFind,"keyup",function(e){
		var val=oFind.value;
		if(e.keyCode==38){//up
			if(calHigh()>=0){
				var num=(calHigh()-1);
				changeHigh(num);
			}
			if(calHigh()==-1){
				if($("#ul")){
					changeHigh($("li").length-1);
				}
			}
		}else if(e.keyCode==40){//down
			if(calHigh()>=0){
				var num=(calHigh()+1);
				changeHigh(num);
			}
			if(calHigh()==-1){
				changeHigh(0);
			}
		}else if(e.keyCode==13){//enter
			if(calHigh()>=0){
				changeValue(calHigh());
			}
		}else{
			ajax("test.jsp",{
				data:{
					find:val
				},
				onsuccess:function(response,xmlhttp){
					//console.log(response);
					if($("#ul")){
						oMain.removeChild($("#ul"));
					}
					var ul=document.createElement("ul");
					ul.setAttribute("id", "ul");
					var results=response.split(",");//假定后台返回逗号分割的字符串
					var lis="";
					for(var i=0;i<results.length-1;i++){
						lis+="<li>"+results[i]+"</li>";
					}
					ul.innerHTML=lis;
					oMain.appendChild(ul);
				},
				onfail:function(response){
					
				}
			});
		}
		
		
	});
	
});