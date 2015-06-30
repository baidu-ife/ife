/**
 * Created by jp on 2015/6/17.
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
   // console.log(Object.prototype.toString.call(arr));
    return Object.prototype.toString.call(arr) === '[object Array]';
}
function isNumber(num) {
     //console.log(Object.prototype.toString.call(num));
    return Object.prototype.toString.call(num) === '[object Number]';
}
// 判断fn是否为一个函数，返回一个bool值
//此方法null、对象、数组返回的都是object类型
function isFunction(fn) {
    if(typeof(fn)=="function") {
        return true;
    }
    else
        return false;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    if(typeof(src) == "number"||typeof(src) == "string"||typeof(src) == "boolean"||isFunction(src))
    return src;
    if(isArray(src)) {
        var y = [];
        var len = src.length;
        var i = 0;
        for(;i<len;i++) {
            y[i] = src[i];
        }
        return y;
    }
    if(Object.prototype.toString.call(src) === '[object Object]') {
        var ob = {};
        var i;
        for(i in src) {
            ob[i] = cloneObject(src[i]);
        }
        return ob;
    }
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
//console.log(abObj.a);
//console.log(abObj.b.b1[0]);
//
//console.log(tarObj.a);      // 1
//console.log(tarObj.b.b1[0]);    // "hello"

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
//function uniqArray(arr) {
//    var len = arr.length;
//    var  x = new Array(len);
//    console.log(x.length);
//    var i = 1;
//    var j = 0;
//    var k = 0;
//    var index;
//    var n = 0;
//    x[0] = arr[0];
//    for(;i < len;i++) {
//
//        index = arr[i];
//        for(;k< len;k++) {
//            if(index == x[i]) {
//                n = 1;
//                break;
//            }
//            n = 0;
//        }
//        if(!n){
//            j++;
//            x[j]=index;
//        }
//    }
//    return x;
//}
function uniqArray(arr) {
    var n = {},r = [];         //n为hash表，r为临时数组
    for(var i = 0; i < arr.length; i++) //遍历当前数组
    {
        if (!n[typeof (arr[i])+arr[i]]) //如果hash表中没有当前项       解决了字符“5”和数字5认作相同的情况
        {
            n[arr[i]] = true; //存入hash表
            r.push(arr[i]); //把当前数组的当前项push到临时数组里面
            n[typeof (arr[i])+arr[i]] =true;
        }
    }
    return r;
}
// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
//console.log(b); // [1, 3, 5, 7]

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
    var array = [];
    var len = str.length;
    var i = 0;
    for(;i<len;i++) {
        if(str.charAt(i)!=' ')
            array.push(str.charAt(i));
    }
    return array;

}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    return str.replace(/(^\s*)|(\s*$)|(^\t*)|(\t*$)/,"")
}

// 使用示例
var str = '  hi!         ';
str =  trim(str);
//console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
   var len = arr.length;
    var i = 0;
    for(;i<len;i++) {
        fn(arr[i],i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
//var arr = ['java', 'c', 'php', 'html'];
//function output(item) {
//    console.log(item)
//}
//each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    //console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var i;
    var count = 0;
    for(i in obj) {
        count++;
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
//console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
     var pattern = /\w+@\w+\.\w+/
    return pattern.test(emailStr);
}

function isMobilePhone(phone) {
    // your implement
    console.log("zx");
    var pat =/1(3|5|4|8)[0-9]{9}]/;
    return pat.test(phone);
}


// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(element.className)
        element.className  = element.className + " " + newClassName;
    else
        element.className = newClassName;

}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if(element.className)
        element.className.replace(/oldClassName/g,"")
    else
        return false;
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return siblingNode.parentNode == element.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
   var position = {x:0,y:0};

}
// your implement


// 实现一个简单的Query
function $(selector) {

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




// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
  var navigatorName = "Microsoft Internet Explorer";
    if(navigator.appName == navigatorName) {
        console.log(navigator.appVersion);
        return navigator.appVersion;
    }
    else
    {
        //console.log("not");
    return -1;
    }
}
isIE();
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=cookieName+ "=" +escape(cookieValue)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

// 获取cookie值
function getCookie(cookieName)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(cookieName + "=")
        if (c_start!=-1)
        {
            c_start=c_start + cookieName.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

//
function ajax(url, options) {
    // your implement
}

// 使用示例：
ajax(
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
);
