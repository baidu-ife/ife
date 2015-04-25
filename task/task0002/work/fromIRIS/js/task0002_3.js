(function () {
    var _options = {};
    var oContainer = $("#task2-3-container");
    var oUl = $("#task2-3-box");
    var aLi = oUl.getElementsByTagName("li");
    var oCircleBox = $("#circle-box");
    var aCircle = oCircleBox.getElementsByTagName("li");
    var Num = 0;
    var timer = null;

    function slide (options) {
        _options = options;//将options里的保存到_options全局变量
        oUl.innerHTML += oUl.innerHTML;
        oUl.style.width = aLi.length * aLi[0].offsetWidth + "px";


    for (var i = 0; i < aCircle.length; i++) {
        aCircle[i].index = i;
        aCircle[i].onclick = function () {
            Num = this.index;
            tab();
            // clearInterval(timer);
        /*timer = setInterval(function () {
            Num++;
            if (oUl.offsetLeft < -oUl.offsetWidth * 3/8) {
                oUl.style.left = -0 + "px";
                Num = 1;
            }
            tab();
        },1500)*/
        }
    }
    }
    function turnRight() {
        Num--;
        if (Num == -1 && _options.loop) {
            oUl.style.left = -oUl.offsetWidth / 2 + "px";
            Num = 3;
        }
        startMove(oUl, "left", -(Num) * 1000);
        clearCircle();
    }
    function turnLeft() {
        Num++;
        if (Num == 5 && _options.loop) {
            oUl.style.left = 0 + "px";
            Num = 1;
        }
        startMove(oUl, "left", -(Num) * 1000);
        clearCircle();
    }
    function direct() {
        if (_options.back) {
            setInterval(function() {
                turnRight();
            },2000)
        } else {
            setInterval(function() {
                turnLeft();
            },2000)
        }
    }
    function tab() {
        startMove(oUl, "left", -(Num) * 1000);
        clearCircle();
    }
    //点击小圆圈时
    function clearCircle() {
        for (var i= 0; i < aCircle.length; i++) {
            removeClass(aCircle[i], "showCircle");
        }
        addClass(aCircle[Num], "showCircle");
    }



gallery = {
    slide: slide,
    direct: direct
}

window.gallery = gallery;


function getStyle(obj, attr){

    if(obj.currentStyle){
        return obj.currentStyle[attr]; //要用中括号去代替点
    }
    else{
        return getComputedStyle(obj,false)[attr];
    }
}

function startMove (obj, attr, iTarget){

    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iCur = getStyle(obj, attr);
            // console.log(iCur)
        if(attr == "opacity"){
            iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
        }else{
            iCur = parseInt(getStyle(obj,attr));
            // console.log(iCur)
        }
        var iSpeed = (iTarget - iCur)/8;
        iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
        if(iCur == iTarget){
            clearInterval(obj.timer);
        }else{
            if(attr == "opacity"){
                obj.style[attr] = (iCur + iSpeed)/100 ;  //要用中括号去代替点
                obj.style.filter = 'alpha(opacity:'+(iCur + iSpeed)+')';
            }else{
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
    },30)
}
})()
gallery.slide({
    back: false,
    loop: true
})
gallery.direct();
