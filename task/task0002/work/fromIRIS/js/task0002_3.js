(function () {
    var _options = {};
    var oContainer = $("#task2-3-container");
    var oUl = $("#task2-3-box");
    var aLi = oUl.getElementsByTagName("li");
    var oCircleBox = $("#circle-box");
    var aCircle = oCircleBox.getElementsByTagName("li");
    var Num = 0;
    var timer = null;
//点击小圆事件
    function slide (options) {
        _options = options;//将options里的保存到_options全局变量
        oUl.innerHTML += oUl.innerHTML;
        oUl.style.width = aLi.length * aLi[0].offsetWidth + "px";

        for (var i = 0; i < aCircle.length; i++) {
            aCircle[i].index = i;
            if (_options.back) {
                aCircle[i].onclick = function () {
                    Num = this.index;
                    tab();
                }
            } else {
                oUl.style.left = -4000 + "px";
                aCircle[i].onclick = function () {
                    Num = this.index;
                    tab();
                }
            }
        }
    }
//定时器下的向右拖动UL
    function turnRight() {
        if (_options.loop) {
            Num--;
            if (Num == -1) {
                oUl.style.left = -oUl.offsetWidth / 2 + "px";
                Num = aLi.length /2 -1;
            }
            startMove(oUl, "left", -(Num) * 1000);
            clearCircle();
        } else {
            Num--;
            if (Num == -1) {
                oUl.style.left = -oUl.offsetWidth / 2 + "px";
                Num = aLi.length /2 -1;
            }
            if (Num == 0) {
                clearInterval(timer);
            }
            startMove(oUl, "left", -(Num) * 1000);
            clearCircle();
        }
    }
//定时器下的向左拖动UL
    function turnLeft() {
        if (_options.loop) {
            Num++;
            if (Num == aLi.length /2) {
                oUl.style.left = -oUl.offsetWidth * ((aLi.length -2) / (2 * aLi.length)) + "px"; //(n-2)/2*n
                Num = 0;
            }
            startMove(oUl, "left", -(Num) * 1000 - 4000);
            clearCircle();
        } else {
            Num++;
            if (Num == parseInt(aLi.length / 2 -1)) {

                clearInterval(timer);

            }
            // console.log(Num)
            startMove(oUl, "left", -(Num) * 1000 - 4000);
            clearCircle();
        }
    }
//轮播时的方向
    function direct() {
        if (_options.back) {
            timer = setInterval(function() {
                turnRight();
            }, _options.timeout)
        } else {
            oUl.style.left = -4000 + "px";
            timer = setInterval(function() {
                turnLeft();
            }, _options.timeout)
        }
    }
//点击小圆时的切换，分为正序逆序两种方法。
    function tab() {
        if (_options.back) {
            startMove(oUl, "left", -(Num) * 1000);
            clearCircle();
        } else {
            startMove(oUl, "left", -(Num) * 1000 - 4000);
            clearCircle();
        }
    }
//圆圈的背景初始及点亮
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

//以下为以前写过的运动框架
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

//运行
gallery.slide({
    back: true,//不是字符串
    loop: true,
    timeout: 1500
})
gallery.direct();
