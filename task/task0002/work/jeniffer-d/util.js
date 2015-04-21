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
                newObject[j] = arguments.callee(src[j]);
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
    var arr = [];
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (code == 32 || code == 12288 || code == 9) { ////半角空格 32，全角空格 12288，tab 9
            arr[i] = "";
        } else {
            arr[i] = str[i];
        }
    }
    return arr.join("");

}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
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
    if (eleClassName.search(reg) != -1) {
        element.className = eleClassName.replace(reg," ");
    }
    if (eleClassName == "") {
        return;
    }
    if (eleClassName == rmClassName) {  
        return element.className = ""; 
    }
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if (!element || !siblingNode) {
        return console.log("error!");
    }
    if (element.parentNode == siblingNode.parentNode) {
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
    }console.log(left);
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

// 实现一个简单的Query
function $(selector) {
    var arr = selector.split(" ");
    var ele = null;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].search() != -1)
    }
    return ele;
}


// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
