/**
 * Created by Y2X on 2015/4/27.
 */

var search=$("#search");
var hint=$("#hint");
addEvent(search,"input",showHint);//函数不需要传参，不然会直接执行！

function showHint(){//一开始报错，str一直都是空的，是因为将str作为参数，如此获得的str并非触发后的str，而是最开始的""
    hint.style.visibility="hidden";
    var str=$("#search").value;
    if(str==""){//删除到空的情况
        hint.innerHTML="";
        hint.style.visibility="hidden";
        return;
    }
    var xmlhttp;
    if(window.XMLHttpRequest){//for ie7+,firefox,chrome,opera,safari
        xmlhttp=new XMLHttpRequest();
    }
    else{//for ie6,ie5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            hint.innerHTML=xmlhttp.responseText;
            if(xmlhttp.responseText!="") {//如果直接显示，有些无结果的情况会出现边框
                hint.style.visibility = "visible";
                mouseChoose();
                clickItem();
            }
        }
        else{
            console.log(xmlhttp.readyState+" "+xmlhttp.status);
        }
    }
    xmlhttp.open("GET","task002_4.php?search="+str,true);
    xmlhttp.send(null);
}

var index=-1;//mark current item

// mouseover

// addEvent(hint,"mouseover",mouseChoose);
function mouseChoose(){
    var hintItem=hint.querySelectorAll("[data-hint-item]");
    for(var i=0;i<hintItem.length;i++) {
        // BUG :can't choose the item directly .why?!
        addEvent(hintItem[i], "mouseover", function (event) {
            if(index!=-1){
                console.log("removeclass "+index);
                removeClass(hintItem[index],"active");
            }
            addClass(event.target, "active");
            index = Number(event.target.getAttribute("data-hint-item"));//如果不转成数字，在index+1时会出错。通过输出index发现了错误
            console.log("addclass "+index);
        });
    }
}
//BUG(√) : hintItem didn't exist before
//      so how to choose element to trigger this "mouseChoose" ? or should i use a delegate?

//addEvent(hint,"click",clickItem);
function clickItem(){
    var hintItem=hint.querySelectorAll("[data-hint-item]");
    for(var i=0;i<hintItem.length;i++){
        addClickEvent(hintItem[i],function(){
            var value=hintItem[index].innerHTML;
            search.value=value;
            showHint();
            index=-1;
        });
    }
}
//BUG(√) :need double click to make it.

//SOLVE(BUG at line 62 & 77) :
// make them triggered when response succeed and hint is shown . look at line 29 & 30 .
// delete line 45 & 65


//key
addEvent(search,"keydown",chooseItem);

function chooseItem(event) {//when push up/down/enter
    console.log("keydown")
    var hintItem=document.querySelectorAll("[data-hint-item]");
    k=event.keyCode;
    if(k==38||k==40){//up or down
        if(hintItem.length==0){
            return;
            //console.log("on item,cannot push up/down");
        }
        else if(hintItem.length==1){
            //console.log("only one item");
            index=0;
        }
        else{
            if(index==-1){//not choose before
                if(k==38) //up,the last item
                    index=hintItem.length-1;
                if(k==40) //down,the first item
                    index=0;
            }
            else{//already chosen before
                removeClass($("[data-hint-item='"+index+"']"),"active");//removeClass for previous chosen item
                if(index==0&&k==38)//special case:the first item,up
                    index=hintItem.length-1;
                else if(index==(hintItem.length-1)&&k==40)//special case:the last item,down(*index!=0)
                    index=0;
                else{//general case:if 38(up),index--;if 40(down),index++
                    index= k==38? index-1:index+1;
                }
            }
        }
        console.log(index);
        addClass(hintItem[index],"active");
    }
    else if(event.keyCode==13){//enter
        var value=$("[data-hint-item='"+index+"']").innerHTML;
        search.value=value;
        showHint();
        index=-1;
    }
}


function checkHover(e, target) {
    if (getEvent(e).type == "mouseover") {
        return !contains(target, getEvent(e).relatedTarget
            || getEvent(e).fromElement)
            && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target);
    } else {
        return !contains(target, getEvent(e).relatedTarget
            || getEvent(e).toElement)
            && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target);
    }
}

function contains(parentNode, childNode) {
    if (parentNode.contains) {
        return parentNode != childNode && parentNode.contains(childNode);
    } else {
        return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
}