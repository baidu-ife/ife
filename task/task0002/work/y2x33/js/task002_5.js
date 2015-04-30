/**
 * Created by Y2X on 2015/4/29.
 */

var box=document.getElementsByClassName("box");
var container=document.getElementsByClassName("container");
var dragBox;
for(var i=0;i<box.length;i++){
    box[i].setAttribute("id","box"+i);
    //box[i].style.cursor="move";
    box[i].setAttribute("ondraggable","true");

    box[i].ondragstart=function(evt){
        evt=evt||window.event;
        evt.dataTransfer.effectAllowed="move";
        evt.dataTransfer.setData("text",evt.target.id);
        evt.dataTransfer.setDragImage(evt.target,0,0);//后面两个参数是偏移量
        dragBox=evt.target;
    };
}
for(var j=0;j<container.length;j++){
    container[j].setAttribute("id","container"+j);

    container[j].ondragover=function(evt){
        evt=evt||window.event;
        evt.preventDefault();
        console.log("drop target"+evt.target.id);
        //evt.target.style.backgroundColor="#00f";
    };
    container[j].ondragenter = function(evt) {/*拖拽元素进入目标元素头上的时候*/
        evt=evt||window.event;
        evt.target.style.border = "solid 1px #00f";
        return true;
    };
    container[j].ondragleave = function(evt) {/*拖拽元素进入目标元素头上的时候*/
        evt=evt||window.event;
        evt.target.style.border = "solid 1px #000";
        return true;
    };

    container[j].ondrop=function(evt){
        evt=evt||window.event;
        evt.preventDefault();
        var dropContainer=evt.target;
        var data=evt.dataTransfer.getData("Text");
        console.log("target"+evt.target.id);
        if(dropContainer.id.search(/box/)==-1){//is drop target is a container
            dropContainer.appendChild(document.getElementById(data));
        }
        else{//if drop target is a box
            console.log("put before target box");
            dropContainer.parentNode.insertBefore(document.getElementById(data),dropContainer);
        }
        evt.target.style.border = "solid 1px #000";
    };
}

/*参考:
 http://www.w3school.com.cn/html5/html_5_draganddrop.asp
 http://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%E6%8B%96%E6%8B%BD%E4%B8%8E%E6%8B%96%E6%94%BE%E7%AE%80%E4%BB%8B/
 http://www.w3cschool.cc/jsref/event-ondrag.html
 */