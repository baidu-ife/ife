/**
 * Created by Y2X on 2015/4/27.
 */

//get indicator
var indicator=document.querySelectorAll("[data-slide-to]");

//get item
var item=document.getElementsByClassName("slide-item");
//to mark current index
var index=0;


var options={
    direction:"normal",//or alternate
    iteration:"infinite",//infinite /none
    duration:5000//or other number
};
options.setDirection=function(dir){
    options.direction=dir;
}
options.setIteration=function(intration){
    options.interation=intration;
}
options.setDuration=function(dur){
    options.duration=dur;
}

options.setDirection("alternate");

function slideRunning(){

    console.log(options);
    removeClass(item[index],"current");
    removeClass(indicator[index],"active");
    console.log(index);

    if(options.direction=="normal") {//calculate new index
        item[index].style.webkitAnimation="slideToLeft 1s";
        if(isIE()!=-1) item[index].style.Animation="slideToLeft 1s";
        if (index == 4) index = 0;
        else index++;
        item[index].style.webkitAnimation="slideFromRight 1s";
        if(isIE()!=-1) item[index].style.Animation="slideFromRight 1s";
    }
    else {//direction==alternate
        item[index].style.webkitAnimation="slideToRight 1s";
        if(isIE()!=-1) item[index].style.Animation="slideToRight 1s";
        if (index == 0) index = 4;
        else index--;
        item[index].style.webkitAnimation="slideFromLeft 1s";
        if(isIE()!=-1) item[index].style.Animation="slideFromLeft 1s";
    }
    console.log(index);
    addClass(item[index],"current");//set next index be current index
    addClass(indicator[index],"active");//set next index be current index

    if(options.iteration!="none") {
        console.log("iteration");
        timer = setTimeout(slideRunning,options.duration);//options.duration
    }
}
//注意timer的格式！！带参数的函数引用的格式！否则会溢出！！
//BUG:函数运行中sliderSetting除了第一次以外，一直是undifined↓
//->一直把options作为形参，但全局变量作为形参……于是就出错了，且没有参数的时候，可以不用字符串的形式
slideRunning();


for(var i=0;i<indicator.length;i++){
    addEvent(indicator[i],"click",function(evt){
        removeClass(indicator[index],"active");
        removeClass(item[index],"current");

        var chosen=Number(evt.target.getAttribute("data-slide-to"));
        console.log(chosen);
        if(chosen>index){//chosen item is on the right of current items
            item[index].style.webkitAnimation="slideToLeft 1s";
            if(isIE()!=-1) item[index].style.Animation="slideToLeft 1s";

            item[chosen].style.webkitAnimation="slideFromRight 1s";
            if(isIE()!=-1) item[chosen].style.Animation="slideFromRight 1s";
        }
        else if(chosen<index){
            item[index].style.webkitAnimation="slideToRight 1s";
            if(isIE()!=-1) item[index].style.Animation="slideToRight 1s";

            item[chosen].style.webkitAnimation="slideFromLeft 1s";
            if(isIE()!=-1) item[chosen].style.Animation="slideFromLeft 1s";
        }
        else  return;
        index=chosen;
        addClass(indicator[index],"active");
        addClass(item[index],"current");
    });
}

/**
 * BUG:
 *  1.正常的循环和点击indicator会同时进行，有时候会出现交叉的情况
 *  2.由于各种不得不发生的连锁反应，indicator的垂直位置不得不被固定了
 *  3.只做了chrome，没有兼容其他浏览器
 *
 *  不足：
 *  1.通过js改变元素的style，使动画样式直接内嵌了，太扎眼了，捂脸QAQ
 *  2.可配置的意思是?->只写了set函数
 *
 *  参考：
 *  http://www.w3school.com.cn/css3/css3_animation.asp
 *
*/
