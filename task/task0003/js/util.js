function isArray(arr) {
	return arr instanceof Array;}

function isFunction(fn) {
	return typeof fn;}

//����Ŀ�����
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

//����ȥ��
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

//���ַ���ͷβ���пո��ַ���ȥ��
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

//�������飬����Ԫ��ִ��fn����
function each(arr, fn) {
	for(var i = 0;i < arr.length;i++) {
		fn(arr[i], i);
	}
}

//��ȡһ�����������һ��Ԫ�ص�����������һ������
function getObjectLength(obj) {
	var sum = 0;
	for(var i in obj) sum++;
	return sum;
}

//�ж��Ƿ�Ϊ�����ַ
function isEmail(emailStr) {
	var pattern = new RegExp("^[a-z]([a-z0-9]*_?[a-z0-9]+)+@[a-z0-9]+.com$", "gi");
	return pattern.test(emailStr);
}

//�ж��Ƿ�Ϊ�ֻ���
function isMobilePhone(phone) {
	var pattern = new RegExp("^1\\d{10}$", "g");
	return pattern.test(phone);
}

//3
// Ϊelement����һ����ʽ��ΪnewClassName������ʽ
function addClass(element, newClassName) {
	var classNames = element.className.split(/\s+/);
	classNames.push(newClassName);
	element.className = classNames.join(" ");

}

// �Ƴ�element�е���ʽoldClassName
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

// �ж�siblingNode��element�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
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

// ��ȡelement�������������ڵ�λ�ã�����һ������{x, y}
function getPosition(element) {
	var obj = new Object();
	obj.x = element.offsetLeft;
	obj.y = element.offsetTop;
	return obj;
}

//ʵ�ּ򵥵�Query
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

// ��һ��element��һ�����event�¼�����Ӧ����Ӧ����Ϊlistener
function addEvent(element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event, listener);
	} else {
		element["on" + type] = listener;
	}
}

// �Ƴ�element�������event�¼�����ʱִ��listener����Ӧ
function removeEvent(element, event, listener) {
	element.removeEventListener(event, listener, false);
}

// ʵ�ֶ�click�¼��İ�
function addClickEvent(element, listener) {
	element.addEventListener("click", listener, false);
}

// ʵ�ֶ��ڰ�Enter��ʱ���¼���
function addEnterEvent(element, listener) {
	element.addEventListener("keyup", function(event) {
		if(event.keyCode == 13) {
			listener();
		}
	}, false);
	
}
/*
// �ж��Ƿ�ΪIE�����������-1���߰汾��
function isIE() {
	if(!+[1,]) {
		return navigator.appVersion;
	}else
		return -1;
}

//����cookie
function setCookie(cookieName, cookieValue, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = cookieName + "=" + escape(value) +
		((expiredays == null) ? "" : "experires="+exdate.toGMTString());
}

//��ȡcookieֵ
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



