/**
 * Created by jiawen on 2015/4/26.
 */
window.onload = function() {
    $.delegate($('.container'),'div','mousedown',function(e){
        var srcEle = getSrcElement(e);
        if(hasClass(srcEle,'stone')){
            srcEle.style.opacity = 0.5;
        }
    });

    $.delegate($('.container'),'div','mouseout',function(e){
        var srcEle = getSrcElement(e);
        if(hasClass(srcEle,'stone')){
            srcEle.style.opacity = 1;
        }
    });

    $.delegate($('.container'),'div','mouseup',function(e){
        var srcEle = getSrcElement(e);
        if(hasClass(srcEle,'stone')){
            srcEle.style.opacity = 1;
        }
    });

    $.delegate($('.container'),'div','mousemove',function(e){
        var srcEle = getSrcElement(e);
        if(hasClass(srcEle,'stone')){
            srcEle.style.top = e.clientX+"px";
            srcEle.style.left = e.clientY+"'px";
            console.log(e.clientX + ":" + e.clientY);
        }
    });
}