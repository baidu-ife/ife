/**
 * @file fundamental javascript
 * @author zhangmiao
 */

/**
 * 判断数组
 *
 * @param {String} arr 需要判断的参数名
 * @return {boolean}
 */
function isArray(arr) {
    var flag = Object.prototype.toString.call(arr) === '[object Array]';
    //var flag = arr instanceof Array;
    return flag;
}
//var arr = [12,67,6,56];
//console.log('isArray:' + isArray(arr));

/**
 * 判断函数
 *
 * @param {String} fn 需要判断的参数名
 * @return {boolean}
 */
function isFunction(fn) {
    var flag = Object.prototype.toString.call(fn) === '[object Function]';
    //var flag = typeof fn;
    return flag;
}
//console.log('isFunction:' + isFunction(isArray));

/**
 * clone对象
 *
 * @param {Object} src 源对象
 * @return {Object} 输出对象
 */
function cloneObject(src) {
    var tarObj = {};
    for(var item in src){
        tarObj[item] = src[item];
    }
    return tarObj;
}
//var srcObj = {
//    a: 1,
//    b: {
//        b1: ['hello','hi'],
//        b2: 'JavaScript'
//    }
//};
//var tarObj = cloneObject(srcObj);
//console.log('clone:' + tarObj.a);

/**
 * 数组去重
 *
 * @param {Array} arr 输入数组
 * @return {Array} 输出数组
 */
function uniqArray(arr) {
    var tar = [];
    if(arr.length){
        tar[0] = arr[0];
        outermost:
        for(var i = 1, l1 = arr.length; i < l1; i++) {
            for(var j = 0, l2 = tar.length;j < l2;j++) {
                if(arr[i] === tar[j]) {
                    continue outermost;
                }
            }
            tar[tar.length] = arr[i];
        }
    }
    return tar;
}
//var srcArr = [3,2,2,4,5,2,1,7,1];
//var tarArr = uniqArray(srcArr);
//console.log('uniq:' + tarArr);

/**
 * 对字符串去首尾空格
 *
 * @param {Array} arr 输入数组
 * @return {Array} 输出数组
 */
function trim1(arr) {
    var start;
    var end;
    var result;
    for(var i = 0, l = arr.length; i < l; i++){
        if(arr[i] != ' ' && arr[i] != '\u3000' && arr[i] != '\t'){
            start = i;
            break;
        }
    }
    for(var i = arr.length-1; i >= 0; i--){
        if(arr[i] != ' ' && arr[i] != '　' && arr[i] != '\t'){
            end = i;
            break;
        }
    }
    result = arr.substring(start,end+1);
    return result;
}
/**
 * 对字符串去首尾空格(正则表达式方法)
 *
 * @param {Array} arr 输入数组
 * @return {Array} 输出数组
 */
function trim2(str) {
    var reg = /^[\s\u3000\t]*(.*?)[\s\u3000\t]+$/;
    return str.replace(reg,'$1');
}
//var srcStr = '1';
//var tarStr = trim1(srcStr);
//console.log(tarStr);

/**
 * 遍历数组
 *
 * @param {Array} arr 输入数组
 * @param {Function} fn 数组中每个值需要执行的函数
 */
function each(arr, fn) {
    for(var i = 0, l = arr.length; i < l; i++) {
        arr[i] = fn(arr[i]);
    }
}
function output(x) {
    console.log(x);
}
//var arrexp = ['php', 'html', 'css', 'javascript'];
//each(arrexp,output);

/**
 * 获得对象第一层元素个数
 *
 * @param {Object} obj 输入对象
 * @return {Number}
 */
function getObjectLength(obj) {
    var num = 0;
    for(var i in obj){
        num++;
    }
    return num;
}
//var obj = {
//    a: 1,
//    b: 2,
//    c: {
//        c1: 3,
//        c2: 4
//    }
//};
//console.log('number:' + getObjectLength(obj));

/**
 * email判断
 *
 * @param {String} emailStr 输入字符串
 * @return {Boolean}
 */
function isEmail(emailStr) {
    //var email = new RegExp("");
    var email = /^(\w+\.?)*\w+@(\w+\.?)*\w+/;
    return email.test(emailStr);
}
//var email = 'hwjj.e@com';
//console.log('isEmail:' + isEmail(email));

/**
 * 电话号判断
 *
 * @param {String} phone 输入字符串
 * @return {Boolean}
 */
function isMobilePhone(phone) {
    var phreg = /^1(3|4|5|8)\d{9}/;
    return phreg.test(phone);
}
//var phone = '18784953463';
//console.log('isMobilePhone:' + isMobilePhone(phone));

/**
 * 给element增加一个样式
 *
 * @param {Object} element 节点
 * @param {String} newClassName class类名
 */
function addClass(element, newClassName) {
    if(!element.className) {
        element.className = newClassName;
    } else {
        element.className += ' ' + newClassName;
    }
}
//addClass(document.getElementById('number1'), 'testClass3');
//console.log('addClass:' + document.getElementById('number1').className);

/**
 * 给element删除一个样式
 *
 * @param {Object} element 节点
 * @param {String} oldClassName class类名
 */
function removeClass(element, oldClassName) {
    //var elementClass = element.className;
    var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
    element.className = element.className.replace(reg, ' ');
    element.className = element.className.replace('  ', ' ');
}
//removeClass(document.getElementById('number2'), 'testClass2');
//console.log('removeClass:' + document.getElementById('number2').className);

/**
 * 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
 *
 * @param {Object} element 节点
 * @param {String} siblingNode 节点
 * @return {Boolean}
 */
function isSiblingNode(element, siblingNode) {
    var parent = element.parentNode;
    var child = parent.childNodes;
    for(var i = 0, l = child.length; i < l; i++) {
        if(child[i] == siblingNode) {
            return true;
        }
    }
    return false;
}
//console.log("isSibling:" +
//              isSiblingNode(document.getElementById('number1'),
//                            document.getElementById('number2')));

/**
 * 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
 *
 * @param {Object} element 节点
 * @return {Object} 节点位置
 */
function getPosition(element) {
    var offleft = element.offsetLeft;
    var offtop = element.offsetTop;
    var pa = element.offsetParent;
    while(pa != null) {
        offleft += pa.offsetLeft;
        offtop += pa.offsetTop;
        pa = pa.offsetParent;
    }
    var positionObj = new Object();
    positionObj.offleft = offleft;
    positionObj.offtop = offtop;
    return positionObj;
}
//var pos = getPosition(document.getElementById('number2'));
//console.log(pos);

/**
 * 简单选择器实现
 *
 * @param {String} selector #id/.className/[attribute]/[attribute=value]/前面的组合
 * @return {Object} 节点
 */
var $ = function(selector) {
    var selectorArray = selector.split(' ');
    //一个选择
    var len = selectorArray.length;
    if(len === 1){
        var node = getElements(selectorArray[0])[0]; //只返回第一个对象
        return node;
    }
    //组合选择"#div1 .div2 [about=div3]"
    //1. getElements选择出最后一个属性的选择结果集nodes_tmp，并记录其对应的父节点parent_tmp
    //2. 开始循环，getElements选择出倒数第二个属性的选择结果集与parent_tmp进行match，
    //3. 将match的nodes_tmp中的节点放入nodes中，并记录nodes中节点的父节点
    //4. 更新nodes_tmp与parent_tmp
    if(len > 1) {
        //组合选择中最后一项——[about=div3]的选择结果
        var nodes_tmp = getElements(selectorArray[len - 1]);
        var nodes = [];
        var parent_tmp = [];
        var parents = [];
        var nodes_tem_len = nodes_tmp.length;
        //组合选择最后最后一项——[about=div3]的选择结果的父节点
        for(var i=0; i < nodes_tem_len; i++) {
            parent_tmp[i] = nodes_tmp[i].parentNode;
        }
        for(var j = len-2;j>=0;j--) {
            for(var k=0; k < nodes_tem_len; k++) {
                if(isMatch(parent_tmp[k],selectorArray[j])) {
                    nodes.push(nodes_tmp[k]);
                    parents.push(parent_tmp[k]);
                }
            }
            parent_tmp = [];
            for(var i = 0, l = nodes.length;i < l; i++) {
                parent_tmp[i] = parents[i].parentNode;
            }
            nodes_tmp = nodes;
            nodes = [];
            parents = [];
        }
        nodes = nodes_tmp;
        return nodes;
    }
    //selector为空
    return false;
}
/**
 * 获得所有节点
 *
 * @param {String} selector #id/.className/[attribute]/[attribute=value]/前面的组合
 * @return {Object} 节点集
 */
function getElements(selector) {
    var nodes = [];
    //只简单考虑：id，class，attribute只包含字母数字和-
    var idReg = /^#[\w\-]+/;
    var classReg = /^\.[\w\-]+/;
    var tagReg = /^\w+$/;
    var attrReg = /^\[([\w\-]+)\]$/;
    var attrReg1 = /^\[([\w\-]+)\=(\w+)\]$/;
    if(idReg.test(selector)) { //id选择
        nodes.push(document.getElementById(selector.substring(1)));
        return nodes;
    }
    if(classReg.test(selector)) { //class选择
        var elements = document.getElementsByTagName('*');
        var cls = new RegExp(selector.substring(1));
        for(var i = 0, l = elements.length;i < l; i++) {
            if(cls.test(elements[i].className)) {
                nodes.push(elements[i]);
            }
        }
        return nodes;
    }
    if(tagReg.test(selector)) { //tag选择
        var arr = toArray(document.getElementsByTagName(selector));
        nodes = nodes.concat(arr);
        return nodes;
    }
    if(attrReg.test(selector)) { //属性名选择(ie8以下不支持节点遍历)
        var attri = RegExp.$1;
        var body = document.getElementsByTagName('body')[0];
        var elements = body.getElementsByTagName('*');
        for(var i = 0, l = elements.length;i < l; i++) {
            if(elements[i].hasAttribute(attri)) {
                nodes.push(elements[i]);
            }
        }
        return nodes;
    }
    if(attrReg1.test(selector)) { //属性=属性值选择
        var body = document.getElementsByTagName('body')[0];
        var elements = body.getElementsByTagName('*');
        for(var i=0;i<elements.length;i++) {
            if(elements[i].getAttribute(RegExp.$1) == RegExp.$2) {
                nodes.push(elements[i]);
            }
        }
        return nodes;
    }
}
/**
 * 检测具有后一个属性的所有节点的父元素是否具有前一个属性
 *
 * @param {Object} node 具有后一个属性的节点的父元素
 * @param {String} selector #id/.className/[attribute]/[attribute=value]
 * @return {Boolean}
 */
function isMatch(node, attribute) {
    var elements = getElements(attribute);
    for(var i=0;i<elements.length;i++) {
        if(node === elements[i]) {
            return true;
        }
    }
    return false;
}
/**
 * 以数组形式返回对象
 *
 * @param {Object} obj
 * @return {Array}
 */
function toArray(obj) {
    var res = [];
    for(var i = 0, l = obj.length; i < l; i++){
        res.push(obj[i]);
    }
    return res;
}

//console.log('$id:' + $('#add1-btn'));
//console.log('$class:' + $('.testClass1'));
//console.log('$tagname:' + $('input'));
//console.log('$attributename:' + $('[fff-f]'));
//console.log('$attributename=attribute:' + $('[fff-f=123]'));
//console.log('combine:' + $('#div1 .div2 [about=div3]'));


/**
 * 给一个element绑定一个针对event事件的响应，响应函数为listener
 *
 * @param {Object} element 节点元素
 * @param {String} event 事件名
 * @param {Function} 绑定函数
 */
function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if(element.attachEvent) {
        element.attachEvent('on' + event, listener);
    }
    else {
        element['on' + event] = listener;
    }
}

/**
 * 移除element对象对于event事件发生时执行listener的响应
 *
 * @param {Object} element 节点元素
 * @param {String} event 事件名
 * @param {Function} 绑定函数
 */
function removeEvent(element,event,listener) {
    if(element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else if(element.detachEvent) {
        element.detachEvent('on' + event,listener);
    }
    else {
        element['on' + event] = null;
    }
}
//测试函数
function test() {
    //element.value = "123";
    alert(0);
}
//addEvent($('.eventTest'), 'click', test);
//removeEvent($('.eventTest'), 'click', test);

/**
 * 实现对click事件的绑定
 *
 * @param {Object} element 节点元素
 * @param {Function} 绑定函数
 */
function addClickEvent(element,listener) {
    if(element.addEventListener) {
        element.addEventListener('click', listener, false);
    }
    else if(element.attachEvent) {
        element.attachEvent('onclick', listener);
    }
    else {
        element['onclick'] = listener;
    }
}
//addClickEvent($(".eventTest"),test);
/**
 * 实现对于按Enter键时的事件绑定
 *
 * @param {Object} element 节点元素
 * @param {Function} 绑定函数
 */
function addEnterEvent(element,listener) {
    element.onkeydown = function(event) {
        var e = event || window.event;
        if(e.keyCode === 13) {
            listener(element);
        }
    }

}
//addEnterEvent($("#number1"),test);

//封装方法
$.on = function(element,event,listener) {
    addEvent(element,event,listener);
}
//$.on($('.eventTest'), 'click', test);

$.un = function(element,event,listener) {
    removeEvent(element,event,listener);
}
//$.un($('.eventTest'), 'click', test);

$.click = function(element,listener) {
    addClickEvent(element,listener);
}
//$.click($('.eventTest'),test);

$.enter = function(element,listener) {
    addEnterEvent(element,listener);
}
//$.enter($('#number1'),test);

function clickListener(event) {
    console.log(event);
}

//each($("#list").getElementsByTagName("li"),function(li) {
//    addClickEvent(li, clickListener);
//})

$.delegate = function(element, tag, eventName, listener) {
    element['on' + eventName] = function(event) {
        var e = event || window.event;
        var tar = e.target || e.srcElement;
        if(tar.tagName.toLowerCase() === tag) {
            listener(e);
        }
    }
}
//$.delegate($('#list'), 'li', 'click', clickListener);


//再次封装
$.on = function(selector, event, listener) {
    addEvent($(selector), event, listener);
}
//$.on('.eventTest', 'click', test);

$.un = function(selector,event,listener) {
    removeEvent($(selector), event, listener);
}
//$.un('.eventTest', 'click', test);

$.click = function(selector, listener) {
    addClickEvent($(selector), listener);
}
//$.click('.eventTest',test);

$.enter = function(selector, listener) {
    addEnterEvent($(selector), listener);
}
//$.enter('#number1',test);

$.delegate = function(selector, tag, eventName, listener) {
    $(selector)['on'+eventName] = function(event) {
        var e = event || window.event;
        var tar = e.target || e.srcElement;
        if(tar.tagName.toLowerCase() === tag) {
            listener(e);
        }
    }
}
//$.delegate('#list', 'li', 'click', clickListener);

/**
 * 判断是否是IE浏览器，返回版本号
 *
 * @return {String} 版本号
 */
function isIE() {
    var ua = navigator.userAgent;
    if(ua.indexOf('MSIE') >= 0 || ua.indexOf('Trident') >= 0) {
        return navigator.appVersion;
    }
    else {
        return 'not ie';
    }
}
//console.log(isIE());

/**
 * 设置cookie
 *
 * @param {String} cookieName cookie名称
 * @param {String} cookieValue cookie值
 * @param {Number} expiredays 有效时间
 */
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + '=' + escape(cookieValue)
                        + ';expires=' + exdate.toGMTString();
}
/**
 * 获得cookie
 *
 * @param {String} cookieName cookie名称
 */
function getCookie(cookieName) {
    if(document.cookie.length > 0) {
        var cookie_start = document.cookie.indexOf(cookieName + '=');
        if(cookie_start > 0) {
            cookie_start = cookie_start + cookieName.length + 1;
            var cookie_end = document.cookie.indexOf(';', cookie_start);
            if(cookie_end === -1) {
                cookie_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(cookie_start, cookie_end));
        }
    }
}

function fn() {

}
/**
 * 获得cookie
 *
 * @param {String} url
 * @param {Object} options 参数对象
 */
function ajax(url, options) {
    var method = options.type ? options.type.toUpperCase() : 'GET';
    var async = options.async ? options.async : true;
    var len = 0;
    var ourl = '';
    var success = options.onsuccess ? options.onsuccess : fn;
    var fail = options.onfail ? options.onfail : fn;
    for(var item in options.data) {
        ourl += item + '=' + options.data[item];
        var dataLength = getObjectLength(options.data);
        if(len < dataLength-1) {
            ourl += '&';
        }
        len++;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState === 4) {
            if(xmlhttp.status === 200) {
                var responseText = xmlhttp.responseText;
                success(responseText);
            }
            else {
                fail();
            }
        }
    }
    if(method === 'GET'){
        xmlhttp.open(method, url + '?' + ourl, async);
        xmlhttp.send();
    }
    else {
        xmlhttp.open(method, url, async);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(ourl);
    }
}
//ajax(
//    'http://localhost:8080/zm/message',
//    {
//        data: {
//            name: 'admin',
//            password: 'admin'
//        },
//        onsuccess: function (responseText, xhr) {
//            console.log(responseText);
//        }
//    }
//);

