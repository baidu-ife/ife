
//初始值定义及函数封装

var startX,startY,block,startLeft,startTop;//定义鼠标坐标，拖动的滑块及其坐标
var wrap = document.getElementsByClassName('drag-wrap');//容器


function dragCenter(event){  //中心点位置
	var center = [];
	var moveX = event.clientX - startX;
	var moveY = event.clientY - startY;
	center[0] = startLeft + moveX;
	center[1] = startTop + moveY;
	return center;
}
function getLocation(x,y){  //获取坐标
	var location = [];
	if(x<230){
		location[0] = 0;
	}else if(x>=230 && x<=700){
		location[0] = 1;
	}else{
		location[0] = 2;
	}
	location[1] = Math.floor((y+20)/40);
	var blockIndex = wrap[location[0]].getElementsByClassName("drag").length;
	location[1] = Math.max(location[1],0);
	location[1] = Math.min(location[1],blockIndex);
	return location;
}
function nextBlock(ele){   //找到下一个块
	var next=ele.nextSibling;
	while(next&&next.nodeName==="#text"){
		next = nextBlock(next);
	}
	return next;
}
function doMove(ele,distance){  //将某个快及其之后的每个快纵向移动distance
	while(ele){
		ele.style.top = parseInt(ele.style.top)+distance+'px';
		ele=nextBlock(ele);
	}
}
//拖拽函数正体
(function(){
	var wrapLeft = $('#work-space').offsetLeft;
	var drag = document.getElementsByClassName('drag');

	for (var i = 0, len = drag.length; i < len; i++) {
        drag[i].draggable = true;
        drag[i].style.top = (i % 6 * 41) + 'px';

        drag[i].addEventListener('dragstart', function (e) {         // 开始拖动
            e = e || window.event;
            block = e.target;
            var parent = this.parentNode;
            startX = e.clientX;                                      // 记录鼠标位置
            startY = e.clientY;
            startTop = parseInt(this.style.top) + 20;                // 滑块中心相对容器的位置
            startLeft = parent.offsetLeft - wrapLeft + 75;
            this.style.zIndex = 1;
            this.className = '';
            doMove(nextBlock(this), -41);                                     // 下面的滑块上移41个像素
        });
        drag[i].addEventListener('drag', function (e) {              // 拖动中，使滑块在原容器中消失
            this.style.top = '-1000px';
            this.style.left = '-1000px';
        });
    }
    document.body.addEventListener('dragover', function (e) {        // 拖动中，避免浏览器对容器的默认处理（默认无法将数据/元素放置到其他元素中）
        e.preventDefault();
    });

    document.body.addEventListener('drop', function (e) {            // 拖动结束，将滑块加到新容器
        e = e || window.event;
        e.preventDefault();                                          // 避免浏览器对容器的默认处理（默认以链接形式打开）
        var center = dragCenter(e);                                  // 滑块中心位置
        var location = getLocation(center[0], center[1]);            // 滑块降落的位置
        var myWrap = wrap[location[0]];
        var myDrag = myWrap.getElementsByClassName('drag')[location[1]];
        if (myDrag) {
            var myTop = myDrag.style.top;
        }
        else {                                                       // 兼容滑块放到最下面的情况
            var myTop = parseInt(myWrap.getElementsByClassName('drag')[location[1] - 1].style.top) + 41 + 'px';
        }
        doMove(myDrag, 41);
        block.style.top = myTop;
        block.style.left = 0;
        block.style.zIndex = 0;
        block.className = 'drag';

        myWrap.insertBefore(block, myDrag);

    });

})();