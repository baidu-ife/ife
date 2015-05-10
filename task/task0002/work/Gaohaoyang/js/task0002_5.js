// 实现一个可拖拽交互的界面
// 如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
// 被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
// 注意拖拽释放后，要添加到准确的位置
// 拖拽到什么位置认为是可以添加到新容器的规则自己定
// 注意交互中良好的用户体验和使用引导

init();

var relatX = 0;
var relatY = 0;

function init() {
    var dragAreaTop = $(".drag-block").offsetTop - 0 + 1;
    initPosition($(".left-block"), dragAreaTop, "l");
    initPosition($(".right-block"), dragAreaTop, "r");
}

/**
 * 初始化方块位置
 * @param  {element} element 容器元素
 * @param {number} dragAreaTop 容器top
 * @param {String} leftOrRight 左边或右边
 */
function initPosition(element, dragAreaTop, leftOrRight) {
    var boxNumber = $(".left-block").getElementsByTagName('div').length;
    for (var i = 1; i <= boxNumber; i++) {
        $("[" + leftOrRight + "=" + i + "]").style.top = dragAreaTop + $("[" + leftOrRight + "=" + i + "]").offsetTop + "px";
    }
}

$.delegate(".left-block", "div", "mousedown", drag);
$.delegate(".right-block", "div", "mousedown", drag);

function drag(ev) {
    console.log("111");
    console.log(this);
    var oDiv = this;
    var oEvent = ev || event;

    addClass(oDiv, "active");
    oDiv.style.zIndex = 100;

    relatX = oEvent.clientX - oDiv.offsetLeft;
    relatY = oEvent.clientY - oDiv.offsetTop;

    // nextUp(oDiv);
    //鼠标移动
    document.onmousemove = function(ev) {
        var oEvent = ev || event;
        console.log("222");
        console.log(oDiv);
        oDiv.style.left = oEvent.clientX - relatX + "px";
        oDiv.style.top = oEvent.clientY - relatY + "px";
    };

    //鼠标松开
    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
        removeClass(oDiv, "active");
    };
    return false;
}

/**
 * 下面的节点上移
 * @param  {element} oDiv 当前拖动节点
 */
function nextUp(oDiv) {
    var next = oDiv.nextSibling.nextSibling;
    console.log(next);
    if (next) {
        next.style.top = next.offsetTop - 60 + "px";
        nextUp(next);
    }
}

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