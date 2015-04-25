//FF不兼容
window.onload = function () {
    function click(ev) {
        var e = ev || window.event;
        var target = e.target || e.srcElement;
        // var target = getTarget(ev);
        var disX = e.clientX - target.offsetLeft;
        var disY = e.clientY - target.offsetTop;

        target.style.position = "absolute";
        addClass(target, "filter");
        // console.log(disY)
        document.onmousemove = function (e) {
            var e = e || window.event;
            var l = e.clientX - disX;
            var t = e.clientY - disY;
            // var e = e || event;
            if (l > 150 && l < 250) {
                l = 201;
            } else if (l > 750 && l < 850) {
                l = 801;
            }
            target.style.left = l + "px";
            target.style.top = t + "px";
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            removeClass(target, "filter");
        }
    }
    function init () {
        $.delegate("#container1", "div", "mousedown", click);
        $.delegate("#container2", "div", "mousedown", click);
    }
    init();
}
