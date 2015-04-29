// 2.javascript 数据类型及语言基础

function isArray(arr) {
    return (arr instanceof Array);
}

function isFunction(fn) {
    return typeof fn == "function";
}

function cloneObject(src) {
    var o = src,
        i;
    if (typeof o === "object") {
        o = src.constructor === Array ? [] : {};
        for (i in src) {
            if (src.hasOwnProperty(i)) {
                o[i] = typeof src[i] === "object" ? cloneObject(src[i]) : src[i];
            }
        }
    }
    return o;
}

function uniqArray(arr) {
    if (isArray(arr) !== true) return;
    var n = {},
        r = []; //n为hash表，r为临时数组
    for (var i = 0; i < arr.length; i++) //遍历当前数组
    {
        if (!n[arr[i]]&& trim(arr[i]) != "") //如果hash表中没有当前项
        {
            n[arr[i]] = true; //存入hash表
            r.push(arr[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}

function trim(str) {
    var pattern = /\s/,
        i, l;
    for (i = 0, l = str.length; i < l; i++) {
        if (pattern.test(str[0])) {
            str = str.substring(1);
        } else {
            break;
        }
    }
    for (i = str.length; i >= 0; i--) {
        if (pattern.test(str[str.length - 1])) {
            str = str.substring(0, str.length - 1)
        }
    }
    return str; // your implement
}

function each(arr, fn) {
    for (var i = 0, j = arr.length; i < j; i++) {
        fn(arr[i], i);
    }
}

function getObjectLength(obj) {
    return Object.keys(obj).length;
}

function isEmail(emailStr) {
    var pattern = /^(\w)+(\.\w)*@(\w)+((\.\w{2,3}){1,3})$/
    return pattern.test(emailStr);
}

function isMobilePhone(phone) {
    //11位手机号  13**，15**，18**，17**
    //固定电话 ***-********-**** 或者不含区号形式
    var phoneNum = trim(phone);
    var pattern = /(1(3|5|7|8)\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/
    return pattern.test(phoneNum);
}

//3.DOM

function addClass(element, newClassName) {
    element.className = element.className || "";
    var classArr = element.className.split(" ");

    for (var i = classArr.length - 1; i >= 0; i--) {
        if (!classArr[i]) {
            continue;
        } else if (classArr[i] === newClassName) {
            return;
        }
    }
    element.className += " " + newClassName;
}

function removeClass(element, oldClassName) {
    var classArr = element.className.split(" ");
    for (var i = classArr.length - 1; i >= 0; i--) {
        if (!classArr[i]) {
            continue;
        } else if (classArr[i] === oldClassName) {
            classArr.splice(i, 1);
        }
    }
    element.className = classArr.join(" ");
}

function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

function getPosition(element) {
    var actualTop = element.offsetTop;
    var actualLeft = element.offsetLeft;
    //console.log(actualLeft);
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return {
        x: actualTop,
        y: actualLeft
    };
}

function $(selector) {
    if (typeof selector === "string") {
        var selector = trim(selector);
        var selArr = selector.split(/\s+/);
        var selObjArr = [];
        var testArr = [];
        var result;

        function selectorNize(selector) {
            var strRex = /^[A-Za-z]+/;
            if (selector.charAt(0) == "#") {
                return {
                    type: "id",
                    value: selector.substr(1)
                }
            } else if (selector.charAt(0) === ".") {
                return {
                    type: "class",
                    value: selector.substr(1)
                }
            } else if (strRex.test(selector.charAt(0))) {
                return {
                    type: "tag",
                    value: selector
                }
            } else if (selector.charAt(0) === "[") {
                var seleName = selector.replace("[", "").replace("]", "");
                var sttrIndex = seleName.indexOf("=") >= 0 ? seleName.indexOf("=") : seleName.length;
                return {
                    type: "attr",
                    value: seleName.substring(0, sttrIndex), //属性名儿
                    attr: seleName.substr(sttrIndex + 1).replace(/\"|\'/g, "") // 属性值
                }
            }
        };

        var allNodes = [];

        function getMatch(seleObj, parent) {
            var matchArr = [];
            switch (seleObj.type) {
                case "class":
                    matchArr = parent.getElementsByClassName(seleObj.value);
                    break;
                case "id":
                    matchArr = [parent.getElementById(seleObj.value)];
                    break;
                case "tag":
                    matchArr = parent.getElementsByTagName(seleObj.value);
                    break;
                case "attr":
                    for (var i = 0, l = allNodes.length; i < l; i++) {
                        if (!allNodes[i].attributes.length) continue;
                        var attrs = allNodes[i].attributes;
                        for (var j = 0, attrsl = attrs.length; j < attrsl; j++) {
                            if (attrs[j].name === seleObj.value && (!seleObj.attr || seleObj.attr && attrs[j].value == seleObj.attr)) {
                                matchArr.push(allNodes[i]);
                            }
                        }
                    }
                    break;
            }
            return matchArr || this;
        }


        for (var i = 0, l = selArr.length; i < l; i++) {
            selObjArr.push(selectorNize(selArr[i]));
        }
        if (selObjArr.length == 1) {
            result = getMatch(selObjArr[0], document)[0];
        }
        return result;
    }
}

//4.事件
function addEvent(element, event, listener) {
    return element.addEventListener ? element.addEventListener(event, listener) : element.attachEvent("on" + event, listener);
}

function removeEvent(element, event, listener) {
    return element.removeEventListener ? element.removeEventListener(event, listener) : element.detachEventListener("on" + event, listener);
}

function addClickEvent(element, listener) {
    return addEvent(element, "click", listener)
}

function addEnterEvent(element, listener) {
    element.onkeydown = function(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e.keyCode == 13 || e.which == 13) {
            listener(e);
        }
    }
}

function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(ev) {
        var e = ev || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === tag.toLowerCase()) {
            listener(e);
        };
    })
}

$.on = function(selector, event, listener) {
    var element = $(selector);
    return element.addEventListener ? element.addEventListener(event, listener) : element.attachEvent("on" + event, listener);
    // your implement
}

$.click = function(selector, listener) {
    var element = $(selector);
    return element.addEventListener ? element.addEventListener("click", listener) : element.attachEvent("onclick", listener);
    // your implement
}

$.un = function(selector, event, listener) {
    var element = $(selector);
    return element.removeEventListener ? element.removeEventListener(event, listener) : element.detachEventListener("on" + event, listener);
    // your implement
}

$.delegate = function(selector, tag, event, listener) {
    var element = $(selector);
    addEvent(element, event, function(ev) {
        var e = ev || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === tag.toLowerCase()) {
            listener(e);
        };
    })
}

//5.BOM

function isIE() {
    if ("ActiveXObject" in window) {
        return navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1]
    } else {
        return -1;
    }
}

function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = cookieName + "=" + escape(cookieValue) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(cookieName) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(cookieName + "=")
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

//6.Ajax
function ajax(url, options) {
    var data;
    if (options.data) {
        if (typeof options.data === "string") {
            data = options.data
        } else if (typeof options.data === "object") {
            for (var i in options.data) {
                data += i + "=" + options.data[i] + "&";
            }
            data = data.substring(0, data.Length - 1)
        }
    }
    var opt = {
        type: options.type || get,
        data: data || "",
        onsuccess: options.onsuccess,
        onfail: options.onfail
    }


    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            opt.onsuccess(xmlhttp.responseText);
        } else {
            opt.onfail();
        }
    }
    if (opt.type == "get") {
        xmlhttp.open(opt.type, url + "?" + data, true);
        xmlhttp.send();
    } else if (opt.type == "post") {
        xmlhttp.open(opt.type, url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);
    }
}
