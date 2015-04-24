/**
 * Created by T on 2015/4/24.
 */
window.onload = function() {
    function stopDefault(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
    //检查元素是否在鼠标指向的区域内
    function isInScope(element, x, y) {
        var position = getPosition(element);

        var width = position.w || element.clientWidth;
        var height = position.h || element.clientHeight;
//        在IE8中getBoundingClientRect()并不返回w 和 h
//        console.log(width);
        if (x > position.x
            && x < position.x + width
            && y > position.y
            && y < position.y + height) {
            return element;
        }
        else {
            return null;
        }
    }

    //提示信息
    var tips = document.createElement("p");
    $("body").appendChild(tips);
    tips.style.position = "absolute";
    tips.style.display = "none";

    //用body事件代理，为每个box注册mousedown事件。。
    delegateEvent(document.body, ".box", "mousedown", dragAndDrop);

    function dragAndDrop(e) {
        e = e || window.event;
        var target = e.srcElement ? e.srcElement : e.target;
//        console.log(target);
        stopDefault(e);

        //记录被拖拽元素的父节点和下一个兄弟节点，用于在非允许释放区域释放鼠标时，恢复到原位置
        var preParent = target.parentNode;
        var targetSibling = target.nextSibling;

        var position = getPosition(target);
        $("body").appendChild(target);
        addClass(target, "dragged");

        //计算偏移量
        var offsetX = e.clientX - position.x;
        var offsetY = e.clientY - position.y;
        //浏览器滚动条
        target.style.left = (e.clientX - offsetX + getScrollBar().x) + "px";
        target.style.top = (e.clientY - offsetY + getScrollBar().y) + "px";


        //只点击，不移动，恢复到默认位置
        (function(target,preParent, targetSibling, tips) {
            document.body.onmouseup = function(e) {
//                console.log(target);
//                console.log(preParent);
                tips.style.display = "block";
                tips.style.left = (e.clientX + getScrollBar().x + 20) + "px";
                tips.style.top = (e.clientY + getScrollBar().y + 20) + "px";
                tips.innerHTML = "放置到该模块前";
                if(targetSibling === null || targetSibling === undefined) {

                    preParent.appendChild(target);
                }
                else {
                    preParent.insertBefore(target, targetSibling);
                }
                removeClass(target, "dragged");
                resetMouseMove(target);
//                console.log(tips.style.display);
                tips.style.display = "none";
                tips.innerHTML = "";
//                document.body.onmouseup = null;
            };
        })(target,preParent, targetSibling, tips);

        //鼠标点击后，注册鼠标移动事件
        function moveHandle(e) {
//            var panelFirst = $("#panel-1");
//            var panelSecond = $("#panel-2");

            var panel;  //用于记录当前移至哪个区域
            var children;
            var child;
            var isInChild = false;
            e = e || window.event;

            target.style.left = (e.clientX - offsetX + getScrollBar().x) + "px";
            target.style.top = (e.clientY - offsetY + getScrollBar().y) + "px";


            //鼠标移至panel区域
//            if (panel = isInScope(panelFirst, e.clientX, e.clientY)
//                    || isInScope(panelSecond, e.clientX, e.clientY)) {
            var panels;     //用于保存现在的全部容器
            if (document.getElementsByClassName) {
                panels = document.getElementsByClassName("panel");
            }
            else {
                panels = getElementsByClassName("panel", document.body);
            }

            if (panel = (function(){
                    var temp;
                    for (var i = 0; i < panels.length; i++) {
                        temp = isInScope(panels[i], e.clientX, e.clientY);
                        if(temp) {
                            return temp;
                        }
                    }
                    return null;
                })()) {

                if (panel.getElementsByClassName) {
                    children = panel.getElementsByClassName("box");
                }
                // IE 8
                else {
                    children = getElementsByClassName("box", panel);
                }

                tips.style.display = "block";
                tips.style.left = (e.clientX + getScrollBar().x + 20) + "px";
                tips.style.top = (e.clientY + getScrollBar().y + 20) + "px";
                tips.innerHTML = "放置到容器末尾";

                for (var i = 0; i < children.length; i++) {
                    child = isInScope(children[i], e.clientX, e.clientY);
                    if (child) {
                        isInChild = true;
                        tips.innerHTML = "放置到该模块前";
                        break;
                    }
                }

                //在panel内但不在box上
                if (!isInChild) {
//                    console.log("in panel");
                    document.body.onmouseup = function() {
                        panel.appendChild(target);

                        resetMouseMove(target);

                        removeClass(target, "dragged");
                        tips.style.display = "none";
                        document.body.onmouseup = null;
                    };
                }
                //在panel内在box上
                else {
//                    console.log("on box");
//                        console.log(target);
                    document.body.onmouseup = function() {
                        child.parentNode.insertBefore(target, child);

                        resetMouseMove(target);

                        removeClass(target, "dragged");
                        tips.style.display = "none";
                        document.body.onmouseup = null;
                    };
                }
            }
            //不在panel内
            else if (isInChild === false) {

                tips.style.display = "none";

                document.body.onmouseup = function() {
                    //放回原位
                    if(targetSibling === null || targetSibling === undefined) {

                        preParent.appendChild(target);
                    }
                    else {
                        preParent.insertBefore(target, targetSibling);
                    }

                    resetMouseMove(target);

                    removeClass(target, "dragged");
                    tips.style.display = "none";
                    document.body.onmouseup = null;

                };

            }
        }

        function setMouseMove(target) {
            target.onmousemove = moveHandle;
//        console.log(target.onmousemove);
            //增加捕获事件
            if (document.body.addEventListener) {
                document.body.addEventListener("mousemove", moveHandle, true);
            }
            else {
                //低版本IE 捕获
                document.body.setCapture();
                document.body.attachEvent("onmousemove", moveHandle);
            }
        }
        setMouseMove(target);

        function resetMouseMove(target) {
            target.onmousemove = null;
            if (document.body.removeEventListener) {
                document.body.removeEventListener("mousemove", moveHandle, true);
            }
            else {
                document.body.detachEvent("onmousemove", moveHandle);
                document.body.releaseCapture();
            }
        }
    }

//    $.delegate("#panel-1", ".box", "mousedown", dragAndDrop);
//    $.delegate("#panel-2", ".box", "mousedown", dragAndDrop);

    //增加容器
    $.on("#add-panel", "click", function() {
        var newPanel = document.createElement("div");
        addClass(newPanel, "panel");
        newPanel.innerHTML = '<div class="box">1</div> '
        + '<div class="box">2</div> '
        + '<div class="box">3</div> '
        + '<div class="box">4</div> '
        + '<div class="box">5</div>';
        document.body.appendChild(newPanel);
    });
    //移除最后一个容器
    $.on("#remove-panel", "click", function() {
        var allPanels;
        var length;
        var lastPanel;
        if (document.getElementsByClassName) {
            allPanels = document.body.getElementsByClassName("panel");
        }
        else {
            allPanels = getElementsByClassName("panel", document.body);
        }
        if (length = allPanels.length) {
            lastPanel = allPanels[length - 1];
            document.body.removeChild(lastPanel);
        }
    });

};