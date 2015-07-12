/**
 * Created by dell on 2015/6/8.
 */
//为dom增加一个样式名为newClassName的样式
function addClass(element, newClassName) {
    if(!Array.indexOf){
        Array.prototype.indexOf=function(obj){
            for(var i=0;i<this.length;i++){
                if(this[i]==obj){
                    return i;
                }
            }
            return -1;
        }
    }
    if (element.className === null || element.className === "") {
        element.className = newClassName;
    }
    else {
        if (element.className.indexOf(newClassName) === -1) {
            element.className += " " + newClassName;
        }
    }
}

//移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    var oldClass = element.className.split(/\s+|\t+/);
    var newClass = [];
    for (var i = 0; i < oldClass.length; i++) {
        if (oldClass[i] !== oldClassName) {
            newClass.push(oldClass[i]);
        }
    }
    element.className = newClass.join(" ");
}
function isSiblingNode(element, siblingNode) {
    // your implement
    return (element.parentNode==siblingNode.parentNode);

}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var pos={x:0,y:0};
    var offy=element.offsetTop;
    var offx=element.offsetLeft;
    if(element.offsetParent!=null){
        offx+=getPosition(e.offsetParent).x;
        offy+=getPosition(e.offsetParent).y;
        pos={x:offx, y:offy};
    }

    return pos;
}
// 实现一个简单的Query
function $(selector) {
    var sel=selector.split(" ");
    var name=null;
    var val=null;
    var el=document;
    var re=/^\[(\w+[\-]*\w*)\]$/i;
    var re2=/^\[(\w+[\-]*\w*)=(\w+)\]$/i;
    for (var i=0;i<sel.length;i++){
        var eachSel=sel[i];
        var type=eachSel[0];
        if(type=='.'){
            if(el==document){
                name=eachSel.substr(1,eachSel.length-1);
                el= document.getElementsByClassName(name)[0];
            }else {
                var els=el.childNodes;
                for(var l=0;l<els.length;l++){
                    name=eachSel.substr(1,eachSel.length-1);
                    if(els[l].className==name){
                        el=els[l];
                        break;
                    }
                }
            }

        }else if(type=='#'){
            name=eachSel.substr(1,eachSel.length-1);
            el= document.getElementById(name);
        }
        else if(type =="["){
            var eles = document.getElementsByTagName("*");
            for(var j=0;j<eles.length;j++){
                if(re.test(eachSel)){//没有等号
                    var match=re.exec(eachSel);
                    name=match[1];
                    if(eles[j].getAttribute(name)){//存在data-log属性
                        el=eles[j];
                        break;
                    }
                }
                else{
                    var match2=re2.exec(eachSel);
                    name=match2[1];
                    val=match2[2];
                    if(val==eles[j].getAttribute(name)){
                        el=eles[j];
                        break;
                    }
                }
            }
        }else{
            name=eachSel;
            el=document.getElementsByName(name)[0];
        }
    }
    return el;
}