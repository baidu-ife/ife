var leftBox = document.getElementById("left-box");
var rightBox = document.getElementById("right-box");
var drag;
var distLeft = 0;
var distTop = 0;
var isDraging = false;
//开始拖动
function startDrag(container) {
	container.addEventListener("mousedown", function (e) {		//添加mousedown事件
		if (e.target && e.target.className == "box") {
			drag = e.target;
			isDraging = true;
			drag.style.opacity = 0.4;
			drag.style.cursor = "move";
			distLeft = e.clientX - drag.offsetLeft;			//计算鼠标横坐标与元素左边的距离
			distTop = e.clientY - drag.offsetTop;			//计算鼠标纵坐标与元素顶部的距离
		}
	});
}
//绑定事件
function eventBind() {
	document.onmousemove = function (e) {		// 添加onmousemove 事件
		if (isDraging && drag) {
			drag.style.left = e.clientX - distLeft + "px";
			drag.style.top = e.clientY - distTop + "px";
		}
    };
	document.onmouseup = function (e) {		//添加onmouseup事件
		if (isDraging) {
			isDraging = false;
			drag.style.cursor = "pointer";
			drag.style.opacity = 1;
			setPosition(e);
		}
	};

}
//初始化box的top值
function initbox(container) {
	var boxs = container.getElementsByClassName("box");
	for (var i = 0; i < boxs.length; i++) {
		boxs[i].style.top = 50 * i + "px";
		boxs[i].style.left = 0 + "px";
	}
}
//设置mouseup后的box位置
function setPosition(e) {
	//判断拖动对象是否在右边的框内
	var parent=drag.parentElement;			//获取拖动对象的父元素
	if ((e.clientX > rightBox.offsetLeft && e.clientX < (rightBox.offsetLeft + rightBox.offsetWidth)) && (e.clientY > rightBox.offsetTop && e.clientY < (rightBox.offsetTop + rightBox.offsetHeight))) {
		parent.removeChild(drag);
		rightBox.appendChild(drag);
		initbox(leftBox);
		initbox(rightBox);
	}
	//判断拖动对象是否在左边的框内
	else if ((e.clientX > leftBox.offsetLeft && e.clientX < (leftBox.offsetLeft + leftBox.offsetWidth)) && (e.clientY > leftBox.offsetTop && e.clientY < (leftBox.offsetTop + leftBox.offsetHeight))) {
		parent.removeChild(drag);
		leftBox.appendChild(drag);
		initbox(leftBox);
		initbox(rightBox)
	}
	else{
		initbox(parent);
	}
}
function init() {
	initbox(leftBox);
	initbox(rightBox);
	startDrag(leftBox);
	startDrag(rightBox);
	eventBind();
}
init();