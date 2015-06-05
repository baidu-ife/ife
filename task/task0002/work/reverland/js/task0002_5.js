// 全局变量
var leftC = $("#left")
var rightC = $("#right")
var onmove = false;    //是否拖动状态

function refreshBlock(blockContainer) {
    for (var i = 0; i < blockContainer.children.length; i++) {
        blockContainer.children[i].style.top = i * 50 + "px";
    }
}
refreshBlock($("#left"));
refreshBlock($("#right"));

$.delegate("#left", "div", "mousedown", down)
$.delegate("#right", "div", "mousedown", down)
//$.on(".block", "mousedown", down);

function down(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    //判断是否是block
    if (target.className.toLowerCase() !== "block" ) {
        return;
    }
    var origin = getPosition(target);
    var left = e.clientX - origin.x;
    var top = e.clientY - origin.y;
    target.style.opacity = 0.4;
    var fromContainer = target.parentNode;
    onmove = true;
    first = true;
    document.onmousemove = function(e) {
        if (first) {
            //就是觉得每次都dom操作不太对劲
            fromContainer.removeChild(target);
            $(".main").appendChild(target);
        }
        first = false;
        var e = e || window.event;
        var maxW = document.documentElement.clientWidth;
        var maxH = document.documentElement.clientHeight;
        var parentPos = getPosition(target.parentNode);
        if (e.clientX <=0 || e.clientX >= maxW
            || e.clientY <=0 || e.clientY >= maxH) {
            target.parentNode.removeChild(target);
            target.style.left = 0;
            fromContainer.appendChild(target);
            refreshBlock(fromContainer);
            document.onmousemove = null;
        } else {
            target.style.left = e.clientX - left - parentPos.x + "px";
            target.style.top = e.clientY - top - parentPos.y + "px";
            refreshBlock(fromContainer);
        }
    }
    document.onmouseup = function(e){
        first = false;
        document.onmousemove = null;
        document.onmouseup = null;
        var e = e || window.event;
        target.style.opacity = 1;
        //如果到clientX在container某范围内
        if (onmove) {
            target.parentNode.removeChild(target);
            if (inbox(e.clientX, e.clientY, leftC)) {
                leftC.appendChild(target);
                target.style.left = "0px";
                refreshBlock(leftC);
            } else if (inbox(e.clientX, e.clientY, rightC)) {
                rightC.appendChild(target);
                target.style.left = "0px";
                refreshBlock(rightC);
            } else {
                fromContainer.appendChild(target);
                target.style.left = "0px";
            }
            refreshBlock(fromContainer);
            onmove = false;
        }
    }
}

function inbox(x, y, container) {
    var x0 = getPosition(container).x;
    var x1 = getPosition(container).x + container.offsetWidth;
    var y0 = getPosition(container).y;
    var y1 = getPosition(container).y + container.offsetHeight;
    return x > x0 && x < x1 && y > y0 && y < y1;
}
