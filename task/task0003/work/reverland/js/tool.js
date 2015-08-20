function isArray(arr) {
    return /Array/.test(Object.prototype.toString.call(arr));
}

function isFunction(fn) {
    return /Function/.test(Object.prototype.toString.call(fn));
}

function isObject(O) {
    return typeof O == 'object';
}

function isDate(d) {
    return /Date/.test(Object.prototype.toString.call(d));
}

function cloneObject(src) {
    if (isDate(src) || typeof src !== 'object') {
        return src;
    }
    //先array
    if (isArray(src)) {
        var re = [];    //var very important！
        for (var i in src) {
            re[i] = cloneObject(src[i])
        }
        return re;
    }
    // object
    if (isObject(src)) {
        var re = {};
        for (var i in src) {
            re[i] = cloneObject(src[i]);
        }
        return re;
    }
}

function uniqArray(arr) {
    var re = [];
    for (var i in arr) {
        if (re.indexOf(arr[i]) === -1){
            re.push(arr[i]);
        }
    }
    return re;
}

function trim(str) {
    //想起了多年前用C实现trim的经历
    var trim = "\t\u3000 "
    var p1 = 0;
    var p2 = str.length;
    for (var i = 0; i < str.length; i++) {
        if (trim.indexOf(str[i]) !== -1){
            p1++;
        } else {
            break;
        }
    }
    for (var i = str.length - 1; i >= 0; i--) {
        if (trim.indexOf(str[i]) !== -1){
            p2--;
        } else {
            break;
        }
    }
    re = str.substring(p1, p2);
    return re;
}

function trim(str) {
    return str.replace(/^\s*/, "").replace(/\s*$/, "");
}

function each(arr, fn) {
    for (var i = 0; i < arr.length; i ++) {
        fn(i, arr[i]);
    }
}

function getObjectLength(obj) {
    var counter = 0;
    for (var i in obj) {
        counter++;
    }
    return counter;
}

function isEmail(emailStr) {
    re = new RegExp("[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?")
    return re.test(emailStr);
}

function isMobilePhone(phone) {
    return /1\d{10}/.test(phone);
}

//task 3

function addClass(element, newClassName) {
    element.classList.add(newClassName);
}

function removeClass(element, oldClassName) {
    element.classList.remove(oldClassName);
}

function isSiblingNode(element, siblingNode) {
    if (element === siblingNode) {
        //自己和自己比啥啊
        return false;
    }
    element = element.parentNode.firstChild;
    while (element.nextSibling) {
        var element = element.nextSibling;
        if (element === siblingNode) {
            return true;
        }
    }
    return false;
}

function getPosition(element) {
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
    } while (element = element.offsetParent)
    return {x: x,
            y: y};
}

// mini $
// 竟然有浏览器不支持getelementsbyclassname
function $(selector) {
    // 还可以getElementsByTagName而不用children递归
    selector = trim(selector);
    selectorArray = selector.split(/\s+/);
    element = document.body;
    for (var i in selectorArray) {
        if (!element) {
            return undefined;
        }
        s = selectorArray[i];
        // id
        if (s[0] === "#") { //id
            function traversei(ele) {
                if (ele.getAttribute && ele.getAttribute("id") === s.substr(1)) {
                    return ele;
                }
                for (var i = 0; i < ele.children.length; i++){
                    var re = traversei(ele.children[i]);
                    if (re){
                        return re;
                    }
                }
            }
            element = traversei(element);
        } else if (s[0] === ".") {
            function traversec(ele) {
                if (ele.getAttribute && ele.getAttribute("class") === s.substr(1)) {
                    return ele;
                }
                for (var i = 0; i < ele.children.length; i++){
                    var re = traversec(ele.children[i]);
                    if (re){
                        return re;
                    }
                }
            }
            element = traversec(element);
        } else if (s[0] === "[" && s[s.length-1] === "]" && s.indexOf("=") === -1) {
            function traverse(ele) {
                if (ele.hasAttribute((s.substring(1, s.length-1)))) {
                    return ele;
                }
                for (var i = 0; i < ele.children.length; i++){
                    var re = traverse(ele.children[i]);
                    if (re){
                        return re;
                    }
                }
            }
            element = traverse(element);
        } else if (s[0] === "[" && s[s.length-1] === "]" && s.indexOf("=") !== -1) {    // 这。。。
            kv = s.substring(1, s.length-1).split("=")
            function traverse1(ele) {
                if (ele.getAttribute && ele.getAttribute(kv[0]) === kv[1]) {
                    return ele;
                }
                for (var i = 0; i < ele.children.length; i++){
                    var re = traverse1(ele.children[i]);
                    if (re) {
                        return re;
                    }
                }
            }
            element = traverse1(element);
        } else {
            element = element.getElementsByTagName(s).item(0);
        }
    }
    return element;
}

//task 4
//4.1

function addEvent(element, event, listener) {
    if (!element) {
        return;
    }
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

// FIXME: 移除所有listener？？
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    } else {
        element["on" + event] = null;
    }
}

function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

function addEnterEvent(element, listener) {
    addEvent(element, "enter", listener);
}

//

//$.on = addEvent;
//$.un = removeEvent;
//$.click = addClickEvent;
//$.enter = addEnterEvent;

//FIXME: IE8 really works?
function delegateEvent(element, tag, eventName, listener) {
    $.on(element, eventName, function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target && target.nodeName.toLowerCase() === tag) {
            listener(e);
        }
    });

}

//$.delegate = delegateEvent;

// 封装减少$
$.on = function(selector, event, listener) {
    addEvent($(selector), event, listener);
}

$.click = function(selector, listener) {
    addClickEvent($(selector), listener)
}

$.un = function(selector, event, listener) {
    removeEvent($(selector), event, listener);
}

$.delegate = function(selector, tag, event, listener) {
    // 给跪了。。。delegate使用on了
    delegateEvent(selector, tag, event, listener);
}

// task5
//

function isIE() {
    var b = document.createElement('b');
    b.innerHTML = '<!--[if IE]><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1;
}

//http://blog.csdn.net/liuyong0818/article/details/4807473
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    // getDate可以接受比月份天数大的数啊
    exdate.setDate(exdate.getDate() + expiredays);
    // cookie对象赋值不会覆盖原有值
    document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(cookieName) {
    //首先得有cookie
    if (document.cookie.length <= 0) {
        return;
    }
    var c_start = document.cookie.indexOf(cookieName + "=")
    if (c_start != -1) {
        c_start = c_start + cookieName.length + 1;
        c_end= document.cookie.indexOf(";", c_start);
        // 最后的话
        if (c_end === -1) {
            c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start,c_end))
    }
}

// task6
//
function ajax(url, options) {
    var xmlhttp = XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            options.onsuccess(xmlhttp.responseText, xmlhttp);
        } else {
            options.onfail(xmlhttp);
        }

    }
    xmlhttp.open(options.type, url, true);
    xmlhttp.send();
}
