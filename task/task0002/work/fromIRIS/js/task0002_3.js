function Slide (options) {
    var oDirection = options.dirce
    var oContainer = $("#task2-3-container");
    var oUl = $("#task2-3-box");
    var aLi = oUl.getElementsByTagName("li");
    var oCircleBox = $("#circle-box");
    var aCircle = oCircleBox.getElementsByTagName("li");
    var Num = 0;
    var timer = null;

    oUl.innerHTML += oUl.innerHTML;
    oUl.style.width = aLi.length * aLi[0].offsetWidth + "px";
    if (oDirection == "left") {
        timer = setInterval(function () {
            Num++;
            if (oUl.offsetLeft < -oUl.offsetWidth * 3/8) {
                oUl.style.left = -0 + "px";
                Num = 1;
            }
            tab();
        },1500)
        function tab() {
            startMove(oUl, "left", -(Num) * 1000);
            for( var j = 0; j < aCircle.length; j++) {
                aCircle[j].style.background = "";
            }
            aCircle[Num].style.background = "#fff";
        }
    }
    for (var i = 0; i < aCircle.length; i++) {
        aCircle[i].index = i;
        aCircle[i].onclick = function () {

            clearInterval(timer);
            if(this.index == Num) return;
            Num = this.index;
            tab();
            //加个延迟定时器内包含定时器，
            setTimeout(function(){

                timer = setInterval(function () {
                    Num++;
                    if (oUl.offsetLeft == -oUl.offsetWidth/2) {
                        oUl.style.left = -0 + "px";
                        Num = 1;
                    }
                    tab();
                },1500)

            },1000)
        }
    }
    /*else if (oDirection == "right"){
        timer = setInterval(function () {
            Num++;
            if (oUl.offsetLeft == 0) {
                oUl.style.left = -oUl.offsetWidth/2 + "px";
                Num = 1;
            }
            tab();
        },2000)
        function tab() {
            startMove(oUl, "left", Num * 1000 - 4000);
        }
    }*/
}




function getStyle(obj, attr){
    // console.log(obj)
    if(obj.currentStyle){
        return obj.currentStyle[attr]; //要用中括号去代替点
    }
    else{
        return getComputedStyle(obj,false)[attr];
    }
}
// console(getStyle())
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
