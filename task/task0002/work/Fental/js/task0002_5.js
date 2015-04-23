/**
 * Created by T on 2015/4/22.
 */

window.onload = function() {
    var boxes;
    //IE 8
    if (document.getElementsByClassName === undefined || document.getElementsByClassName === null) {
        boxes = getElementsByClassName("box");
    }
    //IE 8以上及其他浏览器
    else {
        boxes = document.getElementsByClassName("box");
    }

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].draggable=true;
        boxes[i].ondragstart = function(e) {
            e = e || window.event;
            var target = e.srcElement ? e.srcElement : e.target;
            target.className += " dragged";
            e.dataTransfer.setData("Text", "dragged");
        };
    }

    var tips = document.createElement("p");
    $("body").appendChild(tips);
    tips.style.position = "absolute";
    tips.style.display = "none";

    function stopDefault(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
    function dragOver(e) {
        e = e || window.event;
        var target = e.srcElement ? e.srcElement : e.target;
        stopDefault(e);
        tips.style.display = "block";
        tips.style.left = (e.clientX + 20) + "px";
        tips.style.top = (e.clientY + 20) + "px";
        if (target.id === "panel-1" || target.id === "panel-2") {
            tips.innerHTML = "放置到容器末尾";
        }
        else {
            tips.innerHTML = "放置到该模块前";
            for (var i = 0; i < boxes.length; i++) {
                removeClass(boxes[i], "active");
            }
            addClass(target, "active");
        }
    }

    function dragEnter(e) {
        e = e || window.event;
        stopDefault(e);
        tips.style.display = "block";
    }

    function dragLeave(e) {
        e = e || window.event;
        stopDefault(e);
        tips.style.display = "none";
    }

    function drop(e) {
        e = e || window.event;
        //alert(e);
        var target = e.srcElement ? e.srcElement : e.target;
        stopDefault(e);
        var data = e.dataTransfer.getData("Text");
        var dropTarget = $("."+data);
        if (target.id === "panel-1" || target.id === "panel-2") {
            target.appendChild(dropTarget);
            removeClass(dropTarget, "dragged");
        }
        else {
            target.parentNode.insertBefore(dropTarget, target);
            removeClass(dropTarget, "dragged");
        }
        tips.innerHTML = "";
        tips.style.display = "none";
        for (var i = 0; i < boxes.length; i++) {
            removeClass(boxes[i], "active");
        }
    }

    $.on("#panel-1", "dragover",dragOver)
        .on("#panel-1", "dragenter",dragEnter)
        .on("#panel-1", "dragleave",dragLeave)
        .on("#panel-1", "drop",drop);

    $.on("#panel-2", "dragover",dragOver)
        .on("#panel-2", "dragenter",dragEnter)
        .on("#panel-2", "dragleave",dragLeave)
        .on("#panel-2", "drop",drop);

};