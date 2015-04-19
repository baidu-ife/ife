/**
 * Created by T on 2015/4/18.
 */
//判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    //my implement
    return arr instanceof Array;
}

//判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    //my implement
    return fn instanceof Function;
}
console.log(isFunction(isArray));

//了解值类型和引用类型的区别，了解各种对象的读取、遍历方式
//使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
//被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object
//对象。不包含函数、正则对象等
function cloneObject(src) {
    //my implement
    var result;
    switch (typeof src) {

        case "number":
            result = src + 0;
            break;
        case "boolean":
            result = src;
            break;
        case "string":
            result = src + "";
            break;
        case "object":
            if (src === null) {
                //typeof null 为object
                result = null;
            }
            else if (src instanceof Array) {
                result = [];
                for (var i = 0; i < src.length; i++) {
                    result.push(src[i]);
                }
            }
            else if (src instanceof Date) {
                result = new Date(src);
            }
            else {
                result = {};
                for (var j in src) {
                    if (src.hasOwnProperty(j)) {
                        result[j] = cloneObject(src[j]);
                    }
                }
            }
    }
    return result;
}
//测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    },
    c: 2
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);
console.log(tarObj.b.b1[0]);


//学习数组、字符串、数字等相关方法
//对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    //my implement
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i]);
        }
    }
    return result;
}

//example
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b);

//非正则，对字符串头尾进行空格字符串的去除，包括拳脚半角空格、Tab等，返回一个字符串
function trim(str) {
    //my implement
    var result = [];
    for (var i = 0; i < str.length; i++) {
        if (str[i].indexOf("\t") === -1 //制表符
            && str[i].indexOf("\n") === -1
            && str[i].indexOf(" ") === -1
            && str[i].indexOf("\s") === -1  //uncion空白字符
            && str[i].indexOf("\r") === -1
            && str[i].indexOf("\f") === -1
            && str[i].indexOf("\v") === -1) {
            result.push(str[i]);
        }
    }
    return result.join("");
}

//example
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    //my implement
    for (var i = 0;i < arr.length;i++) {
        fn(arr[i], i);
    }
}

//example
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

//获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var length = 0;
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            length++;
        }
    }
    return length;
}

//example
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

//学习正则表达式
//判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^[\da-z]+@[a-z]+.[a-z]+$/i;
    return emailStr.search(reg) !== -1;
}
//判断是否为手机号
function isMobilePhone(phone) {
    var reg = /^\d{11}$/;
    return phone.search(reg) !== -1;
}
var emailStr = "fengeeker@gmail.com";
console.log(isEmail(emailStr));
var phone = "15626475795";
console.log(isMobilePhone(phone));

//3
//为dom增加一个样式名为newClassName的样式
//function addClass(element, newClassName) {
//    //document.getElementById()
//}



//mini $
//实现一个简单的Query
function $(selector) {
    if (selector === null || selector === undefined) {
        return document;
    }
    var selectors = selector.split(/\s+|\t+/);
    var domObject = document;
    //console.log(selectors);
    for(var i = 0; i < selectors.length; i++) {
        //console.log(selectors[i]);
        domObject = domObject.querySelector(selectors[i]);
    }
    return domObject;
}

//4
//给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else {
        element.attachEvent("on" + event, listener);
    }
}

//example
function clicklistener(event) {
    //...
}
addEvent($("#doma"), "click", clicklistener);

//移除dom对象对于event事件发生时执行listener的相应，当listener为空时，移出所有响应函数
function removeEvent(element, event, listener) {
    if(listener === undefined) {
        element["on" + event] = null;
    }
    else if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else {
        element.detachEvent("on"+event, listener);
    }
}


