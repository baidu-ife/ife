/**
 * Created by T on 2015/4/22.
 */
window.onload = (function() {
    var boxes = document.getElementsByClassName("box");
    var firstPanel = $("#panel-1");
    var secondPanel = $("#panel-2");

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].draggable=true;
        boxes[i].ondragstart = function(e) {
            e.target.className += " dragged";
            e.dataTransfer.setData("Text", "dragged");
        };
    }

    var tips = document.createElement("p");
    $("body").appendChild(tips);
    tips.style.position = "absolute";
    tips.style.display = "none";

    function dragOver(e) {
        e.preventDefault();
        tips.style.display = "block";
        tips.style.left = (e.clientX + 20) + "px";
        tips.style.top = (e.clientY + 20) + "px";
        if (e.target.id === "panel-1" || e.target.id === "panel-2") {
            tips.innerHTML = "放置到容器末尾";
        }
        else {
            tips.innerHTML = "放置到该模块前";
            for (var i = 0; i < boxes.length; i++) {
                removeClass(boxes[i], "active");
            }
            addClass(e.target, "active");
        }
    }

    function dragEnter(e) {
        e.preventDefault();
        tips.style.display = "block";
    }

    function dragLeave(e) {
        e.preventDefault();
        tips.style.display = "none";
    }

    function drop(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData("Text");
        var dropTarget = document.getElementsByClassName(data)[0];

        if (e.target.id === "panel-1" || e.target.id === "panel-2") {
            e.target.appendChild(dropTarget);
            removeClass(dropTarget, "dragged");
        }
        else {
            e.target.parentNode.insertBefore(dropTarget, e.target);
            removeClass(dropTarget, "dragged");
        }
        tips.innerHTML = "";
        tips.style.display = "none";
        for (var i = 0; i < boxes.length; i++) {
            removeClass(boxes[i], "active");
        }
    }

    firstPanel.ondragover = dragOver;
    firstPanel.ondragenter = dragEnter;
    firstPanel.ondragleave = dragLeave;
    firstPanel.ondrop = drop;

    secondPanel.ondragover = dragOver;
    secondPanel.ondragenter = dragEnter;
    secondPanel.ondragleave = dragLeave;
    secondPanel.ondrop = drop;

})();