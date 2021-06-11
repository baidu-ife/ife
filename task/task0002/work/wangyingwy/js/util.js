var arr = [1,2,3,4,5,6];

function isArray1(arr) {
    console.log(arr instanceof Array);
    console.log("isArray1");
    /*instanceof操作符问题在于，他假定只有一个全局执行环境，如果网页中有多个框架，那实际上就存在两个不同的全局执行环境，从而存在两个以上不同版本的Array构造函数。如果我从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有不同的构造函数*/
}

isArray1(arr);

function isArray2(arr) {
    console.log(Array.isArray(arr));
    console.log("isArray2");
    /*Array.isArray()适用于ie9+及其他高级浏览器*/
}

isArray2(arr);

function isArray3(arr) {
    console.log(Object.prototype.toString.call(arr) === '[object Array]');
    console.log("isArray3");
    /*call改变toString的this引用作为待检测的对象，返回此对象的字符串表示，然后对比此字符串是否是'[object Array]'，以判断其是否是Array的实例。用call方法防止对象中的toString方法被重写，此方法解决跨frame对象构建的问题，兼容性也很好*/
}

isArray3(arr);

var fn = function() {};

function isFunction1(fn) {
    console.log(typeof (fn) === "function");
    console.log("isFunction1");
}

isFunction1(fn);

function isFunction2(fn) {
    console.log(Object.prototype.toString.call(fn) === '[object Function]');
    console.log("isFunction2");
}

isFunction2(fn);

function cloneObject(src) {
    var result,oClass = isClass(src);
    /*确定result的类型*/
    if(oClass === "Object") {
        result = {};
    }else if(oClass === "Array") {
        result = [];
    }else {
        return src;
    }
    for(var key in src) {
        var copy = src[key];
        if(isClass(copy) == "Object" || isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);//递归调用
        }else {
            result[key] = src[key];
        }
    }
    return result;
}

function isClass(obj) {
    if(obj === null) {
        return "Null";
    }else if(obj === undefined) {
        return "Undefined";
    }else {
        return Object.prototype.toString.call(obj).slice(8,-1);
    }
}

function cloneObject1(p,c) {
    var c = c || {};

    for(var i in p) {
        if(typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array)?[]:{};
            cloneObject1(p[i],c[i]);
        }else {
            c[i] = p[i];
        }
    }

    return c;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);
var tarObj1 = cloneObject1(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
console.log("cloneObject");

console.log(tarObj1.a);      // 1
console.log(tarObj1.b.b1[0]);    // "hello"
console.log("cloneObject1");


function uniqArray(arr) {
    var n = {},r = [];//n为hash表，r为临时数组
    for(var i = 0; i<arr.length; i++) {//遍历当前数组
        if(!n[arr[i]]) {//如果hash表中没有当前项
            n[arr[i]] = true;//存入hash表
            r.push(arr[i]);//把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}

var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]
console.log("uniqArray");

function trim(str) {
    var i;
    for(i = 0; i < str.length && str.charCodeAt(i) == 32; i++) {
        str = str.substring(i+1,str.length);
    }
    for(i = str.length-1; i >= 0 && str.charCodeAt(i) == 32; i--) {
        str = str.substring(0,i);
    }
    return str;
}

var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

function trim1(str) {
    var length = str.length;
    for(var i =0; i<length; i++){
        if(str.charCodeAt(i) != 32) {
            var l = i;
            break;
        }
    }
    for(var i = length-1; i>=0; i--) {
        if(str.charCodeAt(i) != 32) {
            var r = i;
            break;
        }
    }
    var newStr = str.substring(l,r);
    return newStr;
}
/*这个方法本来我是加上了tab的判定的，后来发现就算是去掉了tab的判定也是可以去掉tab的，我也不知道为什么，tab的ASCII码是9*/

var str = ' hi!    ';
str = trim1(str);
console.log(str);

function each(arr, fn) {
    for(var i in arr) {
        fn(arr[i],i);
    }
    return fn;
}

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item);
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

function getObjectLength(obj) {
    var len = 0;
    for(var i in obj) {
        len ++;
    }
    return len;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
console.log("getObjectLength");


function isEmail(emailStr) {
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+$/;
    return reg.test(emailStr);
}

var str = 'test@163.com';
console.log(isEmail(str));
var str1 = '48415';
console.log(isEmail(str1));
console.log("isEmail");

function isMobilePhone(phone) {
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return reg.test(phone);
}

var phone = '15649348888';
console.log(isMobilePhone(phone));
var phone1 = 'wywywywy';
console.log(isMobilePhone(phone1));
console.log("isMobilePhone");

function addClass(element, newClassName) {
    element.className += " " + newClassName;
}

function removeClass(element, oldClassName) {
    element.className = element.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " );
}

function isSiblingNode(element, siblingNode) {
    var ele = document.getElementsByTagName(element)[0];
    var siblingEle = document.getElementsByTagName(siblingNode)[0];
    if(ele.parentNode == siblingEle.parentNode) {
        return true;
    }else {
        return false;
    }
}

function getPosition(element) {
    var ele = document.getElementsByTagName(element)[0];
    var pos = ele.getBoundingClientRect();
    var x = pos.left + document.documentElement.scrollLeft;
    var y = pos.top + document.documentElement.scrollTop;
    return {"x":x,"y":y};
}
/*兼容性问题？*/

function $(selector) {
    var ele,tagName;
    switch (selector.charAt(0)) {
        case "#":
            ele = selector.substring(1);
            tagName = document.getElementById(ele);
            break;
        case ".":
            ele = selector.substring(1);
            tagName = document.getElementsByClassName(ele)[0];
            break;
        case "[":
            ele = selector.substring(1,selector.length-1);
            var eles = document.getElementsByTagName("*");
            for(var i=0;i<eles.length;i++) {
                if(ele.indexOf("=") != -1) {
                    var arr = ele.split("=");
                    if(arr[1] == eles[i].getAttribute(arr[0])) {
                        return eles[i];
                    }
                } else {
                    if(eles[i].getAttribute(ele)) {
                        return eles[i];
                    }
                }
            }
            break;
        default:
            tagName = document.getElementsByTagName(ele)[0];
            break;
    }
    return tagName;
}

function addEvent(element, event, listener) {
    if(element.addEventListener) {
       element.addEventListener(event, listener, false);
    }else {
        element.attachEvent("on"+event, listener);
    }
}

function removeEvent(element, event, listener) {
    if(element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }else {
        element.detachEvent("on"+event, listener);
    }
}

function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(e) {
        e = e || window.event;/*IE事件监听器内使用的是一个全局的Event对象，而w3c是将event对象作为参数传递给监听器。*/
        if(e.keyCode == 13) {
            addEvent(element, "keydown", listener);
        }
    })
}

$.on = function(element, event, listener) {
    addEvent(element, event, listener);
}

$.un = function(element, event, listener) {
    removeEvent(element, event, listener);
}

$.click = function(element, listener) {
    addClickEvent(element, listener);
}

$.enter = function(element, listener) {
    addEnterEvent(element, listener);
}

function delegateEvent(element, tag, eventName, listener) {
    function getEventTarget(e){
        e = e || window.event;
        var target = e.target||e.srcElement;
        if(target.tagName.toLowerCase() == tag){
            listener();
        }
    }
    addEvent(element,eventName,getEventTarget);
}

$.delegate = delegateEvent;

$.on = function(selector, event, listener) {
    var element = $(selector);
    addEvent(element, event, listener);
}

$.click = function(selector, listener) {
    var element = $(selector);
    addClickEvent(element, listener);
}

$.un = function(selector, event, listener) {
    var element = $(selector);
    removeEvent(element, event, listener);
}

$.delegate = function(selector, tag, event, listener) {
    var element = $(selector);
    delegateEvent(element, tag, event, listener);
}

function isIE() {
    if(window.addEventListener) {
        return -1;
    }else {
        var navigation = {};
        var ua = navigator.userAgent.toLowerCase();
        console.log(ua);
    }
}

isIE();

function setCookie(cookieName, cookieValue, expiredays) {
    var d = new Date();
    d.setTime(d.getTime() + expiredays*24*60*60*1000);
    var expires = "expires="+d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}
function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' '){
            c = c.substring(1);
        }
        if (c.indexOf(name) != -1){
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function Ajax(url,options){
    function fn(){}
    var type  = options.type    || 'GET',
        data    = options.data      || null,
        onsuccess = options.onsuccess   || fn,
        onfail = options.onfail   || fn;
    type  = type.toUpperCase();

    if(type == 'GET' && data){
        url += (url.indexOf('?') == -1 ? '?' : '&') + data;
        data = null;
    }

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.onreadystatechange = function(){
        _onStateChange(xhr,onsuccess,onfail);
    };

    xhr.open(type,url);
    if(type == 'POST'){
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
    }

    xhr.send(data);
    return xhr;
}
function _onStateChange(xhr,onsuccess,onfail){
    if(xhr.readyState == 4){
        var s = xhr.status;
        if(s>= 200 && s < 300){
            onsuccess(xhr);
        }else{
            onfail(xhr);
        }
    }else{}
}
