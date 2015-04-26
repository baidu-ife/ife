//**************task 2*******************
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Array.isArray(arr);
};

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    fn instanceof Function
};

function cloneHelper(src, obj) {
	if (typeof src == "number"
				|| typeof src == "string"
				|| typeof src == "boolean")
		return src;
	if (src instanceof Date)
		return new Date(src.getTime());
	if (src instanceof Array)
		return src.slice(0);
	if (src == {})
		return obj;
	var keys = Object.keys(src)
	for (var i = 0; i < keys.length; ++i) {
		var v = src[keys[i]];
		obj[keys[i]] = cloneHelper(v, {});
	}
	return obj;
};

function cloneObject(src) {
    return cloneHelper(src, {});
};

function uniqArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; ++i) {
    	if (result.indexOf(arr[i]) == -1)
    		result.push(arr[i]);
    }
    return result;
};

function trim(str) {
	while (str.indexOf(' ') != -1)
		str = str.replace(' ', '');//space
    while (str.indexOf('	') != -1)
    	str = str.replace('	',''); //tab
    return str;
};

function each(arr, fn) {
    for (i in arr)
    	fn(arr[i],i);
};

function getObjectLength(obj) {
	return Object.keys(obj).length;
};

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.match(/\w+@\w+.\w+/);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
}

//**************task 3*******************
// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	element.classList.add(newClassName);
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    element.classList.remove(oldClassName);
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

// 实现一个简单的Query
function $(selector) {
    return document.querySelectorAll(selector);
};
//**************task 4*******************
// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    element.addEventListener(event, listener);
};

// 例如：
function clickListener(event) {
    console.log(event);
};


// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    element.removeEventListener(event, listener);
};

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.addEventListener("click", listener);
};

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    var enterListener = function(e) {
        if (e.keyCode == "13")
            listener();
    };
    element.addEventListener("keypress", enterListener);
};

$.on = function(element, event, listener) {
    addEvent(element, event, listener);
};

$.un = function(element, event, listener) {
    removeEvent(element, event, listener);
};

$.click = function(element, listener) {
    addClickEvent(element, listener);
};

$.enter = function(element, listener) {
    addEnterEvent(element, listener);
};


function delegateEvent(element, tag, eventName, listener) {
    element.addEventListener(eventName, function(e){
        if (e.target && e.target.nodeName == tag) {
            listener();
        }
    });
};

$.delegate = function(selector, tag, event, listener) {
    delegateEvent($(selector), tag, event, listener);
}

//**************task 5*******************
function isIE() {
	if(navigator.appName.indexOf("Internet Explorer")!=-1){
		return  navigator.appVersion.replace("MSIE ", "");
	}
	return -1;
};

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
	var d = new Date();
    d.setTime(d.getTime() + (expiredays*24*60*60*1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + d.toUTCString();
};

// 获取cookie值
function getCookie(cookieName) {
    var name = cookieName + "=";
    var cookies = document.cookie.split(';');
    for(var i=0; i<cookies.length; i++) {
        var j = cookies[i].indexOf(name);
        if (j != -1)
        	return cookies[i].substring(j + name.length,cookies[i].length);
    }
    return "";
};
//**************task 6*******************
function ajax(url, options) {
    var xmlhttp=new XMLHttpRequest();
    var data = "";
    var method = "GET";
    if (options != null) {
        if (options.type != null)
            method = options.type;
        if (options.data != null) {
            if (typeof options.data == "string") {
                data = options.data;
            }
            else {
                var keys = Object.keys(options.data);
                data = keys[0]+"="+options.data[keys[0]];
            }
        }
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            options.onsucess();
        }
    };

    if (method == "GET") {
        if (data == "")
            xmlhttp.open(method, url, true);
        else
            xmlhttp.open(method, url+"?"+data, true);
        xmlhttp.send();
    }
    else if (method == "POST") {
        xmlhttp.open(method,url,true);
        if (data != "") {
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(data);
        }
        else {
            xmlhttp.send();
        }
    }
}