window.onload = function () {
    delegateEvent($("#container1"), "div", "mousedown", listener);
    function listener(ev) {
        var e = e || event;
        var disX = e.clientX - ev.offsetLeft;
        var disY = e.clientY - ev.offsetTop;
        ev.style.position = "absolute";
        // console.log(disY)
        document.onmousemove = function (e) {
            var l = e.clientX - disX;
            var t = e.clientY - disY;
            var e = e || event;
            if (l > 150 && l < 250) {
                l = 201;
            } else if (l > 750 && l < 850) {
                l = 801;
            }
            ev.style.left = l + "px";
            ev.style.top = t + "px";
        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
    }
    delegateEvent($("#container2"), "div", "mousedown", listener);
    function listener(ev) {
        var e = e || event;
        var disX = e.clientX - ev.offsetLeft;
        var disY = e.clientY - ev.offsetTop;
        ev.style.position = "absolute";
        // console.log(disY)
        document.onmousemove = function (e) {
            var l = e.clientX - disX;
            var t = e.clientY - disY;
            var e = e || event;
            if (l > 150 && l < 250) {
                l = 201;
            } else if (l > 750 && l < 850) {
                l = 801;
            }
            ev.style.left = l + "px";
            ev.style.top = t + "px";
        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
    }
}
