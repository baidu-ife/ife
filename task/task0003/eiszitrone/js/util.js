/******************************* Part 2 *********************************/

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    // return Object.prototype.toString.call(arr) === "[object Array]";
    return arr instanceof Array;
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    // return Object.prototype.toString.call(fn) === "[object Function]";
    return fn instanceof Function;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
    var clone;
    if (typeof src === "number" || typeof src === "string" || typeof src === "boolean") {
        clone = src;
    }
    else if (src instanceof Date) {
        clone = new Date(src);
    }
    else if (isArray(src)) {
        clone = [];
        for (var i = 0; i < src.length; ++i) {
            clone[i] = cloneObject(src[i]);
        }
    }
    else if (typeof src === "object" && src !== null){
        clone = {};
        for (var prop in src) {
            clone[prop] = cloneObject(src[prop]);
        }
    }
    return clone;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // 首先对数组进行排序
    if (arr.length === 0) return arr;

    var ret;
    if (typeof arr[0] === "string") {
        ret = cloneObject(arr);
        ret.sort();
    }
    else if(typeof arr[0] === "number") {
        ret = cloneObject(arr);
        ret.sort(function(a, b){return a - b;});
    }
    else {
        throw new Error("only accept array of number and string!");
    }

    // 进行去重
    var pos = 0;
    for (var j = 0; j < ret.length; ++j) {
        if (j === 0 || ret[j] !== ret[j - 1]) ret[pos++] = ret[j];
    }
    return ret.slice(0, pos);
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串

function simpleTrim(str) {
    // your implement
    var start = 0, end = str.length - 1;
    while (start < str.length) {
        if (str[start] === " " || str[start] === "\t" || str[start] === "\n" || str[start].charCodeAt(0) === 12288) ++start;
        else break;
    }
    if (start === str.length) return "";

    while (end >= start) {
        if (str[end] === " " || str[end] === "\t" || str[end] === "\n" || str[end].charCodeAt(0) === 12288) --end;
        else break;
    }
    return str.substring(start, end + 1);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    var re = /^\s+|\s+$/g;
    return str.replace(re, "");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
    // your implement
    for (var i = 0; i < arr.length; ++i) fn(arr[i], i);
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) ++count;
    }
    return count;
}

// 判断是否为邮箱地址
// 根据 http://www.regular-expressions.info/email.html 博文中的原理实现, 基于RFC 5322
// @符号前可以是xx.xx.xxx形式, x取值范围为[a-z0-9!#$%&'*+=?^_`{|}~-], @符号后yy.yy.yyy形式, y取值范围[a-z0-9-]， 且域名每个部分首字符和结束字符不能为连字符'-'

function isEmail(emailStr) {
    // your implement
    var re = /^([a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*)@((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i;
    return re.test(emailStr);
}

// 判断是否为手机号
// 根据 http://jingyan.baidu.com/article/a3761b2b8683341576f9aaaf.html， 中国所有手机号为11位， 前三位有效数字为:
// 移动：134、135、136、137、138、139、150、151、157(TD)、158、159、187、188
// 联通：130、131、132、152、155、156、185、186
// 电信：133、153、180、189
function isMobilePhone(phone) {
    // your implement
    var re = /^((13[0-9])|(15[^4])|(18[05-9]))\d{8}$/;
    return re.test(phone);
}

/******************************* Part 3 *********************************/
// 为element增加一个样式名为newClassName的新样式
function hasClass(element, className) {
    var re = new RegExp("\\b" + className + "\\b");
    if (re.exec(element.className)) return true;
    else return false;
}

function addClass(element, newClassName) {
    // your implement

    // 判断样式是否存在

    if (hasClass(element, newClassName)) return;

    // 方法1: 使用classList实现  ie8, ie9不支持
    // element.classList.add(newClassName);

    // 方法2
    element.className = element.className + " " + newClassName;
}

// 移除element中的样式oldClassName.g

function removeClass(element, oldClassName) {
    // your implement

    // 方法1: 使用classList实现  ie8, ie9不支持
    // element.classList.remove(oldClassName);

    // 方法2
    if(!element) return -1;
    var reg = new RegExp("\\s" + oldClassName + "\\b" + "|\\b" + oldClassName + "\\s|" + "\\b" + oldClassName + "\\b", "");
    element.className = element.className.replace(reg, "");
}


// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentElement === siblingNode.parentElement;

}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    };
}

function $(selector) {
    selector = trim(selector);
    var selectorArray = selector.split(/\s+/);
    var selectors = [];

    // 一个selector的类
    function oneSelector(content, type) {
        this.content = content;
        this.type = type;
    }

    // 将selector解析后存入变量 selectors
    for (var i = 0; i < selectorArray.length; ++i) {
        var idSelector = selectorArray[i].match(/^#(\S+)/);
        var classSelector = selectorArray[i].match(/^\.(\S+)/);
        var attrSelector = selectorArray[i].match(/^\[(\S+)\]$/);

        // 枚举选择器的类型
        var selectorType = {
            _id: 0,
            _class: 1,
            _attr: 2,
            _tag: 3
        };
        if (idSelector) selectors.push(new oneSelector(idSelector[1], selectorType._id));
        else if (classSelector) selectors.push(new oneSelector(classSelector[1], selectorType._class));
        else if (attrSelector) selectors.push(new oneSelector(attrSelector[1], selectorType._attr));
        else selectors.push(new oneSelector(selectorArray[i], selectorType._tag));
    }
    // 从跟节点开始 dfs搜索满足selectors条件的第一个节点
    return querySingleSelector(document.documentElement, selectors);
    
    function querySingleSelector(element, selectors) {
        // for ie 8
        if (window.Comment && element instanceof Comment) return null;
        var flag = true;
        //取出第一个选择器的内容
        var content = selectors[0].content;
        var type = selectors[0].type;

        switch (type) {
            case selectorType._id:
                if (element.id !== content) flag = false;
                break;
            case selectorType._class:
                if (!hasClass(element, content)) flag = false;
                break;
            case selectorType._attr:
                var parts = content.split("=");
                // for case like $("[data-log]")
                if (parts.length == 1) {
                    if (!element.hasAttribute(parts[0])) flag = false;
                }
                // for case like $("[data-time=2015]")
                else {
                    if (!(element.getAttribute(parts[0]) === parts[1])) flag = false;
                }
                break;
            case selectorType._tag:
                if (element.tagName !== content.toUpperCase()) flag = false;
        }
        // 当前节点满足第一个选择器
        if (flag) {
            // 还有其他选择器， 用剩余选择器继续查找
            if (selectors.length > 1) {
                var selectorsCopy = cloneObject(selectors);
                // 去除第一个选择器
                selectorsCopy.splice(0, 1);
                // 在子选择器中递归查找剩余选择器
                for (var i = 0; i < element.children.length; ++i) {
                    var sub = querySingleSelector(element.children[i], selectorsCopy);
                    if (sub) return sub;
                }
            }
            else return element;
        }
        // 当前节点不满足第一个选择器， 在子节点中继续递归查找
        else {
            for (var i = 0; i < element.children.length; ++i) {
                var sub = querySingleSelector(element.children[i], selectors);
                if (sub) return sub;
            }
        }        
        return null;
    }
}

/******************************* Part 4 *********************************/

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if (document.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    // for ie 8
    else if(document.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    if (document.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else {
        element.detachEvent("on" + event, listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    addEvent(element, "keydown", function (e) {
        var evtobj = window.event || e;
        var code = evtobj.keyCode || evtobj.which || evtobj.charCode;
        if (code === 13) listener();
    });
}

$.on = function (selector, event, listener) {
    var element = $(selector);
    if (element) addEvent(element, event, listener);
}

$.un = function(selector, event, listener) {
    // your implement
    var element = $(selector);
    if (element) removeEvent(element, event, listener);
}

$.click = function (selector, listener) {
    // your implement
    var element = $(selector);
    if (element) addClickEvent(element, listener);
}

$.delegate = function (selector, tag, event, listener) {
    // your implement
    var element = $(selector);
    if (element) {
        addEvent(element, event, function (e) {
            e = e || window.event;
            var target = e.srcElement ? e.srcElement : e.target;
            if (target.tagName == tag.toUpperCase()) listener.apply(target);
        });
    }
}
/******************************* Part 5 *********************************/

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var myNav = navigator.userAgent.toLowerCase();
    if (myNav.indexOf('msie') != -1) return parseInt(myNav.split('msie')[1]);
    else if (myNav.match(/trident.*rv\:11\./)) return 11;
    else return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var expireTime = new Date();
    expireTime.setTime(expireTime.getTime() + expiredays*24*60*60*  1000);
    document.cookie = cookieName + "=" + cookieValue + ";expires" + expireTime.toUTCString();
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    var name = cookieName + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; ++i) {
        var c = ca[i];
        while(c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length);
    }   
    return "";
}

/******************************* Part 6 *********************************/

// 
function ajax(url, options) {
    // your implement
    var type = options.type || "GET";
        data = "";
        xmlhttp;
    if (options.data) {
        if (typeof options.data == "string") {
            data = options.data;
        } 
        else {
            for (key in options.data) {
                data += key + "=" + options.data[key] + "&";
            }
            data = data.substring(0, data.length - 1);
        }
    }
    url = url + "?" + data;
    
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
                if (options.onsuccess) options.onsuccess(xmlhttp.responseText, xmlhttp);
            }
            else {
                if(options.onfail) options.onfail(xmlhttp.responseText, xmlhttp);
            }
        }
    }
    xmlhttp.open(type, url, true);
    xmlhttp.send();
}

