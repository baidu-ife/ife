/**
 * @file util.js
 * @author  AlisonZhang(zhangxuejing_62@126.com)
 */

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    //方法一
    //return arr instanceof Array;
    //方法二
    return Object.prototype.toString.call(arr)==="[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    //方法一
    //return typeof fn === "function";
    //方法二
    return Object.prototype.toString.call(fn) === "[object Function]";
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var tar = src.constructor === Array ? [] : {};
    for ( var i in src ) {
        if ( src.hasOwnProperty(i) ) {
            tar[i] = typeof src[i] === "object" ? cloneObject(src[i]) : src[i];
        }
    }
    return tar;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var newarry = [] ;
    if (objecr.prototype.toString.call(arr) !== "[object Array]") {
        return false;
    }
    if (arr.length <= 1) {
        return arr;
    }
    for (var i = 0,len = arr.length;i < len;i++) {
        if(arr[i] !== arr[i+1]) {
            newarry.push(arr[i]);
        }
    }
    return newarry;
}

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var len = str.length;
    for (var i = 0; i < len; i++) {
        if (str.charAt(i)==" ") {
            str = str.substring(i+1);
        }
        else break;
    }
    for (var i=len-1; i > 0; i--) {
        if (str.charAt(i) == " ") {
            str = str.substring(0,i);
        }
        else break;
    }
    console.log(str.length);
    return str;
}

// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
   return str.replace( /\s+/g, "" );
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    var len = arr.length;
    for (var i=0; i < len; i++) {
        fn(arr[i],i);
    }
}


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    if (obj instanceof Obeject) {
        for (var i in obj) {
            count++;
        }
    }
    return count;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailStr)
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return /^1[3|4|5|7|8|]\d{9}$/.test(phone);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (element == null) {
        throw new Error (element + "does not exist");
    }
    else if (element.classList.contains(newClassName)) {
        throw ne Error (element + "already contained" + newClassName);
    }
    else {
        element.classList.add (newClassName);
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
   if (element == null) {
       throw new Error (element + "dose not exist");
   }
    else if (element.classList.contains(oldClassName)) {
       element.classList.remove(oldClassName);
   }
    else {
       throw new Error (element + "does not contain " +oldClassName);
   }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
   return element.parentElement() === siblingNode.parentElement();
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var elPo = document.getElementById(element);
    var x = 0;
    var y =0;
    while (elPo !== null) {
        x += elPo.offsetTop;
        y += elPo.offsetLeft;
        elPo = elPo.offsetParent;
    }
    return {x:x,y:y};
}

// 实现一个简单的Query  不会，按照zchen9敲了一遍
function $(selector) {

    var selItem = selector.split(" ");

    if ( selItem.length === 1 ) {
        var aitem = selItem.toString();
        switch ( aitem.substr(0, 1) ) {
            case "#":
                return document.getElementById( aitem.substr(1) );
                break;
            case ".":
                if (document.getElementsByClassName) {
                    return document.getElementsByClassName(aitem.substr(1))
                }else {
                    var nodes = document.getElementsByTagName("*"),ret = [];
                    for(i = 0; i < nodes.length; i++) {
                        if(hasClass(nodes[i],aitem.substr(1))){
                            ret.push(nodes[i])
                        }
                    }
                    return ret;
                }
                break;
            case "[":
                if ( aitem.charAt( aitem.length - 1 ) === "]" ) {

                    var item = aitem.substring( 1, aitem.length - 1 );
                    var elements = document.getElementsByTagName("*");

                    if ( item.indexOf("=")  != -1 ) {
                        var items = item.split("=");
                        for ( var j = 0; j < elements.length; j++) {
                            if ( elements[j].getAttribute( items[0] ) === items[1] ) {
                                return elements[j];
                            }
                        }
                    }
                    else {
                        for ( var i=0; i < elements.length; i++ ) {
                            if ( elements[i].hasAttribute( item ) ) {
                                return elements[i];
                            }
                        }
                    }
                }
                else
                {
                    throw Error( "']' is missing !" );
                }
                break;
            default :
                return document.getElementsByTagName( aitem );
        }
    }
    else {
        for ( var k = 1; k < selItem.length; i++ ) {

            if ( selItem[0].substr(0, 1) == "#" ) {
                var itemId = document.getElementById( selItem[0].substr(1) );
                switch ( selItem[k].substr(0,1) ) {
                    case ".":
                        return itemId.getElementsByClassName( selItem[k].substr(1) )[0];
                        break;
                    default :
                        return itemId.getElementsByTagName( selItem[k] );
                }
            }
            else if ( selItem[0].substr(0, 1) == "." ) {
                var itemClass = document.getElementsByClassName( selItem[0].substr(1) );
                switch ( selItem[k].substr(0, 1) ) {
                    case "#":
                        return itemClass.getElementById( selItem[k].substr(1) );
                        break;
                    default :
                        return itemId.getElementsByTagName( selItem[k] );
                }
            }
        }
    }
}


// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if ( element.addEventListener ) {
        element.addEventListener( event, listener, false );
    }
    else if ( element.attachEvent ) {
        element.attachEvent( "on" + event, listener );
    }
    else {
        element[ "on" + event ] = listener;
    }

}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    } else {
        element["on" + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.onclick = listener;
}
/*
function addClickEvent(element, listener) {
    if ( element.addEventListener ) {
        element.addEventListener("click", listener, false );
    }
    else if ( element.attachEvent ) {
        element.attachEvent( "onclick", listener );
    }else {
        element["onclick"] = listener;
    }
}
*/

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    element.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            listener();
        }
    }
}
/*function addEnterEvent(element, listener) {
    var e = event ? event : window.event;
    var ele = element ? e.target : e.srcElement;
    var curKey = 0;
    curKey = e.keyCode|| e.which|| e.charCode; //支持IE、FF
    if ( curKey == 13 ) {
        listener();
    }
}*/
/*function addEnterEvent(element, listener) {
   addEvent(element, "keydown", function(event) {
        if (event.keyCode==13) {
            listener();
        }
    });
}*/

 //事件代理
function delegateEvent(element, tag, eventName, listener) {
    var e = event ? event : window.event;
    var ele = element ? element : document.body;
    var target = e.target || e.srcElement;
    $.on(element,eventName,function(){
        if ( ele.nodeName === tag || ele.nodeName.toLowerCase() === tag ) {
            listener();
        }
    });
}

$.on = function (element, event,listener) {
    addEvent(element, event,listener)};

$.un = function (element, event, listener) {
    removeEvent(element, event, listner) };

$.click = function (element, listener) {
    addClickEvent(element,listener)};

$.enter = function(element,listener) {
    addEnterEvent(element,listneer)};

$.delegate = function(element, tag, eventName, listener) {
    delegateEvent(element, tag, eventName, listener);
};



// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = window.navigator.userAgent;
    if (ua.indexOf("MSIE")> -1 && ua.indexOf("Trident") > -1) {
        switch (true) {
            case ua.indexOf("MSIE 6.0") != -1:
                return "IE6";
                break;
            case ua.indexOf("MSIE 7.0") != -1:
                return "IE7";
                break;
            case ua.indexOf("MSIE 8.0") != -1:
                return "IE8";
                break;
            case ua.indexOf("MSIE 9.0") != -1:
                return "IE9";
                break;
            case ua.indexOf("MSIE 10.0") != -1:
                return "IE10";
                break;
            case ua.indexOf("MSIE 11.0") != -1:
                return "IE11";
                break;
            default:
                return "Other Vision"
        }
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
    if(expiredays instanceof Date) {
        cookie += "; expire=" + expiredays.toGMTString();
    }
    document.cookie = cookie;
}

// 获取cookie值
function getCookie(cookieName) {
    var coName = encodeURIComponent(cookieName) + "=",
        coStart = document.cookie.indexOf(coName),
        coValue = null;
    if(coStart > -1) {
        var coEnd = document.cookie.indexOf(";",coStart);
        if(coEnd == -1) {
            coEnd = document.cookie.length;
        }
        coValue = decodeURIComponent(document.cookie.subString(coStart + coName.length,coEnd)
        );
    }
    return coValue;
}

//封装Ajax,不会做，在newutil.js文件里参照 @author zchen9 同学的敲了一遍
