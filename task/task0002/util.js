// 判断arr是否为一个数组，返回一个bool值
function isArray(arr){
//return Object.prototype.toString.call(obj).slice(8, -1) === Array;
    return arr.prototype.toString.call() == "[object Array]";
}
//Object.prototype.toString.call([])，就是一个Array对象借用了Object对象上的方法。
//参考资料：js秘密花园类型章节
//Array.isArray(arr)ECMASript5新方法，通用方法。

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn === "function";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象,返回一个完整拷贝
// 被复制的对象类型会被限制为数字/字符串/布尔/日期/数组/对象。
// 不会包含函数、正则对象等
function cloneObject(src) {
  var result = {};
  var type = typeof src[i];
  for (var i in src) {
    if (type === 'number' || type === 'string' || type === 'boolean') {
      result[i] = src[i];
    } else {
      result[i] = cloneObject(src[i]);
    }
  }
  return result;
}


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var arrNew = [];
    for(var i in arr){
        if (arrNew.prototype.indexOf(arr[i]) === -1){
// String.prototype.indexOf.call(arrNew,arr[i])
            arrNew.push(arr[i]);
        }
    }return arrNew;
}

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
function simpleTrim(str) {
    // your implement
    var i = indexOf(/\S/);
    var j = lastIndexOf(/\S/);
    return str.slice(i,str.length-1);
}


// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    var re = /^\s*|\s*$/g;
    return str.replace(re,'');
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for(var i in arr){
        fn(i,arr[i]);
    }
}

// 其中fn函数可以接受两个参数：item和index
// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(index, item) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var cou = 0;
    for(var p in obj){
            cou ++;
    }
    return cou;
}
//hasOwnProperty()的使用!!!
// if(obj.hasOwnProperty(p)){}

// 正则表达式
function isEmail(emailStr){
    var reg = /^[\w+\.]*\w+@\w+[\.\w+]+$/;
    return console.log(reg.exec(emailStr));
}
function isMobilePhone(phone){
    var reg = /^[\+\d{1,4}]?\d{7,11}$/;
    return console.log(reg.exec(phone));
}
//()和[]的用法
// 邮箱格式：字母数字点组合+@+字母数字+点+字母数字；
// 电话格式：有时要加上区号，最长11位，最短7位；


//3.DOM
$(element).addClass(newClassName);
$(element).removeClass(newClassName);

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName){
    if(element.className==""){
        element.className=newClassName;
    }else {
        element.className+=" "+newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName){
    element.classList.remove(oldClassName);
    return element;
}
var p = document.getElementsByTagName('p')[0];
removeClass(p, "left");

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode){
    return element.parentNode==siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var ox = element.getBoundingClientRect().left;
    var oy = element.getBoundingClientRect().top;
    var scrollLeft = Math.max(document.documentElement., document.body.scrollLeft); 
    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop); 
    x = ox + scrollLeft;
    y = oy + scrollTop;
return "{"+x+","+y+"}";//需要考虑滚动条的移动，窗口的大小是会变化的
}

function getPosition(element) {
    var x = scrollLeft + scrollWidth;
    var y = scrollTop + scrollHeight;
return "{"+x+","+y+"}";//需要考虑滚动条的移动，窗口的大小是会变化的
}
// 字符串、indexof寻找空格/splice()、然后在分成第一个第二个元素、然后在分类查找。。。
// 实现一个简单的Query
//selector是一个字符串。
//string.slice(start,end)包括起始，不包括结尾。
// * . ? + $ ^ [ ] ( ) { } | \ /  正则表达式中需要转义的字符合合集
function mini$(selector) {
    var result = undefined;
    var con = selector.slice(1);
    if (/^#/.test(selector)){ //ID选择器
        result = document.getElementById(con);
    } else if (/^\./.test(selector)) { //类选择器
        result = document.getElementsByClassName(con);
    } else if (/^\[/.test(selector)) {//属性选择器
        var value;
        var classCon = selector.slice(1, -1);
        var ord = classCon.indexOf("=");
        value = classCon.slice(ord+1);
        if (ord > 0) {
            classCon = classCon.slice(0, ord);
        }
        var matchingElements = [];
        var allElements = document.getElementsByTagName('*');
        if (ord < 0) {
            for (var i = 0; i < allElements.length; i++) {
                if (allElements[i].getAttribute(classCon) !== null) {
                    matchingElements.push(allElements[i]);
                }
            }
        } else {
            for (var i = 0; i < allElements.length; i++) {
                if (allElements[i].getAttribute(classCon) !== null && allElements[i].getAttribute(classCon) === value) {
                    matchingElements.push(allElements[i]);
                }
            }
        }
        result = matchingElements;
        } else {
            result = document.getElementsByTagName(selector);
        } //标签选择器
        return result;
        }

function $(selector) {
    var stop = selector.indexOf(" ");
    var reSelector;
    if (stop != -1) {
        //分成两部分，当做两个筛选条件
        var selector1 = selector.slice(0, stop);
        var selector2 = selector.slice(stop + 1);
        var re1 = mini$(selector1);
        var re2 = mini$(selector2);
        reSelector = [];
        for (var i=0;i<re2.length;i++) {
            if (re2[i].parentNode === re1) {
                reSelector.push(re2[i]);
            }
        }
    } else {
        reSelector = mini$(selector);
    }
    return reSelector;
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


//$选择器，事件部分还不是太会，正在学习，以后一定好好练习补上完整代码的，请求导师的谅解.....

//事件。
function addEvent(element,event,listener){
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+event,listener);
    }
}
function removeEvent(element,event,listener){
    if(element.removeEventListener){
        element.removeEventListener(event,listener,false);    
    }else if(element.detachEvent){
        element.detachEvent("on"+event,listener);
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
// your implement
addEvent(element,"click",listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
// your implement

addEvent(element,"keydown",function(en){
    var key = en.keyCode;
    if(key === 13){
listener.call(en);//.call()？
}
});
}


//BOM部分
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
// your implement
    var AppName = navigator.appName;
    if(AppName == "IE"){
        return navigator.appVersion;
    }else return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
// your implement
var d = new Date();
d.setTime(d.getTime()+(expiredays*24*60*60*1000));
var expires = "expiredays"+d.toGMTString();
document.cookie = cookieName+"="+cookieValue+";"+expires;
}

// 获取cookie值
function getCookie(cookieName) {
// your implement
var name = cookieName + "=";
var ca = document.cookie.split(";");
for(var i=0;i<ca.length;i++){
    var c = ca[i].trim();
    if(c.indexOf(name)==0){
        return c.substring(name.length,c.length);
    }
    else return "none";
}
}


//ajax部分
function toUrlstr(data){
    var urlstr="";
    for(var i in data){
        urlstr = urlstr + encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
    }
    return urlstr.substring(0, urlstr.length-1);
}//用来序列化参数
function ajax(url, options) {
    var xhr;
    if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
    xhr=new XMLHttpRequest();
}
else
{// code for IE6, IE5
    xhr=new ActiveXObject("Microsoft.XMLHTTP");
}
if(options.data === "object"){
    urlstr = toUrlstr(options.data);
}else if(options.data == "string"){
    urlstr = urlstr;
}
var type = options.type || 'GET';
xhr.open(type,"utill.js",true);
if(type == "post"){
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(urlstr);
}else {
    xhr.send();
}
xhr.onerror = function(){
onfail(xhr.responseText,xhr);//错误情况处理
}
xhr.onreadystatechange=function(){//这个函数用来判断是否成功发送
    if (xhr.readyState==4)
    {
        if(xhr.status > 199 && xhr.status < 300) || xhr.status === 304){
    onsuccess(xhr.responseText,xhr);
}else {onfail(xhr.responseText,xhr);}
};
}
}
// 使用示例：
ajax(
    'utill.js', 
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



 // } else if (/^\[/.test(selector)) {//属性选择器
 //        console.log('sx');
 //        var value;
 //        var classCon = selector.slice(1, -1);
 //        // console.log(classCon);
 //        var ord = classCon.indexOf("=");
 //        value = classCon.slice(ord+1);
 //        if (ord > 0) {
 //            classCon = classCon.slice(0, ord);
 //        }
 //        console.log(classCon.slice(0, ord));
 //        var matchingElements = [];
 //        var allElements = document.getElementsByTagName('*');
 //        if (ord < 0) {
 //            for (var i = 0; i < allElements.length; i++) {
 //                // console.log(allElements[i].getAttribute(classCon));
 //                if (allElements[i].getAttribute(classCon) !== null) {
 //                    // Element exists with attribute. Add to array.
 //                    matchingElements.push(allElements[i]);
 //                }
 //            }
 //        } else {
 //            for (var i = 0; i < allElements.length; i++) {
 //                // console.log(allElements[i].getAttribute(classCon));
 //                if (allElements[i].getAttribute(classCon) !== null && allElements[i].getAttribute(classCon) === value) {
 //                    // Element exists with attribute. Add to array.
 //                    matchingElements.push(allElements[i]);
 //                }
 //            }
 //            result = matchingElements;
 //        }
 //    }










