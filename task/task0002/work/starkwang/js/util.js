function isArray (arr) {
    if(arr && typeof arr == 'object' && typeof arr.length == 'number' && isFinite(arr.length)){
        var origin_length = arr.length;
        arr[arr.length] = "text";
        var new_length = arr.length;
        arr.length = origin_length;
        return new_length == origin_length + 1;
    }
    return false;
}
function isFunction (fn){
    return Object.prototype.toString.call(fn) ==="[object Function]";
}
function isDate(date){
    return Object.prototype.toString.call(date) ==="[object Date]";
}
function cloneObject(obj){

    //数组
    if(isArray(obj)){
        var thisarray = obj.valueOf();
        var newarray = [];
        for (var i=0; i<thisarray.length; i++) {
            newarray.push(cloneObject(thisarray[i]));
        }
        return newarray;
    }

    //数字、布尔值、字符串
    if(typeof obj === "number" || typeof obj === "boolean" || typeof obj === "string"){
        return obj.valueOf();
    }

    //日期
    if(isDate(obj)){
        return new Date(obj.valueOf());
    }

    //object
    if (typeof obj === "object") {
        var Constructor = obj.constructor;
        var newobj = new Constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                if (typeof(obj[attr]) !== "function") {
                    if (obj[attr] === null) {
                        newobj[attr] = null;
                    }
                    else {
                        newobj[attr] = cloneObject(obj[attr]);
                    }
                }
            }
        }
        return newobj;
    };
}

function uniqArray(arr){
    if(!isArray(arr)){
        return arr;
    }
    var new_array = [];
    for(var i = 0 ; i < arr.length ; i++){
        if (new_array.indexOf(arr[i]) < 0 ) {
            new_array.push(arr[i]);
        };
    }
    return new_array;
}

function trim(str){
    if(!typeof str === "string"){
        return str;
    }
    if(str[0] === " " || str[0] === "　" || str[0] === "    "){
        str = trim(str.slice(1,str.length));
    }
    if(str[str.length-1] === " " || str[str.length-1] === "　" || str[str.length-1] === "    "){
        str = trim(str.slice(0,str.length-1));
    }
    return str;
}

function each(arr,fn){
    if(!isArray(arr)){
        return false;
    }
    if(!isFunction(fn)){
        return false;
    }
    for(var i = 0 ; i < arr.length ; i++){
        fn(arr[i],i);
    }
}

function getObjectLength(obj){
    if(!typeof obj === "string"){
        return false;
    }
    var key, counter = 0;
    for(key in obj){
        counter++;
    }
    return counter;
}

function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}

function isMobilePhone(phone){
    var reg = /^1[3458][0-9]\d{8}$/;
    return reg.test(phone);
}

function addClass(ele,classname){
    ele.className = ele.className + " " + classname;
}

function removeClass(ele,classname){
    var reg = new RegExp('(\\s|^)' + classname + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
}

//后面的类选择器会用到这个函数
function hasClass(ele,classname){    
    var cNames=ele.className.split(/\s+/);   
    for(var i=0;i<cNames.length;i++){    
        if(cNames[i]==classname) 
            return true;
    }
    return false;    
}

function isSiblingNode(ele1,ele2){
    for(var i = 0 ; i < ele1.parentNode.childNodes.length ; i++){
        if(ele2 === ele1.parentNode.childNodes[i]){
            return true;
        }
    }
    return false;
}

function getPosition(){
    var x = document.body.scrollTop;
    var y = document.body.scrollLeft;
    return{
        x : x,
        y : y
    };
}

function toArray(obj){
    var arr = [];
    for( var i = 0 ; i < obj.length ; i++){
        arr.push(obj[i]);
    }
    return arr;
}

function isElementInArray(arr,ele){
    for(var i = 0 ; i < arr.length ; i++){
        if(arr[i] == ele){
            return true;
        }
    }
    return false;
}

function searchParent(ele,selector){
    var all = $(selector);
    if(!isArray(all)){
        var temp = [all];
        all = temp;
    }
    if(ele.parentNode){
        if(isElementInArray(all,ele.parentNode)){
            return true;
        }else{
            return searchParent(ele.parentNode,selector);
        }
    }else{
        return false;
    }
}

function fliterByParent(ele_array,selector){
    var temparr = toArray(ele_array);
    for(var i = 0 ; i < temparr.length ; i++){
        if(!searchParent(temparr[i],selector)){
            temparr.splice(i,1);
            i = i - 1;
        }
    }
    return temparr;
}

function $(selector){
    if(!typeof selector === "string"){
        return false;
    }

    //多层
    if(trim(selector).split(" ").length > 1){
        var all = trim(selector).split(" ");
        var root = $(all[all.length-1]);
        if(!root.length){
            return root;
        }
        if(!isArray(root)){
            root = toArray(root);
        }
        for(var i = 2 ; i < all.length+2 && all.length-i >=0 ; i++){
            root = fliterByParent(root,all[all.length-i]);
        }
        return root;
    }


    //ID选择器
    if(/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/.test(selector)){
        return document.getElementById(selector.slice(1,selector.length));
    }


    //tag选择器，只返回第一个
    if(/^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/.test(selector)){
        return document.getElementsByTagName(selector)[0];
    }


    
    /*
    class选择器，返回全部匹配项，复合选择器的实现需要匹配全部，所以只能暂时用这个
    */
    if(/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/.test(selector)){
        if(document.getElementsByClassName){
            return document.getElementsByClassName(selector.slice(1,selector.length));
        }

        var nodes = document.all ? document.all : document.getElementsByTagName('*');
        var arr=[];//用来保存符合的className；    
        for(var i=0;i<nodes.length;i++){
            if(hasClass(nodes[i],selector.slice(1,selector.length))){
                arr.push(nodes[i]);
            }
        }
        return arr;
    }

    /*
    下面是符合任务要求的class选择器，只返回第一个匹配项。
    if(/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/.test(selector)){
        if(document.getElementsByClassName){
            return document.getElementsByClassName(selector.slice(1,selector.length))[0];
        }

        var nodes = document.all ? document.all : document.getElementsByTagName('*');
        for(var i=0;i<nodes.length;i++){
            if(hasClass(nodes[i],selector.slice(1,selector.length))){
                return nodes[i];
            }
        }    
    }
    */

    //属性选择器
    var reg_attr = /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/; 
    if(reg_attr.test(selector)){
        var dataname = reg_attr.exec(selector)[1];
        if(reg_attr.exec(selector)[5]){
            var datavalue = reg_attr.exec(selector)[5];
        }
        var nodes = document.all ? document.all : document.getElementsByTagName('*');
        if(datavalue){
            for(var i=0;i<nodes.length;i++){
                if(nodes[i].getAttribute(dataname) == datavalue){
                    return nodes[i];
                }
            }
        }else{
            for(var i=0;i<nodes.length;i++){
                if(nodes[i].hasAttribute(dataname)){
                    return nodes[i];
                }
            }
        }
    }
}

function addEvent(ele,event,listener){
    ele.addEventListener(event,listener,false);
}

function removeEvent(ele,event,listener){
    ele.removeEventListener(event,listener,false);
}

function addClickEvent(ele, listener) {
    addEvent(ele,"click",listener);
}

function addEnterEvent(ele, listener) {
    ele.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            listener();
        }
    }
}

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;
$.delegate = delegateEvent;

function delegateEvent(ele, tag, eventName, listener) {
    $.on(ele,eventName,function(){
        var e = arguments[0] || window.event,
        target = e.srcElement ? e.srcElement : e.target;
        if(target.tagName == tag || target.tagName.toLowerCase() == tag){
            listener();
        }
    })
}

function isIE(){
    //只有IE支持ActiveX控件
    if(window.ActiveXObject){
        return navigator.userAgent.slice(8,11);
    }else{
        return -1;
    }
}

function setCookie(name,value,expire) {
    document.cookie = name + "=" + value + ";expires=" + expire;
}

function getCookie(name) {
    var cookie = document.cookie.split(";");
    var value;
    each(cookie,function(item,index){
        if(trim(item.split("=")[0]) == name){
            value =  item.split("=")[1];
        }
    })
    return value;
}

function ajax(url, options) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function()
    {
        if(xhr.readyState==4 && xhr.status==200 && options.hasOwnProperty("onsuccess"))
        {
            options.onsuccess(xhr.responseText,xhr);
        }
        if(xhr.status==404 && options.hasOwnProperty("onfail")){
            options.onfail(xhr.responseText,xhr);
        }
    }

    var data = "";
    if(options.hasOwnProperty("data")){
        for(var attr in options.data){
            data= data + attr + "=" + options.data[attr] +"&"
        }
        data = data.slice(0,data.length-1);
        console.log(data);
    }

    if(options.hasOwnProperty("type")){    
            if(options.type === "POST" || options.type.toUpperCase() === "POST"){
                var method = "POST";
                var ajaxurl = url;
                xhr.open(method,ajaxurl,true);
                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xhr.send(data);
            }else{
                console.log("get");
                var method = "GET";
                var ajaxurl = url +"?" + data;
                xhr.open(method,ajaxurl,true);
                xhr.send();
            }
    }

}