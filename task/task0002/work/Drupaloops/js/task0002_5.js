/**
 * Created by Ooop on 2015/5/4.
 */
//window.onload=function(){
//    var oWin = document.getElementById("left");
//    var disX = 0;
//    var disY = 0;
//    document.onmousedown = function (event){
//        disX = event.clientX - oWin.offsetLeft;
//        disY = event.clientY - oWin.offsetTop;
//    };
//    document.onmousemove = function (event){
//        var iL = event.clientX - disX;
//        var iT = event.clientY - disY;
//        oWin.style.left = iL + "px";
//        oWin.style.top = iT + "px";
//    };
//    document.onmouseup = function (){
//        document.onmousemove = null;
//        document.onmouseup = null;
//    };
//};
//��onmouse������֪��Ϊʲô�����á���������HTML5��drag��dropʵ�ֵ�

function allowDrop(ev)
{
    ev=ev||window.event;
    ev.preventDefault();
}

function drag(ev)
{
    ev=ev||window.event;
    console.log(ev.target);
    console.log(ev.target.id);
    var del=document.getElementById(ev.target.id);
    del.style.display="none";
    ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
    ev=ev||window.event;
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
    var add=document.getElementById(ev.target.id);
    var last =add.lastElementChild;
    console.log(last);
    last.style.display="block";
    console.log(add);
}