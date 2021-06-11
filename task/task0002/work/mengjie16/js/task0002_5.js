/**
 * Created by Candice on 2015/6/8.
 *
*实现一个可拖拽交互的界面
*左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
*被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
*注意拖拽释放后，要添加到准确的位置
*拖拽到什么位置认为是可以添加到新容器的规则自己定
*注意交互中良好的用户体验和使用引导
 **/
function getByClass(clsName,parent){//必须的写在前面
    //对父元素处理
    var oParent=parent?document.getElementById(parent):document,//parent存在的话取parentID
        eles=[],
        elements=oParent.getElementsByTagName('*');
    for(var i= 0,l=elements.length;i<l;i++){//可以同时初始化多个变量
        if(elements[i].className==clsName){
            eles.push(elements[i]);
        }
    }
    return eles;
}
window.onload=function(){

    var leftContent=document.getElementById("drag-leftDiv");
    var rightContent=document.getElementById("drag-rightDiv");
    var leftindex=leftContent.getElementsByTagName("li").length-1;
    var rightindex=rightContent.getElementsByTagName("li").length-1;
    var leftitem=getByClass('item','drag-leftDiv');
    var rightitem=getByClass('item','drag-rightDiv');
    for(var l=0;l<leftindex+1;l++){
        leftitem[l].style.top=(l*51)+'px';
    }
    for(var r=0;r<rightindex+1;r++){
        rightitem[r].style.top=(r*51)+'px';
    }
    drag(leftindex,rightindex);
};
function drag(leftindex,rightindex){
    var leftitem=getByClass('item','drag-leftDiv');
    var rightitem=getByClass('item','drag-rightDiv');
    for (var i=0;i<leftindex+1;i++){
        leftitem[i].onmousedown=function(e){
            l2rDown(e,leftindex,rightindex);
            leftindex--;
            rightindex++;
        }
    }
    for (var j=0;j<rightindex+1;j++){
        rightitem[j].onmousedown=function(e){
            r2lDown(e,leftindex,rightindex);
            rightindex--;
            leftindex++;
        }
    }
}
function l2rDown(e,leftindex,rightindex){
    e=e||window.event;
    var target= e.target|| e.srcElement;
    var id=target.id;
    var leftitem=document.getElementById(id);
    var leftContent=document.getElementById("drag-leftDiv");

    var disX= e.clientX- leftitem.offsetLeft;
    var disY= e.clientY-leftitem.offsetTop;
//
    console.log("鼠标横"+e.clientX,"leftitem"+leftitem.offsetLeft);//offsetLeft相对父元素ul，就是0
    console.log("鼠标纵"+e.clientY,"leftitem"+leftitem.offsetTop);//相对父元素是100+
    console.log("相对"+disX,disY);//所以disx ==clientx
    document.onmousemove=function(e){
        e=e||window.event;
        l2rMove(e,disX,disY,id,leftindex,rightindex);
    };
//
   document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
    };
}

function l2rMove(e,disX,disY,id,leftindex,rightindex){
    var l= e.clientX-disX;//198-157=41
    var t= e.clientY-disY;
    var leftitem=document.getElementById(id);
    var leftContent=document.getElementById("drag-leftDiv");
    var rightContent=document.getElementById("drag-rightDiv");

    var n1=rightContent.offsetLeft;
    var n2=leftContent.offsetLeft;
    var width=leftitem.offsetWidth;
    var mid=(n1-n2-width)/2;
//    console.log('n1'+n1,n2,width);//500,120,100
//    console.log(e.clientX,disX);
    if(l>n1-width/2-width||l==n1-width/2-width){
           l=rightContent.offsetLeft-leftContent.offsetLeft;//
           // 由于leftitem的offsetleft是相对父元素leftContent的，dis多了leftContent的offsetLeft
           rightindex++;
           t=(rightindex)*51;
        console.log(rightindex)
    }
    leftitem.style.left=l+'px';
    leftitem.style.top=t+'px';
   // console.log(leftitem);
}

function r2lDown(e,leftindex,rightindex){
    e=e||window.event;
    var target= e.target|| e.srcElement;
    var id=target.id;
    var rightitem=document.getElementById(id);
    var rightContent=document.getElementById("drag-rightDiv");

    var disX= e.clientX- rightitem.offsetLeft;
    var disY= e.clientY-rightitem.offsetTop;
//
    console.log("鼠标横"+e.clientX,"rightitem"+rightitem.offsetLeft);//offsetLeft相对父元素ul，就是0
    console.log("鼠标纵"+e.clientY,"rightitem"+rightitem.offsetTop);//相对父元素是100+
    console.log("相对"+disX,disY);//所以disx ==clientx
    document.onmousemove=function(e){
        e=e||window.event;
        r2lMove(e,disX,disY,id,leftindex,rightindex);
    };
//
    document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
    };
}

function r2lMove(e,disX,disY,id,leftindex,rightindex){
    var l= e.clientX-disX;
    var t= e.clientY-disY;

    var rightitem=document.getElementById(id);
    var leftContent=document.getElementById("drag-leftDiv");
    var rightContent=document.getElementById("drag-rightDiv");

    var n1=rightContent.offsetLeft;
    var n2=leftContent.offsetLeft;
    var width=rightitem.offsetWidth;
    var mid=(n1-n2-width)/2;
    var offset=disX-n1;
    console.log('n1'+n1,n2,width,offset);//500,120,100
    console.log(e.clientX,disX);//548,548
    /*if(l<leftContent){
        l=0;//
        // 由于leftitem的offsetleft是相对父元素leftContent的，dis多了leftContent的offsetLeft
        leftindex++;
        t=(leftindex)*51;
        console.log(leftindex)
    }*/
    console.log(l);
    rightitem.style.left=l+'px';
    rightitem.style.top=t+'px';
    // console.log(leftitem);
}
