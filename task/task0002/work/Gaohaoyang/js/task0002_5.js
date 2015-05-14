// 实现一个可拖拽交互的界面
// 如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
// 被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
// 注意拖拽释放后，要添加到准确的位置
// 拖拽到什么位置认为是可以添加到新容器的规则自己定
// 注意交互中良好的用户体验和使用引导


// var relatX = 0;
// var relatY = 0;
var oLeftBlock = $(".left-block");
var oRightBlock = $(".right-block");

var rightBlockX = oRightBlock.offsetLeft;

var z = 1;

init(); //初始化

function init() {

    //将左右的方块定位
    initPosition(oLeftBlock);
    initPosition(oRightBlock);

    //事件代理，给两列中的div添加拖拽事件
    $.delegate(".left-block", "div", "mousedown", drag);
    $.delegate(".right-block", "div", "mousedown", drag);
}

/**
 * 初始化方块位置
 * @param  {element} element 容器元素
 * @param {number} dragAreaTop 容器top
 * @param {String} leftOrRight 左边或右边
 */
function initPosition(block) {
    for (var i = 0; i < block.children.length; i++) {
        block.children[i].style.top = 60 * i + 1 + "px";
    }
}

/**
 * 拖拽方法
 */
function drag(e) {
    var ev = e || window.event;
    var target = ev.target || ev.srcElement;
    if (target.className.toLowerCase() != "move") {
        return;
    }

    //记录鼠标位置
    var disX = ev.clientX;
    var disY = ev.clientY;

    // 当前方块的位置
    var divLeft = target.offsetLeft;
    var divTop = target.offsetTop;

    //addClass
    // addClass(target, "active");
    target.style.border = "1px solid #333";
    target.style.opacity = 0.5;

    //zIndex+1
    target.style.zIndex = z++;


    var parent = target.parentNode;
    var firstMove = true;

    //鼠标移动
    document.onmousemove = function(e) {
        if (firstMove) {
            parent.removeChild(target);
            $(".drag-block").appendChild(target);
        }
        firstMove = false;
        var ev = e || window.event;

        if (outOfSreen(ev.clientX, ev.clientY, ev)) {
            target.parentNode.removeChild(target);
            parent.appendChild(target);
            if (parent.className.search("left-block") != -1) {
                target.style.left = 1 + "px";
            } else if (parent.className.search("right-block") != -1) {
                target.style.left = rightBlockX + 1 + "px";
            }
            initPosition(parent);
            document.onmousemove = null;
        } else {
            //move
            target.style.left = divLeft + ev.clientX - disX + "px";
            target.style.top = divTop + ev.clientY - disY + "px";
            //refresh block
            initPosition(parent);
        }



    };
    //鼠标抬起
    document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
        // removeClass(target, "active");
        target.style.border = "none";
        target.style.borderBottom = "1px solid #333";
        target.style.opacity = 1;

        var ev = e || window.event;
        target.parentNode.removeChild(target);
        if (judgeInBlock(ev.clientX, ev.clientY, oLeftBlock)) {
            oLeftBlock.appendChild(target);
            target.style.left = 1 + "px";
            initPosition(oLeftBlock);
        } else if (judgeInBlock(ev.clientX, ev.clientY, oRightBlock)) {
            oRightBlock.appendChild(target);
            target.style.left = rightBlockX + 1 + "px";
            initPosition(oRightBlock);
        } else {
            parent.appendChild(target);
            if (parent.className.search("left-block") != -1) {
                target.style.left = 1 + "px";
            } else if (parent.className.search("right-block") != -1) {
                target.style.left = rightBlockX + 1 + "px";
            }
            initPosition(parent);
        }
        // initPosition(target);
    };
    return false;
}

/**
 * 判断是否移出屏幕
 * @param  {number} x 坐标
 * @param  {number} y 坐标
 * @return {boolean}   是否在屏幕外
 */
function outOfSreen(x, y, e) {
    var maxW = document.documentElement.clientWidth;
    var maxH = document.documentElement.clientHeight;
    return e.clientX <= 0 || e.clientX >= maxW || e.clientY <= 0 || e.clientY >= maxH;
}

/**
 * 判断是否在区域内
 * @param  {Number} x     当前鼠标位置
 * @param  {Number} y     当前鼠标位置
 * @param  {Element} block 容器元素
 * @return {boolean}       是否在容器内
 */
function judgeInBlock(x, y, block) {
    var x0 = getPosition(block).x;
    var x1 = getPosition(block).x + block.offsetWidth;
    var y0 = getPosition(block).y;
    var y1 = getPosition(block).y + block.offsetHeight;
    return x > x0 && x < x1 && y > y0 && y < y1; 
}