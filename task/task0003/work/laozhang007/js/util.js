//2. JavaScript数据类型及语言基础
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr).slice(8, -1) === 'Array';
}
//判断date是否为一个日期对象，返回一个bool值
function isDate(date){
    return Object.prototype.toString.call(date).slice(8,-1) === "Date";
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn === 'function';
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var ret;
    var i, len,p;
    if (isArray(src)) {
        ret = [];        
        for (i = 0, len = src.length; i < len; i++) {
            if (typeof src[i] === 'object') {
                ret[i] = cloneObject(src[i]);
            }else{
                ret[i] = src[i];
            }
        }
        return ret;
    }else if(isDate(src)){
        return new Date(src.getTime());
    }else if(typeof src === 'object'){
        ret = {};
        for(p in src){
            if(src.hasOwnProperty(p)){
                ret[p] = cloneObject(src[p]);                
            }
        }
        return ret;
    }else{
        return src;
    }    
}
//增加； 类似ES5 Function.prototype.bind功能
function bind(obj,fn){
  return function(){
    fn.apply(obj,arguments);
  }
}
//增加： 扩展对象
function extend(src){
  var objArr = [].slice.call(arguments,1);
  for(var i = 0,p, len = objArr.length; i < len; i++){
    for(p in objArr[i]){
      if(objArr[i].hasOwnProperty(p) && typeof src[p] === 'undefined'){
        src[p] = objArr[i][p];
      }
    }
  }
  return src;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var map = {};
    var retArr = [];
    var len = arr.length,i;
    for(i = 0; i < len; i++){
        if(typeof map[arr[i]] === 'undefined'){
            retArr.push(arr[i]);
            map[arr[i]] = 1;
        }
    }
    return retArr;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    var arr = str.split('');
    var len = arr.length;
    var s = '';
    var start,end;
    for(var i = 0; i < len; i++){
        if(+arr[i] !== 0 && arr[i] !== '0'){
            start = i;
            break;
        }
    }
    for(i = len - 1; i >= 0; i--){
        if(+arr[i] !== 0 && arr[i] !== '0'){
            end = i;
            break;
        }
    }
    for(i = start; i <= end; i++){
        s += arr[i];
    }
    return s;
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    if(arr.forEach && arr.forEach === Array.prototype.forEach){
        arr.forEach(function(item,index){
            fn.call(null,item,index);
        });
    }else{
        var len = arr.length,i;
        for(i = 0; i < len; i++){
            fn.call(null,arr[i],i);
        }
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    for(var p in obj){
        if(obj.hasOwnProperty(p)){
            count ++;
        }
    }
    return count;
}
//增加：返回某元素在一个数组中的位置，若不存在则返回-1；类似ES5中Array.prototype.indexOf
function indexOf(arr,item,startIndex){
    var len = arr.length,i;
    for(i = startIndex | 0; i < len; i++){
        if(item === arr[i]){
            return i;
        }
    }
    return -1;
}

//增加：移除数组中指定的元素，返回被成功移除的元素数组
function removeFromArray(arr,removeItems){
    var removedItems = [];
    each(removeItems,function(item,index){
        var i = indexOf(arr,item);
        if(i > -1){            
            arr.splice(i,1);
            removedItems.push(item);
        }
    });
    return removedItems;
}

//增加：根据指定函数，过滤数组中的元素，对于数组中的每个元素，fn返回true则移除；返回被移除的元素
function filterArray(arr,fn){
    var removeItems = [];
    each(arr,function(item,index){
        if(fn.call(null,item) === true){
            removeItems.push(item);
        }
    });    
    return removeFromArray(arr,removeItems);
}

// 判断是否为邮箱地址
// 参考 http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
function isEmail(emailStr) {
    if(typeof emailStr !== 'string'){
        return false;
    }
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    if(typeof phone !== 'string'){
        return false;
    }
    var reg = /^1\d{10}$/;
    return reg.test(phone);
}

//3.DOM

function hide(){
    var element;
    if(arguments.length === 1){
        element = arguments[0];
        element.style.display = "none";
    }else if(arguments.length > 1){
        for(var i = 0,len = arguments.length; i < len; i ++){
            element = arguments[i];
            element.style.display = "none";
        }
    }
}
function show(){
    var element;
    if(arguments.length === 1){
        element = arguments[0];
        element.style.display = "";
    }else if(arguments.length > 1){
        for(var i = 0,len = arguments.length; i < len; i ++){
            element = arguments[i];
            element.style.display = "";
        }
    }
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var classStr = element.className;
    var newClassArr;
    if(classStr.indexOf(newClassName) >= 0){
        return false;
    }else{
         newClassArr = classStr.split(/\s+/);
         newClassArr.push(newClassName);
         element.className = newClassArr.join(' ');
    }
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    var oldClassArr = element.className.split(/\s+/);
    removeFromArray(oldClassArr,[oldClassName]);
    element.className = oldClassArr.join(' ');
}

function toggleClass(element,className){
    if(element.className.indexOf(className) >= 0){
        removeClass(element,className);
    }else{
        addClass(element,className);
    }
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if(element.nodeType !== 1 && element.nodeType !== 3 || siblingNode.nodeType !== 1 && siblingNode.nodeType !== 3){
        return false;
    }
    return element.parentNode === siblingNode.parentNode;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var position = {x:0,y:0};
    var origin = element,e;
    for(e = element; e != null; e = e.offsetParent){
        position.x += e.offsetLeft;
        position.y += e.offsetTop;
    }
    for(e = element.parentNode; e != null && e.nodeType === 1; e = e.parentNode){
        position.x -= e.scrollLeft;
        position.y -= e.scrollTop;
    }
    return position;
}
//增加：通过类名查找元素，返回符合条件的元素数组
function getElementsByClassName(root,className){
  var ret = [];
  var _allElements = root.getElementsByTagName('*');
  for(i = 0; i < _allElements.length; i++){
      _element = _allElements[i];
      if(_element.className.indexOf(className) >= 0){
          ret.push(_element);
      }
  }
  return ret;
}

function _$(root,selector){
    var i;
    var _element;
    if(selector.indexOf('#') == 0){
        var _id = /#(.+)/.exec(selector)[1];
        return root.getElementById(_id);
    }
    else if(/^\w+$/.test(selector)){
        return root.getElementsByTagName(selector)[0];
    }
    else{        
        if(selector.indexOf('.') == 0){
            var _allElements = root.getElementsByTagName('*');
            var _class = /\.(.+)/.exec(selector)[1];
            for(i = 0; i < _allElements.length; i++){
                _element = _allElements[i];
                if(_element.className.indexOf(_class) >= 0){
                    return _element;
                }
            }
        }
        var _data = /^\[(.+)\]$/.exec(selector);
        if(_data && _data.length && _data.length > 1){
            _data = _data[1];
            var _dataArr = _data.split('=');
            var _name = _dataArr[0];
            var _value = _dataArr.length === 2 ? _dataArr[1] || '' : '';
            var _allElements = root.getElementsByTagName('*');            
            for(i = 0; i < _allElements.length; i++){
                _element = _allElements[i];
                if((_value !== '' &&  _element.getAttribute(_name) === _value) || (_value === '' && _element.getAttribute(_name) !== null)){
                    return _element;
                }
            }
        }
    }    
}
// 实现一个简单的Query，返回符合条件的一个元素
function $(selector,_root) {
    var root = _root || (typeof document === 'undefined' ? null : document);
    if(!root) return null;
    var result = null;
    var arr = selector.split(' ');
    var len = arr.length,i;
    var subSelector;
    for(i = 0; i < len; i++){
        subSelector = arr[i];
        result = _$(root,subSelector);
        root = result;
    }
    return result;
}


// 给一个dom绑定一个针对event事件的响应，响应函数为listener
/*
function addEvent(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    }else if(element.attachEvent){
        element.attachEvent('on' + event,listener);
    }else{
        element['on' + event] = listener;
    }
}
*/
//修改后的事件处理方法
function addEvent(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event,function(e){
            var target = e.target;
            listener.call(target,e);
        },false);
    }else if(element.attachEvent){
        element.attachEvent('on' + event,function(){
            var event = window.event;
            var target = event.srcElement;
            listener.call(target,event);
        });
    }else{
        element['on' + event] = listener;
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,'click',listener);
}
// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,'keydown',function(e){
        //var event = e || window.event;
        var key = e.keyCode;
        if(key === 13){
            listener.call(e);
        }
    });
}

function preventDefault(e){
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}
function stopPropagation(e){
    if(e.stopPropagation){
        event.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}
function getTarget(e){
    return e.target || e.srcElement;
}
//接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$['on'] = addEvent;
$['un'] = function(element,event,listener){
    if(element.removeEventListener){
        element.removeEventListener(event,listener,false);
    }else if(element.detachEvent){
        element.detachEvent('on' + event,listener);
    }else{
        element['on' + event] = null;
    }
}
$['click'] = addClickEvent;
$['enter'] = addEnterEvent;
$['preventDefault'] = preventDefault;
$['stopPropagation'] = stopPropagation;
$['getTarget'] = getTarget;
// 事件代理
/*
function delegateEvent(element, tag, eventName, listener) {
    $.on(element,eventName,function(e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if(target.nodeName.toLowerCase() === tag){
            listener.call(null,event);
        }
    });
}
*/
function delegateEvent(element, tag, eventName, listener) {
    $.on(element,eventName,function(e){
        if(this.nodeName.toLowerCase() === tag){
            listener.call(this,e);
        }
    });
}
$.delegate = delegateEvent;

//5. BOM
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var userAgent = navigator.userAgent;
    var match = /MSIE ([^;]+)/.exec(userAgent);
    if(match !== null){
        return parseFloat(match[1]);
    }
    return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var setCookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue) + ';';
    if(isDate(expiredays)){
        setCookie += 'expires=' + expiredays.toGMTString() + ';';
    }
    document.cookie = setCookie;
}

// 删除cookie
function deleteCookie(cookieName){
    setCookie(cookieName,'',new Date(0));
}

// 获取cookie值
function getCookie(cookieName) {
    cookieName = encodeURIComponent(cookieName) + '=';
    var cookieValue = null;
    var cookie = document.cookie;
    var startIndex = cookie.indexOf(cookieName);
    if(startIndex >= 0){
        var endIndex = cookie.indexOf(';',startIndex + 1);
        if(endIndex == -1){
            endIndex = cookie.length;
            cookieValue = cookie.substring(startIndex + cookieName.length,endIndex);
        }
    }
    return cookieValue;
}

// 学习Ajax，并尝试自己封装一个Ajax方法
// options: data,onsuccess,timeout,method
function serialize(data){
    var args = [];
    for(var p in data){
        if(data.hasOwnProperty(p)){
            args.push(p + '=' + data[p]);
        }
    }
    return args.join('&');
}
function ajax(url, options) {
    var xhr = new XMLHttpRequest();
    var onsuccess = options.onsuccess || function(){}
    var method = options.method.toLocaleLowerCase() || 'get';
    var data = options.data || null;
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                onsuccess.call(null,xhr.responseText,xhr);
            }
        }
    }
    xhr.open(method,url,true);
    if(options.method.toLocaleLowerCase() === 'get'){
        xhr.send(null);
    }else{
        xhr.send(serialize(data));
    }
}








