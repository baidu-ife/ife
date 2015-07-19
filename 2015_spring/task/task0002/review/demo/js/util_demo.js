

/**
 * mini $
 *
 * @param {string} selector 选择器
 * @return {Array.<HTMLElement>} 返回匹配的元素列表
 */
function $(selector) {
    var idReg = /^#([\w_\-]+)/;
    var classReg = /^\.([\w_\-]+)/;
    var tagReg = /^\w+$/i;
    // [data-log]
    // [data-log="test"]
    // [data-log=test]
    // [data-log='test']
    var attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;

    // 不考虑'>' 、`~`等嵌套关系
    // 父子选择器之间用空格相隔
    var context = document;

    function blank() {}

    function direct(part, actions) {
        actions = actions || {
            id: blank,
            className: blank,
            tag: blank,
            attribute: blank
        };
        var fn;
        var params = [].slice.call(arguments, 2);
        // id
        if (result = part.match(idReg)) {
            fn = 'id';
            params.push(result[1]);
        }
        // class
        else if (result = part.match(classReg)) {
            fn = 'className';
            params.push(result[1]);
        }
        // tag
        else if (result = part.match(tagReg)) {
            fn = 'tag';
            params.push(result[0]);
        }
        // attribute
        else if (result = part.match(attrReg)) {
            fn = 'attribute';
            var tag = result[1];
            var key = result[2];
            var value = result[4];
            params.push(tag, key, value);
        }
        return actions[fn].apply(null, params);
    }

    function find(parts, context) {
        var part = parts.pop();

        var actions = {
            id: function (id) {
                return [
                    document.getElementById(id)
                ];
            },
            className: function (className) {
                var result = [];
                if (context.getElementsByClassName) {
                    result = context.getElementsByClassName(className)
                }
                else {
                    var temp = context.getElementsByTagName('*');
                    for (var i = 0, len = temp.length; i < len; i++) {
                        var node = temp[i];
                        if (hasClass(node, className)) {
                            result.push(node);
                        }
                    }
                }
                return result;
            },
            tag: function (tag) {
                return context.getElementsByTagName(tag);
            },
            attribute: function (tag, key, value) {
                var result = [];
                var temp = context.getElementsByTagName(tag || '*');

                for (var i = 0, len = temp.length; i < len; i++) {
                    var node = temp[i];
                    if (value) {
                        var v = node.getAttribute(key);
                        (v === value) && result.push(node);
                    }
                    else if (node.hasAttribute(key)) {
                        result.push(node);
                    }
                }
                return result;
            }
        };

        var ret = direct(part, actions);

        // to array
        ret = [].slice.call(ret);

        return parts[0] && ret[0] ? filterParents(parts, ret) : ret;
    }

    function filterParents(parts, ret) {
        var parentPart = parts.pop();
        var result = [];

        for (var i = 0, len = ret.length; i < len; i++) {
            var node = ret[i];
            var p = node;

            while (p = p.parentNode) {
                var actions = {
                    id: function (el, id) {
                        return (el.id === id);
                    },
                    className: function (el, className) {
                         return hasClass(el, className);
                    },
                    tag: function (el, tag) {
                        return (el.tagName.toLowerCase() === tag);
                    },
                    attribute: function (el, tag, key, value) {
                        var valid = true;
                        if (tag) {
                            valid = actions.tag(el, tag);
                        }
                        valid = valid && el.hasAttribute(key);
                        if (value) {
                            valid = valid && (value === el.getAttribute(key))
                        }
                        return valid;
                    }
                };
                var matches = direct(parentPart, actions, p);

                if (matches) {
                    break;
                }
            }

            if (matches) {
                result.push(node);
            }
        }

        return parts[0] && result[0] ? filterParents(parts, result) : result;
    }

    var result = find(selector.split(/\s+/), context);

    return result;
}

/**
* 判断是否有某个className
* @param {HTMLElement} element 元素
* @param {string} className className
* @return {boolean}
*/
function hasClass(element, className) {
    var classNames = element.className;
    if (!classNames) {
        return false;
    }
    classNames = classNames.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            return true;
        }
    }
    return false;
}

/**
* 添加className
*
* @param {HTMLElement} element 元素
* @param {string} className className
*/
function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className = element.className ?[element.className, className].join(' ') : className;
    }
}

/**
* 删除元素className
*
* @param {HTMLElement} element 元素
* @param {string} className className
*/
function removeClass(element, className) {
    if (className && hasClass(element, className)) {
        var classNames = element.className.split(/\s+/);
        for (var i = 0, len = classNames.length; i < len; i++) {
            if (classNames[i] === className) {
                classNames.splice(i, 1);
                break;
            }
        }
    }
    element.className = classNames.join(' ');
}

/**
 * 判断是否是兄弟元素
 *
 * @param {HTMLElement} element html元素
 * @param {HTMLElement} siblingNode 判断元素
 * @return {boolean}
 */
function isSiblingNode(element, siblingNode) {
    for (var node = element.parentNode.firstChild; node; node = node.nextSibling) {
        if (node === siblingNode) {
            return true;
        }
    }
    return false;
}

/**
 * 获取元素相对于浏览器窗口左上角的位置
 * 注意：不是文档左上角，如果是相对于文档左上角，还需要加上scrollTop、scrollLeft
 *
 * @param {HTMLElement} element 元素
 * @return {Object} 位置
 */
function getPosition(element) {
    var box = element.getBoundingClientRect();
    return box;
}


// 为了便于查找绑定过的事件，增加了一级命名空间
$.event = {
    listeners: []
};


// 给一个element绑定一个针对event事件的响应，响应函数为listener
$.event.addEvent = function(element, type, listener) {
    type = type.replace(/^on/i, '').toLowerCase();

    var lis = $.event.listeners;

    var realListener = function (e) {
        if (typeof listener === 'function') {
            listener.call(element, e);
        }
    };

    if (element.addEventListener) {
        element.addEventListener(type, realListener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + type, realListener);
    }

    lis[lis.length] = [element, type, listener, realListener];

    return element;
};

// 移除element对象对于event事件发生时执行listener的响应
$.event.removeEvent = function (element, type, listener) {
    type = type.replace(/^on/i, '').toLowerCase();

    var lis = $.event.listeners;
    var len = lis.length;

    while (len--) {
        var item = lis[len];
        var isRemoveAll = !listener;

        // listener存在时，移除element的所有以listener监听的type类型事件
        // listener不存在时，移除element的所有type类型事件
        if (item[1] === type
            && item[0] === element
            && (isRemoveAll || item[2] === listener)) {
            var realListener = item[3];

            if (element.removeEventListener) {
                element.removeEventListener(type, realListener, false);
            }
            else if (element.detachEvent) {
                element.detachEvent('on' + type, realListener);
            }

            lis.splice(len, 1);
        }
    }

    return element;
};

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    return $.event.addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    return $.event.addEvent(element, 'keypress', function (e) {
        var event = e || window.event;
        var keyCode = event.which || event.keyCode;

        if (keyCode === 13) {
            listener.call(element, event);
        }
    });
}

// 事件代理
$.event.delegateEvent = function(element, tag, eventName, listener) {
    $.event.addEvent(element, eventName, function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;

        if (target && target.tagName === tag.toUpperCase()) {
            listener.call(target, event);
        }
    });
}

$.on = function (selector, event, listener) {
    return $.event.addEvent($(selector), event, listener);
};

$.click = function (selector, listener) {
    return $.event.addEvent($(selector), 'click', listener);
};

$.un = function (selector, event, listener) {
    return $.event.removeEvent($(selector), 'click', listener);
};

$.delegate = function (selector, tag, event, listener) {
    return $.event.delegateEvent($(selector), tag, event, listener);
};




/**
 * @file util2
 * @author junmer
 * @description 数据类型及语言基础
 */


/**
 * 判断arr是否为一个数组，返回一个bool值
 *
 * @param  {any}  arr 目标对象
 * @return {boolean}        判断结果
 */
function isArray(arr) {
    return '[object Array]' === Object.prototype.toString.call(arr);
}

/**
 * 判断fn是否为一个函数，返回一个bool值
 *
 * @param  {any}  fn 目标对象
 * @return {boolean}        判断结果
 */
function isFunction(fn) {
    // chrome下,'function' == typeof /a/ 为true.
    return '[object Function]' === Object.prototype.toString.call(fn);
}

/**
 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 *
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *
 * @returns {Boolean} 检查结果
 */
function isPlain(obj){
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        key;
    if ( !obj ||
         //一般的情况，直接用toString判断
         Object.prototype.toString.call(obj) !== "[object Object]" ||
         //IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
         //isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
         //对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
         !('isPrototypeOf' in obj)
       ) {
        return false;
    }

    //判断new fun()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
    if ( obj.constructor &&
        !hasOwnProperty.call(obj, "constructor") &&
        !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
        return false;
    }
    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for ( key in obj ) {}
    return key === undefined || hasOwnProperty.call( obj, key );
}


/**
 * 对一个object进行深度拷贝
 *
 * 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
 * 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
 *
 * @param  {Object} source 需要进行拷贝的对象
 * @return {Object} 拷贝后的新对象
 */
function cloneObject (source) {
    var result = source, i, len;
    if (!source
        || source instanceof Number
        || source instanceof String
        || source instanceof Boolean) {
        return result;
    } else if (isArray(source)) {
        result = [];
        var resultLen = 0;
        for (i = 0, len = source.length; i < len; i++) {
            result[resultLen++] = cloneObject(source[i]);
        }
    } else if (isPlain(source)) {
        result = {};
        for (i in source) {
            if (source.hasOwnProperty(i)) {
                result[i] = cloneObject(source[i]);
            }
        }
    }
    return result;
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

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);      // 1
// console.log(tarObj.b.b1[0]);    // "hello"



/**
 * 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
 *
 * @param  {Array} source 需要过滤相同项的数组
 * @return {Array}        过滤后的新数组
 */
function uniqArray(source) {
    var len = source.length,
        result = source.slice(0),
        i, datum;


    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
            if (datum === result[i]) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
}

// hash
function uniqArray1(arr) {
    var obj = {};
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {

        var key = arr[i];

        if (!obj[key]) {
            result.push(key);
            obj[key] = true;
        }
    }
    return result;
}


// hash + es5
function uniqArray2(arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj);
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
// console.log(b); // [1, 3, 5, 7]


var al = 10000;
var a = [];
while (al--){
    a.push(al%2);
}


console.time('uniqArray')
console.log(uniqArray(a).length);
console.timeEnd('uniqArray')

console.time('uniqArray1')
console.log(uniqArray1(a).length);
console.timeEnd('uniqArray1')

console.time('uniqArray2')
console.log(uniqArray2(a).length);
console.timeEnd('uniqArray2')

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {

    function isEmpty(c) {
        return /\s/.test(c);
    }

    for (var i = 0, l = str.length; i < l; i++) {
        if (!isEmpty(str.charAt(i))) {
            break;
        }
    }

    for (var j = str.length; j > 0; j--) {
        if (!isEmpty(str.charAt(j - 1))) {
            break;
        }
    }

    if (i > j) {
        return '';
    }

    return str.substring(i, j);
}

simpleTrim(' \t trimed   ')

/**
 * 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
 * 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
 * 尝试使用一行简洁的正则表达式完成该题目
 *
 * @param  {string} source 目标字符串
 * @return {string} 删除两端空白字符后的字符串
 */
function trim(str) {

    var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");

    return String(str).replace(trimer, "");

}

// 使用示例
var str = '   hi!  ';
str = trim(str);
// console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0, l = arr.length; i < l; i++) {
        fn(arr[i], i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
// each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
// each(arr, output);  // 0:java, 1:c, 2:php, 3:html


/**
 * 获取一个对象里面第一层元素的数量，返回一个整数
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 *
 * @param  {Object} obj
 * @return {number} 元素长度
 */
var getObjectLength = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({
            toString: null
        }).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('getObjectLength called on non-object');
        }

        var result = [],
            prop, i;

        for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }
        return result.length;
    };
}());

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
// console.log(getObjectLength(obj)); // 3

// todo 用 shicai　代码

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


// mini selector
function $(selector) {
    return document.querySelector(selector);
}



/**
 * 判断是否为邮箱地址
 *
 * @param  {string}  emailStr 目标字符串
 * @return {boolean}          结果
 */
function isEmail(emailStr) {
    return /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/.test(emailStr);
}

// console.log(isEmail('lj.meng@s.baidu.com'))


/**
 * 判断是否为手机号
 * 简单判断 不考虑 (+86) 185 xxxx xxxx
 *
 * @param  {string}  phone 目标字符串
 * @return {boolean}          结果
 */
function isMobilePhone(phone) {
    return /^1\d{10}$/.test(phone);
}

// console.log(isMobilePhone('18512341234'))





// ------------------------------------------------------------------
// 判断IE版本号，返回-1或者版本号
// ------------------------------------------------------------------

// 首先要说明的是，各种判断浏览器版本的方法，难在所有环境下都正确。navigator下的字段容易被任意篡改。
// 所以在实际场景下，如果可能的话，避免使用获取IE版本号的方式来处理问题，
// 更推荐的是直接判断浏览器特性（http://modernizr.com/）而非从浏览器版本入手。

// 这是传统的userAgent + documentMode方式的ie版本判断。
// 这在大多数对老IE问题进行hack的场景下有效果。
function isIE() {
    return /msie (\d+\.\d+)/i.test(navigator.userAgent)
        ? (document.documentMode || + RegExp['\x241']) : undefined;
}





// ------------------------------------------------------------------
// 设置cookie
// ------------------------------------------------------------------


function isValidCookieName(cookieName) {
    // http://www.w3.org/Protocols/rfc2109/rfc2109
    // Syntax:  General
    // The two state management headers, Set-Cookie and Cookie, have common
    // syntactic properties involving attribute-value pairs.  The following
    // grammar uses the notation, and tokens DIGIT (decimal digits) and
    // token (informally, a sequence of non-special, non-white space
    // characters) from the HTTP/1.1 specification [RFC 2068] to describe
    // their syntax.
    // av-pairs   = av-pair *(";" av-pair)
    // av-pair    = attr ["=" value] ; optional value
    // attr       = token
    // value      = word
    // word       = token | quoted-string

    // http://www.ietf.org/rfc/rfc2068.txt
    // token      = 1*<any CHAR except CTLs or tspecials>
    // CHAR       = <any US-ASCII character (octets 0 - 127)>
    // CTL        = <any US-ASCII control character
    //              (octets 0 - 31) and DEL (127)>
    // tspecials  = "(" | ")" | "<" | ">" | "@"
    //              | "," | ";" | ":" | "\" | <">
    //              | "/" | "[" | "]" | "?" | "="
    //              | "{" | "}" | SP | HT
    // SP         = <US-ASCII SP, space (32)>
    // HT         = <US-ASCII HT, horizontal-tab (9)>

    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24'))
        .test(cookieName);
}

function setCookie(cookieName, cookieValue, expiredays) {
    if (!isValidCookieName(cookieName)) {
        return;
    }

    var expires;
    if (expiredays != null) {
        expires = new Date();
        expires.setTime(expires.getTime() + expiredays * 24 * 60 * 60 * 1000);
    }

    document.cookie =
        cookieName + '=' + encodeURIComponent(cookieValue)
        + (expires ? '; expires=' + expires.toGMTString() : '');
}

function getCookie(cookieName) {
    if (isValidCookieName(cookieName)) {
        var reg = new RegExp('(^| )' + cookieName + '=([^;]*)(;|\x24)');
        var result = reg.exec(document.cookie);

        if (result) {
            return result[2] || null;
        }
    }

    return null;
}




// ------------------------------------------------------------------
// Ajax
// ------------------------------------------------------------------

/**
 * @param {string} url 发送请求的url
 * @param {Object} options 发送请求的选项参数
 * @config {string} [options.type] 请求发送的类型。默认为GET。
 * @config {Object} [options.data] 需要发送的数据。
 * @config {Function} [options.onsuccess] 请求成功时触发，function(XMLHttpRequest xhr, string responseText)。
 * @config {Function} [options.onfail] 请求失败时触发，function(XMLHttpRequest xhr)。
 *
 * @returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
function ajax(url, options) {
    var options = options || {};
    var data = stringifyData(options.data || {});
    var type = (options.type || 'GET').toUpperCase();
    var xhr;
    var eventHandlers = {
        onsuccess: options.onsuccess,
        onfail: options.onfail
    };

    try {
        if (type === 'GET' && data) {
            url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
            data = null;
        }

        xhr = getXHR();
        xhr.open(type, url, true);
        xhr.onreadystatechange = stateChangeHandler;

        // 在open之后再进行http请求头设定
        if (type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(data);
    }
    catch (ex) {
        fire('fail');
    }

    return xhr;

    function stringifyData(data) {
        // 此方法只是简单示意性实现，并未考虑数组等情况。
        var param = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                param.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        return param.join('&');
    }

    function stateChangeHandler() {
        var stat;
        if (xhr.readyState === 4) {
            try {
                stat = xhr.status;
            }
            catch (ex) {
                // 在请求时，如果网络中断，Firefox会无法取得status
                fire('fail');
                return;
            }

            fire(stat);

            // http://www.never-online.net/blog/article.asp?id=261
            // case 12002: // Server timeout
            // case 12029: // dropped connections
            // case 12030: // dropped connections
            // case 12031: // dropped connections
            // case 12152: // closed by server
            // case 13030: // status and statusText are unavailable

            // IE error sometimes returns 1223 when it
            // should be 204, so treat it as success
            if ((stat >= 200 && stat < 300)
                || stat === 304
                || stat === 1223) {
                fire('success');
            }
            else {
                fire('fail');
            }

            /*
             * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
             * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
             * function maybe still be called after it is deleted. The theory is that the
             * callback is cached somewhere. Setting it to null or an empty function does
             * seem to work properly, though.
             *
             * On IE, there are two problems: Setting onreadystatechange to null (as
             * opposed to an empty function) sometimes throws an exception. With
             * particular (rare) versions of jscript.dll, setting onreadystatechange from
             * within onreadystatechange causes a crash. Setting it from within a timeout
             * fixes this bug (see issue 1610).
             *
             * End result: *always* set onreadystatechange to an empty function (never to
             * null). Never set onreadystatechange from within onreadystatechange (always
             * in a setTimeout()).
             */
            window.setTimeout(
                function() {
                    xhr.onreadystatechange = new Function();
                    xhr = null;
                },
                0
            );
        }
    }

    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (e) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }

    function fire(type) {
        type = 'on' + type;
        var handler = eventHandlers[type];

        if (!handler) {
            return;
        }
        if (type !== 'onsuccess') {
            handler(xhr);
        }
        else {
            //处理获取xhr.responseText导致出错的情况,比如请求图片地址.
            try {
                xhr.responseText;
            }
            catch(error) {
                return handler(xhr);
            }
            handler(xhr, xhr.responseText);
        }
    }
}