//任务2 JavaScript数据类型及语言基础
//判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return (arr instanceof Array);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return (fn instanceof function);
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。
//不会包含函数、正则对象等
function cloneObject(src) {
    //如果对象类型为数字、字符串、布尔，则直接返回
    if (typeof src == "number" || src == "string" || src == "boolean") {
        return src;
    }
    //如果对象类型是数组，对数组中每一个成员进行复制
    if (src instanceof Array) {
        var newsrc = new Array();
        for (var i = 0; i < src.length; i++) {
            newsrc[i] = src[i];
        }
        return newsrc;
    }
    //如果对象类型是日期，获取原本的日期并赋值
    if (src instanceof Date) {
        var newsrc = new Date();
        newsrc.setTime(src.getTime());
        return newsrc;
    }
    //如果对象类型是Object，复制属性
    if (src instanceof Object) {
        var newsrc = new Object();
        for (var i in src) {
            if (src.hasOwnProperty(i))
                newsrc[i] = cloneObject(src[i]);
        }
        return newsrc;
    }
    //其他类型，异常
    throw new error("Unable to copy this type!");
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var array = new Array();
    var obj = new Object();
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            //如果数组array中没有相同元素，则添加
            array.push(arr[i]);
            obj[arr[i]] = true;
        }
    }
    return array;
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，
//分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，
//最后返回一个完成去除的字符串
function simpleTrim(str) {
    var array = new Array();
    for (var i = 0; i < str.length; i++) {
        //有个问题是如果字符串内容为:"Hello World!"，结果会成为:"HelloWorld!"
        //暂时不知道怎么解决了T^T
        if (str.charAt(str[i]) != " ")
            array[i] = str.charAt(str[i]);
        else continue;
    }
    return array.join("");
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    //正则表达式看起来很好玩的样子，像一群颜文字哈哈哈~\(-3-)/
    //虽然还没太弄明白怎么处理
    return str.replace(/(^\s*)|(\s*$)|(^[\u3000]*)|([\u3000]*$)/g,"");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，
//并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], arr[i].index);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var num = 0;
    for (var i in obj) {
        if (obj.hasOwnProperty(i))
            num++;
    }
    return num;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var anemail = '/^[0-9\w\.\-]+@[0-9\w]+\.(com|cn)&/';
    return anemail.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var phonenum = '/^1(3|5|7|8)\d{9}&/';
    return phonenum.test(phone);
}

//任务3 DOM
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (element.className)
        element.className = element.className + newClassName;
    else
        element.className = newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    element.className = null;
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if (element.parentNode == siblingNode.parentNode)
        return true;
    else
        return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var obj = {
        var x : getX(element),
        var y : getY(element)
    };
    return obj;
}
function getX(element) {
    var offsetX = element.offsetLeft;
    if (element.offsetParent != null)
        offsetX += getX(element.offsetParent);
    return offsetX;
}
function getY(element) {
    var offsetY = element.offsetTop;
    if (element.offsetParent != null)
        offsetY += getX(element.offsetParent);
    return offsetY;
}

// 实现一个简单的Query
function $(selector) {
    var sel = selector.split(" ");
    var node = null;
    var parent = null;

    for (var i = 0; i < sel.length; i++) {
        var mark = sel[i].charAt(0);
        //判断ID选择器
        if (mark == "#") {
            var id = sel[i].slice(1);
            if (parent ==null)
                document.getElementById(id);
            else
                parent.getElementById(id);
        }
        //判断类选择器
        else if (mark == ".") {
            var classname = sel[i].slice(1);
            //这里的getElementsByClassName不在JavaScript的获取元素方法中，需要封装。
            //后期再来实现，先就这个意思写着吧。
            if (parent ==null)
                node = document.getElementsByClassName(classname)[0];
            else
                node = parent.getElementsByClassName(classname)[0];
        }
        //判断属性选择器
        else if (mark == "[") {
            var equal = sel[i].indexOf("=");
            //属性+值选择器
            if (equal != -1) {
                var attri = sel[i].slice(1, equal);
                var value = sel[i].slice(equal);
                //getElementsByAttribute也需要封装，后期
                if (parent ==null)
                    node = document.getElementsByAttribute(attri, value)[0];
                else
                    node = parent.getElementsByAttribute(attri, value)[0];
            }
            //属性选择器
            else {
                var attri = sel[i].slice(1, sel[i].length);
                //getElementsByAttribute也需要封装，后期
                if (parent ==null)
                    node = document.getElementsByAttribute(attri, null)[0];
                else
                    node = parent.getElementsByAttribute(attri, null)[0];
            }
        }
        //标签选择器
        else {
            if (parent ==null)
                node = document.getElementsByTagName(sel[i])[0];
            else
                node = parent.getElementsByTagName(sel[i])[0];
        }
        //在当前选择的结果中继续选择
        parent = node;
    }
}

//对于getElementsByClassName进行封装
function getElementsByClassName(classname) {
    //判断浏览器是否支持原生JS方法
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(classname);
    }
    else {
        var nodes=document.getElementsByTagName('*');
        var classes=[];
        
        for(var i=0;i<nodes.length;i++) {
            if(nodes[i].hasClass(classname)) {
               classes.push(nodes[i]);
            }
        }
        return classes;
    }
}

//对于getElementsByAttribute进行封装
// 这一段是从网上看到的，感觉不太对。先留下，后面再看
/*function getElementsByAttribute(attri, value) {
    var elementArray = new Array();
    var matchedArray = new Array();
    
    elementArray = document.getElementsByTagName("*");
    
    for (var i = 0; i < elementArray.length; i++) {
        if (attri == "class") {
            var pattern = new RegExp("(^| )" + value + "( |$)");   
            if (elementArray[i].className.match(pattern)) {
                matchedArray[matchedArray.length] = elementArray[i];
            }
        }
        else if (elementArray[i].getAttribute(attri) == value) {
            matchedArray[matchedArray.length] = elementArray[i];
        }
    }
    return matchedArray;
}*/

// 这是网上好多人都在传的司徒正美版本的，现在还不能怎么看懂，也留下来做参考。
var getElementsByAttribute = function(search) { 

    //***********@author：司徒正美（nasami）************* 
    //http://www.cnblogs.com/rubylouvre/archive/2009/10/26/1590102.html 

    var tag = /([\*a-zA-Z1-6]*)?(\[(\w+)\s*(\^|\$|\*|\||~|!)?=?\s*([\w\u00C0-\uFFFF\s\-_\.]+)?\])?/;
    node = arguments[1] || document;
    agent = search.match(tag);
    tag = agent[1] || "*";
    attribute = agent[3];
    type =  agent[4]+"=";
    value = agent[5];
    ieAttrFix = {"class": "className","for": "htmlFor"};
    returnElements = [];
    //IE5.5不支持“*” 
    elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag);
    length = elements.length;
    
    if((!!document.querySelectorAll) && type != "!=") {
        elements = document.querySelectorAll(search);
        for(var i=0,length = elements.length;i < length;i++) {
            returnElements.push(elements[i]);
        }
        return returnElements;
    }

    if(!+"\v1")
        attribute = ieAttrFix[attribute] ? ieAttrFix[attribute] : attribute;

    while(--length >= 0) {
        var current = elements[length];
        _value = !+"\v1" ? current[attribute] : current.getAttribute(attribute);
        if(typeof _value === "string" && _value.length > 0) {
            if(!!value) {
                var condition =
                type === "==" ?//完全等于
                _value === value :
                type === "!=" ?//不等于
                _value != value :
                type === "*=" ?//包含
                _value.indexOf(value) >= 0 :
                type === "~=" ?//匹配当中的某个单词，如<span class="red bold">警告</span>
                (" " + _value + " ").indexOf(value) >= 0:
                type === "^=" ?//以XX开头
                _value.indexOf(value) === 0 :
                type === "$=" ?//以XX结尾
                _value.slice(-value.length) === value:
                type === "|=" ?//匹配属性值为XX或以XX-打头的元素
                _value === value ||  _value.substring(0,value.length+1) === value+"-" :
                false;
                condition && returnElements.push(current);
            }
            else {
                returnElements.push(current)
            }
        }
    }
    return returnElements;
}

//任务4 事件
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else {
        element.attachEvent("on"+event, listener);
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (listener == undefined) {
        element["on"+event] = null;
    }
    else if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else {
        element.detachEvent("on"+event, listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    if (element.addEventListener) {
        element.addEventListener("click", listener, false);
    }
    else {
        element.attachEvent("onclick", listener);
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    if (event.keyCode == 13) {
        if (element.addEventListener) {
            element.addEventListener("onkeyup", listener, false);
        }
        else {
            element.attachEvent("onkeyup", listener);
        }
    }
}

// 事件代理。先简单一些
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(eve) {
        eve = eve || window.event;
        var target = eve.srcElement? eve.srcElement || eve.target;
        if (target.nodeName.toLowerCase() == tag) {
            listener(eve);
        }
    });
}

//事件函数进行封装
$.on(selector, event, listener) {
    var element = $(selector);
    addEvent(element, event, listener);
}

$.click(selector, listener) {
    var element = $(selector);
    addClickEvent(element, listener);
}

$.un(selector, event, listener) {
    var element = $(selector);
    removeEvent(element, event, listener);
}

$.delegate(selector, tag, event, listener) {
    var element = $(selector);
    delegateEvent(element, tag, eventName, listener);
}

//任务5 BOM
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var appname = window.navigator.appName;
    var version = window.navigator.userAgent;
    if (appname == "Microsoft Internet Explorer") {
        var ver = /(msie)\s(\d+.\d)/.exec(version) || /(rv):(\d+.\d)/.exec(version);
        var num = /(\d+.\d)/.exec(ver);
        return num;
    }
    else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = cookieName+"="+escape(cookieValue)+
    ((expiredays==null) ?"":";expires="+exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
    if (document.cookie.length>0) {
        c_start=document.cookie.indexOf(cookieName + "=");
        if (c_start!=-1) { 
            c_start=c_start + cookieName.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) 
                c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    return "";
}

//任务6 Ajax
//学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
function ajax(url, options) {
    var xmlhttp;
    var type = options.type ? options.type : "get";
    var data = options.data ? options.data : "";
    var onsuccess = options.onsuccess;
    var onfail = options.onfail ? options.onfail : function(err){console.log(err)};
    if (data != "") {
        url = url +"?";
        for (var key in data) {
            url = url + key + "=" + data[key] + "&";
        }
    }
    // code for Firefox, Mozilla, Chrome, etc.
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    //code for IE6, IE5
    else {
        xmlhttp = new ActiveObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        //请求已完成，且响应已就绪
        if (xmlhttp.readyState == 4) {
            //状态为：OK
            if (xmlhttp.status == 200) {
                onsuccess(xml.responseText, xmlhttp);
            }
            else {
                onfail(xml.responseText, xmlhttp);
            }
        }
    }
    xmlhttp.open(type, url, true);
    xmlhttp.send();
}


