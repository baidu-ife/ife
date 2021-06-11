// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    var str = Object.prototype.toString.call(arr).slice(8,-1).toLowerCase();
    if (str == "array") {
        return true;
    }
    else {
        return false;
    }
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    var str = typeof fn;
    if (str == "function") {
        return true;
    }
    else {
        return false;
    }
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    //不能包括函数
    if (typeof src == "function") {
        return console.log("error! can not include function");
    };
    //若是基本数据类型：number，string，undefined，boolean，null,直接返回
    if (typeof src != "object" || src == null) {
        return src;
    } 
    
    //Array
    if (isArray(src)) {
        var newArray =[];
        for(var i=0; i < src.length; i++){
            newArray[i] = src[i];
        }
        return newArray;
    }

    //Date
    if (src instanceof Date){
        var newDate = new Date(src.getTime());
        return newDate;
    }

    //Object
    if (src instanceof Object) {
        var newObject = new Object();
        for (var j in src) {
            if (src.hasOwnProperty(j)) {           //判断是否是自有属性
                newObject[j] = arguments.callee(src[j]); //递归调用原函数
            }
        }
        return newObject;  
    }
  
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    if (!isArray(arr)) {
        return console.log("error! input must be an array.");
    } 
    var obj = {};
    var newArr = [];
    for (var i=0; i < arr.length; i++) {
        if(!obj[arr[i]]) {
            obj[arr[i]] = arr[i];
            newArr.push(arr[i]);
        }
            
    }
    return newArr;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    if (typeof str != "string") {
        return console.log("error! input must be an array.");
    }
    // var arr = [];
    // for (var i = 0; i < str.length; i++) {
    //     var code = str.charCodeAt(i);
    //     if (code == 32 || code == 12288 || code == 9) { ////半角空格 32，全角空格 12288，tab 9
    //         arr[i] = "";
    //     } else {
    //         arr[i] = str[i];
    //     }
    // }
    // return arr.join("");
    return str.replace(/(^\s*)|(\s*$)/g,"");

}



// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr,fn) {
    if (!isArray(arr)) {
        return console.log("error! first argument must be an array");
    }
    if (typeof fn != "function") {
        return console.log("error! second argument must be a function");
    }
    for (var i=0; i < arr.length; i++) {
        fn(arr[i],i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    if (Object.keys) {   //能力检测，而不是浏览器检测
        return Object.keys(obj).length;  
        //[ECMAScript 5]Object.keys()返回一个数组，内有对象中可枚举的自有属性组成，ie8及以下不支持。
    }
    var count = 0;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            count++;
        }
    }
    return count;    
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var rawPhone = phone.replace(/[- ]/g,"");  //去掉可能出现的空格和-
    return /1[3|4|5|8]\d{9}/.test(rawPhone);  //1开始,号段为3,4,5,8

}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    if (!element) {
        return console.log("error!");
    }
    var addClassName = trim(newClassName);
    var eleClassName =  trim(element.className);
    if (eleClassName.length == ""){        //原类名为空
        element.className = addClassName;
        return;
    }
    if (eleClassName == addClassName || eleClassName.search(new RegExp("\\s?" + addClassName + "\\s?","g")) != -1) {  //添加类名已存在
        return;
    }
    return element.className = eleClassName + " " + addClassName;  //原类名非空且添加类名不存在
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    if (!element) {
        return console.log("error!");
    }
    var eleClassName = trim(element.className);
    var rmClassName = trim(oldClassName);
    var reg = new RegExp("\\s?" + rmClassName + "\\s?","g");
    if (eleClassName.search(reg) != -1) { //元素类名里有目标类名
        element.className = eleClassName.replace(reg," ");
    }
    if (eleClassName == "") { //元素类名为空
        return;
    }
    if (eleClassName == rmClassName) {  //元素类名等于目标类名
        return element.className = ""; 
    }
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if (!element || !siblingNode) {
        return console.log("error!");
    }
    if (element.parentNode == siblingNode.parentNode) { //判断两个元素的父元素是不是同一个
        return true;

    } else {
        return false;
    }
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var left = element.offsetLeft;
    var top = element.offsetTop;
    var current = element.offsetParent;
    while (current != null) {
        left += current.offsetLeft;
        top += current.offsetTop;
    }
    if (document.compatMode == "BackCompat") {
        var eleScrollLeft = document.body.scrollLeft;
        var eleScrollTop = document.body.scrollTop;
    } else {
        var eleScrollLeft = document.documentElement.scrollLeft;
        var eleScrollTop = document.documentElement.scrollTop; 
    } 
    var obj = {
        x: left - eleScrollLeft,
        y: top - eleScrollTop
    };
    return obj;
}

// 实现一个简单的Query,!!!getElementByClassName的兼容性问题
function $(selector) {          
    var arr = selector.split(" ");  //把输入的查询条件拆分，从左到右搜索
    var parentNode = null;          //父元素
    var ele = null;                 //当前元素
    var idExp = /^#[\w-]+$/;
    var attrExp = /^\[[\w\-=]+\]$/;
    var classExp = /^\.[\w\-]+$/;

    for (var i = 0; i < arr.length; i++) {
        
        //id选择器
        if (arr[i].search(idExp) != -1) {
            var id = arr[i].slice(1);
            //是否有父元素，如果有，在父元素的基础上最id查询
            //如果没有，默认父元素为document
            ele = parentNode ? parentNode.getElementById(id) : document.getElementById(id);
        
        //类选择器
        } else if (arr[i].search(classExp) != -1) {
            var classname = arr[i].slice(1);
            ele = parentNode ? parentNode.getElementsByClassName(classname)[0] : document.getElementsByClassName(classname)[0];
        
        //属性选择器
        } else if (arr[i].search(attrExp) != -1) {
            var index = arr[i].indexOf("=");
            if (index != -1) {
                var val = arr[i].slice(index+1, -1);
                var attr = arr[i].slice(1, index);
                ele = parentNode ? getElementByAttributeValue(parentNode, attr, val) : getElementByAttributeValue (null, attr, val);
            } else {
                var attr = arr[i].slice(1, -1);
                ele = parentNode ? getElementByAttributeValue(parentNode, attr, null) : getElementByAttributeValue (null, attr, null);
            } 
        
        //类型选择器
        } else {
            ele = parentNode ? parentNode.getElementsByTagName(arr[i])[0] : document.getElementsByTagName(arr[i])[0];
        }

        //父元素设为当前元素，循环
        parentNode = ele;
    }

    return ele;
}

//根据属性选择元素
function getElementByAttributeValue (parent, attribute, value) {
    if (parent) {
        var allElements = parent.getElementsByTagName("*");
    } else {
        var allElements = document.getElementsByTagName('*');
    }
    if (value) {
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].getAttribute(attribute) == value) {
                return allElements[i];
            }
        }
    } else {
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].getAttribute(attribute)) {
                return allElements[i];
            }
        }      
    }
}

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

// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
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
    addEvent(element,"click", listener);
}

// 实现对于按Enter键时的事件绑定                 //先绑定keyup事件,才能有事件对象e, 判断e.keyCode???
function addEnterEvent(element, listener) { 
    if (e.keyCode == 13) {
        addEvent(element, "keyup", function(e){
            var e = e || window.event;
            listener.call(this);
        });
    }
}

// addEvent(element, event, listener) -> $.on(element, event, listener);
// 把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;
$.delegate = delegateEvent;

//思路：给父元素绑定事件，当响应父函数事件后，在其回调函数中获取target，
// 判断target.nodeName是否为tag,是则执行listener。
function delegateEvent(element, tag, eventName, listener) { 
    addEvent(element, eventName, function(event) {
        var e = event || window.event;
        var target = event.target || event.srcElement;
        if (target.nodeName.toLowerCase() == tag.toLowerCase()) {
            listener(e);
        }
    });
}

$.on = function (selector, event, listener) {
    addEvent($(selector), event, listener);
};

$.click = function (selector,listener) {
    addClickEvent($(selector),listener);
} 

//当回调函数不是匿名函数时才可以用
$.un = function (selector, event, listener) {
    removeEvent($(selector), event, listener);
}

$.delegate = function (selector, tag, eventName, listener) {
    delegateEvent($(selector), tag, eventName, listener);
}

//为IE浏览器，返回-1或者版本号
function isIE () {
    if (window.ActiveXObject === undefined) return -1;
    if (!document.querySelector) return 7;
    if (!document.addEventListener) return 8;
    if (!window.atob) return 9;
    if (!document.__proto__) return 10;
    return 11;
}


//chrome的cookie无法设置
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + "=" +  encodeURIComponent(cookieValue) + 
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}


function getCookie(cookieName) { 
    var arr, reg = new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)"); //正则表达式看不懂（）和|的区别
    if (arr = document.cookie.match(reg))
        return decodeURIComponent(arr[2]); 
    else 
        return null; 
} 



function ajax (url, option) {  
    var realUrl = "", realData, xmlhttp, isUrlData = false, type = "GET";
    if (option.type) {
        type = option.type;
    } 
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    if (option.data) {
        isUrlData = typeof option.data == Object ? false : true;
    }

    if (isUrlData) {
        realUrl = url + option.data;
        realData = "";
    } else {
        realUrl = url;
        realData = option.data;
    }

    if(xmlhttp != null) {
        xmlhttp.open(type,realUrl,true);
        xmlhttp.send(realData);        
        xmlhttp.onreadystatechange = function (){
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                option.onsuccess(xmlhttp.responseText,xmlhttp);
            } 
        };   
    }
    return xmlhttp;
}
