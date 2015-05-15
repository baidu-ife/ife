//对象操作。
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr)==='[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn==='function';
}

function isPrimaryType(variable){
    if(typeof variable==="string"){
        return true;
    }else if(typeof variable==="number"){
        return true;
    }else if(typeof variable==="boolean"){
        return true;
    }
    return false;
}

function cloneObject(src) {
    var key, target;
    function Empty(){}
    if(isPrimaryType(src)){
        return src;
    }
    if(src===null) return null;
    if(src===undefined) return undefined;
    Empty.prototype=Object.getPrototypeOf(src);
    target=new Empty();
    for(key in src){
        if(src.hasOwnProperty(key)){
            target[key]=cloneObject(src[key]);
        }
    }
    return target;
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var key, len=0;
    for(key in obj){
        if(obj.hasOwnProperty(key)){
            len++;
        }
    }
    return len;
}

//DOM操作。
function getAttr(element, attr){
    if(element[attr]!==undefined) {
        return element[attr];
    }else{
        throw new DOMError("cannot find \""+attr+"\" attribute.");
    }

}
function setAttr(element, attr, value){
    if(element[attr]!==undefined) {
        element[attr]=value;
    }else{
        throw new Error("cannot find \""+attr+"\" attribute.");
    }
}
function hasClass(element, className){
    var classes=getAttr(element, "className").split(" ");
    for(var i=0; i<classes.length; i++){
        if(classes[i]!==""&&classes[i]===className){
            return true;
        }
    }
    return false;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var oldClass=getAttr(element, "className");
    if(!hasClass(element, newClassName)){
        if(oldClass!==""){
            setAttr(element, "className", oldClass+" "+newClassName);
        }else{
            setAttr(element, "className", newClassName);
        }
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var classes=getAttr(element, "className").split(" ");
    var newClasses=[];
    for(var i=0; i<classes.length; i++){
        if(classes[i]!==oldClassName){
            newClasses.push(classes[i]);
        }
    }
    setAttr(element, "className", newClasses.join(" "));
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if(element.parentNode===null&&
            siblingNode.parentNode===null){
        return siblingNode===element;
    }
    return element.parentNode===siblingNode.parentNode;
}
function setCSS(element, attr, value) {
    element.style[attr]=value;
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var curElement=element;
    var offsetX=0, offsetY=0;
    while(curElement!=null){
        offsetX+=curElement.offsetLeft;
        offsetY+=curElement.offsetTop;
        curElement=curElement.offsetParent;
    }
    return {x: offsetX , y: offsetY};
}
function id(strId, context){
    var elements=null, i=0;
    context=context||document;
    if(context===document){
        return document.getElementById(strId);
    }
    elements=context.getElementsByTagName("*");
    for(i=0; i<elements.length; i++){
        if(elements[i].id===strId){
            return elements[i];
        }
    }
    return null;
}
function tag(tagName, context){
    var elements=null, i=0;
    context=context||document;
    elements=context.getElementsByTagName(tagName);
    if(elements.length>0){
            return elements[0];
    }
    return null;
}
function cls(className, context){
    var elements=null, i=0;
    context=context||document;
    if(context.getElementsByClassName){
        elements=context.getElementsByClassName(className);
        if(elements.length!==0){
            return elements[0];
        }
    }else{
        elements=context.getElementsByTagName("*");
        for(i=0; i<elements.length; i++){
            if(hasClass(elements[i], className)){
                return elements[i];
            }
        }
    }
    return null;
}
function attrValue(attrName, value, context){
    var elements=null, i=0;
    context=context||document;
    elements=context.getElementsByTagName("*");
    for(i=0; i<elements.length; i++){
        if(elements[i].hasAttribute(attrName)
                &&elements[i].getAttribute(attrName)===value){
            return elements[i];
        }
    }
    return null;
}
function attr(attrName, context){
    var elements=null, i=0;
    context=context||document;
    elements=context.getElementsByTagName("*");
    for(i=0; i<elements.length; i++){
        if(elements[i].hasAttribute(attrName)){
            return elements[i];
        }
    }
    return null;
}
function singleSelector(selector, context){
    var parts=null, left, right, className, strId;
    context=context||document;
    switch(selector[0]){
        case "#":
            strId=selector.substr(1);
            return id(strId, context);
        case ".":
            className=selector.substr(1);
            return cls(className, context);
        case "[":
            parts=selector.substr(1, selector.length-2).split("=");
            if(parts.length>1){
                left=parts.shift();
                right=parts.join("=");
                return attrValue(left, right, context);
            }else{
                return attr(parts[0], context);
            }
        default:
            return tag(selector, context);
    }
}

function $(selector, context){
    var i=0, last= 0, subSelector="";
    context=context||document;
    if(context.nodeType!==1&&context.nodeType!==9){
        return null;
    }
    selector=trim(selector);
    for(i=0; i<=selector.length; i++){
        if(i<selector.length&&selector[i]==="\\"){
            i++;
        }else if(i===selector.length||selector[i]===" "){
            subSelector=selector.substring(last, i);
            if(subSelector!==""){
                context=singleSelector(subSelector, context);
                if(context===null) return null;
            }
            last=i+1;
        }
    }
    return context;
}

//字符串操作
function trim(str){
    return str.replace(/(^[\x20\t\r\n\f]+)|([\x20\t\r\n\f]+$)/g, "");
}
function isEmail(emailStr) {
    return /^[a-z0-9\-\_.]+@([a-z0-9\-]+.)+[a-z]+$/i.test(emailStr);
}
function isMobilePhone(phone) {
    return /^1[0-9]{10}$/i.test(phone);
}

//数组操作
function uniqArray(arr) {
    var obj={}, i= 0, newArr=[];
    function indexOf(arr, v){
        var i=0;
        if([].indexOf){
            return arr.indexOf(v);
        }else{
            for(i=0; i<arr.length; i++){
                if(arr[i]===v){
                    return i;
                }
            }
        }
        return -1;
    }
    for(i=0; i<arr.length; i++){
        if(indexOf(newArr, arr[i])<0){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
function each(arr, fn) {
    var i=0;
    for(i=0; i<arr.length; i++){
        fn(i, arr[i]);
    }
}
//事件操作。
$.on=function (element, event, listener){
    if(element.addEventListener){
        element.addEventListener(event, listener);
    }else{
        element.attachEvent("on"+event, listener);
    }
}
$.un=function (element, event, listener){
    if(element.removeEventListener){
        element.removeEventListener(event, listener);
    }else{
        element.detachEvent("on"+event, listener);
    }
}
$.click=function (element, listener){
    $.on(element, "click", listener);
}
$.enter=function (element, listener){
    var KEY_ENTER=13;
    $.on(element, "keydown", function (e){
        if(e.keyCode===KEY_ENTER){
            listener.call(this, event);
        }
    });
}
$.delegate=function (element, tagOrClass, event, listener){
    $.on(element, event, function (e){
        var target=e.target?e.target:e.srcElement;
        if(tagOrClass.length===0) return false;
        if(tagOrClass[0]!=="."){
            if(target.nodeName===tagOrClass.toUpperCase()){
                listener.call(target, e);
            }
        }else{
            if(hasClass(target, tagOrClass.substr(1))){
                listener.call(target, e);
            }
        }
    });
}


function isIE() {
    var m=navigator.userAgent.match(/MSIE (\d+)/);
    return m?m[1]*1:-1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expires) {
    var strExpires="";
    if(expires){
        strExpires = "expires="+expires.toUTCString();
    }else{
        strExpires="";
    }
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + "; " + strExpires;
}

// 获取cookie值
function getCookie(cookieName) {
    var parts=document.cookie.split(";"), cookieParts=null;
    var i=0;
    for(i=0; i<parts.length; i++){
        cookieParts=parts[i].split("=");
        if(cookieName===cookieParts.shift()){
            return decodeURIComponent(cookieParts.join("="));
        }
    }
}

//ajax.
function obj2HttpParam(obj){
    var key, r="";
    for(key in obj){
        if(obj.hasOwnProperty(key)){
            r+=key+"="+encodeURIComponent(obj[key])+"&";
        }
    }
    if(r.length>0){
        return r.substr(0, r.length-1);
    }
    return r;
}
function ajax(url, options) {
    var xmlhttp=new XMLHttpRequest();
    var param="";
    options=options||{};
    options.data=options.data||"";
    options.onsuccess=options.onsuccess||function (){};
    options.onfail=options.onfail||function (){};
    options.method=options.method||"GET";
    options.type=options.type||"json";
    if(typeof options.data==="object"){
        param=obj2HttpParam(options.data);
    }else{
        param=options.data;
    }
    xmlhttp.onreadystatechange=function (){
        if(xmlhttp.readyState===4){
            if(xmlhttp.status===200){
                if(options.type==="json"){
                    options.onsuccess(JSON.parse(xmlhttp.responseText));
                }else{
                    options.onsuccess(xmlhttp.responseText);
                }
            }else{
                options.onfail(xmlhttp.status);
            }
        }
    }
    if(options.method==="GET"){
        xmlhttp.open(options.method, url+'?'+param, true);
        xmlhttp.send();
    }else{
        xmlhttp.open(options.method, url, true);
        xmlhttp.send(param);
    }

}
function removeEmptyStrInArray(arr){
    var r=[];
    for(i=0; i<arr.length; i++){
        if(arr[i]!==""){
            r.push(arr[i]);
        }
    }
    return r;
}
function extend(Child, Parent) {
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}
