/**
 * Created by jp on 2015/4/28.
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    return Object.prototype.toString.call(fn) === '[object Function]';
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    //如果对象类型为数字、字符串、布尔，则直接返回
    if (typeof src == "number" || typeof src  == "string" || typeof src == "boolean") {
        return src;
    }
    //如果对象类型是数组，对数组中每一个成员进行复制
    if (isArray(src)) {
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
    throw new error("Unable to copy!");
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
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
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
    var array = new Array();
    var j=0;
    for(var i = 0;i < str.length;i++) {
        if (str.charAt(i) != ' ' && str.charAt(i) != '\t') {
            array[j] = str.charAt(i);
            j++;
        }
        if(i>0&&i<str.length-1)
        {
            if((str.charAt(i)==' '||str.charAt(i)=='\t')&&str.charAt(i-1)!=' '&&str.charAt(i-1)!='\t')
            //只是解决了中间含有1个空格或tab
        {
            array[j] = str.charAt(i);
            j++;
        }
        }
    }
    return array;
}
// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    return  str.replace(/(^\s*)|(\s*$)|(^\u3000*)|(\u3000*$)/g,"");

}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function fn(a,b)
{
    console.log(b+ ': ' + a);
}
function each(arr, fn) {

    for (var i = 0; i < arr.length; i++) {
        fn(arr[i],i);
        }

}

function getObjectLength(obj) {
    var num = 0;
    for (var i in obj) {
            num++;
    }
    return num;
}
function isEmail(emailStr) {
    var pat=/w+@\w+\.\w+/;
    return pat.test(emailStr);
}

function isMobilePhone(phone) {

    var pat=/1(3|4|5|8)[0-9]{9}$/;
    return pat.test(phone);
}
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
function isSiblingNode(element, siblingNode)
{
    return element.parentNode === siblingNode.parentNode;
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(e) {
    // your implement
    var offsetcol=e.offsetTop;
    if(e.offsetParent!=null)
        offsetcol+=getTop(e.offsetParent);
    var offsetrow=e.offsetLeft;
    if(e.offsetParent!=null)
        offsetrow+=getLeft(e.offsetParent);
    var wz;
    wz.x=offsetrow;
    wz.y=offsetcol;
    return wz;
}

// 实现一个简单的Query
function $(selector) {

}

//// 可以通过id获取DOM对象，通过#标示，例如
//$("#adom"); // 返回id为adom的DOM对象
//
//// 可以通过tagName获取DOM对象，例如
//$("a"); // 返回第一个<a>对象
//
//// 可以通过样式名称获取DOM对象，例如
//$(".classa"); // 返回第一个样式定义包含classa的对象
//
//// 可以通过attribute匹配获取DOM对象，例如
//$("[data-log]"); // 返回第一个包含属性data-log的对象
//
//$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象
//
//// 可以通过简单的组合提高查询便利性，例如
//$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象


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
    if(element.removeEventListener){
        element.removeEventListener(event.type,listener,false);
    }
    else if(element.detachEvent) {
        element.detachEvent('on'+event.type,listener);
    }
    else {
        element['on'+event.type]=null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    if (element.addEventListener) {
        element.addEventListener("click", listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("onclick", listener);
    } else {
        element["onclick"] = listener;
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    element["onkeydown"] = function(event) {
        if (event.keyCode == 13) {
            listener();
        }
    };
}
//
//$.on(selector, event, listener) {
//    var element = $(selector);
//    addEvent(element, event, listener);
//}
//
//$.click(selector, listener) {
//    var element = $(selector);
//    addClickEvent(element, listener);
//}
//
//$.un(selector, event, listener) {
//    var element = $(selector);
//    removeEvent(element, event, listener);
//}
//
//$.delegate(selector, tag, event, listener) {
//    var element = $(selector);
//    delegateEvent(element, tag, eventName, listener);
//}


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var navigatorName = "Microsoft Internet Explorer";
    if( navigator.appName == navigatorName ) {
        return navigator.appVersion;
        console.log(navigator.appVersion);
    }
    else
       return -1;
}

// 设置cookie
  function setCookie(cookieName,value,expiredays)
    {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=cookieName+ "=" +escape(value)+
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
