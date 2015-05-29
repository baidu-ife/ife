/********************************************
 *js基础函数
 *********************************************/
/*检测对象是不是数组*/
function isArray(arr) {
    return arr instanceof Array;
}

/*检测对象是不是函数*/
function isFunction(fn) {
    return fn instanceof Function;
}

/*深度复制对象cloneObject(srcObj)*/
function cloneObject(srcObj) {
    if (srcObj instanceof Object) {
        var buf = {};
        for (var k in srcObj) {
            buf[k] = cloneObject(srcObj[k]);
        }
        return buf;
    }
    else if (srcObj instanceof Array) {
        var buf = [];
        for (var i = 0; i < buf.length; i++) {
            buf[i] = cloneObject(srcObj[i]);
        }
        return buf;
    }
    else {
        return srcObj;
    }
}

/*去掉数组重复元素*/
function uniqArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] === arr[i]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

/*删除字符串前尾的空格*/
function trim(str) {
    if (str.charAt(0) == ' ') {
        return trim(str.substr(1));
    }
    else if (str.charAt(str.length - 1) == ' ') {
        return trim(str.substr(0, str.length - 2));
    }
    else {
        return str;
    }
}

/*遍历数组元素执行fn函数*/
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i]);
    }
}

/*获取对象第一层的长度*/
function getObjectLength(obj) {
    var count = 0;
    for (x in obj) {
        count++;
    }
    return count;
}

/********************************************
 *DOM操作相关函数
 *********************************************/
/*为指定元素添加一个样式*/
function addClass(element, className) {
    //element.className+=className+' ';   //element.className是字符串，各个样式类需要按空格分开；
    element.classList.add(className);
}

/*为指定元素删除一个样式*/
function removeClass(element, className) {
    element.classList.remove(className);
}

/*判断两个节点是不是兄弟节点*/
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

/*获取元素的绝对位置*/
function getPosition(element) {
    var position = {
        x: 0,
        y: 0
    }
    if (element.offsetParent != null) {
        position.x = element.offsetLeft + getPosition(element.offsetParent);
        position.y = element.offsetTop + getPosition(element.offsetParent);
        return position;
    }
    else {
        return position;
    }
}

//mini $
function $(selector) {
    var sTr = selector;
    if (sTr.search(/\s+/g) == -1) {
        var firstChart = sTr.charAt(0);
        switch (firstChart) {
            case "#":
                var newStr = sTr.replace(firstChart, "");
                return document.getElementById(newStr);
                break;

            case ".":
                var newStr = sTr.replace(firstChart, "");
                return getClass(document, newStr)[0];
                break;

            case "[":
                console.log(sTr.search(/=/g))
                if (sTr.search(/=/g) == -1) {
                    var reg = /^\[|\]$/g;//开头结尾的符号[];
                    var newStr = sTr.replace(reg, "");
                    return getAttr(document, newStr)[0];
                } else {
                    var reg = /^\[|\]$/g;//开头结尾的符号[];
                    var newStr = sTr.replace(reg, "");
                    console.log(newStr)
                    var arrStr = newStr.split("=");
                    console.log(arrStr)
                    var oAttrName = arrStr[0];
                    var oAttrValue = arrStr[1];
                    return getAttrValue(document, oAttrName, oAttrValue)[0];
                }
                break;

            default:
                return document.getElementsByTagName(sTr)[0];
        }
    } else {
        var partArr = sTr.split(" ");
        var sParent = partArr[0].replace(partArr[0].charAt(0), "");
        if (partArr[1].charAt(0) == ".") {
            var sSon = partArr[1].replace(partArr[1].charAt(0), "");
        } else {
            var sSon = partArr[1];
        }

        var oParent = document.getElementById(sParent);
        if (partArr[1].charAt(0) == ".") {
            return getClass(oParent, sSon)[0];
        } else {
            return oParent.getElementsByTagName(sSon)[0];
        }
    }
}


/********************************************
 *事件相关函数
 *********************************************/
//为element添加事件及监听器，兼容多浏览器
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else {
        element.attachEvent('on' + event, listener);
    }
}

//删除element元素指定事件的监听器 ，未实现当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    if (listener == null) {
        element['on' + event] = null;
    }
    else {
        if (element.removeEventListener) {
            element.removeEventListener(event, listener);
        }
        else {
            element.detachEvent('on' + event, listener);
        }
    }
}

//为element元素添加单击事件监听器
function addClickEvent(element, listener) {
    element['onclick'] = listener;
}

//按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    element['onkeypress'] = function (event) {
        var key;
        if (window.event) {
            key = event.keyCode;
        }
        else {
            key = event.which;
        }
        if (key == 13) {
            listener();
        }
    };
}

/**
 * 兼容性获取event对象
 * @param event
 * @returns event
 */
function getEvent(event) {
    return event || window.event;
}

/**
 * 兼容性获取target元素
 * @param event
 * @returns target
 */
function getTarget(event) {
    return event.target || event.srcElement;
}

/**
 * 为element元素下的所有标签名为tag的元素添加eventName类型事件监听器listener的委托
 * @param element
 * @param tag
 * @param eventName
 * @param listener
 */
function delegateEvent(element, tag, eventName, listener) {
    $.on(element, eventName, function (event) {
        var target = $.getTarget(event);
        switch (target.nodeName.toLowerCase()) {
            case tag:
                listener();
                break;
        }
    });
}

/************************************************
 *BOM相关函数
 ***********************************************/
//function isIE() {
//    return (!-[1,]);
//}


/**
 * 设置cookie
 * @param cookieName
 * @param cookieValue
 * @param expiredays
 */
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = cookieName + "=" + cookieValue + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

/**
 * 获取cookie值
 * @param cookieName
 * @returns {string}
 */
function getCookie(cookieName)
{
    if (document.cookie.length>0)
    {
        cookieStart=document.cookie.indexOf(cookieName + "=");
        if (cookieStart!=-1)
        {
            cookieStart=cookieStart + cookieName.length+1;
            cookieEnd=document.cookie.indexOf(";",cookieStart);
            if (cookieEnd==-1){
                cookieEnd=document.cookie.length;
            }
            return document.cookie.substring(cookieStart,cookieEnd);
        }
    }
    return "";
}


//把上面几个事件相关函数整合到$
//js基础函数
$.isArray = isArray;
$.isFunction = isFunction;
$.cloneObject = cloneObject;
$.uniqArray = uniqArray;
$.trim = trim;
$.each = each;
$.getObjectLength = getObjectLength;
//DOM操作函数

//事件相关函数
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;
$.delegate = delegateEvent;
$.getTarget = getTarget;
$.getEvent = getEvent;











