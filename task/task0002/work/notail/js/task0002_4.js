var ipt = $("#in");
$.on(ipt,"keyup",function(event){
	if(!ipt.value){
		return;
	}
	event = event || window.event;
	var ul = $(".sug-ul");
	var options = {
		data: {input: ipt.value},
		onsuccess: function(responseText,xhr){
			var data = JSON.parse(responseText);
			var len = data.length,flag = 0;
			if(!event){
				return;
			}
			if(event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13){
				clearUl();
				flag = 1;
				for(i = 0; i < len; i++){
					var li = document.createElement("li");
					li.innerHTML = data[i];
					li.index = i;
					ul.appendChild(li);
					//添加点击事件
					li.addEventListener("click",function(){
						ipt.value = this.innerHTML;
						clearUl();
					});
					//添加mouseover
					li.addEventListener("mouseover",function(){
						temp = this.index;
						selectLi(ul,this);
					})
				}
				sug.style.display = "block";
			}else{
				//按键
				switch(event.keyCode) {
					case 38: //up
						if($("li.select")){
							var preLi = $("li.select").previousSibling;
							if(preLi){
								selectLi(ul,preLi);
							}
						}else{
							var firstLi = ul.firstChild;
							firstLi && selectLi(ul,firstLi);
						}
						break;
					case 40: //down
						if($("li.select")){
							var nextLi = $("li.select").nextSibling;
							if(nextLi){
								selectLi(ul,nextLi);
							}
						}else{
							var firstLi = ul.firstChild;
							firstLi && selectLi(ul,firstLi);
						}
						break;
					case 13: //enter
						ipt.value = $("li.select").innerHTML;
						clearUl();
						break;
				}
			}
			//清除类名
			function clearClass(ul){
				for(var i=0;i<ul.childNodes.length;i++){
					ul.childNodes[i].className = "";
				}
			}
			//选中li
			function selectLi(ul,li){
				clearClass(ul);
				li.className = "select";
			}

			//清空sug-ul
			function clearUl(){
				while(ul.firstChild){
					ul.removeChild(ul.firstChild);
				}
				flag = 0;
				$("#sug").style.display = "none";
			}

		}
	};
	ajax("suggest.php",options);
});
