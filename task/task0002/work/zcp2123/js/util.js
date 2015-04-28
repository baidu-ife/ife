/**
 * Created by zcp2123 on 2015/4/18.
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === "[object Function]";
}

/****************************************************************************************/

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // null, undefined, non-object
    if (!src || typeof src !== "object") {
        return src;
    }

    if (Object.prototype.toString.call(src) === "[object Date]") {
        return new Date(src.getTime());
    }

    var result = null;

    if (Object.prototype.toString.call(src) === "[object Array]") {
        result = [];
    } else {
        result = src.constructor ? new src.constructor() : {};
    }

    for (var i in src) {
        result[i] = arguments.callee(src[i]);
    }

    return result;
}

/****************************************************************************************/

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var result = [];
    var obj = {};

    if (Object.prototype.toString.call(arr) !== "[object Array]") {
        return [];
    }

    if (arr.length <= 1) {
       return arr;
    }

    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            obj[arr[i]] = 1;
            result.push(arr[i]);
        }
    }

    return result;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    var len = str.length;
    var startFlag = true;
    var endFlag = true;
    for (var start = 0, end = len - 1; start < end && (startFlag || endFlag);) {
        if (startFlag) {//ie7不支持str[index]取值，需要用str.charAt
            /[　\s]/.test(str.charAt(start)) ? start++ : (startFlag = false);
        }

        if (endFlag) {
            /[　\s]/.test(str.charAt(end)) ? end-- : (endFlag = false);
        }
    }

    return str.substring(start, end + 1);
//    return str.replace(/^[　\s]*|[　\s]*$/g, "");//ie8及以下的\s无法匹配到全角空格
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    for (var i in obj) {
        count++;
    }
    return count;
}

/****************************************************************************************/

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return /^((13[0-9]{1})|159|153)+\d{8}$/.test(phone);
}


/****************************************************************************************/

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var result;
    var valid = typeof newClassName === "string";

    if (valid) {
        var classes = (newClassName || "").match(/\S+/g) || [];
        var elemClasses = element.className;
        var cur = element.nodeType === 1 && (elemClasses ?
                (" " + elemClasses + " ").replace(/[\t\r\n\f]/g, " ") :
                " ");
        if (cur) {
            var len = classes.length;
            for (var i = 0; i < len; i++) {
                if (cur.indexOf(" " + classes[i] + " ") < 0) {
                    cur += classes[i] + " ";
                }
            }

            result = trim(cur);
            if (elemClasses !== result) {
                element.className = result;
            }
        }
    }
}
// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    var result;
    var valid = typeof oldClassName === "string";

    if (valid) {
        var classes = (oldClassName || "").match(/\S+/g) || [];
        var elemClasses = element.className;
        var cur = element.nodeType === 1 && (elemClasses ?
            (" " + elemClasses + " ").replace(/[\t\r\n\f]/g, " ") :
            " ");
        if (cur) {
            var len = classes.length;
            for (var i = 0; i < len; i++) {
                if (cur.indexOf(" " + classes[i] + " ") >= 0) {
                    cur = cur.replace(" " + classes[i] + " ", " ");
                }
            }

            result = trim(cur);
            if (elemClasses !== result) {
                element.className = result;
            }
        }
    }
}
// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x = 0;
    var y = 0;
    var current = element;
    var pre = null;

    while (current !== null) {
        x += current.offsetLeft;
        y += current.offsetTop;
        pre = current;
        current = current.offsetParent;
    }

    return {x: x, y: y};
}

/****************************************************************************************/
//div.class1[ss=s] [a=aa] div[class=sss]
// 实现一个简单的Query
function makeArray(obj){
    var array = [];
    // iterate backwards ensuring that length is an UInt32
    for (var i = 0, len = obj.length; i < len; i++) {
        array.push(obj[i]);
    }
    return array;
    //return Array.prototype.slice(obj, 0);ie8及以下不支持
}
function $(selector) {
    if (!selector) {
        return null;
    }

    if (selector == document) {
        return document;
    }

    var selectors = selectorParser(selector);//[["","div.class1[ss=s]"], [" ", "[a=aa]"], [" ", "div[class=sss]"]]
    var result = makeArray(document.getElementsByTagName("*"));

    var arr = result.slice(0);
    for (var len = selectors.length, i = len - 1; i >= 0; i--) {
        var tagName = "";
        var selectItem = selectors[i];
        var relation = selectItem[0];//""
        var attribution = parseShortcuts(selectItem[1]);//"div.class1[ss=s]"-->"div[className~=class1][ss=s]"


        attribution = attribution.replace(/^[\w\-]+/, function(t) {//-->[className~=class1][ss=s]
            tagName = t;//"div"
            return "";
        });

        var filter = parseToFilter(attribution);
        var parents = [];
        var temp = [];
        for (var m = 0, arrLen = arr.length; m < arrLen; m++) {
            var parent;
            if (i == len - 1) {
                parent = arr[m];
                if (filter(parent) && (tagName == "" ? true : (parent.nodeName.toLowerCase() == tagName.toLowerCase()))) {//小写
                    parents.push(parent);
                    temp.push(result[m]);
                }
            } else {
                parent = result[m].parentNode;
                while (parent.nodeName.toLowerCase() != "#document") {
                    if (filter(parent) && (tagName == "" ? true : (parent.nodeName.toLowerCase() == tagName.toLowerCase()))) {
                        parents.push(parent);
                        temp.push(result[m]);
                        break;
                    }
                    parent = parent.parentNode;
                }
            }
        }
        arr = parents.slice(0);
        result = temp.slice(0);
    }
    if (arguments[1] == undefined || arguments[1] == true) {
        return result[0];
    } else {
        return result;
    }

}

function selectorParser(selector) {
    var regExp = /(^|\s*[>+~ ]\s*)(([\-\:.#*\w]+|\([^\)]*\)|\[[^\]]*\])+)(?=($|\s*[>+~ ]\s*))/g;
    var selectors = [];

    selector = selector.replace(regExp, function(all, relation, others) {
        relation.replace(/\s*([>+~ ])\s*/, "$1");
        selectors.push([relation, others]);
        return "";
    });

    if (!/^\s*$/.test(selector)) {
        throw new Error(['selector unexpect expression['+selector+']']);
    }

    return selectors;
}

function parseShortcuts(selector) {
    var shortcut = [
        [/\#([\w\-]+)/g , '[id="$1"]'],//id缩略写法
        [/\.([\w\-]+)/g , '[className~="$1"]']//className缩略写法
    ];

    for (var i = 0, len = shortcut.length; i < len; i++) {
        selector = selector.replace(shortcut[i][0], shortcut[i][1]);
    }

    return selector;
}

/**
 单独属性过滤
 */
function parseToFilter(selector) {

    var attriReg  = /\[\s*([\w\-]+)\s*([!~|^$*]?\=)?\s*(?:(["']?)([^\]'"]*)\3)?\s*\]/g,//\3匹配第3个捕获项即（["']?）
        attris    = [],
        attriFunctions = [],
        operators = {
            '~=' : 'attriHandle && (" "+attriHandle+" ").indexOf(" "+attriValue+" ")>-1',//[data-log~=as]
            '='  : 'attriHandle && attriHandle==attriValue',//[data-log=ss]
            ''   : 'attriHandle'//[data-log]
            /**
             '^=' : TODO,
             '$=' : TODO,
             '*=' : TODO,
             '!=' : TODO
             */
        },
        attriHandle = function(attri) {
            /* 是否使用内置.attribute形式来获取属性 */

            //内置attribute相关属性转换
            var attriMap = {
                'class': 'el.className',
                'for'  : 'el.htmlFor',
                'href' : 'el.getAttribute("href", 2)'//ie6,7需要加第2个参数（标准没有），保证输出的是相对地址
            };

            //优先.attribute属性获取
            var nativeAttris = 'name,id,className,value,selected,checked,disabled,type,tagName,readOnly'.split(',');

            //内置属性获取
            for (var i = 0, len = nativeAttris.length; i < len; i++) {
                attriMap[nativeAttris[i]] = 'el.'+nativeAttris[i];
            }

            return attriMap[attri] || 'el.getAttribute("' +attri+ '")';
        };

    //属性的格式是[[名,运算符,值]]
    selector = selector.replace(attriReg,
        function(a,b,c,d,e) {attris.push([b,c||"",e||""]);return "";});

    for (var i=0; i<attris.length; i++) {

        var getAttri = attriHandle(attris[i][0]);
        var operator = operators[attris[i][1]];
        var attriVal = '"'+attris[i][2]+'"';

        attriFunctions.push(
            operator.replace(/attriHandle/g, getAttri).replace('attriValue', attriVal)
        );

    };
    if (attris.length == 0) {
        attriFunctions = 'return true';
    } else {
        attriFunctions = 'return ' + attriFunctions.join('&&');
    }

    return new Function("el", attriFunctions);

};

/****************************************************************************************/
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}


// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数(未实现)
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    } else {
        element["on" + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keyup", function(event) {
        event = event || window.event;
        if (event.keyCode == 13) {
            listener.call(this, event);
        }
    });
}

function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(event){
        var target = event.target || event.srcElement;
        if(target.tagName.toLowerCase() == tag.toLowerCase()) {
            listener.call(target, event);
        }
    })
}

//$.on = addEvent;
//$.un = removeEvent;
//$.click = addClickEvent;
//$.enter = addEnterEvent;
//$.delegate = delegateEvent;

$.on = function(selector, event, listener) {
    addEvent($(selector), event, listener);
}

$.un = function(selector, event, listener) {
    removeEvent($(selector), event, listener);
}

$.click = function(selector, listener) {
    addClickEvent($(selector), listener);
}

$.enter = function(selector, listener) {
    addEnterEvent($(selector), listener);
}

$.delegate = function(selector, tag, event, listener) {
    delegateEvent($(selector), tag, event, listener);
}

/****************************************************************************************/

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (window.ActiveXObject) {
        return ua.match(/msie ([\d.]+)/)[1];
    }
    return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var expiresStr = "";
    if (expiredays) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + expiredays);
        expiresStr = ";expires=" + expireDate.toUTCString();
    }
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + expiresStr;
}

// 获取cookie值
function getCookie(cookieName) {
    var cookies = document.cookie;
    if (cookies.length > 0) {
        var c_start = cookies.indexOf(cookieName + "=");
        if (c_start >= 0) {
            c_start += cookieName.length + 1;
            var c_end = cookies.indexOf(";", c_start);
            (c_end < 0) && (c_end = cookies.length);
            return decodeURIComponent(cookies.substring(c_start, c_end));
        }
    }
}

/****************************************************************************************/
//
function createXHR() {
    if (XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        alert("不支持ajax");
    }
}

function obgToString(obj) {
    if (typeof obj !== "object") {
        return obj;
    }
    var str = "";
    var flag = true;
    for (var i in obj) {
        if (flag) {
            str += i + "=" + obj[i];
            flag = false;
        } else {
            str += "&" + i + "=" + obj[i];
        }
    }
    return str;
}

function ajax(url, options) {
    var xhr = createXHR();
    options = options || {};
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                var onsuccess = options.onsuccess || function(responseText, xhr){};
                onsuccess.call(this, xhr.responseText, xhr);
            } else {
                var onfail = options.onsuccess || function(responseText, xhr){};
                onfail.call(this, xhr.responseText, xhr);
            }
        }
    }

    var data = options.data || "";
    typeof data == "object" && (data = obgToString(data));
    var type = options.type || "get";
    if (type == "get") {
        url += "?" + data;
        xhr.open(type, url, true);
        xhr.send(null);
    } else {
        xhr.open(type, url, true);
        xhr.send(data);
    }

}