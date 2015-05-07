// 判断arr是否为一个数组，返回一个bool值
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

// 判断fn是否为一个函数，返回一个bool值
function isFunction (fn){
    return Object.prototype.toString.call(fn) ==="[object Function]";
}

// 判断date是否为一个日期对象，返回一个bool值
function isDate(date){
    return Object.prototype.toString.call(date) ==="[object Date]";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
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
    //这里对象的复制考虑到了constructor的问题
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

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
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

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
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

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
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

// 获取一个对象里面第一层元素的数量，返回一个整数
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

// 判断是否为邮箱地址
function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}

// 判断是否为手机号
function isMobilePhone(phone){
    var reg = /^1[3458][0-9]\d{8}$/;
    return reg.test(phone);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(ele,classname){
    ele.className = ele.className + " " + classname;
}

// 移除element中的样式oldClassName
function removeClass(ele,classname){
    var reg = new RegExp('(\\s|^)' + classname + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
}

//后面的类选择器会用到这个函数，不是作业要求的
function hasClass(ele,classname){    
    var cNames=ele.className.split(/\s+/);   
    for(var i=0;i<cNames.length;i++){    
        if(cNames[i]==classname) 
            return true;
    }
    return false;    
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(ele1,ele2){
    for(var i = 0 ; i < ele1.parentNode.childNodes.length ; i++){
        if(ele2 === ele1.parentNode.childNodes[i]){
            return true;
        }
    }
    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(){
    var x = document.body.scrollTop;
    var y = document.body.scrollLeft;
    return{
        x : x,
        y : y
    };
}

//把类数组对象变成真正的数组，后面复合选择器会用到，不是作业要求的
function toArray(obj){
    var arr = [];
    for( var i = 0 ; i < obj.length ; i++){
        arr.push(obj[i]);
    }
    return arr;
}

//判断数组中是否存在某个元素，后面复合选择器会用到，不是作业要求的
function isElementInArray(arr,ele){
    for(var i = 0 ; i < arr.length ; i++){
        if(arr[i] == ele){
            return true;
        }
    }
    return false;
}

//在ele的父元素集合中，搜索是否存在符合selector的元素，后面复合选择器会用到，不是作业要求的
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

//根据searchParent的结果过滤集合
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


// 实现一个简单的Query
function $(selector){
    console.log("aaa");
    if(!typeof selector === "string"){
        return false;
    }

    //复合选择器
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
        console.log("ID");
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

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(ele,event,listener){
    ele.addEventListener(event,listener,false);
}

function removeEvent(ele,event,listener){
    if(listener){
        ele.removeEventListener(event,listener,false);
    }else{
        var html = ele.outerHTML;
        var parentNode = html.parentNode;
        parentNode.innerHTML = html;
    }
}

// 实现对click事件的绑定
function addClickEvent(ele, listener) {
    addEvent(ele,"click",listener);
}

// 实现对于按Enter键时的事件绑定
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

// 事件代理
function delegateEvent(ele, tag, eventName, listener) {
    $.on(ele,eventName,function(){
        var e = arguments[0] || window.event,
        target = e.srcElement ? e.srcElement : e.target;
        if(target.tagName == tag || target.tagName.toLowerCase() == tag){
            listener();
        }
    })
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE(){
    //只有IE支持ActiveX控件
    if(window.ActiveXObject){
        return navigator.userAgent.slice(8,11);
    }else{
        return -1;
    }
}

// 设置cookie
function setCookie(name,value,expire) {
    document.cookie = name + "=" + value + ";expires=" + expire;
}

// 获取cookie值
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