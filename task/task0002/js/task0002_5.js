var leftDiv = $(".leftDiv"),
	rightDiv = $(".rightDiv"),
	num = 4,	// 初始每个父容器中div个数
	childHeight = 52,// 子节点高度
	dragDistance = 200,// 拖动距离
	leftList = leftDiv.getElementsByTagName("div"),
	rightList = rightDiv.getElementsByTagName("div");

// 为两个父容器创建num个子节点
createChild(leftDiv, num);
createChild(rightDiv, num);

// 为element创建拖动的具体方法
function createEvent(element) {
	var div = element.parentNode;
	var list = element.parentNode.childNodes;
	var left = 0,
		top = 0,
		dragSquare = null;

	addEvent(element, "mousedown", function(event) {
		dragSquare = this;
		dragSquare.style.zIndex = 100;
		this.className = "selected";
	});

	addEvent(element, "mousemove", function(event) {
		if(dragSquare) {
			// 鼠标移动，改变element的left和top
			dragSquare.style.left = event.clientX - div.offsetLeft - dragSquare.offsetWidth / 2;
			dragSquare.style.top = event.clientY - div.offsetTop - dragSquare.offsetHeight / 2;
			// 字符串转义为数字
			left = parseInt(dragSquare.style.left);
			top = parseInt(dragSquare.style.top);
		}			
	});

	addEvent(element, "mouseup", function(event) {
		this.className = "";
		dragSquare.style.zIndex = 1;

		// 判断界限
		if(div.className == "leftDiv") {
			if(left > dragDistance) {
				console.log("flag");
				removeChild(div, list, dragSquare.index);				
				addChild(rightDiv);
			}else {
				dragSquare.style.left = 0;
				dragSquare.style.top = childHeight * dragSquare.index;
			}
		}else {
			if(left < dragDistance) {
				removeChild(div, list, dragSquare.index);
				addChild(leftDiv);
			} else {
				dragSquare.style.left = 0;
				dragSquare.style.top = childHeight * dragSquare.index;
			}
		}

		dragSquare = null;		
	});
}	


// 创建子节点
function createChild(father, num) {
	for(var i = 0;i < num;i++) {
		var child = document.createElement("div");
		child.style.top = childHeight * i;
		child.index = i;
		father.appendChild(child);
		createEvent(child);
	}
}

// 删除子节点
function removeChild(div, list, index) {
	for(var i = index + 1;i < list.length;i++) {
		list[i].index -= 1;
		list[i].style.top = childHeight * (i - 1);
	}
	div.removeChild(list[index]);
}

// 添加子节点
function addChild(div) {
	var child = document.createElement("div");
	child.style.top = childHeight * div.childNodes.length;
	child.index = div.childNodes.length;
	div.appendChild(child);
	createEvent(child);
}


