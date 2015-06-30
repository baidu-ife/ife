// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return (typeof arr === "object" 
            && Object.prototype.toString.call(arr) === "[object Array]") 
            ? true : false;
       
}

// 判断arr是否为一个日期对象，返回一个bool值
function isDate(arr) {
    return (typeof arr === "object" 
            && Object.prototype.toString.call(arr) === "[object Date]") 
            ? true : false;
       
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(x) === "[object function]";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    switch (typeof src) {
        case 'number':
        case 'string':
        case 'boolean':
            return src;
        case 'object':
            if (isArray(src)) {
                var newArr = [];
                for (var i = 0; i < src.length; i++) {
                    if (typeof src[i] !== "object") {
                        newArr[i] = src[i];
                    }
                    else {
                        newArr[i] = cloneObject(src[i]); 
                    }
                }
                return newArr;
            }
            else if (isDate(src)) {
                return new Date(+src);
            }
            else {
                var newObj = {}, prop;
                for (prop in src) {
                    if (src.hasOwnProperty(prop)) {
                        newObj[prop] = src[prop];
                    }
                }
                return newObj;
            }
    }
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var uniqArr = [], hash = {}, elem;
    for (var i = 0, len = arr.length; i < len; i++) {
        elem = arr[i];
        if (!hash[elem]) {
            uniqArr.push(arr[i]);
            hash[elem] = true;
        }
    }
    return uniqArr;
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var n = 0, m = str.length-1;
    var tab = /\t/;
    while (str.charAt(n) === " " || str.charAt(n).match(tab)) {
        n++;
    }
    while (str.charAt(m) === " " || str.charAt(m).match(tab)) {
        m--;
    }
    return str.slice(n, m+1);
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g,'');
    
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    for (var i in arr) {
        fn(arr[i], i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    return Object.keys(obj).length;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    //var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var re=/^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    //1xxxxxxxxxx or 1xx-xxx-xxxxx or 1xx-xxxx-xxxx
    var mobileNum = /^1[3458]\d-?(?:\d{4}-?\d{4})|(?:\d{3}-\d{5})$/;
    return mobileNum.test(phone.toString());
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var classStr = element.getAttribute("class");
    classStr += " "+newClassName;
    element.setAttribute("class", trim(classStr));
    
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var classStr = element.getAttribute("class");
    var match = new RegExp("(?:[\\x20\\t\\r\\n\\f]*" + oldClassName +")|(?:" +oldClassName + "[\\x20\\t\\r\\n\\f]*)");
    classStr = classStr.replace(match,"");
    element.setAttribute("class", classStr);
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var elementParent = element.parentNode;
    var siblingNodeParent = siblingNode.parentNode;
    while (elementParent && siblingNodeParent 
           && elementParent !== siblingNodeParent
           && elementParent.nodeType === 1 && siblingNodeParent.nodeType === 1) {
        elementParent = elementParent.parentNode;
        siblingNodeParent = siblingNodeParent.parentNode;
    }
    return (elementParent ===siblingNodeParent);
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var eltPos = element.getBoundingClientRect();
    return {x: eltPos.left, y: eltPos.top};
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(selector, event, listener) {
    var element = $(selector);
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else {
        element.attachEvent("on" + event, listener);
    }
};

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(selector, event, listener) {
    var element = $(selector);
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else {
        element.detachEvent("on" + event, listener);
    }
};

// 实现对click事件的绑定
function addClickEvent(selector, listener) {
    var element = $(selector);
    if (element.addEventListener) {
        element.addEventListener("click", listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("onclick", listener);
    }
    else if (element.onclick) {
        element.onclick = listener;
    }    
};

// 实现对于按Enter键时的事件绑定
function addEnterEvent(selector, listener) {
    var element = $(selector);
    if (element.addEventListener) {
         element.addEventListener("keydown", handler, false);
    }
    else {
        element.attachEvent("onkeydown", handler);
    }
    function handler(event){
        if (event.keyCode === 13) {
            listener();
        }
    }
};

// 实现一个简单的Query
function $(selector) {
    var quickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    var identifier = "(?:[\\w-])+";
    
    // 属性名匹配结果数组元素1
    var attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
        // 运算符匹配,只考虑等于的简单情况
        "*=" + whitespace +
        // 属性值为字符串('' or "" )或identifier，分别为结果数组元素2, 3, 4
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
        "*\\]";
    var comExpr = "(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+)|(" + attributes + "))";
    var attrExpr = new RegExp("^" + attributes);
    var combine = new RegExp(comExpr + "$");
    var match, m, element, newSelector, n, seed, index;
    //快速匹配id,tag,class
    if (match = quickExpr.exec(selector)) {
        element = quickMatch(match)[0];
    }
    //采用遍历DOM树的方式来查找属性匹配的节点
    else if (match = attrExpr.exec(selector)) {
        element = attrMatch(match)[0];
    }
    //匹配简单组合
    else if (match = combine.exec(selector)) {
        newSelector = selector;  
        //匹配最末尾的选择器,由右至左
        if (m = match[0]) {
            //匹配符合的所有元素
            if (match[1] || match[2] || match[3]) {
                n = quickExpr.exec(m);
                seed = quickMatch(n); 
            }
            else if (match[4]) {
                n = attrExpr.exec(m);
                seed = attrMatch(n);
            }
            //在匹配字符串中删除已匹配的子字符串
            index = newSelector.indexOf(m);
            newSelector = trim(newSelector.substring(0, index));            
            //对元素集筛选
            element = seedFilter(seed, combine, quickExpr, attrExpr, newSelector)[0];
        }
    }
    return element;
}

function quickMatch(match) {
    var m, element;
    var elements = [];
    if (m = match[1]) {
        if ((element = document.getElementById(m)) && element.id === m) {
            elements.push(element);
        }
    } 
    else if (m = match[2]) {
        elements = document.getElementsByTagName(m);
    }
    else if (m = match[3]) {
        elements = getByClassName(m);
    }
    return elements;
}

function getByClassName(str) {
    if (document.getElementsByClassName) { 
        return document.getElementsByClassName(str); 
    }
    else {
        return recursiveTree(document.documentElement,"class", str);
    }
}


        
function attrMatch(match) {
    var attrName, value;
    var elements = [];
    attrName = match[1];
    //匹配有指定值的属性
    if (match[2] || match[3] || match[4]) {
        value = trim(match[2] || match[3] || match[4]);
    }
    //可以调用遍历文档树api--http://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
    if (NodeIterator) {
        var iterator = document.createNodeIterator(document, NodeFilter.SHOW_ELEMENT, null, false);
        var node = iterator.nextNode();
        while (node)
        {
            if (node.hasAttribute(attrName)) {           
                if (value && node.getAttribute(attrName) === value) {
                    elements.push(node);
                }
                else if (!value) {
                    elements.push(node);
                }
            }
            node = iterator.nextNode();       
        }
    }
    //递归遍历文档树
    else {
        elements = recursiveTree(document.documentElement,attrName, value);
    }
    return elements;
}

function recursiveTree(node, attrName, /* option */ attrValue) {
    var children = node.childNodes;
    var elements = [];
    var ele;
    for (var i = 0; i < children.length; i++) {
        if (children[i].nodeType === 1) {
            if (children[i].hasAttribute(attrName)) {
                if (attrName === "class" && children[i].className.indexOf(attrValue) !== -1) {
                    elements.push(children[i]);
                }
                else {
                    if (!attrValue) {
                        elements.push(children[i]);
                    }
                    else if (attrValue && children[i].getAttribute(attrName) === attrValue) {
                        elements.push(children[i]);         
                    }
                }
                
            }
            else {
                if (!attrValue) {
                    ele = recursiveTree(children[i], attrName);    
                }
                else {
                    ele = recursiveTree(children[i], attrName, attrValue);
                }
                for (var j = 0, len = ele.length; j < ele.length; j++){
                    elements.push(ele[j]);
                }
            } 
        }
    }
    return elements;
}
function seedFilter(seed, combine, quickExpr, attrExpr, selector) {
    var newSeed = [];
    var parentND = [], newParentND = [];
    var node, m, newSelector, match, matchFlag, index;
    newSelector = selector;
    //验证完所有过滤条件
    while (newSelector) {
        newSeed = [];
        newParentND = [];
        //取最右边的过滤条件
        match = combine.exec(newSelector);
        //表明过滤条件为父元素{1:id; 2:tag; 3:class; 4:attr;}
        matchFlag = (match[1])?1:(((match[2])?2:(match[3]?3:(match[4]?4:0))));    
        if (m = match[0]) {
            //对已选出的元素逐个验证
            for (var i = 0; i < seed.length; i++) {
                node = seed[i];
                if (parentND[i]) { node = parentND[i];}
                switch (matchFlag) {
                    case 1:
                        while (node.parentNode) {
                            if (node.parentNode.id === match[1]) {
                                //存入该元素
                                newSeed.push(seed[i]);
                                //存入满足条件的父元素以便下一层筛选
                                newParentND.push(node.parentNode);
                                break;
                            }
                            else { node = node.parentNode; }
                        }
                        break;
                    case 2:
                        while (node.parentNode.tagName) {
                            if (node.parentNode.tagName.toLowerCase() === match[2]) {
                                //存入该元素
                                newSeed.push(seed[i]);
                                //存入满足条件的父元素以便下一层筛选
                                newParentND.push(node.parentNode);
                                break;
                            }
                            else { node = node.parentNode; }
                        }
                        break;
                    case 3:
                        while (node.parentNode) {
                            if (node.parentNode.className === match[3]) {
                                //存入该元素
                                newSeed.push(seed[i]);
                                //存入满足条件的父元素以便下一层筛选
                                newParentND.push(node.parentNode);
                                break;
                            }
                            else { node = node.parentNode; }
                        }
                        break;
                    case 4:
                        var value = trim(match[2] || match[3] || match[4]);
                        while (node.parentNode) {
                            if (node.parentNode.hasAttribute(match[4])
                                && (!value || (value && node.parentNode.getAttribute(match[4] === value)))) {
                                //存入该元素
                                newSeed.push(seed[i]);
                                //存入满足条件的父元素以便下一层筛选
                                newParentND.push(node.parentNode);
                                break;
                            }
                            else { node = node.parentNode; }
                        }
                        break;
                } /*swith*/        
                
            } /*for*/
            
        } /*if*/
        else {
            return false;
        }
        //在匹配字符串中删除已匹配的子字符串
        index = newSelector.indexOf(m);
        newSelector = trim(newSelector.substring(0, index));
        //更新seed备选集
        seed = newSeed;
        parentND = newParentND;
    }
    return newSeed;
}

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

function delegateEvent(selector, tag, event, listener) {
    $.on(selector, event, function(){
        var e = arguments[0] || window.event,
        ul = e.srcElement ? e.srcElement : e.target,
        nn = ul.nodeName.toLowerCase();
        if (nn == tag.toLowerCase()) {
            return listener(e);
        }
    });
}
function disDelegateEvent(selector, tag, event, listener) {
    $.un(selector, event, function(){
        var e = arguments[0] || window.event,
        ul = e.srcElement ? e.srcElement : e.target,
        nn = ul.nodeName.toLowerCase();
        if (nn == tag.toLowerCase()) {
            return listener(e);
        }
    });
}

$.delegate = delegateEvent;
$.disDelegate = disDelegateEvent;

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = navigator.userAgent.toLowerCase();
    var match, tridentMap={'4':8,'5':9,'6':10,'7':11}; 
    match = ua.match(/msie ([\d.]+)/);
    if (match && match[1]) {
        //find by msie
        return +match[1];
    }
    match = ua.match(/trident\/(\d+)/);
    if (match && match[1]) {
        //find by trident
        return tridentMap[match[1]] || -1;
    }
    return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookie = cookieName + "=" + encodeURIComponent(cookieValue);
    if (typeof expiredays === "number") {
        cookie += "; max-age=" + (expiredays*24*60*60);
    }
    document.cookie = cookie;
}

// 获取cookie值
function getCookie(cookieName) {
    var cookie = {};
    var all = document.cookie;
    var kv, index, key, value;
    if (all === "") { return cookie;}
    var list = all.split(";");
    for (var i = 0; i < list.length; i++) {
        kv = list[i];
        index = kv.indexOf("=");
        key = trim(kv.substring(0, index));
        value = trim(kv.substring(index+1));
        value = decodeURIComponent(value);
        cookie[key] = value;
    }
    return cookie;
}

function ajax(url, options) {
    //缺省默认为GET
    options.type = options.type || "GET";
    var request = new XMLHttpRequest();
    var encodeFormData = function (data) {
        var pairs = [];
        if (!data) { return "";}
        if (typeof data === "string") {
            return data;
        }
        else if (typeof data === "object") {
            for (var name in data) {
                if (!data.hasOwnProperty(name)) continue;
                if (typeof data[name] === "function") continue;
                var value = data[name].toString();
                name = encodeURIComponent(name.replace(/%20/, "+"));
                value = encodeURIComponent(value.replace(/%20/, "+"));
                pairs = name + "=" + value;
            }
            return pairs.join("&");
        }   
    };

    if (options.type === "GET") {
         request.open("GET", url + "?" + encodeFormData(options.data));
         request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader("Content-Type");
                if (type.match(/^text/)) {
                    options.onsuccess(request.responseText);
                }   
            }
            if (request.readyState === 4 && request.status !== 200) {
                options.onfail(request.responseText);
            }
         };
         request.send(null);
    }
    else if (options.type === "POST") {
        request.open("POST", url);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader("Content-Type");
                if (type.match(/^text/)) {
                    options.onsuccess(request.responseText);
                }   
            }
            if (request.readyState === 4 && request.status !== 200) {
                options.onfail(request.responseText);
            }
         };
         request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
         request.send(encodeFormData(options.data));
    }
}