/**
 * @file util.js
 * @author zchen9(zxcvbnm.pop@qq.com)
 */

/**
 * 判断arr是否为一个数组，返回一个bool值
 *
 * @class
 */
function isArray(arr){
    //方法一
    //return arr instanceof Array;
    //方法二
    //return Array.isArray(arr);
    //方法三
    return Object.prototype.toString.call(arr) == "[object Array]";
}

/**
 * 判断fn是否为一个函数，返回一个bool值
 *
 * @class
 */

function isFunction(fn){
    //方法一
    //return typeof fn === "function";
    //方法二
    //return fn instanceof Function;
    //方法三
    return Object.prototype.toString.call(fn) == "[object Function]";
}
/**
 * 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
 * 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
 *
 * @class
 */

function cloneObject(src) {
    var tar = src.constructor === Array ? [] : {};
    for ( var i in src ) {
        if ( src.hasOwnProperty(i) ) {
            tar[i] = typeof src[i] === "object" ? cloneObject(src[i]) : src[i];
        }
    }
    return tar;
}
/**
 * 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
 *
 * @class
 */
//方法1
function uniqArray(arr) {
    var temp = [];
    if(arr instanceof Array){
        arr.sort();
        for(var i=0;i<arr.length;i++){
            if(arr[i] !== arr[i+1]){
                temp.push(arr[i]);
            }
        }
    }
    return temp;
}
//方法2
//function uniqArray(arr) {
//  var temp = [];
//  if(arr instanceof Array){
//      for(var i=0; i<arr.length; i++){
//          temp.push(arr[i]);
//          for(var j=i+1; j<=arr.length; j++){
//              if(arr[i]===arr[j]){
//                  temp.pop(arr[j]);
//              }
//          }
//      }
//  }
//  return temp;
//}

/**
 * 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
 *
 * @class
 */
function trim(str) {
    return str.replace( /\s+/g, "" );
}

/**
 * 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
 *
 * @class
 */
function each(arr, fn) {
    for( var i=0; i < arr.length; i++ ) {
        fn(arr[i], i);
    }
}

/**
 * 获取一个对象里面第一层元素的数量，返回一个整数
 *
 * @class
 */
function getObjectLength(obj) {
    var count = 0;
    if (obj instanceof Object) {
        for (var i in obj) {
            count++;
        }
    }
    return count;
}

/**
 * 判断是否为邮箱地址
 *
 * @class
 */
function isEmail(emailStr) {
    var emReg = /^([a-zA-Z0-9\_\-\.])+@([a-zA-Z0-9\_\-\.])+([a-zA-Z0-9]){2,4}$/gi;
    return emReg.test( emailStr );
}

/**
 * 判断是否为手机号
 *
 * @class
 */
function isMobilePhone(phone) {
    var phoneReg = /^\d{11}$/g;
    return phoneReg.test(phone);
}

/**
 * 为element增加一个样式名为newClassName的新样式
 *
 * @class
 */
function addClass(element, newClassName) {
    try{
        element.setAttribute("class", newClassName);
    }
    catch( ex ) {
        element.className = "newClassName";
    }
}

/**
 * 移除element中的样式oldClassName
 *
 * @class
 */
function removeClass(element, oldClassName) {
    if ( element.className == oldClassName ) {
        try{
            element.removeAttribute("class");
        }
        catch( ex ) {
            element.className = "";
        }
    }
}

/**
 * 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
 *
 * @class
 */
function isSiblingNode( element, siblingNode ) {
    var nodes = element.parentNode.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if ( nodes[i] === siblingNode ) {
            return true;
        }
    }
}

/**
 * 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
 *
 * @class
 */
function getPosition( element ) {
    var actualLeft = elemnt.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while ( current !== null ) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return { x : actualLeft, y : actualTop };
}

/**
 * 实现一个简单的$()选择器
 *
 * @class
 */
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

/**
 * 判断class属性
 *
 * @class
 */
function hasClass(tagStr,classStr){
    var arr=tagStr.className.split(/\s+/ ); //这个正则表达式是因为class可以有多个,判断是否包含
    for (var i=0;i<arr.length;i++){
        if (arr[i]==classStr){
            return true ;
        }
    }
    return false ;
}

/**
 * 给一个element绑定一个针对event事件的响应，响应函数为listener
 *
 * @class
 */
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

/**
 * 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
 *
 * @class
 */
function removeEvent(element, event, listener) {
    if ( element.removeEventListener ) {
        element.removeEventLinster( event, listener, false );
    }
    else if( element.detachEvent ) {
        element.detachEvent( "on" + event, listener );
    }
    else {
        element[ "on" + event ] = null;
    }
}

/**
 * 实现对click事件的绑定
 *
 * @class
 */
function addClickEvent(element, listener) {
    if ( element.addEventListener ) {
        element.addEventListener( "click", listener, false );
    }
    else if ( element.attachEvent ) {
        element.attachEvent( "onclick", listener );
    }else {
        element["onclick"] = listener;
    }
}

/**
 * 实现对于按Enter键时的事件绑定
 *
 * @class
 */
function addEnterEvent(element, listener) {
    var e = event ? event : window.event;
    var ele = element ? e.target : e.srcElement;
    var curKey = 0;
    curKey = e.keyCode|| e.which|| e.charCode; //支持IE、FF
    if ( curKey == 13 ) {
        listener();
    }
}

$.on = function(element, event, listener) {
    addEvent(element, event, listener)
};

$.un = function(element, event, listener) {
    removeEvent(element, event, listener)
};

$.click = function(element, listener) {
    addClickEvent(element, listener)
};

$.enter = function(element, listener) {
    addEnterEvent(element, listener)
};


/**
 * 遍历元素添加事件
 *
 * @class
 */
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

$.delegate = function(element, tag, eventName, listener) {
    delegateEvent(element, tag, eventName, listener);
};

/**
 * 判断是否为IE浏览器，返回-1或者版本号
 *
 * @class
 */
function isIE() {
    var ua = navigator.userAgent;
    if ( ua.indexOf("MSIE") > 0 ) {
        switch( true ) {
            case ua.indexOf("MSIE 6.0") != -1 :
                return "IE6";
                break;
            case ua.indexOf("MSIE 7.0") != -1 :
                return "IE7";
                break;
            case ua.indexOf("MSIE 8.0") != -1 :
                return "IE8";
                break;
            case ua.indexOf("MSIE 9.0") != -1 :
                return "IE9";
                break;
            case ua.indexOf("MSIE 10.0") != -1 :
                return "IE10";
                break;
            default :
                return "Other Vision";
        }
    }
}

/**
 * 设置cookie
 *
 * @class
 */
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent( cookieName )
        + "="
        + encodeURIComponent( cookieValue );
    if ( expiredays instanceof Date ) {
        cookieText += "; expire=" + expiredays.toGMTString();
    }
    document.cookie = cookieText;
}

/**
 * 获取cookie值
 *
 * @class
 */
function getCookie(cookieName) {
    var coName = encodeURIComponent(cookieName) + "=",
        coStart = document.cookie.indexOf(coName),
        coValue = null;

    if ( coStart > -1 ) {
        var coEnd = document.cookie.indexOf(";", coStart);
        if ( coEnd == -1) {
            coEnd = document.cookie.length;
        }
        coValue = decodeURIComponent(
            document.cookie.subString( coStart + coName.length, coEnd )
        );
    }
    return coValue;
}

/**
 * 封装Ajax方法
 *
 * @param {Object} options 可以包括的参数为：
 *                 type: post或者get，可以有一个默认值
 *                 data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
 *                 onsuccess: 成功时的调用函数
 *                 onfail: 失败时的调用函数
 *@param {Object} url 链接
 *
 */
function ajax(url, options) {

    //若type值为空，默认为GET方法
    var atype = options.type;
    if ( typeof atype == null ) {
        options.type = "GET";
    }

    options = {
        onsuccess: function( responseText, xhr ) {
            console.log( "Request was unsuccessful: " + xhr.status );
        },
        onfail: function( responseText, xhr ) {
            console.log( responseText );
        }
    };

    //XHR兼容
    function createXHR() {
        //一般浏览器
        if ( typeof XMLHttpRequest != "undefined" ) {
            return new XMLHttpRequest();
        }
        //兼容IE老版本
        else if ( typeof ActiveXObject != "undefined" ) {
            if ( typeof arguments.callee.activeXString != "string" ) {
                var versions = [ "MSXML2.XMLHttp.6.0",
                        "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"
                    ],
                    i,
                    len;
                for ( i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject( versions[i] );
                        arguments.callee.activeXString = versions[i];
                        break;
                    }
                    catch( ex ) {

                    }
                }
            }
            return new ActiveXObject( arguments.callee.activeXString );
        }
        else {
            throw new Error( "No XHR object available." );
        }
    }

    var xhr = createXHR();
    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 ) {
            if ( ( xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                options.onfail( xhr.responseText, xhr );
            }
            else {
                options.onsuccess( xhr.responseText, xhr );
            }
        }
    };

    //定义发送的数据的格式
    function addURLParam( data ){
        var pair = [];
        if ( data instanceof String ) {
            data = encodeURIComponent( data );
        }
        else if ( data instanceof Object ) {
            for( var i = 0; i < data.length; i++) {
                if ( data.hasOwnProperty(i) ) {
                    pair.push( i + "=" + data[i].toString() );
                }
            }
            data = encodeURIComponent( pair.join("&") );
        }
        return data;
    }

    //当方法为GET时
    if( options.type = "GET" ) {
        if( options.data != null ) {
            url += addURLParam( options.data );
        }
        xhr.open( "get", url, false );
        xhr.send( null );
    }
    //当方法为POST时
    else if( options.type = "POST" ) {
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if( options.data != null ) {
            xhr.send(addURLParam(options.data));
        }
    }
}

/**
 * 阻止事件冒泡
 *
 * @class
 */
function stopBubble(e) {
    // 如果提供了事件对象，则这是一个非IE浏览器
    if ( e && e.stopPropagation ) {
        // 因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    }
    else {
        // 否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
    }
}

/**
 *功能：阻止事件默认行为
 *
 * @class
 */
function stopDefault( e ) {
    // 阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault ) {
        e.preventDefault();
    }
    else {
        // IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
    }
    return false;
}