var dragCon = []; //可拖动元素的管理器
var curItem = null; //正在拖动的元素
var itemCopy = null; //拖动元素时展现动态拖动效果的辅助元素，元素的镜像
var isMouseDown = false; //鼠标是否按下
var mouseOffset = null;  //鼠标相对于指定元素的相对位置
var mousePosition = null; //鼠标的位置
var activeCon = null; //拖动元素所在的con容器
var activeItem = null; //被激活的元素（被拖动元素所经过的元素） 

//初始化管理器
function initCon(obj){
	console.log(obj.children.length);
	for(var i=0; i < obj.children.length; i++){
		dragCon.push(obj.children[i]);
	}
}

/*
 * 保存元素的位置信息
 */
function updatePosition(){
    for(var i = 0;i < dragCon.length;i++){
        with(dragCon[i]){
            setAttribute("startLeft",offsetLeft);
            setAttribute("startTop",offsetTop);
            setAttribute("startWidth",offsetWidth);
            setAttribute("startHeight",offsetHeight);
        }
         
        for(var j = 0;j < dragCon[i].children.length;j++){
           with(dragCon[i].children[j]){
                setAttribute("startLeft",offsetLeft);
                setAttribute("startTop",offsetTop);
                setAttribute("startWidth",offsetWidth);
                setAttribute("startHeight",offsetHeight);
           } 
        }
    }
}

//准备移动瞬间（鼠标在对应位置按下时执行）
function startDrag(obj){
	itemCopy.appendChild(obj.cloneNode(true));
	obj.style.opacity  =  "0";
	itemCopy.style.opacity = "0.5";
	itemCopy.style.left = obj.getAttribute("startLeft") +"px";
	itemCopy.style.top = obj.getAttribute("startTop") + "px";
	itemCopy.style.border = "1px solid black";
	itemCopy.style.display = "block";
}

//元素被拖拽时，更改元素的位置
function drag(obj,mousePosition){
	itemCopy.style.left = (mousePosition.x - mouseOffset.x) + "px";
	itemCopy.style.top = (mousePosition.y -mouseOffset.y) +"px";
}

//判断obj1是否在obj2内部
function isIn(obj1,obj2){
	//center是obj1的中点
	var center = {
		x : obj1.offsetLeft + parseInt(obj1.offsetWidth/2),
		y : obj1.offsetTop + parseInt(obj1.offsetHeight/2)
	};
	if(center.x > obj2.offsetLeft && center.y > obj2.offsetTop &&
		center.x < (obj2.offsetLeft + obj2.offsetWidth) && center.y < (obj2.offsetTop+obj2.offsetHeight)){
		return true;
	}else{
		return false;
	}
}

//判断obj1的中点是在obj2之前还是之后
function beforeOrAfter(obj1,obj2){
	var center = {y : obj1.offsetTop + parseInt(obj1.offsetHeight/2)};
	if(center.y < (obj2.offsetTop + parseInt(obj2.offsetHeight/2))){
		return "before";
	}else{
		return "after";
	}
}

//返回下一个兄弟元素节点
function nextElement(node){
	for(var nextNode = node.nextSibling;nextNode;nextNode = nextNode.nextSibling){
		if(nextNode.nodeType == 1){
			return nextNode;
		}
	}
	return null;
}

// 返回上一个兄弟“元素”节点（跳过文本节点），为了应付非ie浏览器将换行符视为文本节点的想象。
function previousElement(node){
    for(var previousNode = node.previousSibling;previousNode;previousNode = previousNode.previousSibling){
        if(previousNode.nodeType == 1){
            return previousNode;
        }
    }
    return null;
}

//鼠标按下事件函数
function mouseDown(event){
	event = event ? event : window.event;
	var target = event.target || window.event.srcElement;
	if(target.className == "drag"){
		curItem = target;
		mouseOffset = getMouseOffset(curItem,event);
		startDrag(curItem);
	}
	isMouseDown = true;
	if(target.className == "drag-con"){
		return false;
	}
	console.log(event.type);
}

//鼠标移动事件函数
function mouseMove(event){
	event = event ? event : window.event;
	activeCon = null;
	activeItem = null;
	updatePosition(); //每次拖放完后，元素的位置可能出现变化，所以要更新
	//开始拖动
	if(isMouseDown && curItem){
		mousePosition = getMouseXY(event);
		drag(curItem,mousePosition);
		//对元素坐标判断，放在适当dragCon
		for(var i = 0; i < dragCon.length;i++){
			if(isIn(itemCopy,dragCon[i])){
				activeCon = dragCon[i];
				break;
			}
		}
		if(activeCon){
			for(var i = 0; i < activeCon.children.length; i++){
				if(curItem != activeCon.children[i] && isIn(itemCopy,activeCon)){
					activeItem = activeCon.children[i];
					break;
				}
			}
		
			//将元素放在合适位置
			if(activeItem){
				if(beforeOrAfter(itemCopy,activeItem) == "before" && !activeItem.previousSibling){
					activeCon.insertBefore(curItem,activeItem);
				}else if(beforeOrAfter(itemCopy,activeItem) == "after" && !nextElement(activeItem)){
					activeCon.insertBefore(curItem,nextElement(activeItem));
				}else{
					activeCon.appendChild(curItem);
				}
			}else{
				activeCon.appendChild(curItem);
			}
		}
	}
}


//鼠标放开事件函数
function mouseUp(event){
	curItem.style.opacity = "1";
	itemCopy.innerHTML = "";
	itemCopy.style.display = "none";
	isMouseDown = false;
}
//鼠标相对于元素左上角的位置
function getMouseOffset(curItem,event){
	event = event ? event : window.event;
	return {x: event.pageX - curItem.offsetLeft,
			y: event.pageY - curItem.offsetTop}
}

//获取鼠标位置
function getMouseXY(event){
	return {x: event.pageX, y: event.pageY};
}

window.onload = function(){
	initCon(document.getElementById("wrapper"));
	itemCopy = document.createElement("div");
	itemCopy.style.cssText = "position: absolute; display: none; zindex: 100;";
	document.body.appendChild(itemCopy);
	$.on(document,"mousedown",mouseDown);
	$.on(document,"mousemove",mouseMove);
	$.on(document,"mouseup",mouseUp);
}