var imgListDiv = $(".img-list");
var timerInner = null;
var timer = null;
var activeID = 1;
var nextID = 0;
var imageWidth = $("img").offsetWidth;
var circleArr = $(".circle").getElementsByTagName('a');
var intervalTime = 3000;

for (var i = 0; i < circleArr.length; i++) {
    circleArr[i].index = i + 1;
}

function startMove(target) {
    clearInterval(timerInner);
    timerInner = setInterval(function() {
        var speed = (target - imgListDiv.offsetLeft) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        imgListDiv.style.left = imgListDiv.offsetLeft + speed + "px";
    }, 30);
}

function rotate(clickID) {
    if (clickID) {
        nextID = clickID;
    } else {
        nextID = activeID <= 4 ? activeID + 1 : 1;
    }

    removeClass(circleArr[activeID - 1], "active");
    addClass(circleArr[nextID - 1], "active");

    startMove("-" + (nextID - 1) * imageWidth);
    activeID = nextID;
}

timer = setInterval(rotate, intervalTime);

$.delegate(".circle", "a", "click", function() {
    clearInterval(timer);
    var clickID = this.index;
    rotate(clickID);
    timer = setInterval(rotate, intervalTime);
});