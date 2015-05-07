// JavaScript Document
// 判断arr是否为一个数组，返回一个bool值

function isArray(arr) {
    return arr instanceof Array;

}

// 判断fn是否为一个函数，返回一个bool值

function isFunction(fn) {
    return typeof fn === 'function';

}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等

function cloneObject(src) {
    var buf;
    if (src instanceof Array) {
        buf = [];
        //创建一个空的数组 
        var i = src.length;
        while (i--) {
            buf[i] = cloneObject(src[i]);

        }
        return buf;

    } else if (src instanceof Object) {
        buf = {};
        //创建一个空对象 
        for (var k in src) {
            //为这个对象添加新的属性 
            buf[k] = cloneObject(src[k]);

        }
        return buf;

    } else {
        return src;

    }

}

function uniqArray(arr) {
    var n = {},
        r = [];
    //n为hash表，r为临时数组
    for (var i = 0; i < arr.length; i++)
    //遍历当前数组
    {
        if (!n[arr[i]])
        //如果hash表中没有当前项
        {
            n[arr[i]] = true;
            //存入hash表
            r.push(arr[i]);
            //把当前数组的当前项push到临时数组里面
        }

    }
    return r;

}

function rpchar(index, character, str) {
    return str.substr(0, index) + character + str.substr(index + character.length);

}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现

function trim(str) {
    var space = " \t\n\r";
    var start, end;
    var done = 0;
    for (var i = 0; i < str.length && done !== 1; i++) {
        if (space.indexOf(str[i]) !== -1) {
            start = i;

        } else {
            done = 1;

        }

    }

    done = 0;
    for (i = str.length - 1; i >= 0 && done !== 1; i--) {
        if (space.indexOf(str[i]) !== -1) {
            end = i;

        } else {
            done = 1;

        }


    }

    str = str.substring(start + 1, end);

    return str;

}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递

function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);

    }

}

// 获取一个对象里面第一层元素的数量，返回一个整数

function getObjectLength(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;

        }

    }
    return size;

}

// 判断是否为邮箱地址

function isEmail(emailStr) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(emailStr)) return true;
    else return false;

}

// 判断是否为手机号

function isMobilePhone(phone) {
    var filter = /^0?1[3|4|5|8][0-9]\d{8}$/;
    if (filter.test(phone)) return true;
    else return false;

}


// 检测是否存在样式

function hasClass(element, testClassName) {
    if (element.classList) {
        return element.classList.contains(testClassName);
    } else {
        var oldClassName = element.className;
        var regex = new RegExp("\\b" + testClassName + "\\b", "g");
        return regex.test(oldClassName);
    }
}



// 为element增加一个样式名为newClassName的新样式

function addClass(element, newClassName) {
    if (!element.className) {
        element.className = newClassName;

    } else {
        var newClass = element.className;
        newClass += " ";
        newClass += newClassName;
        element.className = newClass;

    }

}

// 移除element中的样式oldClassName

function removeClass(element, oldClassName) {
    if ((element.className) && (element.className.indexOf(oldClassName) !== -1)) {
        element.className = element.className.replace(oldClassName, "");
        window.alert(element.className);

    }

}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值

function isSiblingNode(element, siblingNode) {

    if (element.parentNode === siblingNode.parentNode) {
        return true;

    }
    return false;

}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}

function getPosition(element) {
    var left = element.offsetLeft;
    var temp = element.offsetParent;
    var top = element.offsetTop;
    var elementScrollLeft;
    var elementScrollTop;
    while (temp !== null) {
        left += temp.offsetLeft;
        top += temp.offsetTop;
        temp = temp.offsetParent;
    }
    if (document.compatMode === 'BackCompat') {
        elementScrollLeft = document.body.scrollLeft;
        elementScrollTop = document.body.scrollTop;
    } else {
        elementScrollLeft = document.documentElement.scrollLeft;
        elementScrollTop = document.documentElement.scrollTop;
    }
    var obj = {};
    obj.x = left - elementScrollLeft;
    obj.y = top - elementScrollTop;
    return obj;

}


// 实现一个简单的Query,只返回一个元素

function $(selector, context) {
    selector = trim(selector);
    var arr = [];
    var ret; //最后返回的内容
    var temp; //存放上级选择器的选择后的内容
    arr = selector.split(/\s+/);
    var _retList = []; //缓存结果

    var _findClass = function(dom, className) {
        if (hasClass(dom, className)) {
            _retList.push(dom);
        }
        if (dom.childNodes) {
            each(dom.childNodes, function(child, index) {
                _findClass(child, className);
            });
        }
    };

    var _findAttr = function(dom, attr, value) {
        if (value) {
            if (dom && dom.getAttribute) {
                if (dom.getAttribute(attr) === value) {
                    _retList.push(dom);
                }
            }
        } else {
            if (dom && dom.hasAttribute) {
                if (dom.hasAttribute(attr)) {
                    _retList.push(dom);
                }
            }
        }
        if (dom.childNodes) {
            each(dom.childNodes, function(child, index) {
                _findAttr(child, attr, value);
            });
        }

        return _retList;
    };

    var _$ = function(item, index) {
        var checkId = item.match(/#(\S+)/);
        var checkClass = item.match(/\.(\S+)/);
        var checkAttr = item.match(/\[(\S+)\]/);
        var body = document.body;
        //处理id选择器
        if (checkId) {
            temp = document.getElementById(checkId[1]);
        }
        //处理类选择器
        if (checkClass) {
            if (temp) {
                if (isArray(temp)) {
                    each(temp, function(value, index) {
                        _findClass(value, checkClass[1]);
                    });
                    temp = _retList;
                    _retList = [];
                } else {
                    _findClass(temp, checkClass[1]);
                    temp = _retList;
                    _retList = [];
                }
            } else {
                _findClass(body, checkClass[1]);
                temp = _retList;
                _retList = [];
            }
        }
        //处理熟悉选择器
        if (checkAttr) {
            var hasValue = checkAttr[1].match(/(.+)=(.+)/);
            var attr;
            var value;
            if (hasValue) {
                attr = hasValue[1];
                value = hasValue[2];
            } else {
                attr = checkAttr[1];
                value = null;
            }
            if (temp) {
                if (isArray(temp)) {
                    each(temp, function(item, index) {
                        _findAttr(item, attr, value);
                    });
                    temp = _retList;
                    _retList = [];
                } else {
                    _findAttr(temp, attr, value);
                    temp = _retList;
                    _retList = [];
                }
            } else {
                _findAttr(body, attr, value);
                temp = _retList;
                _retList = [];
            }
        }
        //处理标签选择器
        if (!checkAttr && !checkClass && !checkId) {
            if (temp) {
                if (isArray(temp)) {
                    each(temp, function(value, index) {
                        var tags = value.getElementsByTagName(item);
                        _retList.concat(tags);
                    });
                } else {
                    _retList = temp.getElementsByTagName(item);
                }
            } else {
                _retList = document.getElementsByTagName(item);
            }
            temp = _retList;
            _retList = [];
        }

        if (index === arr.length - 1) {
            ret = temp;
        }
    };

    each(arr, _$);
    if (ret && ret.length === 1 || ret && ret.length === 0) {
        return ret[0];
    }
    return ret;

}

/*************

本来希望靠indexof检测 .#[]这些符号来进行操作判断，然后通过正则表达式提取出对应的单词来进行处理的，但是高了很久也没有研究出怎么在
“.aaa bbb”这个字符串中只提取出bbb，而不提取aaa。用\b(\w*)\b这个表达式地话它不但提取aaa，连.bbb它也会提取。

// 实现一个简单的Query
function $(selector) {
    var finalobj=null;
    var allElements = document.getElementsByTagName('*');
    
    if ((selector.indexOf('#') != -1)) {
        var result = selector.match(/#(\w*)\b/);
        finalobj = document.getElementById(result[1]);
    }

    // [data]
    if ((selector.indexOf('[') != -1)) {
        var result = selector.match(/\[(.*)\]/);
        var attribute = result[1];
        var matchingElements;
        if(finalobj!==null)
        {
            allElements = finalobj.getElementsByTagName('*');
        }
        for (var i = 0,
        n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute(attribute) !== null) {
                // Element exists with attribute. Add to array.
                finalobj = allElements[i];
                break;
                //console.log(finalobj);
            }
        }
    }
    
    
     // tagname
    if (1) {
        var result = selector.match(/[\s|^](\b\w*\b)/);
        console.log(result);
        var tagname = result[1];
        if(finalobj!==null)
        {
            allElements = finalobj.getElementsByTagName(tagname);
            return allElements[0];
        }
        else
        {
            allElements = document.getElementsByTagName(tagname);
            return allElements[0];
        }

    }
    
    

    
            
   return finalobj;
}

**/ ///////////////////////////



/**
function $(selector) {
    var opname = selector.split(" ");
    var finalobj = document.getElementsByTagName('*');

    if ((selector.indexOf('#') != -1)) {
            var result = selector.match(/#(\w*)\b/);
            finalobj = document.getElementById(result[1]);
            console.log(finalobj);
    }

    for (var i = 0; i < opname.length; i++) {

        // [data]
        if ((opname[i].indexOf('[') != -1)) {

            var match = [];
            var temp = trim(opname[i]);
            temp = temp.substring(1, temp.length - 1)
            temp = temp.split("=");
            var attr = temp[0];
            var value = temp[1];
            for (var ii = 0, ln = finalobj.length; ii < ln; ii++) {
                if (finalobj[ii].hasAttribute(attr)) {
                    if (value) {
                        if (finalobj[ii].getAttribute(attr) === value) {
                            match.push(finalobj[ii]);
                        }
                    } else { // Else, simply push it
                        match.push(finalobj[ii]);
                    }
                }
            }
            finalobj = match;
        }

    }
    console.log(finalobj[0]);
    //console.log(opname[i]);
    return (finalobj);

}
**/ ////////////////////////////////////////////////



// 给一个element绑定一个针对event事件的响应，响应函数为listener

function addEvent(element, event, listener) {
    var handlerlist = element.handlerlist || (element.handlerlist = {});
    if (element.addEventListener) {
        element.addEventListener(event, listener);
        handlerlist[(new Date().getTime()) * Math.random()] = listener;
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
        handlerlist[(new Date().getTime()) * Math.random()] = listener;
    } else {
        element["on" + event] = listener;
    }
}


// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数

function removeEvent(element, event, listener) {
    var handlerlist;
    if (element.removeEventListener) {

        if (listener)
            element.removeEventListener(event, listener);
        else if (element.handlerlist) {
            handlerlist = element.handlerlist;
            for (var handeler in handlerlist) {
                element.removeEventListener(event, handlerlist[handeler]);
            }

        } else {
            return;
        }
    } else if (element.detachEvent) {
        if (listener)
            element.detachEvent("on" + event, listener);
        else if (element.handlerlist) {
            handlerlist = element.handlerlist;
            for (var handelerobj in handlerlist) {
                element.detachEvent("on" + event, handlerlist[handelerobj]);
            }
        } else {
            return;
        }
    }
}


// 实现对click事件的绑定

function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定

function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code === 13) {
            listener.call(element, e);
        }
    });
}



// 先简单一些

function delegateEvent(element, tag, eventName, listener) {
    $.on(element, eventName, function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() === tag) {
            listener();
        }
    });
}

$.on = function(selector, event, listener) {
    var element;
    if (typeof selector === "string") {
        element = $(selector);
    } else if (typeof selector === "object") {
        element = selector;
    }
    addEvent(element, event, listener);
};

$.un = function(selector, event, listener) {
    var element;
    if (typeof selector === "string") {
        element = $(selector);
    } else if (typeof selector === "object") {
        element = selector;
    }
    removeEvent(element, event, listener);
};

$.click = function(selector, listener) {
    var element;
    if (typeof selector === "string") {
        element = $(selector);
    } else if (typeof selector === "object") {
        element = selector;
    }
    addClickEvent(element, listener);
};

$.delegate = delegateEvent;

function isIE() {
    var brinfor = navigator.userAgent;
    if (brinfor.indexOf("MSIE") > 0) {
        var matches = /trident\/([\d+\.]+)/.exec(brinfor);
        if (matches.length > 0) {
            return matches[1];
        } else
            return -1;
    }
}

function setCookie(cookieName, cookieValue, expiredays) {
    var time = new Date();
    time.setTime(time.getTime() + expiredays * 24 * 60 * 60 * 1000);
    document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + time.toGMTString();
}

function getCookie(cookieName) {
    if (document.cookie.length > 0) {
        var begin = document.cookie.indexOf(cookieName + "=");
        if (begin !== -1) {
            begin += cookieName.length + 1;
            var end = document.cookie.indexOf(";", begin);
            if (end === -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return null;
}

function ajax(url, options) {

    var uridata = '',
        data = options.data || '',
        type = options.type || 'get',
        sucfunc = options.onsuccess,
        failfunc = options.onfail;

    var request = null;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (typeof(data) === 'object') {
        for (var op in data) {
            uridata = uridata + op + '=' + data[op] + '&';
        }
        uridata = uridata.substr(0, uridata.length - 1);
    } else {
        uridata = data;
    }

    if (type.toLowerCase() === 'get') {
        request.open('get', url + '?' + uridata, true);
        console.log(url + '?' + uridata);
        request.send();
    } else {
        request.open('post', url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(uridata);
    }

    request.onreadystatechange = function() {
        if (request.readystate === 4) {
            var result = request.status;
            if (result === 200) {
                sucfunc(request.responseText,request);
            } else {
                alert("error code" + result);
                failfunc(request.responseText,request);
            }
        }
    };


}


window.onload = function() {

ajax(
    'http://localhost:8080/server/ajaxtest', 
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


};