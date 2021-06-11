/**
 * Created by jiawen on 2015/4/19.
 */

/*
* 2.1
* */
function isArray(arr) {
    return Object.prototype.toString.apply(arr) === '[object Array]';
}

function isFunction(fn) {
    return Object.prototype.toString.apply(fn) === '[object Function]';
}

// ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
// �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
function cloneObject(src) {
    if(typeof src != "object"){
        throw TypeError;
    }
    var targetObj = src.constructor == Array ? [] : {};
    for (i in src) {
        if (typeof src[i] == "object") {
            targetObj[i] = src[i].constructor == Array ? [] : {};
            targetObj[i] = cloneObject(src[i]);
        } else {
            targetObj[i] = src[i];
        }
    }
    return targetObj;
}

// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
//splice implementation
function uniqArray1(arr) {
    if (!isArray(arr)) {
        throw new TypeError();
    }
    var arr = cloneObject(arr);
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] == arr[i]) {
                arr.splice(j, 1);
            }
        }
    }
    return arr;
}
//hash implementation,may be more efficient
function uniqArray(arr) {
    if (!isArray(arr)) {
        throw new TypeError();
    }
    var newArr = [],
        hash = {};

    for (var i = 0; i < arr.length; i++) {
        if (hash[arr[i]] == undefined) {
            newArr.push(arr[i]);
            hash[arr[i]] = arr[i];
        }
    }
    return newArr;
}

// ���ַ���ͷβ���пո��ַ���ȥ��������ȫ�ǰ�ǿո�Tab�ȣ�����һ���ַ���
// ����ʱ��Ҫ�򵥵���һ��������ʽ��ʵ��
function simpleTrim(str) {
    if (typeof str != 'string') {
        throw new TypeError();
    }
    var newStr = '';
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (c != '\t' && c != ' ' && c != '\u0020') {
            break;
        }
        newStr = str.substring(i + 1, str.length);
    }
    str = newStr;
    for (var i = str.length - 1; i > -1; i--) {
        var c = str.charAt(i);
        if (c != '\t' && c != ' ' && c != '\u0020') {
            break;
        }
        newStr = str.substring(0, i);
    }
    return newStr;
}

//regular expression implementation
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

// ʵ��һ����������ķ��������������ÿһ��Ԫ��ִ��fn��������������������Ԫ����Ϊ��������
function each(arr, fn) {
    var i;
    for (i in arr) {
        //fn(arr[i],i);
        fn.apply(null, [arr[i], i]);
    }
}

// ��ȡһ�����������һ��Ԫ�ص�����������һ������
function getObjectLength(obj) {
    var len = 0, key;
    for (key in obj) {
        len++;
    }
    return len;
}
/*
* 2.2
* */
// �ж��Ƿ�Ϊ�����ַ
function isEmail(emailStr) {
    var re = /^[\w][\w\.]*@[\w]+(\.\w{2,4})+$/;
    return re.test(emailStr);
}

// �ж��Ƿ�Ϊ�ֻ���
function isMobilePhone(phone) {
    var re = /^(86)?1[3578]\d{9}$/;
    return re.test(phone);
}

/*
* 3.1
* */

// Ϊdom����һ����ʽ��ΪnewClassName������ʽ
function addClass(element, newClassName) {
    if (element == undefined
        || newClassName == undefined
        || trim(newClassName) == "") {
        return;
    }

    if (hasClass(element, newClassName)) {
        //�ж��Ƿ��Ѿ�ӵ�и���
        return;
    }

    //���֧��classList
    if (element.classList) {
        element.classList.add(newClassName);
        return;
    } else {
        //����
        element.className = trim(element.className) + " " + trim(newClassName);
    }
}

// �Ƴ�dom�е���ʽoldClassName
function removeClass(element, oldClassName) {
    if (element == undefined
        || oldClassName == undefined
        || trim(oldClassName) == "") {
        return;
    }
    //���֧��classList
    if (element.classList) {
        element.classList.remove(oldClassName);
        return;
    } else {
        //����
        if (trim(element.className) == "") {
            return;
        }
        var classes = element.className.split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == oldClassName) {
                classes.splice(i, 1);
                i--;
            }
        }
        element.className = trim(classes.join(' '));
    }
}

//�ж�һ��Ԫ���Ƿ�ӵ��ĳ����
function hasClass(element, className) {
    if (element == undefined
        || className == undefined
        || trim(className) == "") {
        return false;
    }
    //���֧��classList
    if (element.classList) {
        return element.classList.contains(className);
    } else {
        //����
        var oldClassName = trim(element.className);
        if (oldClassName == undefined || oldClassName == "") {
            return false;
        }
        var oldClasses = oldClassName.split(/\s+/);
        for (var i in oldClasses) {
            if (oldClasses[i] == className) {
                return true;
            }
        }
    }
    return false;
}

// �ж�siblingNode��dom�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
function isSiblingNode(element, siblingNode) {
    if (element == siblingNode ||
        element == undefined ||
        element == null ||
        siblingNode == undefined ||
        element == null) {
        return false;
    }
    //�жϸ��ڵ��Ƿ�һ��
    return element.parentNode == siblingNode.parentNode;
}

//��ȡԪ����Դ��ڵ�ˮƽλ��
function getElementViewLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    if (document.compatMode == "BackCompat"){
        var elementScrollLeft=document.body.scrollLeft;
    } else {
        var elementScrollLeft=document.documentElement.scrollLeft;
    }
    return actualLeft-elementScrollLeft;
}

//��ȡԪ����Դ��ڵĴ�ֱλ��
function getElementViewTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actualTop += current. offsetTop;
        current = current.offsetParent;
    }
    if (document.compatMode == "BackCompat"){
        var elementScrollTop=document.body.scrollTop;
    } else {
        var elementScrollTop=document.documentElement.scrollTop;
    }
    return actualTop-elementScrollTop;
}

// ��ȡdom�������������ڵ�λ�ã�����һ������{x, y}
function getPosition(element) {
    var position = {};
    if(element == undefined){
        return position;
    }
    if(element.getBoundingClientRect){
        var rect = element.getBoundingClientRect();
        position.x = rect.left;
        position.y = rect.top;
    }else{
        position.x = getElementViewLeft(element);
        position.y = getElementViewTop(element);
    }
    return position;
}
// your implement

//function $(selector) {
//    selector = trim(selector);
//    var all = document.querySelectorAll(selector);
//    if(all.length==1){
//        return all[0];
//    }
//    return all;
//}

function $(selector){
    selector = trim(selector);
    var selectors = selector.split(/\s+/);
    var idRegex = /^#\S+$/;   //�򻯵�idƥ��
    var tagRegex = /^\S+$/;    //�򻯵ı�ǩƥ��
    var classRegex = /^\.\S+$/; //�򻯵�classƥ��
    var attrRex = /^\[(\S+?)(=(\S+))?\]$/; //�򻯵�����ƥ��
    var resultNode = null;
    for(var i in selectors){
        var str = selectors[i];
        if(idRegex.test(str)){
            resultNode = document.getElementById(str.substring(1));
        }else if(classRegex.test(str)){
            var classEles = document.getElementsByClassName(str.substring(1));
            if(classEles.length == 0){
                return;
            }
            if(resultNode){
                for(var j in classEles){
                    if(classEles[j].parentNode == resultNode){
                        resultNode = classEles[j];
                        break;
                    }
                }
            }else{
                resultNode = classEles[0];
            }
        }else if(attrRex.test(str)){
            var re = attrRex.exec(str);
            var elements = document.getElementsByTagName('*');
            for(var j=0;j<elements.length; j++){
                var node = elements[j];
                if(node.hasAttribute(re[1])){
//                            console.log(re);
                    if(re[3]==undefined){
                        if(resultNode){
                            if(node.parentNode == resultNode)
                            {
                                resultNode = node;
                            }
                        }else{
                            resultNode = node;
                        }
                    }else if(node.getAttribute(re[1])==re[3]){
                        if(resultNode){
                            if(node.parentNode == resultNode)
                            {
                                resultNode = node;
                            }
                        }else{
                            resultNode = node;
                        }
                    }
                }

            }
        }else if(tagRegex.test(str)){
            var tags = document.getElementsByTagName(str);
            if( !tags || tags.length == 0){
                return null;
            }
            if(resultNode){
                for(var j in tags){
                    if(tags[j].parentNode == resultNode){
                        resultNode = tags[j];
                        break;
                    }
                }
            }else{
                resultNode = tags[0];
            }
        }
    }
    return resultNode;
}

// stop propagation
function stopPropagation(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

// cancel event
function cancelEvent(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
//get source object of event
function getSrcElement(event) {
    var srcEle;
    if (!event) {
        var event = window.event;
    }
    if (event.target) {
        srcEle = event.target;
    } else if (event.srcElement) {
        srcEle = event.srcElement;
    }
    return srcEle;
}

// ��һ��dom��һ�����event�¼�����Ӧ����Ӧ����Ϊlistener
function addEvent(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event, listener);
    }else{
        element.attachEvent("on"+event, listener);
    }
}

// �Ƴ�dom�������event�¼�����ʱִ��listener����Ӧ����listenerΪ��ʱ���Ƴ�������Ӧ����
function removeEvent(element, event, listener) {
    if(listener){
        if(document.removeEventListener){
            element.removeEventListener(event,listener,false)
        } else{
            element.detachEvent("on"+event, listener);
        }
    } else{
        //�滻ԭ���Ľڵ�
        var newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement,element);
    }
}

// ʵ�ֶ�click�¼��İ�
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// ʵ�ֶ��ڰ�Enter��ʱ���¼���
function addEnterEvent(element, listener) {
    var f = function (e) {
        if (e.keyCode != 13) {
            return;
        }
        listener(e);
    };
    addEvent(element, 'keyup', f);
}

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

// �ȼ�һЩ
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (e) {
        var srcEle = getSrcElement(e);
        if (srcEle.tagName.toLowerCase() == tag.toLowerCase()) {
            listener(e);
            e.stopPropagation();
        }
    });
}

$.delegate = delegateEvent;

// �ж��Ƿ�ΪIE�����������-1���߰汾��
function isIE() {
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var version = -1;
        var re = /MSIE ([\d\.]+);/;
        var result = navigator.userAgent.toUpperCase().match(re);
        return result[1];
    }
    return -1;
}

// ����cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + "=" + escape(cookieValue) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

// ��ȡcookieֵ
function getCookie(cookieName) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(cookieName + "=")
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
//transfer jsonObject to paramString
var parseParam = function (json, k) {
    var paramStr = "";
    each(json, function (value, key) {
        if (typeof value == 'object') {
            paramStr += "&" + parseParam(value, key);
        } else {
            if (k != undefined) {
                if (isArray(json)) {
                    paramStr += "&" + k + "[" + key + "]=" + encodeURIComponent(value);
                } else {
                    paramStr += "&" + k + "." + key + "=" + encodeURIComponent(value);
                }
            }
            else {
                paramStr += "&" + key + "=" + encodeURIComponent(value);
            }
        }
    });
    return paramStr.substr(1);
};

function ajax(url, options) {
    var xmlhttp;
    xmlhttp = null;
    if (window.XMLHttpRequest) {// code for IE7, Firefox, Mozilla, etc.
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {// code for IE5, IE6
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                options.onsuccess = options.onsuccess != undefined ? options.onsuccess(xmlhttp.responseText, xmlhttp) : null;
            } else {
                options.onfail = options.onfail != undefined ? options.onfail(xmlhttp.statusText, xmlhttp.status, xmlhttp) : null;
            }
        };
        var params;
        if (options.data != undefined || typeof options.data == 'object') {
            params = parseParam(options.data);
        }
        options.type = options.type == undefined ? "GET" : options.type;
        switch (options.type.toLowerCase()) {
            case 'get':
                console.log(params);
                if (params != undefined) {
                    url = url + "?" + params;
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
                break;
            case 'post':
                xmlhttp.open("POST", url, true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.send(params);
                break;
        }

    }
    else {
        console.log("Your browser does not support XMLHTTP.");
    }
}

$.showErrorTip = function (element, str) {
    if (element.previousSibling == undefined || element.previousSibling.className != 'errorTip') {
        var ele = document.createElement("div");
        ele.innerHTML = str;
        ele.style.color = '#ff0000';
        ele.className = 'errorTip';
        element.parentNode.insertBefore(ele, element);
    }
};
$.hiddenErrorTip = function (element) {
    if (element.previousSibling != undefined && element.previousSibling.className == 'errorTip') {
        element.parentNode.removeChild(element.previousSibling);
    }
};





