//删除掉了测试用例

//判断arr是否为一个数组，并返回一个bool值
function isArray (arr) {
    var result = arr instanceof Array;
    return result;
}

var arr = [];

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    if(typeof fn == 'function'){
        return true;
    } else {
        return false;
    }
}

function isDate (date) {
    return date instanceof Date;
}

function isRegExp (regexp) {
    return regexp instanceof RegExp;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等

//检测对象类型
function istype (ele) {
    if(ele===null) return "Null";
    if(ele===undefined) return "Undefined";
    return Object.prototype.toString.call(ele).slice(8,-1);
}

//深度克隆
function cloneObject(src) {
    var srcType = istype(src);
    var result,k;
    //判断需要克隆的对象是否是Object类型或者Array类型
    if(srcType === "Object" || srcType === "Array"){
        result = srcType === "Object"? {}:[];
        for(k in src){
            result[k] = cloneObject(src[k])
        }
        return result;
    } else if (srcType === "Function" || "RegExp"){//如果是函数或者正则表达式则不复制
        return false;
    } else {     //普通类型直接浅复制
        result = src;
        return result;
    }

}



// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var length = arr.length;
    var newArr = [];
    var k;//标记是否出现相同元素
    for (var i=0; i<length; i++){
        k = true;
        for(var j=0; j<i; j++){
            if (arr[i] == newArr[j]){
                k = false;
            }
        }
        if(k === true){
            newArr.push(arr[i])
        }
    }
    return newArr;
}


// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    if (istype(str) !== 'String'){return false;}
    var whitespace = "\t\n\r "
    var newstr = "";
    //去除头的空格
    for (var i=0; i<str.length;i++){
        //判断第一个不是空格的字符
        if (whitespace.indexOf(str.charAt(i)) == -1){
            newstr = str.slice(i);
            break;
        }
    }
    //去除尾的空格
    for (var j=newstr.length; j>0;j--){
        //判断最后一个不是空格的字符
        if(whitespace.indexOf(newstr.charAt(j)) == -1){
            newstr = newstr.slice(0,j+1);
            break;
        }
    }
    return newstr;
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    //  if(!isArray(arr)){
    //     return false;
    // }
    // if(!isFunction(fn)){
    //     return false;
    //}
    for (var i=0; i<arr.length; i++){
        fn.call(this, arr[i], i)
    }
}


// 获取一个对象里面第一层元素的数量，返回一个整数
       
function getObjectLength(obj) {
    var key,
    a=0;
    for (key in obj){
        a += 1
    }
    return a;
}


// 判断是否为邮箱地址
function isEmail(emailStr) {
    var emailTest = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]$/;
    return emailTest.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var phoneTest = /^1[0-9]{10}$/;
    return phoneTest.test(phone);
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.className += " "+ newClassName
    element.className = trim(element.className)
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
     element.className = element.className.replace(oldClassName,"");
     element.className = trim(element.className)
}


// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    return {x: element.scrollLeft, y:element.scrollTop}
}

//获取所有满足class选择器的所有dom，不是作业要求
function getByClass(selector, parent){
    var classResult = []
    if (parent) {
        parent = parent 
    } else {
        parent = document
    }
    var oClass = parent.getElementsByTagName('*')
    for (var i=0; i<oClass.length; i++){
        var classArr = trim(oClass[i].className).split(" ")
        for (var j = classArr.length - 1; j >= 0; j--) {
            if (classArr[j] === selector) {
                classResult.push(oClass[i]);
                break;
            }
        }
    }
    return classResult;
}


// 实现一个简单的Query
function $(selector) {
    if(/^\#[^\#\.\=]+$/.test(selector)){//排除嵌套的情况
        //id选择器
        selector = selector.replace('#', '').replace('/\.[a-zA-Z0-9\-]/','');
        return document.getElementById(selector)
    } else if(/^\.[^\#\.\=]+$/.test(selector)){//排除嵌套的情况
        //class选择器
        selector = selector.replace('.', '')
        var oClass = document.getElementsByTagName('*');
        var classResult = []
        oClass = document.getElementsByTagName('*')
        for (var i=0; i<oClass.length; i++){
            var classArr = oClass[i].className.split(" ")
            for (var j = classArr.length - 1; j >= 0; j--) {
                if (classArr[j] === selector) {
                    classResult.push(oClass[i]);
                    break;
                }
            }
        }
        return classResult[0];

    } else if (/\[[a-zA-Z0-9\-\=]+\]/.test(selector)){
        if (/\=/.test(selector)){ 
            var oAttrValue = selector.slice(selector.search(/\=/)+1, -1);
            selector = selector.replace('\[', '').replace(/\=+[\w\]]+/, '');
            var oAttr = document.getElementsByTagName('*');
            var oAttrResult = [];
            for (var j=0; j<oAttr.length; j++){
                if (oAttr[j].getAttribute(selector) == oAttrValue ){
                    oAttrResult.push(oAttr[j])
                }
            }
            return oAttrResult[0];
        } else {
            //去除中括号
            selector = selector.replace(/\[([^\[\]]*)\]/, '$1');
            var oAttr = document.getElementsByTagName('*');
            var oAttrResult = [];
            for (var j=0; j<oAttr.length; j++){
                if (oAttr[j].getAttribute(selector)){
                    oAttrResult.push(oAttr[j])
                }
            }
            return oAttrResult[0];
        } 
    // } else if(trim(selector).split(" ").length > 1){
    //         var reAttr = trim(selector).split(/\s+/)//将每个选择器分割成数组
    //         var lastSelector = reAttr[reAttr.length-1].replace(".","")//去掉最后一个class选择器的点
    //         var oAttrResult = getByClass(lastSelector)//数组保存所有满足最后一个class选择器的dom
    //         for (var j=0; j<oAttrResult.length; j++){
    //             parentFilter(oAttrResult[j], reAttr)
    //         }
    }else {
            return document.getElementsByTagName(selector)[0]
    }
}

// function parentFilter (child, selectArr) {
//     var parent = child.parentNode; //保存父节点,会更新
//     for (var i = selectArr.length - 2; i >= 0; i--) {
//         parentCompare(parent, selectArr[i])
//     }
// }

// function parentCompare (parent,selector) {
//     if (parent.className == selector) {
//         parent = parent.parentNode;
//     } else {
//         return false
//         //break;
//     }
// }



    

// 给一个dom绑定一个针对event事件的响应，响应函数为listener
$.on = function(selector, event, listener){
    //如果输入的是选择器，就转为dom
    if (typeof selector === 'string') {
        selector = $(selector)
    }
    if (selector.addEventListener) {
        selector.addEventListener(event, listener, false);
    } else if(selector.attachEvent) {
        selector.attachEvent("on" + event, listener);
    } else {
        selector["on" + event] = listener;
    }
}


// 例如：
//function clicklistener(event) {
    
//}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
$.un = function(selector, event, listener){
    if (typeof selector === 'string') {
        selector = $(selector)
    }
    if(listener){
        if (selector.removeEventListener) {
            selector.removeEventListener(event, listener, false);
        } else {
            selector.DetachEvent(event, listener);
        }
    } else {
        //通过复制节点移除所有响应函数
        var newElement = selector.cloneNode(true)
        selector.parentNode.replaceChild(newElement, selector);
    }
}

// 实现对click事件的绑定
$.click = function(selector, listener){
    $.on(selector,"click", listener)
}

// 实现对于按Enter键时的事件绑定
$.enter = function(selector, listener){
    $.on(selector,"onkeydown", function () {
        if(keyCode == 13){
            listener()
        } else {
            return false;
        }
    })
}



// 先简单一些
function delegateEvent(selector, tag, eventName, listener) {
    $.on(selector, eventName, function (event) {
        var e = event || window.event;
        target = e.srcElement? e.srcElement : e.target;
        if(target.tagName.toLowerCase() === tag){
            //把被点击的元素和事件触发者传入
            listener(target, e);
        }
    })
}

$.delegate = delegateEvent;


// 判断是否为IE浏览器，返回-1或者版本号

function isIE() {

    var ua = navigator.userAgent;
    if (/MSIE ([^;]+)/.test(ua)) {
        return RegExp["$1"]
    } else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
    if (expiredays instanceof Date){
        cookieText += "; expires=" + expiredays.toGMTString();
    }
}

// 获取cookie值
function getCookie(cookieName) {
    var cookieName = encodeURIComponent(cookieName) + "=",
        cookieStart = document.cookie.indexOf(cookieName);
        cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }s
    return cookieValue;
}

// 
function ajax(url, options) {
    // your implement
    if (!options.type) {
        options.type = "post"
    };
    var xhr = new XMLHttpRequest();
    if (options.type.toLowerCase() == "get") {
        url += (url.indexOf("?") == -1 ? "?" : "&");
        //记得改格式
        url += encodeURIComponent(options.data) + "=" + encodeURIComponent(options.data);
        xhr.open(options.type, url, true);
        xhr.send();
    } else if (options.type.toLowerCase() == "post") {
        xhr.open(options.type, url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        xhr.send(options.data);
    }
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            options.onsuccess(xhr.responseText, xhr)
        } else {
            options.onfail(xhr.responseText, xhr);
        }
        };
    }
}
// 使用示例：
/*ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);*/
/*options是一个对象，里面可以包括的参数为：

type: post或者get，可以有一个默认值
data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
onsuccess: 成功时的调用函数
onfail: 失败时的调用函数*/