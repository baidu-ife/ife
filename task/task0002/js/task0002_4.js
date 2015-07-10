var suggestData = ['Simon', 'Erik', 'Kener'],
	input = $(".input"),
	prompt = $(".prompt"),
	flag = 0;
	temp = -1;// 按键控制时，储存值

input.focus();

input.addEventListener("keyup", function(event) {
	if(input.value != "" && flag == 0) {
		// 动态添加提示项
		flag = 1;
		prompt.style.border = "1px solid #000";
		for(var i = 0;i < suggestData.length;i++) {
			var subItem = document.createElement("li");
			subItem.innerHTML = suggestData[i];
			subItem.index = i;
			prompt.appendChild(subItem);
			// 使子项可被点击选择
			subItem.addEventListener("click", function() {
				input.value = this.innerHTML;
				clearPrompt();
			});
			// 添加 hover事件
			subItem.addEventListener("mouseover", function() {
				clearClass(prompt);
				temp = this.index;
				setBac(prompt, this);
			});
		}		
	}else if(input.value == "") {
		clearPrompt();
	}else {
		var sub =  prompt.getElementsByTagName("li");
		
		// 根据键值确定选择
		switch(event.keyCode) {
			case 38:	temp = confirmValue(temp - 1);setBac(prompt, sub[temp]);console.log("temp"+temp);break;
			case 40:	temp = confirmValue(temp + 1);setBac(prompt, sub[temp]);console.log("temp:"+temp);break;
			case 13:	input.value =sub[temp].innerHTML;clearPrompt();break;
			deafult:	null;
		}
	}

	// 修改选中子项的背景
	function setBac(parent, sub) {
		clearClass(parent);
		sub.className = "selected";
	}

	// 清空子项的className
	function clearClass(parent) {
		for(var i = 0;i < parent.childNodes.length;i++) {
			parent.childNodes[i].className = "";
		}
	}

	// 确定 值的范围
	function confirmValue(temp) {
		if(temp <= 0) return 0;
		else if(temp >= suggestData.length - 1) return suggestData.length-1;
		else return temp;
	}
	
	// 清空提示
	function clearPrompt() {
		while(prompt.firstChild) {
			prompt.removeChild(prompt.firstChild);
		}
		prompt.style.border = "";
		flag = 0;
		temp = -1;
	}
});

