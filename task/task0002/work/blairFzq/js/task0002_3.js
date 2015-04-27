
/**
 * Created by feizq on 15-4-27.
 *轮播的原理是当前图片是显示，下一张图片从左边运动覆盖
 *下一张图片：position:ab;left：从1220px-0px；z-index:2;display:block;
 *当前图片
 **/


var li = unit.$(".slider").getElementsByTagName("li");
for(var i =0;i<li.length;i++){
    li[i].setAttribute("num",i);
}
var sliderTime = slider(1,5000);

//鼠标点击小图标，轮滑到相应的图片
unit.delegateEvent(unit.$(".carousel-indicators"),"li","click",function(e,target){
         clearInterval(sliderTime);
         var imgIndex  =target.getAttribute("index");

           var imgDom = unit.$(".slider .active");
           imgDom.setAttribute("class"," ");
           li[imgIndex].setAttribute("class","active");
           sliderTime = slider(1,5000);
});

function slider(order,intervalTime){

    var time = setInterval(function(){
        sliderImg(order);
    },intervalTime);
    return time;
}


function getSonDmo(ele,tag){
    var tagAll = ele.getElementsByTagName(tag);
    var result =[];
    for(var i =0;i<tagAll.length;i++){
        if(tagAll[i].parentNode == ele){
            result.push(tagAll[i]);
        }
    }
    return result;
}
//得到当前的图片位置，让下一张图片显示出来;order:1顺序播放；order:0逆序播放
//顺序播放： 0 1 2 3 4 5  0 1 2 3 4 5
//          1 2 3 4 5 0  5 0 1 2 3 4



function sliderImg(order){
    var imgDom = unit.$(".slider .active");
    var imgPre = parseInt(imgDom.getAttribute("num"));
    var imgIndex = imgPre%(li.length-1);

    if(order==1){
        if(parseInt(imgDom.getAttribute("num")) == 5){
            imgIndex = 0;
        }
        else{
            imgIndex = imgIndex+1;
        }
    }
    else{
        if(parseInt(imgDom.getAttribute("num")) == 0){
            imgIndex = 5;
        }
        else{
            imgIndex = imgIndex-1;
        }
    }

    li[imgIndex].setAttribute("class","left");
    startMove(li[imgIndex],0,"left",function(){
        //在定时器停止的时候当前图片设置为0
        li[imgPre].setAttribute("class"," ");
        //
        li[imgIndex].setAttribute("class","active");
    });

}

function getStyle(obj,attr){
//forIE
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
//for ff
    else{
        return obj.ownerDocument.defaultView.getComputedStyle(obj,null)[attr];
    }

}
//缓冲运动的运动框架并且可以取任意值的运动框架,定时器停止时还可以做一个动作fn
function startMove(obj,target,attr,fn){
//若元素有定时器则先清除，若无则加上这个属性
    if(obj.timer){ clearInterval(obj.timer);}
    else{obj.timer = null}

    obj.timer = setInterval(function(){
//style代表当前样式的属性值
            var style  = null;
            var speed = null;
            if(attr == "opacity"){
                style = getStyle(obj,attr)*100||1;
//opacity:0.1的小数，在电脑内存中小数及其容易出错，所以一定要避免
                speed = (target*100 - style)/10;
            }
            else{

                style = parseInt(getStyle(obj,attr))|| 0;
                speed = (target - style)/10;
                //向下或向上取整，是因为小数容易出错，在像素为单位的世界里小数会被直接舍弃
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
            }
            if(style == target){
                clearInterval(obj.timer);
                if(fn){fn()}
            }
            else{
                if(attr == "opacity"){
                    obj.style[attr] =  (style +speed)/100;
                    //兼容ie
                    obj.style.filter = "filter:alpha(opacity="+ (style +speed)/10 +")";
                    console.log("改变之后的透明度"+obj.style.opacity);
                }
                else{
                    obj.style[attr] = style+speed+"px";
                }

            }
        }
        ,10)
}

