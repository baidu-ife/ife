function carousel(element){
    var myCarousel={};
    var switchTimer= 0, autoPlayTimer=0;
    var container=$(".container", element);
    var width=element.clientWidth;
    var height=element.clientHeight;
    var curIndex=0;
    var autoPlay=false, _direction, _duration, _stayTime, _cycle;
    container.style.left=0;
    each(container.getElementsByTagName("img"), function (index, item){
        item.width=width;
        item.height=height;
        item.style.left=index*width+"px";
    });
    myCarousel.setIndex=function (index){
        curIndex=index;
        each($(".dots-container", element).getElementsByTagName('SPAN'), function(index, item){
            if(index===curIndex%(myCarousel.getImagesCount()-1)){
                addClass(item, "selected");
            }else{
                removeClass(item, "selected");
            }
        });
        container.style.left=-index*width+"px";
    }
    //duration单位是秒。
    //index从0开始。
    myCarousel.switchTo=function (index, duration, complete){
        var startLeft=parseInt(container.style.left);
        var endLeft=-index*width;
        var curLeft=startLeft;
        var fps=25;
        duration=duration||1;
        complete=complete||function (){};
        var delta=(endLeft-startLeft)/(duration*fps);
        if(switchTimer!==0){
            clearTimeout(switchTimer);
        }
        switchTimer=setTimeout(function callback(){
            if((curLeft-endLeft)*delta<0){
                if(Math.abs(curLeft-endLeft)>Math.abs(delta)){
                    curLeft+=delta;
                }else{
                    curLeft=endLeft;
                }
                container.style.left=curLeft+"px";
                switchTimer=setTimeout(callback, 1000/fps);
            }else{
                switchTimer=0;
                myCarousel.setIndex(index);
                complete();
            }
        }, 0);
    }
    myCarousel.getImagesCount=function (){
        return container.getElementsByTagName('img').length;
    }
    myCarousel.getCurIndex=function (){
        return curIndex;
    }
    //生成所有的圆点
    (function (){
        var i=0, span;
        for(i=0; i<myCarousel.getImagesCount()-1; i++){
            span=document.createElement("SPAN");
            addClass(span, "dot");
            (function (i){
                span.onclick=function (){
                    if(autoPlay) stop();
                    myCarousel.switchTo(i, 1, function (){
                        if(autoPlay) start();
                    });
                }
            }(i));
            $(".dots-container", element).appendChild(span);
        }
    }());

    function next(duration, complete){
        if(curIndex===myCarousel.getImagesCount()-1){
            myCarousel.setIndex(0);
        }
        myCarousel.switchTo(curIndex+1, duration, function (){
            complete();
        });
    }
    function prev(duration, complete){
        if(curIndex===0){
            myCarousel.setIndex(myCarousel.getImagesCount()-1);
        }
        myCarousel.switchTo(curIndex-1, duration, function (){
            complete();
        });
    }
    myCarousel.setIndex(0);
    function start(){
        autoPlayTimer=setTimeout(function callback(){
            function complete(){
                if(autoPlay){
                    autoPlayTimer=setTimeout(callback, _stayTime*1000);
                }
            }
            if(_direction===0){
                next(_duration, complete);
            }else{
                prev(_duration, complete);
            }
        }, _stayTime*1000);
    }
    function stop(){
        clearTimeout(autoPlayTimer);
    }
    //0-正序
    //1-逆序
    //duration-两张图片切换的间隔时间(s).
    myCarousel.autoPlay=function (direction, duration, stayTime, cycle){
        _direction=direction;
        _duration=duration;
        _stayTime=stayTime;
        _cycle=cycle;
        autoPlay=true;
        if(_direction===1){
            myCarousel.setIndex(myCarousel.getImagesCount()-2);
        }
        start();
    }
    myCarousel.stopAutoPlay=function (){
        autoPlay=false;
        stop();
    }
    return myCarousel;
}
window.onload=function (e){
    var myCarousel=carousel($(".carousel"));
    myCarousel.autoPlay(0, 1, 1, true);
}
