// 实现一个可拖拽交互的界面
// 如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
// 被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
// 注意拖拽释放后，要添加到准确的位置
// 拖拽到什么位置认为是可以添加到新容器的规则自己定
// 注意交互中良好的用户体验和使用引导


var relatX = 0;
var relatY = 0;
var oLeftBlock = $(".left-block");
var oRightBlock = $(".right-block");

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
function drag(ev) {
    console.log("111");
    console.log(this);
    var oDiv = ev.target || ev.srcElement;
    var oEvent = ev || event;

    addClass(oDiv, "active");
    oDiv.style.zIndex = 100;

    relatX = oEvent.clientX - oDiv.offsetLeft;
    relatY = oEvent.clientY - oDiv.offsetTop;

    var block = oDiv.parentNode;
    var firstMove = true; //第一次移动
    onmove = true;

    //鼠标移动
    document.onmousemove = function(ev) {
        if (firstMove) {
            // nextUp(oDiv);
            block.removeChild(oDiv);
            initPosition(block);
            $(".drag-block").appendChild(oDiv);
        }
        firstMove = false;


        var oEvent = ev || event;
        // console.log("222");
        // console.log(oDiv);
        var parentPos = getPosition(oDiv.parentNode);
        oDiv.style.left = oEvent.clientX - relatX + "px";
        oDiv.style.top = oEvent.clientY - relatY + "px";
        initPosition(block);
        console.log("---111---" + oEvent.clientX);
        console.log("top--->" + oDiv.style.top);
        console.log("left-->" + oDiv.style.left);
    };

    //鼠标松开
    document.onmouseup = function(ev) {
        console.log("firstMove---" + firstMove);
        firstMove = false;
        document.onmousemove = null;
        document.onmouseup = null;
        removeClass(oDiv, "active");

        var oEvent = ev || event;
        console.log("--1---" + oEvent.clientX);
        oDiv.parentNode.removeChild(oDiv);
        // console.log(oEvent.clientX);
        if (onmove) {
            if (judgeInBlock(oEvent.clientX, oEvent.clientY, oLeftBlock)) {
                oLeftBlock.appendChild(oDiv);
                oDiv.style.left = "1px";
                initPosition(oLeftBlock);
            } else if (judgeInBlock(oEvent.clientX, oEvent.clientY, oRightBlock)) {
                console.log("right-block");
                oRightBlock.appendChild(oDiv);
                oDiv.style.left = "1px";
                initPosition(oRightBlock);
            } else {
                console.log("else");
            }
            onmove = false;
        }
        // initPosition(oDiv.parentNode,dragAreaTop);
    };
    return false;
}

function judgeInBlock(x, y, block) {
    var x0 = getPosition(block).x;
    var x1 = getPosition(block).x + block.offsetWidth;
    var y0 = getPosition(block).y;
    var y1 = getPosition(block).y + block.offsetHeight;
    console.log(x0 + "-" + x + "-" + x1 + "," + y0 + "-" + y + "-" + y1);
    return x > x0 && x < x1 && y > y0 && y < y1;
}

/**
 * 下面的节点上移
 * @param  {element} oDiv 当前拖动节点
 */
/*function nextUp(oDiv) {
    var next = oDiv.nextSibling.nextSibling;
    console.log(next);
    if (next) {
        next.style.top = next.offsetTop - 60 + "px";
        nextUp(next);
    }
}*/

/**
 * 获取外联样式
 * @param  {element} element DOM节点元素对象
 * @return {element}      可以获取外联样式的元素对象
 */
/*function getCssValue(element) {
    var value = null;
    if (window.ActiveXObject) {
        value = element.currentStyle;
        return value;
    } else {
        value = getComputedStyle(element);
        return value;
    }
}*/