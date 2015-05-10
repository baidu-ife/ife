/*实现一个可拖拽交互的界面
如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
注意拖拽释放后，要添加到准确的位置
拖拽到什么位置认为是可以添加到新容器的规则自己定
注意交互中良好的用户体验和使用引导*/
var relatX = 0;
var relatY = 0;

function init() {
    var dragAreaHeight = $(".drag-block").offsetTop;
    $(".pos1").style.top = 500;
    console.log($(".pos1").style.top);
    for (var i = 0; i < 6; i++) {
        // $("'.pos"+i+"'").style.top += dragAreaHeight;
        $(".pos1").style.top += dragAreaHeight;
    }
    console.log(dragAreaHeight);
    console.log($(".pos2").style.top);
}

init();

$.delegate(".left-block", "div", "mousedown", function(ev) {
    console.log("111");
    console.log(this);
    var oDiv = this;
    var oEvent = ev || event;

    relatX = oEvent.clientX - this.offsetLeft;
    relatY = oEvent.clientY - this.offsetTop;

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
    };
    return false;
});

/**
 * 获取外联样式
 * @param  {element} goal DOM节点元素对象
 * @return {element}      可以获取外联样式的元素对象
 */
function getCssValue(goal) {
    var obj = null;
    var value = null;
    if (window.ActiveXObject) {
        obj = document.querySelector(goal);
        value = obj.currentStyle;
        return value;
    } else {
        obj = document.querySelector(goal);
        value = getComputedStyle(obj);
        return value;
    }
}