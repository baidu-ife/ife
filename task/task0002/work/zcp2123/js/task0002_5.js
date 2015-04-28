/**
 * Created by zcp2123 on 2015/4/25.
 */
window.onload = function() {
    $.delegate("#container1", "div", "mousedown", function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        target.style.position = "absolute";
        target.style.top = e.pageY;
        target.style.left = e.pageX;
    });

    $.on("document", "mousemove", function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        target.style.top = e.pageY;
        target.style.left = e.pageX;
    });
}