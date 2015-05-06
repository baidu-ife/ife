function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isFunction(fn) {
    return typeof fn == "Function";
}

function cloneObject(src) {
    // your implement
    var srcType = typeof  src;
    var result;
    if (srcType === "number" || srcType === "string" || srcType === "boolean" || srcType === "date" || srcType === "object") {
        if (srcType != "object") {
            return src;
        } else {
            var srcClass = Object.prototype.toString.call(src).slice(8, -1);
            if (srcClass === "Object") {
                result = {};
            } else if (srcClass === "Array") {
                result = [];
            }

        }
        for (key in src) {
            var temp = src[key];
            if (srcType === "object") {
//                var tClass = Object.prototype.toString.call(temp).slice(8,-1);
                result[key] = arguments.callee(temp);
            } else {
                result[key] = temp;
            }
        }
        return result;
    } else {
        alert("123");
        return;
    }
}

//var srcObj = {
//    a: 1,
//    b: {
//        b1: ["hello", "hi"],
//        b2: "JavaScript"
//    }
//};
//var abObj = srcObj;
//var tarObj = cloneObject(srcObj);
//var arr = [1,2,3,5]
//console.log(isArray(arr));
//srcObj.a = 2;
//srcObj.b.b1[0] = "Hello";
//
//console.log(abObj.a);
//console.log(abObj.b.b1[0]);
//
//console.log(tarObj.a);      // 1
//console.log(tarObj.b.b1[0]);    // "hello"


function uniqArray(arr) {
    // your implement
    var result = [];
    for (k in arr) {
        if (result.indexOf(arr[k]) == -1) {
            result.push(arr[k]);
        }
    }
    return result;
}

//var a = [1, 3, 5, 7, 5, 3];
//var b = uniqArray(a);
//console.log(b); // [1, 3, 5, 7]

function simpleTrim(str) {
    // your implement
    var result = "";
    var start, end;
    for (start = 0; start < str.length; start++) {
        if (str.charAt(start) == " " || str.charAt(start) == "\t") {
            continue;
        } else {
            break;
        }

    }
    for (end = str.length - 1; end >= 0; end--) {
        if (str[end] == " " || str[end] == "\t") {
            continue;
        } else {
            break
        }
    }

    result = str.slice(start, end + 1);
    return result;
}

//var str = "     asfnk asnnf         ";
//console.log(str);
//console.log(str.length);
//console.log(simpleTrim(str));
//console.log(simpleTrim(str).length);

function trim(str) {
    // your implement
    var result;
    var regex1 = /^\s+/;
    var regex2 = /\s+$/
    result = str.replace(regex1,"");
    result = result.replace(regex2,"");
    return result;
}

//var str = '   hi!  ';
//str = trim(str);
//console.log(str); // 'hi!'

function each(arr, fn) {
    // your implement
    for(k in arr){
        fn(arr[k],k);
    }
}
// 使用示例
//var arr = ['java', 'c', 'php', 'html'];
//function output(item) {
//    console.log(item)
//}
//each(arr, output);  // java, c, php, html

// 使用示例
//var arr = ['java', 'c', 'php', 'html'];
//function output(item, index) {
//    console.log(index + ': ' + item)
//}
//each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var attrCount = 0;
    for(attr in obj){
        attrCount ++;
    }
    return attrCount;
}
//var obj = {
//    a: 1,
//    b: 2,
//    c: {
//        c1: 3,
//        c2: 4
//    }
//};
//console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var regex = /^([\w\d]+([-_\.][\w\d]+)*)@([\w\d]+)\.([\w\d]+)$/;
    var result = emailStr.match(regex);
    if(result === null){
        return false;
    }else{
        return true;
    }
}

//var str1 = "1078356569@qq.com";
//var str2 = "323235@gdgheoigh@o3tuo3.com";
//console.log(isEmail(str1));
//console.log(isEmail(str2));

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var regex = /^1[3-8]{1}\d{9}$/;
    var str = regex.exec(phone);
    if(str === null){
        return false;
    }else{
        return true;
    }
}

//var phone = "18711090777";
//var phone1 = "12099873333"
//var phone2 = "1870909";
//var phone3 = "18777777777"
//console.log(isMobilePhone(phone));
//console.log(isMobilePhone(phone1));
//console.log(isMobilePhone(phone2));
//console.log(isMobilePhone(phone3));

// 为element增加一个样式名为newClassName的新样式
function hasClass(element, className){
    return element.className.match(new RegExp("\\s|^"+className + "\\s|$"));
}
function addClass(element, newClassName) {
    // your implement
    if(!hasClass(element, newClassName)){
        element.className += " " + newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    if(hasClass(element, oldClassName)){
        element.className = element.className.replace(new RegExp("\\s|^"+ oldClassName + "\\s|$"), "");
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    if(element.parentNode === siblingNode.parentNode){
        return true;
    }else{
        return false;
    }
}
//var ele = document.getElementById("number1");
//var sib = document.getElementById("number2");
//console.log(isSiblingNode(ele, sib));


// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var result = {};
    var temp = element.getBoundingClientRect();
    result.x = temp.top;
    result.y = temp.left;
    return result;
}
//var obj = document.getElementById("number2");
//console.log(getPosition(obj));


// 实现一个简单的Query
function $(selector) {
    selector = trim(selector);
    var conditions = selector.split(new RegExp("\\s"));
//    if(isArray(conditions)){
//        for(k in conditions){
//            trim(conditions[k]);
//               result[k] = simSelect(conditions[k], obj);
//        }
//    }else{
//        return simSelect(selector, pobj);
//    }
    if(1 == conditions.length){
        return simSelect(selector);
    }else{
        var obj = simSelect(conditions[0]);
        for(var k = 1; k < conditions.length; k++){
                obj = simSelect(conditions[k],obj);
        }
        return obj;
    }

}

//function simSelect1(selector, obj){
//    if(arguments.length == 1){
//        var regex = /^[a-zA-Z]/;
//        if("#" === selector[0]){
////            selector = selector.replace("#","");
//            selector = selector.slice(1);
//            return document.getElementById(selector);
//        }else if("." === selector[0]){
//            selector = selector.slice(1);
//            return document.getElementsByClassName(selector)[0];
//        }else if(regex.test(selector)){
//            return document.getElementsByTagName(selector)[0];
//        }else if("[" === selector[0]){
//            var nodes = document.all;
//            console.log(nodes.length);
//            var result;
//            selector = selector.slice(1,-1);
//            if(selector.match(new RegExp("=")) === null){
//                for(k in nodes){
//                    if(nodes[k].hasAttribute(selector)){
//                        result = nodes[k];
//                        break;
//                    }
//                }
//                return result;
//            }else{
//                selector = trim(selector);
//                var tArr = selector.split("=");
//                var attr = trim(tArr[0]);
//                var attrVal = trim(tArr[1]);
//                for(k in nodes){
//                    if(nodes[k].getAttribute(attr) === attrVal){
////                    result.push(nodes[k]);
//                        result = nodes[k];
//                        break;
//                    }
//                }
//                return result;
//            }
//        }
//    }else{
//
//        var regex = /^[a-zA-Z]/;
//        if("#" === selector[0]){
////            selector = selector.replace("#","");
//            selector = selector.slice(1);
//            return document.getElementById(selector);
//        }else if("." === selector[0]){
//            selector = selector.slice(1);
//            return obj.getElementsByClassName(selector)[0];
//        }else if(regex.test(selector)){
//            return obj.getElementsByTagName(selector)[0];
//        }else if("[" === selector[0]){
//            var nodes = obj.getElementsByTagName("*");
//            console.log(nodes.length);
//            var result;
//            selector = selector.slice(1,-1);
//            if(selector.match(new RegExp("=")) === null){
//                for(k in nodes){
//                    if(nodes[k].hasAttribute(selector)){
//                        result = nodes[k];
//                        break;
//                    }
//                }
//                return result;
//            }else{
//                selector = trim(selector);
//                var tArr = selector.split("=");
//                var attr = trim(tArr[0]);
//                var attrVal = trim(tArr[1]);
//                for(k in nodes){
//                    if(nodes[k].getAttribute(attr) === attrVal){
////                    result.push(nodes[k]);
//                        result = nodes[k];
//                        break;
//                    }
//                }
//                return result;
//            }
//        }
//
//    }
//
//}

function simSelect(selector, obj){
    var obj = obj || document;
    var regex = /^[a-zA-Z]/;
    if("#" === selector[0]){
//            selector = selector.replace("#","");
        selector = selector.slice(1);
        return document.getElementById(selector);
    }else if("." === selector[0]){
        selector = selector.slice(1);
        return obj.getElementsByClassName(selector)[0];
    }else if(regex.test(selector)){
        return obj.getElementsByTagName(selector)[0];
    }else if("[" === selector[0]){
        var nodes = obj.getElementsByTagName("*");
        console.log(nodes.length);
        var result;
        selector = selector.slice(1,-1);
        if(selector.match(new RegExp("=")) === null){
            for(k in nodes){
                if(nodes[k].hasAttribute(selector)){
                    result = nodes[k];
                    break;
                }
            }
            return result;
        }else{
            selector = trim(selector);
            var tArr = selector.split("=");
            var attr = trim(tArr[0]);
            var attrVal = trim(tArr[1]);
            for(k in nodes){
                if(nodes[k].getAttribute(attr) === attrVal){
//                    result.push(nodes[k]);
                    result = nodes[k];
                    break;
                }
            }
            return result;
        }
    }
}
//var con = "#adom #id2";
////var str = $(con).tagName;
////console.log(str);
//var obj = $(con);
//console.log(obj);

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if(element.addEventListener){
        element.addEventListener(event, listener, false);
    }else if(element.attachEvent){
        element.attachEvent("on"+element, event);
    }else{
        element["on" + element] = listener;
    }
//    removeEvent(element, event, listener);
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    if(element.removeEventListener){
        element.removeEventListener(event, listener, false);
    }else if(element.detachEvent){
        element.detachEvent("on"+event, listener);
    }else{
        element["on" + event] = null;
    }
}

//function clicklistener(obj) {
////    console.log(obj);
//    alert("I have been clicked!");
////    var obj1 = obj.getElementsByTagName("p");
////    console.log(obj1);
//    console.log("removed");
//}
//
//var obj = $("#adom");
//addEvent(obj, "click", clicklistener);
//这段代码的执行结果是第一次点击执行了事件，第二次点击就不执行了

function clicklistener(event) {
    alert("I have been clicked!");
//    var obj1 = obj.getElementsByTagName("p");
//    console.log(obj1);
    console.log("removed");
    console.log(event.type);
    removeEvent(this, event.type, clicklistener);//注意此处必须用event.type而不能用event,因为此处我们需要传的应该是一个字符串而不是事件对象
}
//var obj = $("#adom");
//addEvent(obj, "click", clicklistener);


// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    if(element.attachEvent){
        element.attachEvent("onclick", listener);
    }else if(element.addEventListener){
        element.addEventListener("click", listener, false);
    }else{
        element.onclick = listener;
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    if(element.attachEvent){
        element.attachEvent("onkeydown", function(){
            if(event.keyCode == 13){
                listener();
            }
        });
    }else if(element.addEventListener){
        element.addEventListener("keydown", function(){
            if(event.keyCode == 13){
                listener();
            }
        }, false);
    }
}

//function enterKey(){
//    alert("entered");
//}
//var obj = document.getElementById("number1");
//addEnterEvent(obj, enterKey);

//$.on = addEvent;
//$.un = removeEvent;
//$.click = addClickEvent;
//$.enter = addEnterEvent;

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    // your implement
    addEvent(element,eventName,function(event){
        var e = event || window.event;
        var etarget = e.target || e.srcElement;
//        var eles = element.getElementsByTagName(tag);
//        for(var k in eles){
//            addEvent(eles[k], eventName, listener);
//        }
        if(etarget.nodeName.toLowerCase() == tag){
            listener(e);
        }
    });
}

//$.delegate = delegateEvent;


$.on = function(selector, event, listener){
    // your implement
    var element = $(selector);
    addEvent(element, event, listener);
}

$.click = function (selector, listener) {
    // your implement
    var element = $(selector);
    addClickEvent(element, listener);
}

$.un = function (selector, event, listener) {
    // your implement
    var element = $(selector);
    removeEvent(element, event, listener);
}

$.delegate = function (selector, tag, event, listener) {
    // your implement
    var element = $(selector);
    delegateEvent(element, tag, event, listener);
}

function clickListener(event) {
    console.log(event);

}
function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}



// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var isIe = !!navigator.appName.indexOf("Microsoft Internet Explorer")!=-1 && document.all;
    console.log(isIe);
    if(isIe){
//        if(navigator.appVersion.match(/6./i)=="6."){
//            return "IE 6";
//        }else if(navigator.appVersion.match(/7./i)=="7."){
//            return "IE 7"
//        }else if(navigator.appVersion.match(/8./i)=="8."){
//            return "IE 8"
//        }else if(navigator.appVersion.match(/7./i)=="9."){
//            return "IE 9"
//        }
        return navigator.appVersion;
    }else{
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = cookieName  + "=" + escape(cookieValue) + ";expires=" + exdate.toGMTString();
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    if(document.cookie.length > 0){
       var c_start = document.cookie.indexOf(cookieName+"=");
       var v_end;
       var v_start;
       if(c_start != -1){
           v_start = c_start + cookieName.length + 1;
           v_end = document.cookie.indexOf(";", v_start);
           if(v_end == -1){
               v_end = document.cookie.length;
           }
           return unescape(document.cookie.subStrin(v_start,v_end));
       }
    }else{
        return "";
    }
}
//console.log(isIE());
//alert(isIE());


/*封装ajax
 options是一个对象，里面可以包括的参数为：
     type: post或者get，可以有一个默认值
     data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
     onsuccess: 成功时的调用函数
     onfail: 失败时的调用函数
* */
//  function ajax(url, options) {
//    // your implement
//    var xmlhttp;
//    var pstr = "";//存放要提交的数据
//    if(window.XMLHttpRequest){
//        xmlhttp = new XMLHttpRequest();
//    }else if(window.ActiveXObject){
//        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//    }else{
//        alert("您的浏览器不支持ajax");
//        return
//    }
//    if(typeof options.data == "object"){
//            for(var k in options.data){
//                if(pstr == ""){
//                    pstr +=  k + "=" + escape(options.data[k]);
//                }else{
//                    pstr += "&" + k + "=" + escape(options.data[k]);
//                }
//            }
//    }else{
//        pstr = options.data;
//    }
//    if(options.type == null){
//        options.type = "get";
//    }
//    if(options.type.toLowerCase() == "get"){
//        if(pstr.length > 0){
//            url += "?" + pstr;
//            xmlhttp.open("GET", url, true);
//            xmlhttp.onreadystatechange = function(){
//                console.log(xmlhttp.readyState);
//                if(xmlhttp.readyState==4 && xmlhttp.status==200){
//                    console.log("succeed");
////            options.onsuccess();
//                }else{
//                    if(options.onfail != null){
//                        options.onfail();
//                    }
//                    console.log("failed");
//                }
//            }
//
//
//            console.log("get");
//            console.log(url);
//        }
//    }else if(options.type.toLowerCase() == "post"){
//        xmlhttp.open("POST", url, true);
//        xmlhttp.onreadystatechange = function(){
//            if(xmlhttp.readyState==4 && xmlhttp.status==200){
//                console.log("succeed");
////            options.onsuccess();
//            }else{
//                if(options.onfail != null){
//                    options.onfail();
//                }
//                console.log("failed");
//            }
//        }
//        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//        xmlhttp.send(pstr);
//    }
//}

function ajax(url, options){
    var pstr = "";//用来存要传递的参数
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }else {
        alert("您的浏览器不支持AJAX！");
    }

    if(options.data != null){
        if(typeof options.data == "string"){
            pstr = options.data;
        }else{
            var pdata = options.data;
            for(var k in pdata ){
                if(pstr == ""){
                    pstr = k + "=" + pdata[k];
                }else{
                    pstr += "&" + k + "=" + pdata[k];
                }
            }
        }
    }


    xmlhttp.onreadystatechange = function (){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            if(options.onsuccess != null){
                options.onsuccess(xmlhttp.responseText);
            }
        }else{
			//alert("failed");
            if(options.onfail != null){
                options.onfail();
            }
        }
    }

    if(options.type == null){
        options.type = "get";
    }
    if(options.type.toLowerCase() == "get"){
        url += "?" + pstr;
        alert(url);
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }else if(options.type.toLowerCase() == "post"){
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(pstr);
    }

}



//
//ajax(
//    'ajaxtest.php',
//    {
//        data: {
//            name: 'simon',
//            password: '123456'
//        },
//
//        onsuccess: function (responseText, xhr) {
//            console.log(responseText);
//        }
//    }
//);


//获取元素的样式属性值
function getStyle(element,attr){
    if(element.currentStyle){
        return element.currentStyle[attr];
    }else if(window.getComputedStyle){
        window.getComputedStyle(obj, null)[attr];
    }
}
