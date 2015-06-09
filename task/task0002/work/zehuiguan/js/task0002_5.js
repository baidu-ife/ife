var leftBlock = $(".block-left");
var rightBlock = $(".block-right");

var z = 1;

// 初始化box的初始位置
initBoxPos(leftBlock);
initBoxPos(rightBlock);

function initBoxPos(block) {
    for (var i = 0; i < block.children.length; i++) {
        block.children[i].style.top = 80 * i + "px";
    }
}

$.delegate(".block-left", "div", "mousedown", dragEvent);
$.delegate(".block-right", "div", "mousedown", dragEvent);


function dragEvent(event) {

    var event = event || window.event;
    var target = event.target || event.srcElement;

    var firstMove = true;
    var parent = target.parentNode;

    //鼠标初始位置 
    var startX = event.clientX;
    var startY = event.clientY;

    //box的初始位置(相对位置)
    var origX = target.offsetLeft;
    var origY = target.offsetTop;

    //鼠标距离box左上角的距离
    var deltaX = startX - origX;
    var deltaY = startY - origY; 

    target.style.border = "1px solid #333";
    target.style.opacity = 0.3;

    //zIndex+1
    target.style.zIndex = z++;

    if (document.addEventListener) {
        //添加mousedown发生的mousemove和mouseup事件的handler
        document.addEventListener("mousemove", moveHandler, false);
        document.addEventListener("mouseup", upHandler, false);
    } else {
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);
    }

    function moveHandler(e) {
        if (firstMove) {
            target.parentNode.removeChild(target);
            $(".drag-block").appendChild(target);
            firstMove = false;
        }
        var e = e || window.event;

        //box左上角坐标
        if (parent === leftBlock) {
            var styleLeft = e.clientX - deltaX + $(".block-left").offsetLeft;            
        } else if (parent === rightBlock) {
            var styleLeft = e.clientX - deltaX + $(".block-right").offsetLeft;                
        }
        var styleTop = e.clientY - deltaY + $(".block-left").offsetTop;

        initBoxPos(parent);

        if(outOfScreen(e)){
            target.parentNode.removeChild(target);
            parent.appendChild(target);

            target.style.left = 0 + "px";
        }
        else {
            target.style.left = styleLeft + "px";
            target.style.top = styleTop + "px"; 
        }

    };

    function upHandler(e) {
        if (document.removeEventListener) { // DOM event model
            document.removeEventListener("mouseup", upHandler, false);
            document.removeEventListener("mousemove", moveHandler, false);
        } else {
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
        }

        var e = e || window.event;
        var target = e.target || e.srcElement;

        target.style.border = "none";
        target.style.borderBottom = "1px solid #333";
        target.style.opacity = 1;

        if (BlockArea(e, leftBlock)) {
            leftBlock.appendChild(target);
        } else if (BlockArea(e, rightBlock)) {
            rightBlock.appendChild(target);
        } else {
            parent.appendChild(target);
            console.log(parent, target);      
        }
        target.style.left = 0 + "px";
        initBoxPos(leftBlock);
        initBoxPos(rightBlock);
    }
}

function outOfScreen(e) {
    var maxWidth;
    var maxHeight;

    var l = e.target.offsetLeft;
    var t = e.target.offsetTop;

    if (document.compatMode == "BackCompat") {
        maxWidth = document.body.clientWidth;
        maxHeight = document.body.clientHeight;
    } else {
        maxWidth = document.documentElement.clientWidth;
        maxHeight = document.documentElement.clientHeight;
    }
    return e.clientX <= 0 || e.clientX >= maxWidth || e.clientY <= 0 || e.clientY >= maxHeight;
}

function BlockArea(e, block) {

    var x0 = getPosition(block).x;
    var x1 = getPosition(block).x + block.offsetWidth;
    var y0 = getPosition(block).y;
    var y1 = getPosition(block).y + block.offsetHeight;

    var x = getPosition(e.target).x;
    var y = getPosition(e.target).y;

    return (x > x0 && x < x1 && y > y0 && y < y1) || (e.clientX > x0 && e.clientX < x1 && e.clientY > y0 && e.clientY < y1); 
}