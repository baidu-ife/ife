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
}

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
}