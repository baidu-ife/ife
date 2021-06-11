//判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

//判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    //第一种方法，这种方法能行，最简单
    return Object.prototype.toString.call(fn) === '[object Function]';
    //第二种方法，typeof判断类型，使用try/catch，是因为，如果类型不是函数，就会出现异常
    /***
    try {
        if (typeof(eval(fn)) == "function") {
            return true;
        }
    } catch (e) {}
    return false;
    ***/
}

//使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
//被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不包含函数、正则对象等。
function cloneObject(src) {
    var clonedObj;
    switch (typeof src) {
        case 'undefined':
            break;
        case 'string':
            clonedObj = src + '';
            break;
        case 'number':
            clonedObj = src + 0;
            break;
        case 'boolean':
            clonedObj = src;
            break;
        case 'object':
            if (src === null) {
                clonedObj = null;
            } else {
                if (src instanceof Array) {
                    clonedObj = [];
                    for (var i = 0, len = src.length; i < len; i ++) {
                        clonedObj.push(cloneObject(src[i]));
                    }
                } else {
                    clonedObj = {};
                    for (var key in src) {
                        clonedObj[key] = cloneObject(src[key]);
                    }
                }
            }
            break;
        default:
            clonedObj = src;
            break;
    }
    return clonedObj;
}

//对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var uniqArr = new Array();
    //使用空对象，将数组中的元素依次放入到对象中，作为对象的一个属性，而这个属性值不重要了，主要是利用对象查找属性的速度“很快”。通过查找对象的属性值，如果查不到，说明数组元素没有被添加进去，是第一次出现，那么就会被复制到新数组中，并且会被添加到对象中；如果被查到了，说明已经不是第一次出现了，就不用复制了。
    var hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i ++) {
        if (!hash[elem]) {
            uniqArr.push(elem);
            hash[elem] = true;
        }
    }
    return uniqArr;
}

//实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
//假设空白字符只有半角空格、tab
function simpleTrim(str) {
    var result = "";
    var start = 0;
    var end = str.length - 1;
    for (var i = 0; i < str.length; i ++) {
        if (str.charAt(i) != " ") {
            break;
        }
        start ++;
    }
    for (var j = str.length - 1; j > 0; j --) {
        if (str.charAt(j) != " ") {
            break;
        }
        end --;
    }
    if (start <= end) {
        result = str.substring(start, end + 1);
    } else {
        result = "";
    }
    return result;
}

//对字符串头尾进行空格字符的去除，包括全椒半角空格、tab等，返回一个字符串
//使用正则表达式
function trim(str) {
    if (!str) {
        return;
    }
    var result;
    result = str.replace(/(^\s*)|(\s*$)/g, "");
    return result;
}

//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; i ++) {
        fn(arr[i]);
    }
    for (var j = 0; j < arr.length; j ++) {
        fn(j, arr[j]);
    }
}
function output() {
    if (arguments.length == 1) {
        console.log(arguments[0]);
    } else {
        console.log(arguments[0] + ": " + arguments[1]);
    }
}

//获取对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    if ((typeof obj) == "object") {
        for (var key in obj) {
            count ++;
        }
    }
    return count;
}

//判断是否为邮箱地址
function isEmail(emailStr) {
    //开头以[a-zA-Z0-9]开头，主要是\w包含了下划线，邮箱不要以下划线开头。
    var patrn = /^[a-zA-Z0-9]+[\w]*@[\w]+(\.[\w-]+)+$/;
    if (!patrn.exec(emailStr)) {
        return false;
    } else {
        return true;
    }
}

//判断是否为手机号
function isMobilePhone(phone) {
    var patrn = /^1[3-9](\d){9}$/;
    if (!patrn.exec(phone)) {
        return false;
    } else {
        return true;
    }
}

//为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!element) {
        return;
    }
    var elementClassName = element.className;
    if (elementClassName.length == 0) {
        element.className = newClassName;
        return;
    }
    //在引号内部，正则表达式的“\”要多加一个“\”进行转义，否则将会出错
    //比如，想要\s代表空格，在引号里面，如果不多加一个\，那么引号里的正则式就会被转换成s，少了那个反斜杠\，就不再是想要的\s来代表空格了。
    //重要的坑！！！
    if (elementClassName == newClassName || elementClassName.match(new RegExp("(^|\\s)" + newClassName + "(\\s|$)"))) {
        return;
    }
    element.className = elementClassName + " " + newClassName;
}

//移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (!element) {
        return;
    }
    var elementClassName = element.className;
    if (elementClassName.length == 0) {
        return;
    }
    if (elementClassName == oldClassName || elementClassName.match(new RegExp("(^|\\s)" + oldClassName + "(\\s|$)"))) {
        var pratn = new RegExp("(^|\\s)" + oldClassName + "(\\s|$)");
        // console.log(pratn);
        element.className = elementClassName.replace(pratn, "");
    }
}

//判断element中是否存在样式名为className的样式
function hasClassName(element, className) {
    if (!element) {
        return;
    }
    var elementClassName = element.className;
    if (elementClassName.length == 0) {
        return false;
    }
    console.log(new RegExp("(^|\\s)" + className + "(\\s|$)"));
    if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
        return true;
    }
    return false;
}

//判断siblingNode和element是否为同一父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if (!element || !siblingNode) {
        return false;
    }
    var elementParent = element.parentNode;
    var siblingNodeParent = siblingNode.parentNode;
    if (elementParent.isSameNode(siblingNodeParent)) {
        return true;
    } else {
        return false;
    }
}

//获取element相对于浏览器窗口的位置，返回一个对象{x,y}
function getPosition(element) {
    if (!element) {
        return;
    }
    var position = {};
    var actualLeft = element.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current != null) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    } 
    position.x = actualLeft;
    position.y = actualTop;
    return position;
}

//实现一个简单的Query
function $(selector) {
    var values = trim(selector).split(" ");
    var selectorLength = values.length;
    if (selectorLength == 1) {
        switch(values[0].substr(0, 1)) {
            case "#":
                return document.getElementById(values[0].substr(1));
                //已经有return了，不用break了
            case ".":
                if (document.getElementsByClassName) {
                    //要求返回的是第一个，就取了[0]
                    return document.getElementsByClassName(values[0].substr(1))[0];
                } else {
                    return;
                }
            case "[":
                var equalFlag = values[0].indexOf("=");
                console.log(equalFlag);
                var allElements = document.getElementsByTagName("*");
                if (equalFlag < 0) {
                    for (var i = 0; i < allElements.length; i ++) {
                        if (allElements[i].getAttribute(values[0].substring(1, values[0].length - 1))) {
                            //返回第一个就行了，其他的不需要了
                            return allElements[i];
                        }
                    }
                } else {
                    for (var j = 0; j < allElements.length; j ++) {
                        if (allElements[j].getAttribute(values[0].substring(1, equalFlag)) == values[0].substring(equalFlag + 2, values[0].length - 2)) {
                            return allElements[j];
                        }
                    }
                }
                return;
            default:
                return document.getElementsByTagName(values[0])[0];
        }
    }
    //下面只支持“#a .b”格式的符合查询，如果要支持“.a .b”和“a .b”需要重新写一下前面的单个查询中，查询.a类型和a类型的代码。
    var firstSelectorResult = $(values[0]);
    var firstSelectorElements = firstSelectorResult.getElementsByTagName("*");
    for (var i = 0; i < firstSelectorElements.length; i ++) {
        if (hasClassName(firstSelectorElements[i], values[1].substr(1, values[1].length))) {
            return firstSelectorElements[i];
        }
    }
    return;

}

//给element绑定一个针对event事件的相应，响应函数为listener
function addEvent(element, events, listener) {
    if (!element) {
        return;
    }
    if (element.addEventListener) {
        element.addEventListener(events, listener, false);
    } else {
        element.attachEvent('on' + events, listener);
    }
}

//移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, events, listener) {
    if (!element) {
        return;
    }
    if (element.detachEvent) {
        element.detachEvent('on' + events, listener);
    } else {
        element.removeEventListener(events, listener, false);
    }
}

//实现对click事件的绑定
function addClickEvent(element, listener) {
    if (!element) {
        return;
    }
    if (element.attachEvent) {
        element.attachEvent('onclick', listener);
    } else {
        element.addEventListener('click', listener, false);
    }
}

//实现对于按enter键时的事件绑定
function addEnterEvent(element, listener) {
    if (!element) {
        return;
    }
    addEvent(element,"keypress",function(e){
        if (window.event) {
            keynum = e.keyCode
        } else if (e.which) {
            keynum = e.which
        }
        if (keynum == 13) {
            listener();
        } else {
            return;
        }
    });
}

//事件代理
function delegateEvent(element, tag, eventName, listener) {
    if (!element) {
        return;
    }
    addEvent(element, eventName, function(e) {
        var e = e || event;
        var target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() == tag) {
            listener();
        }
    });
}
//$.delegate = delegateEvent;

//函数封装
$.on = function(selector, events, listener) {
    var element = $(selector);
    if (!element) {
        return;
    }
    addEvent(element, events, listener);
}
$.click = function(selector, listener) {
    var element = $(selector);
    if (!element) {
        return;
    }
    addClickEvent(element, listener);
}
$.un = function(selector, events, listener) {
    var element = $(selector);
    if (!element) {
        return;
    }
    removeEvent(element, events, listener);
}
$.delegate = function(selector, tag, events, listener) {
    var element = $(selector);
    if (!element) {
        return;
    }
    delegateEvent(element, tag, events, listener);
}

//判断是否是IE浏览器，返回-1或者版本号
//对于IE11也会返回-1.
function isIE() {
    if (navigator.userAgent.indexOf("MSIE") < 0) {
        return -1;
    } else {
        return navigator.userAgent.match(/MSIE ([\d.]+)/g)[0];
    }
}

//设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie
function getCookie(cookieName) {
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(cookieName + "=");
        if (start != -1) {
            start = start + cookieName.length + 1;
            end = document.cookie.indexOf(";", start);
            if (end == -1) {
                end = document.cookie.length;
            }
            return unescape(document.cookie.substring(start, end));
        }
    }
    return "";
}

//封装Ajax方法
function ajax(url, options) {
    if (!url || !options) {
        return;
    }
    var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    var type = options.type ? options.type : "GET";
    var data = options.data ? options.data : "";
    var onsuccess = options.onsuccess;
    var onfail = options.onfail ? options.onfail : function(error) {
        console.log(error);
    }
    if (data != "") {
        url = url + "?";
        for (var key in data) {
            url = url + key + "=" + data[key] + "&";
        }
        url = url.substring(0, url.length - 1);
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                onsuccess(xmlhttp.responseText, xmlhttp);
            } else {
                onfail(xmlhttp.responseText, xmlhttp);
            }
        }
    }
    xmlhttp.open(type.toUpperCase(), url, true);
    xmlhttp.send();
}

//study Ajax
function showHint(str) {
    var xmlhttp;
    if (str.length == 0) {
        document.getElementById("firstPra").innerHTML = "";
        return;
    }
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("firstPra").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "js/gethint.php?q=" + str, true);
    xmlhttp.send();
}
//测试用方法
function check() {
    // addEvent($("#first-first"), "click", clickListener);
    // removeEvent($("#first-first"), "click", clickListener);
    // addClickEvent($("#first-first"), clickListener);
    // addEnterEvent($("#firstInput"), enterListener);
    $.delegate("#first", "li", "click", clickListener);
    $.on("#second-first", "click", clickListener);
    $.click("#second-second", clickListener);
    $.un("#second-first", "click", clickListener);
    console.log(isIE());
    setCookie("liu", 123, 10);
    console.log(getCookie("liu"));

    // $.on("#firstInput", "keyup", function() {
    //     showHint(this.value);
    // });
    $.on("#firstInput", "keyup", function() {
        str = this.value;
        if (str.length == 0) {
            document.getElementById("firstPra").innerHTML = "";
            return;
        }
        ajax(
            'js/gethint.php',
            {
                type: 'GET',
                data: {
                    q: str
                },
                onsuccess: function(responseText, xhr) {
                    document.getElementById("firstPra").innerHTML = responseText;
                }
            }
        );
    });
    ajax(
    'js/testAjax.php', 
    {
        type: 'GET',
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);
}
function clickListener(events) {
    alert("click");
}
function enterListener(events) {
    alert("enter");
}
