/**
 * Created by Ooop on 2015/5/3.
 */
(function(){
    var _options = {};
    var bnContainer = $("#banner");
    var bnUl = $("#banner_ul");
    var bnLi = bnUl.getElementsByTagName("li");
    var pointUl = $("#point");
    var pointLi = pointUl.getElementsByTagName("li");
    var num = 0;
    var timer = null;
    function slide (options) {
        _options = options;
        bnUl.innerHTML += bnUl.innerHTML;
        bnUl.style.width = bnLi.length * bnLi[0].offsetWidth + "px";
        for (var i = 0; i < pointLi.length; i++) {
            pointLi[i].index = i;
            if (_options.back) {
                pointLi[i].onclick = function () {
                    num = this.index;
                    tab();
                }
            } else {
                bnUl.style.left = -4000 + "px";
                pointLi[i].onclick = function () {
                    num = this.index;
                    tab();
                }
            }
        }
    }
    function turnRight() {
        if (_options.loop) {
            num--;
            if (num == -1) {
                bnUl.style.left = -bnUl.offsetWidth / 2 + "px";
                num = bnLi.length /2 -1;
            }
            startMove(bnUl, "left", -(num) * 1000);
            clearCircle();
        } else {
            num--;
            if (num == -1) {
                bnUl.style.left = -bnUl.offsetWidth / 2 + "px";
                Num = bnLi.length /2 -1;
            }
            if (Num == 0) {
                clearInterval(timer);
            }
            startMove(bnUl, "left", -(num) * 1000);
            clearCircle();
        }
    }
    function turnLeft() {
        if (_options.loop) {
            num++;
            if (num == bnLi.length /2) {
                bnUl.style.left = -bnUl.offsetWidth * ((bnLi.length -2) / (2 * bnLi.length)) + "px"; //(n-2)/2*n
                num = 0;
            }
            startMove(bnUl, "left", -(num) * 1000 - 4000);
            clearCircle();
        } else {
            num++;
            if (num == parseInt(bnLi.length / 2 -1)) {

                clearInterval(timer);

            }
            // console.log(Num)
            startMove(bnUl, "left", -(num) * 1000 - 4000);
            clearCircle();
        }
    }
    function direct() {
        if (_options.back) {
            timer = setInterval(function() {
                turnRight();
            }, _options.timeout)
        } else {
            bnUl.style.left = -4000 + "px";
            timer = setInterval(function() {
                turnLeft();
            }, _options.timeout)
        }
    }
    function tab() {
        if (_options.back) {
            startMove(bnUl, "left", -(num) * 1000);
            clearCircle();
        } else {
            startMove(bnUl, "left", -(num) * 1000 - 4000);
            clearCircle();
        }
    }
    function clearCircle() {
        for (var i= 0; i < pointLi.length; i++) {
            removeClass(pointLi[i], "showCircle");
        }
        addClass(pointLi[num], "showCircle");
    }
    gallery = {
        slide: slide,
        direct: direct
    }

    window.gallery = gallery;
    function getStyle(obj, attr){

        if(obj.currentStyle){
            return obj.currentStyle[attr];
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
    back: true,//不是字符串
    loop: true,
    timeout: 1500
})
console.log("oops");
gallery.direct();
