//FF不兼容
window.onload = function () {
    $.delegate("#container1", "div", "mousedown", listener);
    function listener(ele) {
        var e = e || window.event;
        var disX = e.clientX - ele.offsetLeft;
        var disY = e.clientY - ele.offsetTop;
        ele.style.position = "absolute";
        // console.log(disY)
        document.onmousemove = function (e) {
            var e = e || window.event;
            var l = e.clientX - disX;
            var t = e.clientY - disY;
            var e = e || event;
            if (l > 150 && l < 250) {
                l = 201;
            } else if (l > 750 && l < 850) {
                l = 801;
            }
            ele.style.left = l + "px";
            ele.style.top = t + "px";
        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
    }
    $.delegate("#container2", "div", "mousedown", listener);
    function listener(ele) {
        var e = e || window.event;
        var disX = e.clientX - ele.offsetLeft;
        var disY = e.clientY - ele.offsetTop;
        ele.style.position = "absolute";
        // console.log(disY)
        document.onmousemove = function (e) {
            var e = e || window.event;
            var l = e.clientX - disX;
            var t = e.clientY - disY;
            if (l > 150 && l < 250) {
                l = 201;
            } else if (l > 750 && l < 850) {
                l = 801;
            }
            ele.style.left = l + "px";
            ele.style.top = t + "px";
        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
    }
}
