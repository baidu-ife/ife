/**
 * Created by Zhi_LI on 2015/4/18.
 */

//Array.forEach implementation for IE support..
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

Array.prototype.unique= function () {
    var obj = {},
        res = [] ;
    this.forEach(function(v){
        if (!obj[v]) {
            obj[v] = true;
            res.push(v);
        }
    });
    return res ;
};
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    // your implement
    var  i,b=0,e=str.length;
    //去左空格
    for(i=0; i<str.length;i++){
        if(str.charAt(i)!=' '){
            b=i;
            break;
        }
        if(i==str.length) {
            return  "";
        }

    }

    //去右空格
    for(i=str.length-1;i>b;i--){
        if(str.charAt(i)!=' '){
            e=i;
            break;
        }
    }

    return  str.substring(b,e+1);
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    element.classList.add(newClassName);

}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    element.classList.remove(newClassName);

}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    eleParent = element.parentNode;
    sbParent = siblingNode.parentNode;
    return eleParent.isSameNode(sbParent);
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var eleViewLeft = getElementViewLeft(element);
    var eleViewTop = getElementViewTop(element);
    return {
        viewLeft: eleViewLeft,
        viewTop: eleViewTop
    };
    function getElementViewLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        var elementScrollLeft;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            elementScrollLeft = document.body.scrollLeft;
        } else {
            elementScrollLeft = document.documentElement.scrollLeft;
        }
        return actualLeft - elementScrollLeft;
    }

    function getElementViewTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        var elementScrollTop;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            elementScrollTop = document.body.scrollTop;
        } else {
            elementScrollTop = document.documentElement.scrollTop;
        }
        return actualTop - elementScrollTop;
    }

}




// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, eventName, listener) {
    // your implement
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false)
    }else if (element.attachEvent){
        element.attachEvent('on' + eventName, listener)
    }else{
        element.setAttribute('on' + eventName, listener);
    }

}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, eventName, listener) {
    // your implement
    console.log(listener);
    if (typeof(listener) ==  "undefined"){
        console.log(listener);
        //TODO
        if (element.removeEventListener)
            element.removeEventListener(eventName, false);
        else if (element.detachEvent)
            element.detachEvent("on" + eventName);
        else{
            element.setAttribute('on' + eventName, '');
        }
    }else{
        if (element.removeEventListener)
            element.removeEventListener(eventName, listener, false);
        else if (element.detachEvent)
            element.detachEvent("on" + eventName, listener);
        else{
            element.setAttribute('on' + eventName, '');
        }
    }
}

function ajax(url, options) {
    // your implement
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    var type,data;
    if (options.type) {
        type = options.type;
    }else {
        type = 'GET';
    }

    if (options.data) {
        data = options.data;
        var dataUrl = '?';
        for (ele in data){
            dataUrl = dataUrl + ele + '=' + data[ele] + '&';
        }
        dataUrl = dataUrl.substring(0,dataUrl.length-1);
        url = url + dataUrl;

    }else {
        console.log('no data');
    }
    console.log(url);

    var successFun;
    if (options.onsuccess) {
        successFun = options.onsuccess;
    }else {
        console.log('no success callback')
    }

    var failFun;
    if (options.onfail) {
        failFun = options.onfail;
    }else {
        console.log('no fail callback')
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            if (successFun){
                successFun(xmlhttp.responseText);
            }
        }else {
            if (failFun) {
                failFun();
            }
        }
    };
    xmlhttp.open(type,url,true);
    xmlhttp.send();
}



var $;
(function() {
    var MyQuery = function(selector) {
        if ( window == this ) return new $(selector);

        var elements = [];
        //console.log('hi');
        var classReg = /\.[\w-]*/g;
        var domReg = /\#[\w-]*/g;
        //var attrReg = /\[.*\]/g;
        //var tagReg =  /![\.\#]\w/g;

        var selClassList = selector.match(classReg);
        var selDomList =selector.match(domReg);
        //var selAttrList =selector.match(attrReg);
        //var selTagList =selector.match(tagReg);
        var eleNew = [];
        if (selDomList!=null && selDomList.length ==1 && selClassList!=null){
            var classSeletor = selClassList.join('');
            //console.log(classSeletor);
            elements = document.querySelectorAll(classSeletor);
            //console.log(elements);

            eleNew = [];
            for (i=0;i<elements.length; i++){
                if(elements[i].parentNode.hasAttribute('id')){
                    if (elements[i].parentNode.id == selDomList[0].replace('#','')) {
                        eleNew.push(elements[i]);
                        //console.log(elements[i]);
                    }
                }

            }
            elements = eleNew;
        }else {
            eleNew = [];
            elements = document.querySelectorAll(selector);
            for (i=0;i<elements.length; i++){
                eleNew.push(elements[i]);
            }
            elements = eleNew;
        }

        return this.setArray(elements);
    };

    MyQuery.prototype.setArray = function( arr ) {
        this.length = 0;
        [].push.apply( this, arr );
        return this;
    };

    MyQuery.fn = MyQuery.prototype;


//each
    MyQuery.fn.each = function(method){
        for(var i=0,l=this.length; i<l; i++){
            method.call(this[i],i);
        }
    };


    MyQuery.fn.on = function(eventName, listener){
        this.each(function(){
            addEvent(this, eventName,listener);
        });
    };

    MyQuery.fn.un = function(eventName, listener){
        this.each(function(){
            removeEvent(this, eventName,listener);
        });
    };

    MyQuery.fn.click = function(listener){
        this.each(function(){
            addEvent(this, 'click',listener);
        });
    };

    MyQuery.fn.enter = function(listener){
        this.each(function(){
            addEvent(this, 'enter',listener);
        });
    };

    MyQuery.fn.delegate = function(tag, eventName, listener){
        this.each(function(){
            addEvent(this, eventName,function(e){
                if(e.target && e.target.tagName == tag.toUpperCase()) {
                    listener(e);
                }
            });
        });
    };

    $ = MyQuery;
})();

////$().on = addEvent;
//$.un = removeEvent;
//$.click = function(element, listener){
//    addEvent(element,'click',listener);
//};
//$.enter = function(element, listener){
//    addEvent(element,'enter',listener);
//};
