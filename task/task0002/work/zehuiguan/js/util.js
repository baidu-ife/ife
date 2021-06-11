// 呕心沥血、累觉不爱

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    return Object.prototype.toString.call(arr) === "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    return typeof variable === "function";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
    var result;
    if (Object.prototype.toString.call(src) === "[Object Array]" ) {
        result = [];
    } else if (src instanceof Date) {
        return new Date(src.getTime());
    } else if (typeof src === "function" || src instanceof RegExp) {
        return;
    } else {
        result = {};
    }

    for (var i in src) {
        if (src.hasOwnProperty(i)) {
            if (typeof src[i] === "object") {
                result[i] = arguments.callee(src[i]);
            } else {
                result[i] = src[i];
            }
        }
    }
    return result;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var newArr = [];
    for (var i in arr) {
        if(newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
    for (var i = 0, n = str.length; i < n; i++) {
        if (str.charAt(i) != " " && str.charAt(i) != "\t") {
            break;
        }
    }

    for (var j = str.length; j > 0; j++) {
        if (str.charAt(i) != " " && str.charAt(i) != "\t") {
            break;
        }
    }
    return str.slice(i, j+1);
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    return str.replace(/(^\s+)|(\s+$)/g,"");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
    // your implement
    arr.forEach(fn);
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    return Object.keys(obj).length;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var pattern = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
    return pattern.test(emailStr);
}

//判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var pattern = /^(\+\d{1,4})?\d{7,11}$/;
    return pattern.test(phone);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    var oldClassName = element.className;
    element.className = oldClassName === ""? newClassName : oldClassName + " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    var originClassName = element.className;
    var pattern = new RegExp("\\b" + oldClassName + "\\b");
    element.className = originClassName.replace(pattern, '');
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement

    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    var pos = {};

    if (element.getBoundingClientRect) {
        if (typeof arguments.callee.offset != "number") {
            var temp = document.createElement("div");
            temp.style.cssText = "position:absolute;left:0;top:0;";
            document.body.appendChild(temp);
            arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
            document.body.removeChild(temp);
            temp = null;
        }

        var rect = element.getBoundingClientRect();
        var offset = arguments.callee.offset;

        pos.x = rect.left + offset;
        pos.y = rect.top + offset;

    } else {

        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);

        pos.x = actualLeft - scrollLeft;
        pos.y = actualTop - scrollTop;
    }
    return pos;
}

// 实现一个简单的JQuery
//思路：
//1、判断分组处理器
//2、处理层级处理器
//3、各种元素的处理
function $(selector) {

    if (!selector) {
        return null;
    }

    if (selector == document) {
        return document;
    }

    selector = selector.trim();

    if (selector.indexOf(" ") !== -1) { //若存在空格
        var selectorArr = selector.split(/\s+/); //拆成数组

        var rootScope = myQuery(selectorArr[0]); //第一次的查找范围
        var i = null;
        var j = null;
        var result = [];
        //循环选择器中的每一个元素
        for (i = 1; i < selectorArr.length; i++) {
            for (j = 0; j < rootScope.length; j++) {
                result.push(myQuery(selectorArr[i], rootScope[j]));
            }
            // rootScope = result;
            // 目前这个方法还有bug
        }
        return result[0][0];
    } else { //只有一个，直接查询
        return myQuery(selector, document)[0];
    }
}

/**
 * 针对一个内容查找结果 success
 * @param  {String} selector 选择器内容
 * @param  {Element} root    根节点元素
 * @return {NodeList数组}    节点列表，可能是多个节点也可能是一个
 */
function myQuery(selector, root) {
    var signal = selector[0]; //
    var allChildren = null;
    var content = selector.substr(1);
    var currAttr = null;
    var result = [];
    root = root || document; //若没有给root，赋值document
    switch (signal) {
        case "#":
            result.push(document.getElementById(content));
            break;
        case ".":
            allChildren = root.getElementsByTagName("*");
            // var pattern0 = new RegExp("\\b" + content + "\\b");
            for (i = 0; i < allChildren.length; i++) {
                currAttr = allChildren[i].getAttribute("class");
                if (currAttr !== null) {
                    var currAttrsArr = currAttr.split(/\s+/);
                    // console.log(currAttr);
                    for (j = 0; j < currAttrsArr.length; j++) {
                        if (content === currAttrsArr[j]) {
                            result.push(allChildren[i]);
                            // console.log(result);
                        }
                    }
                }
            }
            break;
        case "[": //属性选择
            if (content.search("=") == -1) { //只有属性，没有值
                allChildren = root.getElementsByTagName("*");
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                        result.push(allChildren[i]);
                    }
                }
            } else { //既有属性，又有值
                allChildren = root.getElementsByTagName("*");
                var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //为了分离等号前后的内容
                var cut = selector.match(pattern); //分离后的结果，为数组
                var key = cut[1]; //键
                var value = cut[2]; //值
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(key) == value) {
                        result.push(allChildren[i]);
                    }
                }
            }
            break;
        default: //tag
            result = root.getElementsByTagName(selector);
            break;
    }
    return result;
}

// /**
//  * mini $
//  *
//  * @param {string} selector 选择器
//  * @return {Array.<HTMLElement>} 返回匹配的元素列表
//  */
// function $(selector) {
//     var idReg = /^#([\w_\-]+)/;
//     var classReg = /^\.([\w_\-]+)/;
//     var tagReg = /^\w+$/i;
//     // [data-log]
//     // [data-log="test"]
//     // [data-log=test]
//     // [data-log='test']
//     var attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;

//     // 不考虑'>' 、`~`等嵌套关系
//     // 父子选择器之间用空格相隔
//     var context = document;

//     function blank() {}

//     function direct(part, actions) {
//         actions = actions || {
//             id: blank,
//             className: blank,
//             tag: blank,
//             attribute: blank
//         };
//         var fn;
//         var params = [].slice.call(arguments, 2);
//         // id
//         if (result = part.match(idReg)) {
//             fn = 'id';
//             params.push(result[1]);
//         }
//         // class
//         else if (result = part.match(classReg)) {
//             fn = 'className';
//             params.push(result[1]);
//         }
//         // tag
//         else if (result = part.match(tagReg)) {
//             fn = 'tag';
//             params.push(result[0]);
//         }
//         // attribute
//         else if (result = part.match(attrReg)) {
//             fn = 'attribute';
//             var tag = result[1];
//             var key = result[2];
//             var value = result[4];
//             params.push(tag, key, value);
//         }
//         return actions[fn].apply(null, params);
//     }

//     function find(parts, context) {
//         var part = parts.pop();

//         var actions = {
//             id: function (id) {
//                 return [
//                     document.getElementById(id)
//                 ];
//             },
//             className: function (className) {
//                 var result = [];
//                 if (context.getElementsByClassName) {
//                     result = context.getElementsByClassName(className)
//                 }
//                 else {
//                     var temp = context.getElementsByTagName('*');
//                     for (var i = 0, len = temp.length; i < len; i++) {
//                         var node = temp[i];
//                         if (hasClass(node, className)) {
//                             result.push(node);
//                         }
//                     }
//                 }
//                 return result;
//             },
//             tag: function (tag) {
//                 return context.getElementsByTagName(tag);
//             },
//             attribute: function (tag, key, value) {
//                 var result = [];
//                 var temp = context.getElementsByTagName(tag || '*');

//                 for (var i = 0, len = temp.length; i < len; i++) {
//                     var node = temp[i];
//                     if (value) {
//                         var v = node.getAttribute(key);
//                         (v === value) && result.push(node);
//                     }
//                     else if (node.hasAttribute(key)) {
//                         result.push(node);
//                     }
//                 }
//                 return result;
//             }
//         };

//         var ret = direct(part, actions);

//         // to array
//         ret = [].slice.call(ret);

//         return parts[0] && ret[0] ? filterParents(parts, ret) : ret;
//     }

//     function filterParents(parts, ret) {
//         var parentPart = parts.pop();
//         var result = [];

//         for (var i = 0, len = ret.length; i < len; i++) {
//             var node = ret[i];
//             var p = node;

//             while (p = p.parentNode) {
//                 var actions = {
//                     id: function (el, id) {
//                         return (el.id === id);
//                     },
//                     className: function (el, className) {
//                          return hasClass(el, className);
//                     },
//                     tag: function (el, tag) {
//                         return (el.tagName.toLowerCase() === tag);
//                     },
//                     attribute: function (el, tag, key, value) {
//                         var valid = true;
//                         if (tag) {
//                             valid = actions.tag(el, tag);
//                         }
//                         valid = valid && el.hasAttribute(key);
//                         if (value) {
//                             valid = valid && (value === el.getAttribute(key))
//                         }
//                         return valid;
//                     }
//                 };
//                 var matches = direct(parentPart, actions, p);

//                 if (matches) {
//                     break;
//                 }
//             }

//             if (matches) {
//                 result.push(node);
//             }
//         }

//         return parts[0] && result[0] ? filterParents(parts, result) : result;
//     }

//     var result = find(selector.split(/\s+/), context);

//     return result;
// }

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
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
    // your implement
    addEvent(element, "click", listener);    
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    addEvent(element, "keyup", function(event) {
        if (event.keyCode == 13) {
            listener();
        }
    });    
}

//事件代理
function delegateEvent(element, tag, eventName, listener) {
    // your implement
    addEvent(element, eventName, function(event){
        var target = event.target || event.srcElement;

        //针对task0005.js修改bug，避免父元素与“子元素”是同一个元素。
        if (target.tagName.toLowerCase() === tag && (element !== target)) {
            listener.call(target, event);
        }
    });
}
// 估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变：

$.on = function(selector, event, listener) {
    addEvent($(selector), event, listener);
};
$.click = function(selector, listener) {
    addClickEvent($(selector), listener);
};
$.un = function(selector, event, listener) {
    removeEvent($(selector), event, listener);
};
$.delegate = function(selector, tag, event, listener) {
    delegateEvent($(selector), tag, event, listener);
};

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    //rendering engines
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,

        //complete version
        ver: null
    };

    //browsers
    var browser = {

        //browsers
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,

        //specific version
        ver: null
    };

    //detect rendering engines/browsers
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);

        //figure out if it's Chrome or Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            //approximate version
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }

            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);

        //determine if it's Firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if ((/MSIE ([^;]+)/.test(ua)) || (/rv:([\d.]+)/).test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }

    if (engine.engine.ie) {
        return client.engine.ver;
    } 
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var exdate = new Date();

    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays === null) ? "" : ";expires=" + exdate.toGmtString());
}

// 获取cookie值
function getCookie(cookieName) {
    var c_start, c_end;

    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

// 封装Ajax
function ajax(url, options) {
    // your implement
    var xmlhttp;
    var data_temp;
    // var type = GET;
    if (!options.type) {
        options.type = "GET";
    } else if (options.data) {
        options.type = "POST";
        if (typeof options.data !== "String") {
            for (var i in options.data) {
                data_temp += "" + options.data[i];
            }
            options.data = data_temp;
        }
    }
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            options.onsuccess();
        }
        else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
            options.onfail();
        }
    };
    xmlhttp.open(options.type, "url", true);
    xmlhttp.send(data);
}