function isArray(arr) {
	return arr instanceof Array;}

function isFunction(fn) {
	return typeof fn;}

//复制目标对象
function cloneObject(src) {
	if(src == null) {
		return -1;
	} else {
		var test = src;
		var saver = new Object();
		for (var i in test) {
			if(typeof test[i] == "object") {
				saver[i] = cloneObject(test[i]);				
			}else {
				saver[i] = test[i];
			}
		}
		return saver;
	}
}

//数组去重
function uniqArray(arr) {
	var sum,
		saver = [];
	for(var i = 0;i < arr.length;i++){
		if(saver.length == 0) {
			saver[saver.length] = arr[i];
			continue;
		}else {
			for(var j = 0;j < saver.length;j++) {
				if(saver[j] == arr[i]) {
					break;
				}else if(j == (saver.length - 1)) {
					saver[saver.length] = arr[i];
					break;
				}
			}
		}
	}
	return saver;
}

//对字符串头尾进行空格字符的去除
function trim(str) {
	var saver = str.split(""),
		head = 0,
		foot = 0;
	for(var i = 0;i < saver.length;i++) {
		if(saver[i] == " ") {
			head++;
		}else {
			break;
		}
	}
	for(var j = saver.length-1;j >= 0;j--) {
		if(saver[j] == " ") {
			foot++;
		}else {
			break;
		}
	}
	saver.splice(0, head);
	saver.splice(saver.length-foot,foot);
	return saver.join("").toString();
}

//遍历数组，对于元素执行fn函数
function each(arr, fn) {
	for(var i = 0;i < arr.length;i++) {
		fn(arr[i], i);
	}
}

//获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var sum = 0;
	for(var i in obj) sum++;
	return sum;
}

//判断是否为邮箱地址
function isEmail(emailStr) {
	var pattern = new RegExp("^[a-z]([a-z0-9]*_?[a-z0-9]+)+@[a-z0-9]+.com$", "gi");
	return pattern.test(emailStr);
}

//判断是否为手机号
function isMobilePhone(phone) {
	var pattern = new RegExp("^1\\d{10}$", "g");
	return pattern.test(phone);
}

//3
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	var classNames = element.className.split(/\s+/);
	classNames.push(newClassName);
	element.className = classNames.join(" ");

}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
	var classNames = element.className.split(/\s+/);
	
	var num = -1;
	for(var i = 0,len = classNames.length;i < len;i++){
		if(classNames[i] == oldClassName) {
			num = i;
			break;	
		}
	}
	classNames.splice(num,1);
	element.className = classNames.join(" ");
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	var child = element.parentNode.childNodes;
	for(var i = 0;i < child.length;i++) {
		if(siblingNode == child[i]) {
			return true;
		}else if(i == child.length-1) {
			return false;
		}
	}
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	var obj = new Object();
	obj.x = element.offsetLeft;
	obj.y = element.offsetTop;
	return obj;
}

//实现简单的Query
function $(select) {
	if(/^#\w+$/.test(select)) {
		var arr = select.split("");
		arr.shift();
		var str = arr.join("");
		return document.getElementById(str);
	}else if(/^\w+$/.test(select)) {
		return document.getElementsByTagName(select)[0];
	}else if(/^\.\w+[-*\w+]*$/.test(select)) {
		var arr = select.split("");
		arr.shift();
		var str = arr.join("");
		return document.getElementsByClassName(str)[0];
	}else if(/^\[\w+-?\w+\]$/.test(select)) {
		var arr = select.split("");
		arr.shift();
		arr.pop();
		var str = arr.join(""),
			objs = document.getElementsByTagName("*");
		for(var i = 0;i < objs.length;i++) {
			if(objs[i].attributes[str]) {
				return objs[i];
			}
		}
		return -1;
	}else if(/^\[\w+-?\w+\]=\w+$/.test(select)) {
		var arr = select.split("="),
			attrValue = arr[1],
			objs = document.getElementsByTagName("*");
		var attr0 = arr[0].split("");
		attr0.shift();
		attr0.pop();
		var attrName = attr0.join("");
		for( var i = 0;i < objs.length;i++) {
			if(objs[i].attributes[attrName]) {
				if(objs[i].attributes[attrName].value == attrValue) {
					return objs[i];
				}
			}
		}
		return -1;
	}else if(/^#\w+\s\.\w+$/.test(select)) {
		var arr = select.split(" ");
		var arr0=arr[0].split("");
		arr0.shift();
		var idStr = arr0.join("");
		var arr1 = arr[1].split("");
		arr1.shift();
		var classStr = arr1.join("");
		return document.getElementById(idStr).getElementsByClassName(classStr)[0];
	}else {
		return -1;
	}
}
//4

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event, listener);
	} else {
		element["on" + type] = listener;
	}
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
	element.removeEventListener(event, listener, false);
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
	element.addEventListener("click", listener, false);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
	element.addEventListener("keyup", function(event) {
		if(event.keyCode == 13) {
			listener();
		}
	}, false);
	
}
/*
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	if(!+[1,]) {
		return navigator.appVersion;
	}else
		return -1;
}

//设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = cookieName + "=" + escape(value) +
		((expiredays == null) ? "" : "experires="+exdate.toGMTString());
}

//获取cookie值
function getCookie(cookieName) {
	if(document.cookie.length > 0) {
		c_start=document.cookie.indexOf(cookieName + "=")
		if (c_start!=-1){ 
			c_start=c_start + cookieName.length+1 ;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) 
				c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}
*/



