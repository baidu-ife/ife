var imgWrap = $(".img-wrap");
var imgWidth = $("img").offsetWidth;
var playCircle = $("#chk-circle input").checked;
var intervalTime = parseInt($("#pause_time").value);
var playOrder = parseInt($("#play-order").value);
var pointArr = $(".point").getElementsByTagName('a');
var timer = null;

var activeID = 1;
var nextID = 0;

for (var i = 0; i < pointArr.length; i++) {
    pointArr[i].index = i + 1;
}

timer = setInterval(tab, intervalTime);

$("#pause_time").onchange = function () {
    intervalTime = parseInt(this.value);
    clearInterval(timer);
    timer = setInterval(tab, intervalTime);    
};

$("#play-order").onchange = function () {
    playOrder = parseInt(this.value);
    clearInterval(timer);
    timer = setInterval(tab, intervalTime);    
};

$("#chk-circle input").onclick = function() {

    playCircle = this.checked;
};

$.delegate(".point", "a", "click", function() {
    clearInterval(timer);
    var clickID = this.index;
    tab(clickID);
    timer = setInterval(tab, intervalTime);
});

function tab(clickID) {
    if (clickID) {
        nextID = clickID;
    } else {
        if (!playOrder) {//正序
            if (playCircle) {   //循环
                nextID = activeID <= 5 ? activeID + 1 : 1; 
            } else {
                nextID = activeID <= 5 ? activeID + 1 : 6;
            }

        } else {//逆序   
            if (playCircle) { //不循环
                nextID = activeID >= 2 ? activeID - 1 : 6;       
            } else {
                nextID = activeID >= 2 ? activeID - 1 : 1;
            }
        }
    }

    startMove(imgWrap, "left", "-" + (nextID - 1) * imgWidth);


    if (!playOrder) {
        removeClass(pointArr[activeID - 1], "active");
        addClass(pointArr[nextID - 1], "active");
    } else {
        removeClass(pointArr[activeID - 1], "active");
        addClass(pointArr[nextID - 1], "active");
    }

    activeID = nextID;
}
// move
function startMove(obj, attr, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var cur = parseInt(getStyle(obj, attr));
        var speed = (target - cur) / 6;

        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (cur == target) {
            clearInterval(obj.timer);
        } else {
            obj.style[attr] = cur + speed + 'px';
        }
    }, 30);
}

function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, false)[name];
    }
}
