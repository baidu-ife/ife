// 基本类型 undefined null boolean number string 
// 引用类型 Function Array RegExp Error Object Date

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return "[object Array]" === Object.prototype.toString.call(arr);
}


// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return "[object Function]" === Object.prototype.toString.call(fn);
}


function isReg(reg) {
    return "[object RegExp]" === Object.prototype.toString.call(reg);
}

function isObject(obj) {
    return "[object Object]" === Object.prototype.toString.call(obj);
}

function isArrays(arr) {
    return Array.isArray(arr);
}

function isNaN(source) {
    return source !== source; // 只有NaN才会出现 NaN !== NaN 这种情况
}

function isNull(source) {
    return source === null;
}

function isUndefined(source) {
    return source === void 0;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
// 基本类型 undefined null string number boolean  
// 对象包括 各个构造函数构造的类 Function 类 Array类 RegExp类 等 包装对象 object 纯净对象 
function cloneObject(source) {
    var result = source, i, len;
    if(isReg(source) || isFunction(source)) return undefined;
    if(!source
       || source instanceof String
       || source instanceof Boolean
       || source instanceof Number) {
        return resule;
    } else if (isArray(source)) {
        result = [];
        var temResult;
        for (i = 0, len = source.length; i < len; i++) {
            //console.log(arguments.callee(source[i]));
            temResult = arguments.callee(source[i]);
            if(temResult === undefined) {
                continue;
            }
            result[i] = temResult;
        }
    } else if(isObject(source)) {
        result = {};
        for(i in source) {
            if(source.hasOwnProperty(i)) {
                result[i] = arguments.callee(source[i])
            }
        }
    }
    return result;
}

/**
 * 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
 *
 * @param  {Array} source 需要过滤相同项的数组
 * @return {Array}        过滤后的新数组
 */

function uniqArray(arr) {
    var obj = {}, i, len;
    var result = [];
    if(!arr) return result;
    for(i = 0, len = arr.length; i < len; i ++) {
        var key = arr[i];
        if(!obj[key]) {
            obj[key] = true;
            result.push(key)
        }
    }
    return result;
}

function uniqArray2(arr) {
    var len = arr.length, i, comp;
    var result = arr.slice(0); // 简单获得一个复制的副本

    while(len-- > 0) {
       // console.log(len)
       comp = result[len];
       i = len;
        while(i-- > 0) {
            if(comp === result[i]) {
                result.splice(len, 1);
                break;
            }
        }
    }
    return result;  // 全等操作符
}

function uniqArray3(source) {
    var obj = {};
    var i, len;
    for(i = 0, len = source.length; i < len; i ++) {
        var key = source[i];
        if(!obj[key]) {
            obj[key] = true;
            continue;
        };
    };
    return Object.keys(obj); // [1, 3, 3] => ['1', '3']
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trims(str) {
    var a, b;
    var len = str.length;
    if(!len) return "";

    function isEmpty(string) {
        return /\s/.test(string);
    }

    for(var i = 0; i < len; i ++ ) {
        if(!isEmpty(str[i])) {
            a = i;
            break;
        }
    }
    for(i = len; i > 0; i --) {
        if(!isEmpty(str[i-1])) {
            b = i-1;
            break;
        }
    }
    //console.log(a, b)
    if( a > b) {
        return "";
    } else {
        return str.substring(a, b + 1);
    }
}

function trim (str) {
    return str.replace(/\s/g,"")
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
   for(var i = 0, len = arr.length; i < len; i++) {
        fn(i, arr[i]);
   }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
// 可能存在bug 当对象上面从新写了对象上的方法的时候 有bug的的浏览器会跳过
function getObjectLength(obj) {
    var fn = (function(){
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasBug = !({toString: null}).hasOwnProperty('toString'),
        enumArr = [
        'toString',
        'toLocalString',
        'valueOf',
        'hasOwnproperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
        ];
        var enuArrLen = enumArr.length;
        return function(obj) {
            if(typeof obj !== 'object' && (typeof obj !== 'function' || typeof obj !== null)) { // 如果是不是对象那个或者也不是函数或者null
                throw new TypeError('What you want to judge is not object!');
                return;
            }
            var objLength = 0, prop, i;
            for( prop in obj) {
                if(hasOwnProperty.call(obj, prop)) { // 这里会有bug的存在 难道是？
                    objLength++;
                }
            }
            if(hasBug) { // 如果存在bug的话
                for(i = 0; i < enuArrLen; i ++) {
                    if(hasOwnProperty.call(obj, enumArr[i])) {
                        objLength++;
                    }
                }
            }
            return objLength;
        }
    })();
    return fn(obj);
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return /^\w{3,}@\w{2,4}\.\w{2,4}/.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    //phone = Object.prototype.toString(phone);
    //console.log(phone);
    return /^1{1}[3-9]{1}\d{9}/.test(phone);
}

function hasClass(element, className) {
    if(!element) return false;
    var classNames = element.className;
    var arr = classNames.split(' ');
    for(var i = 0, len = arr.length; i < len; i ++) {
        if(arr[i] === className) {
            return true;
        }
    }
    return false;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(hasClass(element, newClassName)) return;
    element.className = element.className + ' ' + trims(newClassName);
    return;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var arr, i, len, result;
    if(!hasClass(element, oldClassName)) {
        return false;
    } else {
        result = [];
        arr = element.classNames.split(' ');
        for(i = 0, len = arr.length; i < len; i++) {
            if(trims(arr[i]) !== oldClassName) {
                result.push(arr[i]);
            }
        } 
    }
    element.className = result.join(' '); 
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNodes(element, siblingNode) {
    return element.parentNode = siblingNode.parentNode;
}

function isSiblingNode(element, siblingNode) {
    for(var node = element.parentNode.firstChild; node; node = node.nextSibling) {
        if(node === siblingNode) {
            return true;
        }
    }
    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
// 相对位置
function getPosition(element) {
    if (!element) return undefined;
    var Rect = element.getBoundingClientRect();
    return {
        x: Rect.left,
        y: Rect.top
    }
}

function getRandom(from, to) {
    var step = from - to + 1; // 随即数的个数
    return Math.floor(Math.random() * step + from); // Math.random 方法返回一个0到1之间的一个数(不包括0和1)
}

// 获取某个元素的绝对位置
function getAbsolute(element) {
    var obj;
    var relative = getPosition(element); // 获取元素的相对位置
    obj = {
        x: relative.x + document.documentElement.scrollWidth,
        y: relative.y + document.documentElement.scrollHeight
    }
    return  obj;
}

// 获取某个元素的绝对位置2 不适用于表格和ifram元素
function getAbsolute2(element) {
    var obj, current;

    obj.x = element.offsetLeft;
    obj.y = element.offsetTop;
    current = element.offsetParent;

    while(current) {
        obj.x += current.offsetLeft;
        obj.y += current.offsetTop;
        current = current.offsetParent;
    }
    return obj;
}

// 实现一个简单的Query
function $(selector) {
    // 思路是先从最右边为选择器找出元素然后判断其父元素 是否为左边的选择器匹配的元素
}

// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(even, listener, false); // 事件冒泡
    } else if (element.attachEvent) {
        element.attachEvent('on' + even, listener);
    } else {
        element['on' + even] = listener;
    }
}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + event, listener);
    } else {
        element['on' + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keypress', function(e){
        e = e || window.event;
        var code = e.which || e.keyCode;
        if(code === 13) {
            //listener(e);
            listener.call(element, e); // better
        }
    });
}

$.on = function (selector, event, listener) {
    addEvent($(selector), event, listener);
};

$.un = function (selector, event, listener) {
    removeEvent($(selector), event, listener)
} 

$.click = function (selector, listener) {
   $.on(selector, 'click', listener);
}

$.delegate = function (selector, tag, event, listener) {
    $on($(selector), event, function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if(target && target.TtagName === tag.toUpperCase()) {
            listener.call(target, e);
        }
    });
}


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var days;
    if(!cookieName || !cookieValue) return;
    if(expiredays) {
        days = new Date();
        days.setTime(days.getTime() + expiredays * 24 * 60 * 60 * 1000);
    }
    document.cookie = cookieName + '=' + encodeURIComponent(cookieValue) + ( days ? ';expires=' + days.toUTCString() : '');
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
}

/*
* @para url {string} 
* @para optons {object}
*/
function ajax(url, options) {
    if(!url || !options) {
        throw new TypeError("please input url/options!");
        return;
    }
    var type = (optons.type || "GET").toUpperCase();
    var call = {
        success: options.onsuccess,
        fail: options.onfail
    };
    var data = encodeString(options.data || ''); // key1=value1&key2=value2...

    try {
        var xhr = getXHR();
        if(type === 'GET' && data) {
            url+ = (url.indexOf("?") > -1 ? "&" : "?") + data;
            data = null; // 解除引用
        }
        xhr.open(type, url, true);
        xhr.onreadystatechange = stateChageHandler;
        // 在open之后再进行http请求头设定
        if (type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(data);
    } catch(e) {
        fire('fail');
    }
    return xhr;

    function stateChageHandler() {
        var status;
        if(xhr.readyState === 4) {
            try {
                status = xhr.status;
            } catch (e) {
                fire('fail');
                return;
            }
           if ((status >= 200 && status < 300)
                || status === 304
                || status === 1223) {
                fire('success');
            }
            else {
                fire('fail');
            }
        }
    }


    function encodeString(source) {
        if(!source) return {};
        if(typeof source === 'string') {
            return source;
        } else if(typeof source === 'object'){
            var arr = []''
            for(var i in source) {
                if(source.hasOwnProperty(i)) {
                    arr.push(i + '=' + source[i]);
                }
            }
            return arr.join('&');
        }
    }

    function fire(str) {
        if(!str) return;
        switch(str) {
            case 'fire': {
                call.fail(xhr);
            };
            case 'success': {
                call.success(xhr);
            }
            default : return;
        }
    }


// get XMLHttpRequest object
    function getXHR() {
        try {
            return new XMLHttpRequest()
        } catch (e) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                    catch (e) {
                        throw new TypeError("Your browser doesn't support ajax!!!")
                    }
                }
            }
        }
    }
}



if(typeof module === 'object') {
   module.exports = {
        isArray,
        isObject,
        isFunction,
        isReg,
        uniqArray,
        uniqArray2,
        uniqArray3,
        trims,
        trim,
        each,
        getObjectLength,
        isEmail,
        isMobilePhone,
        hasClass,
        addClass,
        removeClass
    }
}


