window.onload = function () {
    
}
















//move
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
