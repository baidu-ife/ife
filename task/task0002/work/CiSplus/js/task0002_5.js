window.onload = function () {
    var firstBox = $("#firstBox");
    var secondBox = $("#secondBox");
    var firstDivs = firstBox.getElementsByTagName("div");
    var secondDivs = secondBox.getElementsByTagName("div");
    drag(firstDivs, firstBox, secondBox);
    drag(secondDivs, secondBox, firstBox);
}
function drag(element, originalBox, targetBox) {
    var divHeight = element[0].offsetHeight;
    for (var i = 0; i < element.length; i ++) {
        element[i].style.top = i * divHeight + "px";
        element[i].index = i;
        element[i].onmousedown = function(e) {
            var that = this;
            var event = e || window.event;
            var mousePosition = getMousePosition(event);
            var offsetX = mousePosition.x - that.offsetLeft;
            var offsetY = mousePosition.y - that.offsetTop;
            document.onmousemove = function(e) {
                var event = e || window.event;
                var mousePos = getMousePosition(event);
                var left = mousePos.x - offsetX;
                var top = mousePos.y - offsetY;
                that.style.left = left + "px";
                that.style.top = top + "px";
            };
            document.onmouseup = function(e) {
                //设置从第一个框移动到第二个框，还是从第二个框移动到第一个框
                var first2second = false;
                var second2first = false;
                e = e || window.event;
                //当前拖动鼠标放开时，鼠标位置，用来判断是否拖到了框里
                var curMousePos = getMousePosition(e);
                //设置tag是为了区别左右两个框，用来判断从一框移动到另一个框的动作
                //firstBox全部设置为0，secondBox全部设置为1
                if (that.getAttribute("tag") == 0) {
                    var target = $("#secondBox");
                    var targetPos = getElementPosition(target);
                    if ((curMousePos.x > targetPos.x) & (curMousePos.x < targetPos.x + target.offsetWidth) & (curMousePos.y > targetPos.y) & (curMousePos.y < targetPos.y + target.offsetHeight)) {
                        first2second = true;
                    }
                } else {
                    var target = $("#firstBox");
                    var targetPos = getElementPosition(target);
                    if ((curMousePos.x > targetPos.x) & (curMousePos.x < targetPos.x + target.offsetWidth) & (curMousePos.y > targetPos.y) & (curMousePos.y < targetPos.y + target.offsetHeight)) {
                        second2first = true;
                    }
                }
                if (first2second || second2first) {
                    //移动过后，tag值变一下
                    if (that.getAttribute("tag") == 0) {
                        that.setAttribute("tag", "1");
                    } else {
                        that.setAttribute("tag", "0");
                    }
                    if (that.parentNode == originalBox) {
                        originalBox.removeChild(that);
                        targetBox.appendChild(that);
                    } else {
                        targetBox.removeChild(that);
                        originalBox.appendChild(that);
                    } 
                }
                //每次移动完成后，都对每个框中的元素重新编号
                //重新对框内元素进行排列，进行一次初始化操作了
                var divElement = originalBox.getElementsByTagName("div");
                for (var i = 0; i < divElement.length; i ++) {
                    divElement[i].style.top = i * divHeight + "px";
                    divElement[i].style.left = "0";
                    divElement[i].index = i;
                }
                var anotherDivElement = targetBox.getElementsByTagName("div");
                for (var i = 0; i < anotherDivElement.length; i ++) {
                    anotherDivElement[i].style.top = i * divHeight + "px";
                    anotherDivElement[i].style.left = "0";
                    anotherDivElement[i].index = i;
                }
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
}
//获取鼠标当前位置
function getMousePosition(ev) {
    if (ev.pageX || ev.pageY) {
        return {x: ev.pageX, y: ev.pageY};
    } else {
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }
}
//获取元素相对页面左上角的位置坐标
function getElementPosition(element) {
    var left = 0;
    var top = 0;
    while (element.offsetParent) {
        left += element.offsetLeft;
        top += element.offsetTop;
        element = element.offsetParent;
    }
    left += element.offsetLeft;
    top += element.offsetTop;
    return {x:left, y:top};
}