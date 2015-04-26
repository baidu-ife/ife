function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === "[object Function]";
}
function isStr(str) {
    return Object.prototype.toString.call(str) === "[object String]";
}
function isBool(bool) {
    return Object.prototype.toString.call(bool) === "[object Boolean]";
}
function isNum(num) {
    return Object.prototype.toString.call(num) === "[object Number]";
}

//判断数据类型的方法↑

function cloneObject(obj) {
    if (typeof(obj) != 'object'){
        return obj;
    }
    var result = {};
    for (var attr in obj){
        result[attr] = cloneObject(obj[attr]);
    }
    return result;
}
//递归法深克隆↑

function uniqArray(arr) {
    for (i=0; i < arr.length; i++) {
        for (j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j,1);
                j--;   //因为splice是直接在原数组里删除，删除掉j，后一位会前移代替原j，而j++就会跳过这个元素。
            }
        }
    }
    return arr;
}
// 数组去重↑

function trim(str) {
    var toTrim = "";
    for (i=0; i < str.length; i++) {
        if (str.charAt(i) != " "　&& str.charAt(i) != "　") {
            toTrim += str.charAt(i);
        }
    }
    return toTrim;
}
// 字符串去两端空格↑

function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);
        }
    }　
//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递↑

function getObjectLength(obj) {
    var i = 0;
    for (var attr in obj) {
        i++;
    }
    return i;
}
// 获取一个对象里面第一层元素的数量，返回一个整数↑

function isEmail(emailStr) {
    var reg = /^[0-9a-z_-]+@[a-z0-9]+\.[a-z]{2,4}$/;
    return reg.test(emailStr);
}
// 判断是否为邮箱地址↑

function isMobilePhone(phone) {
    var reg = /^[1][0-9]{10}$/g;//第一位是1
    return reg.test(phone);
}
// 判断是否为手机号↑

function addClass(element, newClassName) {
    if (element.className == "") {
        element.className = newClassName;
    }else {
        var oldClassName = element.className;
        element.className = oldClassName + " " + newClassName;
    }
}
//addClass↑

function removeClass(element, oldClassName) {
    if (element.className == "") {
        return false;
    }else {
        var allOldName = element.className;
        var newClassName = allOldName.replace(eval('/' + oldClassName + '/'), "").replace(/^\s+|\s+$/,"");
        element.className = newClassName;
    }
}
// 移除dom中的样式oldClassName↑

function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}
// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值↑


function getPosition(element) {
    var disX = element.offsetLeft;
    var disY = element.offsetTop;
    var obj = {};
    obj.x = disX;
    obj.y = disY;
    return obj;
}
// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}↑

function $(selector) {
    return document.querySelector(selector);
}
function getClass(oParent, oClassName) {
    var elems = oParent.getElementsByTagName("*");
    var arrT = [];
    for(var i=0; i<elems.length;i++){
        if(elems[i].className == oClassName ) {
            arrT.push(elems[i]);
        }
    }
    return arrT;
}
/*function $(selector) {
    console.log(selector)
    var sTr = selector;
    if (sTr.search(/\s+/g) == -1) {
        var firstChart = sTr.charAt(0);
        console.log(firstChart)
        swich (firstChart) 
        {
            case "#":
                var newStr = sTr.replace(firstChart, "");
                return document.getElementById(newStr);
            break;
        
            case ".":
                var newStr = sTr.replace(firstChart, "");
                return getClass("document", newStr)[0];
            break;

            default:
                return document.getElementsByTagName(firstChart)[0];
        
        }
}*/
//小型query↑

function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }else {
        element["on" + event] = listener;
    }
}
// 给一个dom绑定一个针对event事件的响应，响应函数为listener↑


function removeEvent(element, event, listener) {
    if (listener) {
        if (element.removeEventListener) {
            element.removeEventListener(event, listener, false);
        }else if (element.detachEvent) {
            element.detachEvent("on" + event, listener);
        }else {
            element["on" + event] = null;
        }
    }else {
        return; ///?????
    }
}
// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数↑

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    if (element.addEventListener) {
        element.addEventListener("click", listener, false);
    }else if (element.attachEvent) {
        element.attachEvent("onclick", listener);
    }else {
        element.onclick = listener;
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {

            if (element.addEventListener) {
                element.addEventListener("keydown", function (ev) {
                    var oEvent = ev || event;
                    if (oEvent.keyCode == 13) {
                        listener();
                    }
                }, false);
            }else if (element.attachEvent) {
                element.attachEvent("onkeyup", function (ev) {
                    var oEvent = ev || event;
                    if (oEvent.keyCode == 13) {
                        listener();
                    }
                });
            }else {
                element.onkeyup = function (ev) {
                    var oEvent = ev || event;
                    if (oEvent.keyCode == 13) {
                        listener();
                    }
                };
            }
}
// 把上面几个函数和$做一下结合，把他们变成$对象的一些方法
    /*$.on = function addEvent(element, event, listener) {
            if (element.addEventListener) {
                element.addEventListener(event, listener, false);
            }else if (element.attachEvent) {
                element.attachEvent("on" + event, listener);
            }else {
                element["on" + event] = listener;
            }
        }
    $.un = function removeEvent(element, event, listener) {
            if (listener) {
            if (element.removeEventListener) {
                element.removeEventListener(event, listener, false);
            }else if (element.detachEvent) {
                element.detachEvent("on" + event, listener);
            }else {
                element["on" + event] = null;
                }
            }else {
                return; ///?????
            }
        }
    $.click = function addClickEvent(element, listener) {
            if (element.addEventListener) {
                element.addEventListener("click", listener, false);
            }else if (element.attachEvent) {
                element.attachEvent("onclick", listener);
            }else {
                element.onclick = listener;
            }
        }
    $.delegate = function delegateEvent(element, tag, eventName, listener) {
                if (element.addEventListener) {
                    element.addEventListener(eventName, function (ev) {
                        var ev = ev || event;
                        var target = ev.target || ev.srcElement;
                        if (target.nodeName.toLowerCase() == tag) {
                            listener(target);//传参数给listener函数
                        }
                    },false)
                } else if (element.attachEvent) {
                        element.attachEvent( "on" + eventName, function (ev) {
                        var ev = ev || event;
                        var target = ev.target || ev.srcElement;
                        if (target.nodeName.toLowerCase() == tag) {
                            listener(target);//传参数给listener函数
                        }
                    })
                }else {
                    element["on" + eventName] = function (ev) {
                        var oEvent = ev || event;
                        if (oEvent.keyCode == 13) {
                            listener(target);
                        }
                    };
                }
    }*/
    $.enter = function addEnterEvent(element, listener) {

            if (element.addEventListener) {
                element.addEventListener("keydown", function (ev) {
                    var oEvent = ev || event;
                    if (oEvent.keyCode == 13) {
                        listener();
                    }
                }, false);
            }else if (element.attachEvent) {
                element.attachEvent("onkeyup", function (ev) {
                    var oEvent = ev || event;
                    if (oEvent.keyCode == 13) {
                        listener();
                    }
                });
            }else {
                element.onkeyup = function (ev) {
                    var oEvent = ev || event;
                    if (oEvent.keyCode == 13) {
                        listener();
                    }
                };
            }
        }

// 事件代理
function delegateEvent(element, tag, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, function (ev) {
            var ev = ev || event;
            var target = ev.target || ev.srcElement;
            if (target.nodeName.toLowerCase() == tag) {
                listener(target);//传参数给listener函数
            }
        },false)
    } else if (element.attachEvent) {
                element.attachEvent( "on" + eventName, function (ev) {
                    var ev = ev || event;
                    var target = ev.target || ev.srcElement;
                    if (target.nodeName.toLowerCase() == tag) {
                        listener(target);//传参数给listener函数
                    }
                })
            }else {
                element["on" + eventName] = function (ev) {
                    var oEvent = ev || event;
                    if (oEvent.keyCode == 13) {
                        listener(target);
                    }
                };
            }
}

// 函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变
$.on = function (selector, event, listener) {
            var element = $(selector);
            if (element.addEventListener) {
                element.addEventListener(event, listener, false);
            }else if (element.attachEvent) {
                element.attachEvent("on" + event, listener);
            }else {
                element["on" + event] = listener;
            }
        }
$.un = function (selector, event, listener) {
            if (listener) {
                var element = $(selector);
            if (element.removeEventListener) {
                element.removeEventListener(event, listener, false);
            }else if (element.detachEvent) {
                element.detachEvent("on" + event, listener);
            }else {
                element["on" + event] = null;
                }
            }else {
                return; ///?????
            }
        }
$.click = function (selector, listener) {
            var element = $(selector);
            if (element.addEventListener) {
                element.addEventListener("click", listener, false);
            }else if (element.attachEvent) {
                element.attachEvent("onclick", listener);
            }else {
                element.onclick = listener;
            }
        }
$.delegate = function (selector, tag, eventName, listener) {
                var element = $(selector);
                if (element.addEventListener) {
                    element.addEventListener(eventName, function (ev) {
                        var e = ev || event;
                        var target = e.target || e.srcElement;
                        if (target.nodeName.toLowerCase() == tag) {
                            listener(e);//传事件对象给listener函数
                        }
                    },false)
                } else if (element.attachEvent) {
                        element.attachEvent( "on" + eventName, function (ev) {
                        var e = ev || event;
                        var target = ev.target || ev.srcElement;
                        if (target.nodeName.toLowerCase() == tag) {
                            listener(e);//传事件对象给listener函数
                        }
                    })
                }else {
                    element["on" + eventName] = function (ev) {
                        var e = ev || event;
                        if (oEvent.keyCode == 13) {
                            listener(e);
                        }
                    };
                }
            }

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var sTr = window.navigator.userAgent;
    return sTr.toLowerCase().indexOf("ie") != -1;
}
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}
// 获取cookie值
function getCookie(cookieName) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end ==-1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
        return "";
    }
}

//ajax参考网络，暂没接触过跟后端 相关的内容。。。
var createAjax = function() {
    var xhr = null;
    try {
        //IE系列浏览器
        xhr = new ActiveXObject("microsoft.xmlhttp");
    } catch (e1) {
        try {
            //非IE浏览器
            xhr = new XMLHttpRequest();
        } catch (e2) {
            window.alert("您的浏览器不支持ajax，请更换！");
        }
    }
    return xhr;
};
// ajax
var ajax = function(options) {
    // 初始化
    //type参数,可选
    var type = options.type;                 //type
    if (type == null){
        //type参数可选，默认为get
        type = "get";
    }
    //data参数可选
    var data = options.data;                   //data

    //url参数，必填 
    var url = options.url;                    //url
    if (type == "get") {
        url = url + "?" + data;
    }
    //datatype参数可选    
    var dataType = options.dataType;             //dataType
    //回调函数
    var success = options.success;
    if (dataType == null){
        //dataType参数可选，默认为text
        dataType = "text";
    }
    // 创建ajax引擎对象
    var xhr = createAjax();
    // 打开
    xhr.open(type, url, true);
    // 发送

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if(dataType == "text"||dataType=="TEXT") {
                if (success){
                    //普通文本
                    success(xhr.responseText);
                }
            }else if(dataType == "xml"||dataType == "XML") {
                if (success != null){
                    //接收xml文档
                    success(xhr.responseXML);
                }
            }else if(dataType == "json"||dataType == "JSON") {
                if (success != null){
                    //将json字符串转换为js对象
                    success(eval("(" + xhr.responseText + ")"));
                }
            }
        }
    };
    if (type == "GET" || type == "get") {
        xhr.send();
    } else if (type == "POST" || type == "post") {
        xhr.setRequestHeader("content-type",
                    "application/x-www-form-urlencoded");
        xhr.send(data);

    }
};
    
