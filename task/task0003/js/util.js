/**
 * Created by Zhi_LI on 2015/4/18.
 */

//Array.forEach implementation for IE support..
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
}

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.unique = function () {
    var obj = {},
        res = [];
    this.forEach(function (v) {
        if (!obj[v]) {
            obj[v] = true;
            res.push(v);
        }
    });
    return res;
};
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    // your implement
    var i, b = 0, e = str.length;
    //去左空格
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) != '\u0020' || str.charAt(i) != '\u3000' || str.charAt(i) != '\u0009') {
            b = i;
            break;
        }
        if (i == str.length) {
            return "";
        }

    }

    //去右空格
    for (i = str.length - 1; i > b; i--) {
        if (str.charAt(i) != '\u0020' || str.charAt(i) != '\u3000' || str.charAt(i) != '\u0009') {
            e = i;
            break;
        }
    }

    return str.substring(b, e + 1);
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    //var element  = document.getElementById(id);
    if (element.className == '') {
        element.className = newClassName;
    } else {
        //    element.className += " "+className;
        var classes = element.className.split(' ');
        classes.push(newClassName);
        element.className = classes.join(' ');
    }

}


// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    if (element.className == '') {
        element.className = '';
    } else {
        var classes = element.className.split(' ');
        classes.remove(oldClassName);
        element.className = classes.join(' ');
    }
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    eleParent = element.parentNode;
    sbParent = siblingNode.parentNode;
    return eleParent.isSameNode(sbParent);
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var eleViewLeft = getElementViewLeft(element);
    var eleViewTop = getElementViewTop(element);
    return {
        viewLeft: eleViewLeft,
        viewTop: eleViewTop
    };
    function getElementViewLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        var elementScrollLeft;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            elementScrollLeft = document.body.scrollLeft;
        } else {
            elementScrollLeft = document.documentElement.scrollLeft;
        }
        return actualLeft - elementScrollLeft;
    }

    function getElementViewTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        var elementScrollTop;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            elementScrollTop = document.body.scrollTop;
        } else {
            elementScrollTop = document.documentElement.scrollTop;
        }
        return actualTop - elementScrollTop;
    }

}




var miniQuery = window.miniQuery =
        function (selector, context) {
            //if ( window == this ) return new miniQuery(selector, context);

            return new miniQuery.fn.init(selector, context);
        },
    toString = Object.prototype.toString,
    idExpr = /^#([\w-]+)$/;

miniQuery.fn = miniQuery.prototype = {
    length: 0,
    miniQuery: '0.1',
    init: function (selector, context) {
        var elements = [];
        var classReg = /\.[\w-]*/g;
        var domReg = /\#[\w-]*/g;
        //var attrReg = /\[.*\]/g;
        //var tagReg =  /![\.\#]\w/g;

        var selClassList = selector.match(classReg);
        var selDomList = selector.match(domReg);
        //var selAttrList =selector.match(attrReg);
        //var selTagList =selector.match(tagReg);
        var eleNew = [];
        if (selDomList != null && selDomList.length == 1 && selClassList != null) {
            var classSeletor = selClassList.join('');
            //console.log(classSeletor);
            elements = document.querySelectorAll(classSeletor);
            //console.log(elements);

            eleNew = [];
            for (i = 0; i < elements.length; i++) {
                if (elements[i].parentNode.hasAttribute('id')) {
                    if (elements[i].parentNode.id == selDomList[0].replace('#', '')) {
                        eleNew.push(elements[i]);
                        //this[i] =
                        //console.log(elements[i]);
                    }
                }

            }
            elements = eleNew;
        } else {
            eleNew = [];
            elements = document.querySelectorAll(selector);
            for (i = 0; i < elements.length; i++) {
                eleNew.push(elements[i]);
            }
            elements = eleNew;
        }
        for (i = 0; i < elements.length; i++) {
            this[i] = elements[i];
        }
        this.length = elements.length;
        this.context = document;
        this.selector = selector;
        return this;
    },
    each: function (callback, args) {
        return miniQuery.each(this, callback, args);
    }
};

miniQuery.fn.init.prototype = miniQuery.prototype;

miniQuery.each = function (object, callback, args) {
    var i = 0, length = object.length;

    // 没有提供参数
    if (args === undefined) {

        for (var value = object[0];
             i < length && callback.call(value, i, value) !== false;
             value = object[++i]) {
        }
    }

    else {
        for (; i < length;) {
            if (callback.apply(object[i++], args) === false) {
                break;
            }
        }
    }
};

miniQuery.ajax = function(url, options) {
    // your implement
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var type, data;
    if (options.type) {
        type = options.type;
    } else {
        type = 'GET';
    }

    if (options.data) {
        data = options.data;
        var dataUrl = '?';
        for (ele in data) {
            dataUrl = dataUrl + ele + '=' + data[ele] + '&';
        }
        dataUrl = dataUrl.substring(0, dataUrl.length - 1);
        url = url + dataUrl;

    } else {
        console.log('no data');
    }
    //console.log(url);

    var successFun;
    if (options.onsuccess) {
        successFun = options.onsuccess;
    } else {
        console.log('no success callback')
    }

    var failFun;
    if (options.onfail) {
        failFun = options.onfail;
    } else {
        //console.log('no fail callback')
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log(xmlhttp.responseText);
            if (successFun) {
                successFun(xmlhttp.responseText);
            }
        } else {
            if (failFun) {
                failFun();
            }
        }
    };
    xmlhttp.open(type, url, true);
    xmlhttp.send();
};
miniQuery.stopDefault = function(e) {
    //阻止默认浏览器动作(W3C)
    if (e && e.preventDefault)
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
    return false;
};


// 常用方法
function now() {
        return (new Date).getTime();
    }

// 扩充数据的属性名，动态生成，避免与已有的属性冲突
var expando = "miniQuery" + now(), uuid = 0, windowData = {};
miniQuery.cache = {};
miniQuery.expando = expando;

// 数据管理，可以针对 DOM 对象保存私有的数据，可以读取保存的数据
miniQuery.fn.data = function (key, value) {

    // 读取
    if (value === undefined) {
        return miniQuery.data(this[0], key);
    }
    else {  // 设置

        this.each(
            function () {
                miniQuery.data(this, key, value);
            }
        );
    }
};
// 移除数据，删除保存在对象上的数据
miniQuery.fn.removeData = function (key) {
    return this.each(function () {
        miniQuery.removeData(this, key);
    })
};


// 为元素保存数据
miniQuery.data = function (elem, name, data) {     // #1001

    // 取得元素保存数据的键值
    var id = elem[expando], cache = miniQuery.cache, thisCache;

    // 没有 id 的情况下，无法取值
    if (!id && typeof name === "string" && data === undefined) {
        return null;
    }

    // Compute a unique ID for the element
    // 为元素计算一个唯一的键值
    if (!id) {
        id = ++uuid;
    }

    // 如果没有保存过
    if (!cache[id]) {
        elem[expando] = id;     // 在元素上保存键值
        cache[id] = {};         // 在 cache 上创建一个对象保存元素对应的值
    }

    // 取得此元素的数据对象
    thisCache = cache[id];

    // Prevent overriding the named cache with undefined values
    // 保存值
    if (data !== undefined) {
        thisCache[name] = data;
    }

    // 返回对应的值
    return typeof name === "string" ? thisCache[name] : thisCache;

};

// 删除保存的数据
miniQuery.removeData = function (elem, name) {     // #1042

    var id = elem[expando], cache = miniQuery.cache, thisCache = cache[id];

    // If we want to remove a specific section of the element's data
    if (name) {
        if (thisCache) {
            // Remove the section of cache data
            delete thisCache[name];

            // If we've removed all the data, remove the element's cache
            if (miniQuery.isEmptyObject(thisCache)) {
                miniQuery.removeData(elem);
            }
        }

        // Otherwise, we want to remove all of the element's data
    } else {

        delete elem[miniQuery.expando];

        // Completely remove the data cache
        delete cache[id];
    }
};

// 检查对象是否是空的
miniQuery.isEmptyObject = function (obj) {
    // 遍历元素的属性，只有要属性就返回假，否则返回真
    for (var name in obj) {
        return false;
    }
    return true;

};

// 用于生成事件处理函数的 id
miniQuery.guid = 1;

// jQuery 的事件对象
miniQuery.event = {    // # 1555

    // 为对象增加事件
    // elem 增加事件的元素， type 事件的名称, handler 事件处理程序, data 事件相关的数据
    add: function (elem, type, handler, data) {

        var handleObjIn, handleObj;

        // 确认函数有一个唯一的 ID
        if (!handler.guid) {
            handler.guid = miniQuery.guid++;
        }

        // 取得这个元素所对应的缓存数据对象
        var elemData = miniQuery.data(elem);

        // 取得元素对应的缓存对象上的事件对象和所有事件共用的处理程序
        var events = elemData.events = elemData.events || {};
        var eventHandle = elemData.handle;

        // 是否已经有事件处理函数 handle 只有一个，都是使用 jQuery.event.handle
        // 通过使用闭包，使得这个函数引用当前的事件对象，参数。
        if (!eventHandle) {
            elemData.handle = eventHandle = function () {
                return miniQuery.event.handle.apply(eventHandle.elem, arguments);
            };
        }

        // 使得闭包处理程序可以找到事件源对象
        eventHandle.elem = elem;

        //
        handleObj = { handler: handler, data: data};
        handleObj.namespace = "";


        handleObj.type = type;
        handleObj.guid = handler.guid;

        // 每种事件可以有一系列的处理程序，数组形式
        var handlers = events[type],
            special = miniQuery.event.special[type] || {};

        // Init the event handler queue
        if (!handlers) {
            handlers = events[type] = [];

            // Check for a special event handler
            // Only use addEventListener/attachEvent if the special
            // events handler returns false
            // 完成实际的事件注册
            // 实际的事件处理函数是 eventHandle
            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                // Bind the global event handler to the element
                if (elem.addEventListener) {
                    elem.addEventListener(type, eventHandle, false);

                } else if (elem.attachEvent) {
                    elem.attachEvent("on" + type, eventHandle);
                }
            }
        }

        // 自定义的处理函数在一个堆栈中，以后 jQuery.event.handle 到这里找到实际的处理程序
        handlers.push(handleObj);

        // Nullify elem to prevent memory leaks in IE
        elem = null;
    },
    remove: function(elem, type, handler, data){
        var elemData = miniQuery.data(elem);
        var events = elemData.events = elemData.events || {};
        var eventHandle = elemData.handle;
        //console.log(elemData);
        //console.log(events);
        //console.log(eventHandle);
        //console.log(handler);
        //elemData.events = {};
        //特定元素，所有事件
        if (!type){
            for (key in events) {
                delete events[key];
            }

        }else if(!handler){
            //特定元素，特定事件，所有函数
            delete events[type];
        }else {
            //特定元素、特定事件、特定函数
            for (var key in  events){
                if (key == type) {
                    for (i=0; i< events[key].length; i++){
                        //for (j=0; j<)
                        //console.log(events[key][i]);
                        if (events[key][i].handler === handler) {
                            events[key].remove(events[key][i]);
                        }
                    }
                }
                if (events[key].length == 0) {
                    delete events[key];
                }
            }
        }

        //console.log(events);



    },
    global: {},

    // 真正的事件处理函数,
    // 由于是通过  return jQuery.event.handle.apply(eventHandle.elem, arguments) 调用的
    // 所以，此时的 this 就是事件源对象，event 是事件参数
    handle: function (event) {  // 1904
        var all, handlers, namespaces, namespace, events;

        event = window.event;
        event.currentTarget = this;

        // 在当前的事件对象上找到事件处理列表
        var events = miniQuery.data(this, "events"), handlers = events[event.type];

        if (events && handlers) {
            // Clone the handlers to prevent manipulation
            handlers = handlers.slice(0);

            for (var j = 0, l = handlers.length; j < l; j++) {
                var handleObj = handlers[j];


                // 取得注册事件时保存的参数
                event.handler = handleObj.handler;
                event.data = handleObj.data;
                event.handleObj = handleObj;

                var ret = handleObj.handler.apply(this, arguments);
            }
        }

        return event.result;
    },

    special: {}

};

// on 函数定义
miniQuery.fn.on = function( type, fn)
{
    var handler = fn;

    // 调用 jQuery.event.add 添加事件
    for (var i = 0, l = this.length; i < l; i++) {
        miniQuery.event.add(this[i], type, handler);
    }
    return this;
};
// un
miniQuery.fn.un = function (type, fn) {
    // Handle object literals
    if (typeof type === "object" && !type.preventDefault) {
        //console.log(miniQuery.event);
        console.log(this);
        for (var key in type) {
            console.log(key);
            console.log(type[key]);

            this.unbind(key, type[key]);
        }

    } else {
        for (var i = 0, l = this.length; i < l; i++) {
            //console.log(this);
            //console.log(this.length);

            //console.log(this[i]);
            miniQuery.event.remove(this[i], type, fn);
        }
    }

    return this;
};
// click 事件的注册方法
miniQuery.fn.click = function (fn) {
    this.on("click", fn);
    return this;
};

miniQuery.fn.enter = function (fn) {
    this.on("enter", fn);
    return this;
};

var $ = miniQuery;


