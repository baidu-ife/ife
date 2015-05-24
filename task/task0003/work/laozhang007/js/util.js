function isArray(arr) {
    // your implement
    return Object.prototype.toString.call(arr) === '[object Array]';
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
// 判断fn是否为一个函数另一种方法，返回一个bool值
function isFunction(fn) {
    // your implement
    return typeof fn == 'function';
}

function cloneObject(obj) {
    // your implement
    var o = obj.constructor === Array ? [] : {};
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
        }
    }
    return o;
}
function cloneObject2(obj) {
    // your implement
    var s = JSON.stringify( obj );
    var o = JSON.parse( s );
}

function uniqArray(arr) {
    // your implement
    var res = [];
    var json = {};
    for(var i = 0; i < arr.length; i++){
        if(!json[arr[i]]){
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}

// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    return str.replace(/^\s+|\s+$/g, "")

}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for(var x in arr){
        fn(arr[x],x);
    }
}

//使用示例
function output(item, index) {
    console.log(index + ': ' + item)
}

function getObjectLength(obj) {
    var count = 0;
    for(var x in obj){
        //console.log(x);
        count ++;
    }
    return count;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return re.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var re = /^1\d{10}$/;
    return re.test(phone);
}

// 为element增加一个样式名为newClassName的新样式
//查看元素是否已有某个类
function hasClass(element, newClassName) {
    return element.className.match(new RegExp('(\\s|^)' + newClassName + '(\\s|$)'));
}

function addClass(element, newClassName) {
    if (!this.hasClass(element, newClassName)) element.className += " " + newClassName;
}

function removeClass(element, newClassName) {
    if (hasClass(element, newClassName)) {
        var reg = new RegExp('(\\s|^)' + newClassName + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}


// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentNode == siblingNode.parentNode;
}
//获取元素的纵坐标
function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
    return offset;
}
//获取元素的横坐标
function getLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
    return offset;
}
function getPosition(element) {
    // your implement
    var pos = {x:0,y:0};
    pos.x = getLeft(element);
    pos.y = getTop(element);
    return pos;
}
//在父元素的孩子中查找含有class类的元素 兼容ie低版本
function getChildrenByClass(oParent,oClass) {
    var aElem = oParent.getElementsByTagName("*");
    var arr = [];
    for (var i = 0; i<aElem.length; i++) {
        if (aElem[i].className == oClass) {
            arr.push(aElem[i]);
        }
    }
    return arr;
}
//对象扩充，把json1的属性赋给json2并保留json2

$.extend = function(json1, json2) {
    for (var attr in json1) {
        json2[attr] = json1[attr];
    }
    return json2;
};
//获指定元素的指定属性值
function getAttrByElement(element,attr){
    if(element.currentStyle){
        return element.currentStyle[attr];
    }
    else{
        return getComputedStyle(element,false)[attr];
    }
}
// 实现一个简单的Query
function $(selector,parentNode){
    var dom =parentNode || document;
    var first = selector.charAt(0);
//找到的对象
    var target;
    var domAll;
    var i;
    var attr;
    var attrValue;
    if(selector.indexOf(" ")!= -1){
        var arrClass = selector.split(" ");
        var pNode = this.$(arrClass[0]);
        for(i=1;i<arrClass.length;i++){
            target = this.$(arrClass[i],pNode);
            pNode = target;
        }
        return target;
    }
    //dom.getElementsByClassName() 这个方法貌似只有火狐支持
    switch (first){
        case "#": target = dom.getElementById(selector.substring(1));break;
        case ".": domAll = dom.getElementsByTagName("*");
            for( i =0;i<domAll.length;i++){
                if(domAll[i].getAttribute("class") == selector.substring(1)){
                    target = domAll[i];
                    break;
                }
            }break;
        case "[" :
            var flags = selector.indexOf("=");
            domAll = dom.getElementsByTagName("*");
            if( flags== -1){
                attr = selector.substring(1,selector.length-1);
                for( i =0;i<domAll.length;i++){
                    if(domAll[i].getAttribute(attr)){
                        target = domAll[i];
                        break;
                    }
                }

            }
            else{
                attr = selector.substring(1,flags);
                attrValue = selector.substring(flags+1,selector.length-1);
                for( i =0;i<domAll.length;i++){
                    if(domAll[i].getAttribute(attr) == attrValue){
                        target = domAll[i];
                        break;
                    }
                }
            }break;
        //通过标签返回的是第一个匹配的tag值
        default:target = dom.getElementsByTagName(selector)[0];

    }
    return target;

}
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    }
    else if(element.attachEvent){
        element.attachEvent('on'+event,listener);
    }
    else{
        element['on'+event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    if(element.removeEventListener){
        element.removeEventListener(event,listener,false);
    }
    else if(element.detachEvent){
        element.detachEvent('on'+event,listener);
    }
    else{
        element['on'+event] = null;
    }
}
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
//事件代理的实现,思想就是当事件冒泡到父元素时，查看事件的target（即事件来源），如果是子元素则进行事件响应
$.delegate = function(element, tag, event, listener) {
    // console.log(element);
    addEvent(element, event, function(ev){
        var ev = ev || event;
        //兼容处理
        var target = ev.target || ev.srcElement;
        //nodeName 标签名字
        if (target.nodeName.toLowerCase() == tag) {
            listener();
        }
    });
};

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
// addEvent(element, event, listener) -> $.on(element, event, listener);

$.on = function(element, event, listener) {
    addEvent(element, event, listener);
}

$.un = function(element, event, listener) {
    removeEvent(element, event, listener);
}

$.click = function(element, listener) {
    $.on(element, 'click', listener);
}

$.enter = function(element, listener) {
    addEnterEvent(element, listener);
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var sTr = window.navigator.userAgent;
    return sTr.toLowerCase().indexOf("ie") != -1;
}
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());}

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

//options是一个对象，里面可以包括的参数为：
//
//type: post或者get，可以有一个默认值
//data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
//onsuccess: 成功时的调用函数
//onfail: 失败时的调用函数
function ajax(url, options) {

    var userdata = '';
    //默认情况是‘get’方式
    options.type = options.type || 'get';

    //创建对象 兼容ie6
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //请求数据的处理 键值对 => 字符串
    if (typeof options.data === 'object') {
        for (var attr in options.data) {
            userdata += attr + '=' + options.data[attr] +'&';
        }
        userdata = userdata.substring(0,userdata.length-1);
    } else {
        userdata = options.data || '';
    }

    //'get' 方式 发送数据
    if (options.type.toLowerCase() == 'get') {

        xhr.open('get', url+'?'+userdata,true);
        xhr.send();
        //'post' 方式 发送数据
    } else {
        // xhr.setRequestHeader("content-type","application/x-www-form-urlencoded; charset=UTF-8");
        xhr.open('post', url, true);
        xhr.send(userdata);
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                options.onsuccess && options.onsuccess(xhr.responseText);
            } else {
                options.onfail && options.onfail(xhr.status);
            }
        }
    }

}