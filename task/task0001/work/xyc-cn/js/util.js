/**
 * Created by xieyicheng on 2015/4/17.
 */
//任务2
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr){
    return arr instanceof(Array);
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn == 'function';
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var ret = src,i;
    if(isArray(src)){
        ret=[];
        for(i= 0,length = src.length;i<length;i++){
            if(typeof src[i] === 'object'){
                ret[i]= cloneObject(src[i]);
            }
            else{
                ret[i]=src[i];
            }
        }
        return ret;
    }
    if(src instanceof Object){
        ret = {};
        for(i in src) {
            if(typeof src[i] === 'object'){
                ret[i]= cloneObject(src[i]);
            }
            else{
                ret[i]=src[i];
            }
        }
        return ret;
    }

    return ret;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
   if(isArray(arr)){
       var ret = [];
       for(var i= 0,j = 0,length = arr.length;i<length;i++){
           if(ret.indexOf(arr[i])==-1){
               ret[j++] = arr[i];
           }
       }
       return ret;
   }
    else{
       throw new TypeError();
   }
}
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    var i;
    for (i = 0; i < str.length; i++) {
        if(str.charAt(i)!=' '&&str.charAt(i)!='    '){
            break;
        }
    }
    str=str.substring(i,str.length);

    for(i=str.length-1;i>=0;i--)
    {
        if(str.charAt(i)!=' '&&str.charAt(i)!=' ')break;
    }
    str=str.substring(0,i+1);
    return str;
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    if(arr.length===+arr.length){
        for (var i = 0; i < arr.length; i++) {
            fn.call(this,arr[i],i);
        }
    }
    else{
        throw new TypeError()
    }
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0,key;
    for(key in obj){
        count++;
    }
    return count;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.test();
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return phone.test()
}

//任务3
function hasClass(element,className){
    var elementClass = element.className,
        classList = elementClass.split(/\s+/);
    key = 0;
    for(key in classList) {
        if(classList[key] == className) {
            return true;
        }
    }
    return false;
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(element.classList){
        element.classList.add(newClassName);
    }
    else{
        if(!hasClass(element,newClassName)){
            element.className = element.className + " " + newClassName;
        }
    }
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    if(element.classList){
        element.classList.remove(oldClassName);
    }
    else{
        if (hasClass(element, oldClassName)) {
            var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
        }
    }
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var nodeList = element.parentNode.childNodes;
    for (var i = 0; i < nodeList.length; i++) {
       if(nodeList[i] == siblingNode){
           return true;
       }
    }
    return false;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var top = document.documentElement.clientTop;//ie的Bug
    var left= document.documentElement.clientLeft;
    return{
        x:element.getBoundingClientRect().left-left,
        y:element.getBoundingClientRect().top-top
    }
}

//任务4
// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(document.addEventListener){
        element.addEventListener(event,listener,false)
    }
    else{
        element.attachEvent("on"+event, listener);
    }
}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    if(document.removeEventListener){
        element.removeEventListener(event,listener,false)
    }
    else{
        element.detachEvent("on"+event, listener);
    }
}

// 实现一个简单的Query
var $ = function (selector) {
        var result = document.querySelectorAll(selector);
        if (result.length == 1) {
            return result[0];
        }
        return result;
};

$.on = function (selector, event, listener) {
    var nodeList = $(selector);
    if (document.addEventListener) {
        if(nodeList.length){
            each(nodeList, function (item,index) {
                item.addEventListener(event, listener, false);
            });
        }
        else{
            $(selector).addEventListener(event, listener, false);
        }
    }
    else {
        if(nodeList.length){
            each(nodeList, function (item,index) {
                item.attachEvent("on"+event, listener);
            })
        }
        else{
            $(selector).attachEvent("on"+event, listener);
        }
    }
};

$.un = function (selector, event, listener) {
    var nodeList = $(selector);
    if(document.removeEventListener){
        if(nodeList.length){
            each(nodeList, function (item,index) {
                item.removeEventListener(event, listener, false);
            });
        }
        else{
            $(selector).removeEventListener(event, listener, false);
        }
    }
    else{
        if(nodeList.length){
            each(nodeList, function (item,index) {
                item.detachEvent("on"+event, listener);
            })
        }
        else{
            $(selector).detachEvent("on"+event, listener);
        }
    }
};

$.click = function (selector, listener) {
    $.on(selector,'click',listener);
};

$.enter = function(element, listener) {
    if (document.addEventListener) {
        element.addEventListener('keydown', function (e) {
            // 兼容FF和IE和Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                listener();
            }
        }, false)
    }
    else {
        element.attachEvent("keydown", function (e) {
            // 兼容FF和IE和Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                listener();
            }
        });
    }
};

$.delegate = function(selector, tag, eventName, listener){
        $.on(selector,eventName, function (e) {
            var theEvent = e || window.event;
            if(theEvent.target.nodeName.toLowerCase() == tag){
                listener(theEvent)
            }
        });
};


//任务5
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        return true;
    }
    else{
        return false;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exp = new Date();
    exp.setTime(exp.getTime() + expiredays*24*60*60*1000);
    document.cookie = cookieName + "="+ escape (cookieValue) + ";expires=" + exp.toGMTString();
}
// 获取cookie值
function getCookie(cookieName) {
    if (document.cookie.length>0)
    {
        var c_start=document.cookie.indexOf(cookieName + "="),c_end;
        if (c_start!=-1)
        {
            c_start=c_start + cookieName.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return ""
}

//任务6
//
function ajax(url, options) {
    var xmlhttp,
        type = options.type?options.type:"get",
        data="",
        onsuccess = options.onsuccess,
        onfail = onfail;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

}
