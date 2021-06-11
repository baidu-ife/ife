function $(id){
	var element=document.getElementById(id);
	return element;
}
function isIE() {
    // your implement
    var agent=navigator.userAgent.toString();
    return agent;
}
$.on=function addEvent(selector,event,listener){
    element=$(selector);
    if(element.attachEvent){
        element.attachEvent('on'+event,listener); 
    }else{
        element.addEventListener(event,listener,false);
    }
    
}
$.un=function removeEvent(selector,event,listener){
    element=$(selector);
    if(listener!=null&&listener.length>0){
        if(element.detachEvent){
        element.detachEvent("on"+event,listener);
        }else{
        element.removeEventListener(event,listener,false);
        }
    }else{

    }


}

$.click=function addClickEvent(selector,listener){
    $.on(selector,"click",listener);
}
$.enter=function addEnterEvent(selector,listener){
    function EnterListener(){
       var e = window.event || arguments.callee.caller.arguments[0];
         if (e && e.keyCode == 13 ) {
             //alert("您按回车键了");
             listener();
             
         }
          
    }
    $.on(selector,"keydown",EnterListener);

}

$.delegate=function delegateEvent(selector,tag,eventName,listener){
    element=$(selector);
    function tar(event){
        var target=event.target;
        if(target.tagName.toLowerCase()==tag){
            listener.call(element,event);
        }
    }
    $.on(selector,eventName,tar);
}

folder="<img src='./img/folder.png' width=14px>";
page="<img src='./img/page.png'width=12px>";
treeTag=$("defalut");
stateTag=$("all");
function treeON(event){
	var target=event.target;
	$("category").style.backgroundColor=" #D1F0EF";
	var list=$("tree").getElementsByTagName("DIV");
	for(i=0;i<list.length;i++){
		list[i].style.backgroundColor=" #D1F0EF";
	}
	target.style.backgroundColor="#EDF3F3";
    treeTag=target;
}
$.delegate("tree", "div", "click", treeON);
function categoryON(){
	var list=$("tree").getElementsByTagName("DIV");
	for(i=0;i<list.length;i++){
		list[i].style.backgroundColor=" #D1F0EF";
	}
	this.style.backgroundColor="#EDF3F3";
    treeTag=this;
}
$.click("category",categoryON);
function addMenuFn(){
    var name=prompt("请输入分类名称","新分类");
    if(name!=null && name!=""){
        var newTree=document.createElement('div');
        if(treeTag.id=="category"){
            newTree.className="tree-1";
            newTree.innerHTML=folder+name;
            $("tree").appendChild(newTree);
        }else{
            newTree.className="tree-2";
            newTree.style.backgroundColor=" #D1F0EF"; 
            newTree.innerHTML=page+name;
            treeTag.appendChild(newTree);
        }
        
    }
}
$.click("addMenu",addMenuFn);

function stateON(event){
    var target=event.target;
    var list=$("state").getElementsByTagName("DIV");
    for(i=0;i<list.length;i++){
        list[i].style.backgroundColor="#D1F0EF";
    }
    target.style.backgroundColor="#EDF3F3";
    stateTag=target;
}

$.delegate("state", "div", "click", stateON);

function addTaskFn(){
    
}
$.click("addTask",addTaskFn);