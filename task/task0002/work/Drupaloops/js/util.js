/****************************2******************************************/
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return arr instanceof(Array);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof(fn)=="function";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var result=src.constructor===Array?[]:{};
    for(var i in src)
        if(src.hasOwnProperty(i))
            result[i]=typeof(src[i])==="object"?cloneObject(src[i]):src[i];
    return result;
}


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    if(isArray(arr)){
        var result=cloneObject(arr);
        for(var i=0;i<result.length;i++)
            for(var j=i+1;j<result.length;j++)
                if(result[i]==result[j]){
                    result[j]=result[j-1];
                    result.length--;
                }
        return result;
    }
    else{
        throw new TypeError();
    }
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    for (var i = 0; i<str.length; i++)
        if(str.charAt(i)!=' '&&str.charAt(i)!='\t')
            break;
    str=str.substring(i,str.length-1);
    for(var j=str.length-1;j>0;j--)
        if(str.charAt(j)!=' '&&str.charAt(j)!='\t')
            break;
    str=str.substring(0,j+1);
    return str;
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目

function trim(str) {
    for (var i = 0; i<str.length; i++)
        if(str.charAt(i)!=' '&&str.charAt(i)!=' '&&str.charAt(i)!='\t')
            break;
    str=str.substring(i,str.length-1);
    for(var j=str.length-1;j>0;j--)
        if(str.charAt(j)!=' '&&str.charAt(j)!=' '&&str.charAt(j)!='\t')
            break;
    str=str.substring(0,j+1);
    return str;
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    if(isArray(arr)){
        for(var i=0;i<arr.length;i++)
            fn.call(this,arr[i],i);
    }
    else{
        throw new TypeError();
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count=0;
    for(var i in obj)
        count++;
    return count;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg=/^1[3|4|5|8]\d{9}$/;
    return reg.test(phone);
}
/****************************************3********************************************/
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(!element)
        return;
    var tmpClassName=element.className;
    if(!tmpClassName){
        element.className=newClassName;
        return;
    }
    if(tmpClassName==newClassName||tmpClassName.match(new RegExp("(^|\\s)"+newClassName+"\\s|$")))
        return;
    element.className=element.className+" "+newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if(!element)
        return;
    var tmpClassName=element.className;
    if(!tmpClassName)
        return;
    if(tmpClassName==newClassName){
        element.className="";
        return;
    }
    if(tmpClassName.match(new RegExp("(^|\\s)"+oldClassName+"(\\s|$)")))
        element.className=tmpClassName.replace(RegExp("(^|\\s)"+oldClassName+"(\\s|$)")," ");
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var nodeList = element.parentNode.childNodes;
    for (var i = 0; i < nodeList.length; i++)
        if(nodeList[i] == siblingNode)
            return true;
    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x= 0,y=0;
    while(element!=null){
        x+=element.offsetLeft;
        y+=element.offsetTop;
        element=element.offsetParent;
    }
    return {x:x,y:y};
}

// 实现一个简单的Query
function hasClass(element,className){
    if(!element){
        return;
    }
    var elementClass = element.className;
    if(!elementClass){
        return false;
    }
    var classList = elementClass.split(/\s+/),
        key = 0;
    for(key in classList) {
        if(classList[key] == className) {
            return true;
        }
    }
    return false;
}

var $ = function (selector) {
    selector = trim(selector);
    var arr = [];
    var ret;//最后返回的内容
    var temp;//存放上级选择器的选择后的内容
    arr = selector.split(/\s+/);
    var _retList = [];//缓存结果

    var _findClass = function (dom,className) {
        if(hasClass(dom,className)){
            _retList.push(dom)
        }
        if(dom.childNodes){
            each(dom.childNodes, function (child,index) {
                _findClass(child,className);
            })
        }
    };

    var _findAttr = function (dom,attr,value) {
        if(value){
            if(dom&&dom.getAttribute){
                if(dom.getAttribute(attr)==value){
                    _retList.push(dom);
                }
            }
        }
        else{
            if(dom&&dom.hasAttribute){
                if(dom.hasAttribute(attr)){
                    _retList.push(dom);
                }
            }
        }
        if(dom.childNodes){
            each(dom.childNodes, function (child,index) {
                _findAttr(child,attr,value);
            })
        }

        return _retList;
    };

    var _$ = function(item,index){
        var checkId = item.match(/#(\S+)/);
        var checkClass= item.match(/\.(\S+)/);
        var checkAttr= item.match(/\[(\S+)\]/);
        var body = document.body;
        //处理id选择器
        if(checkId){
            temp = document.getElementById(checkId[1]);
        }
        //处理类选择器
        if(checkClass){
            if(temp){
                if(isArray(temp)){
                    each(temp, function (value,index) {
                        _findClass(value,checkClass[1]);
                    });
                    temp = _retList;
                    _retList = [];
                }
                else{
                    _findClass(temp,checkClass[1]);
                    temp = _retList;
                    _retList = [];
                }
            }
            else{
                _findClass(body,checkClass[1]);
                temp = _retList;
                _retList = [];
            }
        }
        //处理熟悉选择器
        if(checkAttr){
            var hasValue = checkAttr[1].match(/(.+)=(.+)/);
            var attr;
            var value;
            if(hasValue){
                attr = hasValue[1];
                value = hasValue[2];
            }
            else{
                attr = checkAttr[1];
                value =null;
            }
            if(temp){
                if(isArray(temp)){
                    each(temp, function (item,index) {
                        _findAttr(item,attr,value);
                    });
                    temp = _retList;
                    _retList = [];
                }
                else{
                    _findAttr(temp,attr,value);
                    temp = _retList;
                    _retList = [];
                }
            }
            else{
                _findAttr(body,attr,value);
                temp = _retList;
                _retList = [];
            }
        }
        //处理标签选择器
        if(!checkAttr&&!checkClass&&!checkId){
            if(temp){
                if(isArray(temp)){
                    each(temp, function (value, index) {
                        var tags = value.getElementsByTagName(item);
                        _retList.concat(tags);
                    })
                }
                else{
                    _retList = temp.getElementsByTagName(item);
                }
            }
            else{
                _retList = document.getElementsByTagName(item);
            }
            temp = _retList;
            _retList = [];
        }

        if(index==arr.length-1){
            ret = temp;
        }
    };

    each(arr,_$);
    if(ret&&ret.length==1||ret&&ret.length==0){
        return ret[0];
    }
    return ret;

};

/********************************************4*****************************************/
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event.type,listener,false);
    }else if(element.attachEvent) {
        element.attachEvent('on'+event.type,listener);
    }else {
        element['on'+event.type]=listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener){
        element.removeEventListener(event.type,listener,false);
    }else if(element.detachEvent) {
        element.detachEvent('on'+event.type,listener);
    }else {
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

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    var str = document.getElementById(selector.slice(1)).getElementsByTagName(tag);
    for (var i = 0; i < str.length; i++) {
        if (str[i].addEventListener) {
            str[i].addEventListener(event, listener, false);
        } else if (str[i].attachEvent) {
            str[i].attachEvent("on" + event, listener);
        } else {
            str[i]["on" + event] = listener;
        }
    }
}

$.delegate = delegateEvent;

$.on = function(selector, event, listener) {
    if (selector.addEventListener) {
        selector.addEventListener(event, listener, false);
    } else if (selector.attachEvent) {
        selector.attachEvent("on" + event, listener);
    } else {
        selector["on" + event] = listener;
    }
};

$.click = function(selector, listener) {
    if (selector.addEventListener) {
        selector.addEventListener("click", listener, false);
    } else if (selector.attachEvent) {
        selector.attachEvent("onclick", listener);
    } else {
        selector["onclick"] = listener;
    }
};

$.un = function(selector, event, listener) {
    if (selector.removeEventListener) {
        selector.removeEventListener(event, listener, false);
    } else if (selector.detachEvent) {
        selector.detachEvent("un" + event, listener);
    } else {
        selector["un" + event] = null;
    }
};

$.delegate = function(selector, tag, event, listener) {
    var str = document.getElementById(selector.slice(1)).getElementsByTagName(tag);
    for (var i = 0; i < str.length; i++) {
        if (str[i].addEventListener) {
            str[i].addEventListener(event, listener, false);
        } else if (str[i].attachEvent) {
            str[i].attachEvent("on" + event, listener);
        } else {
            str[i]["on" + event] = listener;
        }
    }
};


/********************************5*********************************/
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var name=navigator.appName;
    var ie="Microsoft Internet Explorer";
    if(name==ie)
        return navigator.appVersion;
    else
        return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=cookieName+ "=" +escape(cookieValue)+((expiredays==null)?"":"; expires="+exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
    if (document.cookie.length>0) {
        c_start=document.cookie.indexOf(cookieName + "=");
        if (c_start!=-1) {
            c_start=c_start + cookieName.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1)
                c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
/***************************6************************************************************/
//ajax
function createXHR() {
    if (XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        return false;
    }
}
function ajax(url, options) {
    var xhr=createXHR();
    var type = options.type?options.type:"get";
    var data = options.data?options.data:"";
    var onsuccess = options.onsuccess;
    var onfail = options.onfail;
    xhr.open(type,url,true);
    xhr.onreadystatechange=function() {
        if (xhr.readyState==4) {
            var s = xhr.status;
            if (s >= 200 && s < 300) {
                onsuccess(xhr.responseText,xhr);
            }
            else{
                onfail(xhr.responseText,xhr);
            }
        }
    };
    xhr.send();
}
