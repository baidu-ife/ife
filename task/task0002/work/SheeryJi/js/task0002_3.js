/**
 * @author Administrator
 */
addEvent(window,"load",function(){
	var imgNum=$("#contain .imgs").length;
	var main=$("#main");
	var contain=$("#contain");
	var listul=document.createElement("ul");
	listul.setAttribute("id","listul");
	var listlis="";
	for(var i=0;i<imgNum;i++){
		listlis+="<li class='list'></li>";
	}
	//console.log(contain.style.left);
	listul.innerHTML=listlis;
	main.appendChild(listul);
	var listli=$("li");
	var playImg=function(order,isLoop){//order boolean型true正序,time时间单位为毫秒
		var now=0;
		if(order==true){
			if(contain.style.left.replace("px","")*1<-5120){
				if(isLoop==true){
					jumpImg(true,5);
				}
				return;
			}
		}else{
			if(contain.style.left.replace("px","")*1>-1280){
				if(isLoop==true){
					jumpImg(false,5);
				}
				return;
			}
		}
		for(var i=0;i<500;i=i+25){
			(function(index){
				setTimeout(function(){
					var left=contain.style.left.replace("px","")*1;
					if(order==true){
						left-=(32000/500);
					}else{
						left+=(32000/500);
					}
					contain.style.left=left+"px";
					var num=Math.ceil(-(left/1280));
						for(var p=0;p<listli.length;p++){
							listli[p].setAttribute("class","list");	
						}
						listli[num].setAttribute("class","list_high");	
					//console.log(contain.style.left);
				},i);
			})(i);
		}
	};
	var jumpImg=function(order,number){
		for(var i=0;i<500;i=i+25){
			(function(index){
				setTimeout(function(){
					var left=contain.style.left.replace("px","")*1;
					if(order==false){
						left-=((32000*number)/500);	
					}else{
						left+=((32000*number)/500);
					}
					contain.style.left=left+"px";
					//console.log(contain.style.left);
					var num=Math.ceil(-(left/1280));
					for(var p=0;p<listli.length;p++){
						listli[p].setAttribute("class","list");	
					}
					listli[num].setAttribute("class","list_high");	
				},i);
			})(i);
	   }
	};
	for(var p=0;p<listli.length;p++){
			(function(index){
				addClickEvent(listli[index],function(){
				var left=contain.style.left.replace("px","")*1;
				var num=Math.ceil(-(left/1280));
				var order =true;
				if(index>num){
					num=index-num;
					order=false;
					jumpImg(order,num);
				}else if(num>index){
					num=num-index;
					order=true;
					jumpImg(order,num);
				}
				//console.log(index+"//"+num);
				
				});
			
			})(p);
		}
	var startPlay=function(order,isLoop,time){//最终函数
		if(order==false){
			var left=contain.style.left.replace("px","")*1;
            left=-6400;
			contain.style.left=left+"px";
			listli[5].setAttribute("class","list_high");	
		}else{
			listli[0].setAttribute("class","list_high");	
		}
		window.timer=setInterval(function(){
			playImg(order,isLoop);
		},time);
	};
	startPlay(true,true,3000);
	
});