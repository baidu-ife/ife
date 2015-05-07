/**
 * Created by wsk on 15/4/18.
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr).slice(8, -1) === 'Array';
}
function isFunction(func) {
    return Object.prototype.toString.call(func).slice(8, -1) === 'Function';
}
function Slice(){
    return  Array.prototype.slice;
}
function bind(func, context){
    var _args = Slice.call(arguments, 2);
    var bound = function(){
        var args = Slice.call(arguments, 0);
        return func.apply(context, _args.concat(args));
    }
    bound.$func = func;
    return bound;
}

function bindAll(obj, context){
    context = context || obj;
    for(p in obj){
        if(! isFunction(obj[p])) continue;
        obj[p] = bind(obj[p], context);
    }
    return obj;
}

function cloneObject(src) {
    // your implement
    var clone;
    if ('object' != typeof src || null == src) return src;

    else if (isArray(src)) {
        clone = [];
        for (var i = 0, len = src.length; i < len; i++)
            clone[i] = cloneObject(src[i]);
    }
    else if (src instanceof Date) {
        clone = new Date();
        clone.setTime(src.getTime());
    }
    else if (src instanceof Object) {
        clone = {};
        for (var attr in src) {
            if (src.hasOwnProperty(attr)) clone[attr] = cloneObject(src[attr]);
        }
    } else {
        throw new Error("can't copy this type!");
    }
    return clone;
}


var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi", [1, 2]],
        b2: "JavaScript",
        b3: true
    },
    c: new Date()
};

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var uniqArr = [], o = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (o.hasOwnProperty(arr[i]))continue;
        o[arr[i]] = 1;
        uniqArr.push(arr[i]);
    }
    return uniqArr;
}


// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    // your implement
    var ret = '';
    for (var i = 0, len = str.length; i < len; i++) {
        if (-str[i] !== 0 || str[i] === '0') {
            ret += str[i];
        }
    }
    return ret;
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    // your implement
    if (arr.forEach === Array.prototype.forEach) {
        arr.forEach(function (item, i) {
            fn.call(null, item, i);
        });
    }
    else {
        for (var i = 0, len = arr.length; i < len; i++) {
            fn.call(null, arr[i], i);
        }
    }
}
function indexOf(array, item){
    if(array.indexOf)
    return array.indexOf(item);
    else
    for(var i = 0; i < array.length; i++){
        if(array[i] === item)
        return i;
    }
    return -1;
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    cnt = 0;
    for (attr in obj) {
        if (!obj.hasOwnProperty(attr)) continue;
        cnt++;
    }
    return cnt;
}


// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    return /^1\d{10}$/.test(phone);
}

//add your own insertAfter----------------------------------------------
function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    console.log(parent.lastElementChild);
    console.log(targetElement);
    //if the parents lastchild is the targetElement...
    if(parent.lastElementChild === targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    if (element.classList)
        element.classList.add(newClassName);
    else {
        if (element.className.indexOf(newClassName) != -1)
            element.className += ' ' + newClassName;
    }
}

function hasClass(element, ClassName){
    if(element.className){
        return indexOf(element.className, ClassName) != -1;
    }else{
        return element.className.indexOf(ClassName) != -1;
    }
}

function addClass(element, newClassName) {
    // your implement
    if (element.classList)
        element.classList.add(newClassName);
    else {
        if (element.className.indexOf(newClassName) != -1)
            element.className += ' ' + newClassName;
    }
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    if (element.classList)
        element.classList.remove(oldClassName);
    else {
        var pos = element.className.indexOf(oldClassName);
        if(pos == -1)
            return;
        element.className = element.className.slice(0, pos).concat(element.className.slice(pos + oldClassName.length));
    }
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return siblingNode.parentNode === element.parentNode;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    for (var elem = element; elem !== null; elem = elem.offsetParent) {
        x += elem.offsetLeft;
        y += elem.offsetRight;
    }
    for (var elem = element.parentNode; elem !== null && e.nodeType == 1; elem = elem.parentNode) {
        x -= elem.scrollLeft;
        y += elem.scrollTop;
    }
    return {x: x, y: y};
}
// your implement
// 实现一个简单的Query
String.prototype.trimMoreSpace = function () {
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    trimMore = /[\s\uFEFF\xA0]+/g;
    return this.replace(rtrim, "").replace(trimMore, " ");

}

function childLen(){
    return this.childElementCount;
}

function $(selectors, root) {
    root = root == null ? document : root;
    //return document.querySelector(selector);
    //return Array.prototype.slice.call(this,querySelectorAll(selector));

    selectors = ''.trimMoreSpace.call(selectors);
    var selectorArr = selectors.split(" ");
    var elements = new Array();//all elements by serious of selector
    var selector;
    var element;

    for (var i = 0; i < selectorArr.length; i++) {
        selector = selectorArr[i];
        element = null;
        if (typeof selector == 'string') {//id
            if (/^#(.+)+$/.test(selector)) {
                selector = /^#(.+)$/.exec(selector)[1];
                element = root.getElementById(selector);

            } else if (/^\.(.+)$/.test(selector)) {//class
                selector = selector.match(/^\.(.+)$/)[1].replace(/\./g, ' ');
                elements = root.getElementsByClassName(selector);

            } else if (/^(\[)(.+)(\])$/.test(selector)) {//attr
                selector = /^(\[)(.+)(\])$/.exec(selector)[2];
                var attr = selector.split("=");
                var tmp = root.getElementsByTagName('*');
                myLog(attr[1]);
                if (attr[1] == undefined) {
                    for (var j = 0, len = tmp.length; j < len; j++) {
                        if (tmp[j].hasAttribute(attr[0])) {
                            elements.push(tmp[j]);
                        }
                    }
                }
                else {
                    for (var j = 0, len = tmp.length; j < len; j++) {
                        if (tmp[j].hasAttribute(attr[0]) && (tmp[j].getAttribute(attr[0]) == attr[1])) {
                            elements.push(tmp[j]);
                        }
                    }
                }

            } else {//tag
                elements = document.getElementsByTagName(selector);
            }
        }
        root = element;
    }

    //return
    if (elements.length > 0){
        element = elements[0];
        element.allElems = elements//
    }

        return element;
}
//

// 可以通过id获取DOM对象，通过#标示，例如


// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if (element.addEventListener) {
        element.addEventListener(event, listener, true);
    } else {//IE
        element.attachEvent("on" + event, function (event) {
            listener.call(element, event);
        });
    }
}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    // your implement
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, true);
    } else {
        element.detachEvent("on" + event, listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    addEvent(element, 'click', listener);
}



// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    addEvent(element, 'keydown', function (e) {
        if (e.type == 'keydown' && e.keyCode === 13)
            listener.call(element);
    });
}
$.on = addEvent, $.un = removeEvent, $.click = addClickEvent, $.enter = addEnterEvent;



var EventUtil = {
    getTarget: function (e) {
        return e.target || e.srcElement;
    },
    stopPropagation: function (event) {
        if (event.stopPropagation)
            event.stopPropagation();
        else
            event.cancelBubble = true;
    },
    preventDefault: function(e){
        if(e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
    }
}
//允许为一组元素添加代理
function delegateEvent(elements, tag, eventName, listener) {
    // your implement
    elements = elements.length ? elements : [elements]

    for(var i = 0; i < elements.length; i++){
        var element = elements[i];

        addEvent(element, eventName, function (event) {
            var target = EventUtil.getTarget(event);
            // console.log(target.tagName);
            if (target.tagName.toLowerCase() == tag) {
                listener.call(target, event);
            }
        });
    }
}

$.delegate = delegateEvent;


$.on = function (selector, event, listener, extra) {
    // your implement
    typeof selector == 'string'? addEvent($(selector), event, listener) : addEvent(selector, event, listener);
}

$.click = function (selector, listener) {
    // your implement
    addClickEvent($(selector), listener);
}

$.un = function (selector, event, listener) {
    // your implement
    removeEvent($(selector), listener);
}

$.delegate = function (selector, tag, event, listener) {
    // your implement
    if(typeof  selector === 'string')
    delegateEvent($(selector), tag, event, listener);
    else
    {
        var elem = selector;
        delegateEvent(elem, tag, event, listener);
    }
}


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var ua = Navigator.userAgent;
    var match = /MSIE([^;]+)/.exec(ua);
    var version = -1;
    if (match != null) {
        version = parseFloat(match[1]);
    }
    return version;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var cookieText = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue);
    if (expiredays instanceof  Date) {
        cookieText += "; expires=" + expiredays.toUTCString();
    }
    document.cookie = cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    cookieName = decodeURIComponent(cookieName) + '=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;

    if (cookieStart != -1) {
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1)
            cookieEnd = document.cookie.length;
        cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
    }
    return cookieValue;
}

//ALL ABOUT AJAX
function serializeForm(form) {
    var parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;

    for (i = 0, len = form.length; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
            case "select-one":
                ;
            case "select-multiple":
                if (field.name.length !== 0) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = '';
                            if (option.hasAttribute) {//
                                optValue = option.hasAttribute('value') ? option.value : option.text;
                            } else {//compatible with ie
                                optValue = option.attributes['value'].specified ? option.value : option.text;
                            }
                            parts.push(encodeURIComponent(field.name) + '='
                            + encodeURIComponent(optValue));
                        }

                    }
                }
                break;
            case undefined:
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;
            case "radio":
            case "checkbox":
                if (!field.checked)
                    break;
            default :
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + '='
                    + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}

function ajax(url, options) {
    // your implement
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            options.onsuccess(xhr.responseText);
        }
        else {
            options.onfail(xhr.responseText);
        }
    }
    xhr.open(options.type, url, true);
    if (options.type.toLowerCase() == 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(serializeObj(options.data));
    }
    else
        xhr.send(null);
}

function addURLParam(url, key, value) {
    url += (url.indexOf('?') == -1 ? '?' : '&');
    url += encodeURIComponent(key) + '=' + encodeURIComponent(value);
    return url;
}

function serializeObj(ob) {
    var parts = [];
    for (a in ob) {
        parts.push(a + '=' + ob[a]);
    }
    return parts.join("&");
}
//------------------------------------------------------
//http://ejohn.org/blog/javascript-micro-templating/
//---------------------tmpl from ejohn
var tmplCache = [];
function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.

    var fn = !/\W/.test(str) ?
        tmplCache[str] = tmplCache[str] || tmpl(document.getElementById(str).innerHTML) :

        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

                // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

                // Convert the template into pure JavaScript
            str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
            + "');}   return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
};

