/**
 * Created by feizq on 15-4-27.
 */
/*拖曳的实现基本原理：
* 1.当在box里按下鼠标的时候记录初始位置，当鼠标移动的时候，div跟着一起移动
* 2.当鼠标弹起的时候，判断鼠标的位置，看放入那一个div.
* 3.在拖曳的时候，检测鼠标在哪个容器里然后把相应的容器定位。
*
* */


var point ={
//x/y代表之前鼠标停留的位置，currentx/y代表之前div所在的位置
    x:0,
    y:0,
    currentX:0,
    currentY:0,
    //通过设置flag的状态，检测鼠标是否弹起,不能在公共区域设置状态，否则会乱。因为元素绝对定位之后，下面的就会覆盖上来，然后就有多个div在移动
    flag:false
};
var boxRightP = unit.getPosition(unit.$(".right"));
console.log(boxRightP);

//获得所有的.box元素
function $(dom,className){
    var result = [];
    var domAll = dom.getElementsByTagName("*");
    for( var i =0;i<domAll.length;i++){
        if(domAll[i].getAttribute("class") == className){
            result.push(domAll[i]);
        }
    }
    return result;
}
var box = $(unit.$(".container"),"box");
for(var i=0;i<box.length;i++){

    unit.addEvent(box[i],"mousedown",function(e){
        var e  =e ||window.event;
        var target = e.srcElement|| e.target;

        //鼠标按下时候，记录下初始的位置
        point.x = e.clientX;
        point.y = e.clientY;

        target.flag = true;
        var currentP = unit.getPosition(target);
        point.currentX=currentP.x;
        point.currentY=currentP.y;

        console.log(point);
    });

    //
    unit.addEvent(box[i],"mousemove",function(e){
        var e  =e ||window.event;
        var target = e.srcElement|| e.target;
        console.log(target.flag);
        if(target.flag == true){
            console.log("1");
            target.setAttribute("class","choosed");
            target.style.top = point.currentY+(e.clientY-point.y)+"px";
            target.style.left = point.currentX+(e.clientX-point.x)+"px";

            point.currentX =  point.currentX+(e.clientX-point.x);
            point.currentY = point.currentY+(e.clientY-point.y);
            point.x= e.clientX;
            point.y = e.clientY;
            console.log(point.currentX);
            //检测有木有到达容器的
            if(point.x>boxRightP.x){
                target.setAttribute("class","box");
                unit.$(".right").appendChild(target);
            }
        }
    });

    unit.addEvent(box[i],"mouseup",function(e,target){
        var e  =e ||window.event;
        var target = e.srcElement|| e.target;
        target.flag = false;
    })
}

