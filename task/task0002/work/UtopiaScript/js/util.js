// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    //return Array.isArray(arr);
    return Object.prototype.toString.call(arr) == "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) == "[object Function]";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
 function cloneObject(src) {
    var result, oClass=isClass(src);
    //确定result的类型
    if(oClass==="Object"){
        result={};
    }else if(oClass==="Array"){
        result=[];
    }else{
        return src;
    }
    for(key in src){
        var copy=src[key];
        if(isClass(copy)=="Object"){
            result[key]=arguments.callee(copy);//递归调用
        }else if(isClass(copy)=="Array"){
            result[key]=arguments.callee(copy);
        }else{
            result[key]=src[key];
        }
    }
    return result;
}

function isClass(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var newArray=new Array();
    var len=arr.length;
    for (var i=0;i<len ;i++){
        for(var j=i+1;j<len;j++){
            if(arr[i]===arr[j]){
                j=++i;
            }
        }
        newArray.push(arr[i]);
    }
    return newArray;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i=0; i<arr.length; i++){
        fn(arr[i], i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var ilength = 0;
    for(var i in obj){
      ilength++
    }
    return ilength;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^[0-9a-z_-]+@[a-z0-9]+\.[a-z]{2,4}$/;
    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg = /^\d{11}$/g;
    return reg.test(phone);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(element.className === null || element.className === ""){
        element.className = newClassName;
    }else{
        if (element.className.indexOf(newClassName) === -1) {
            element.className += " " + newClassName;
        }
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (element.className == "") {
        return false;
    }else {
        var allOldName = element.className;
        var newClassName = allOldName.replace(eval('/' + oldClassName + '/'), "").replace(/^\s+|\s+$/,"");
        element.className = newClassName;
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var left = element.offsetLeft;
    var top = element.offsetTop;
    var current = element.offsetParent;
    while (current != null) {
        left += current.offsetLeft;
        top += current.offsetTop;
    }
    if (document.compatMode == "BackCompat") {
        var eleScrollLeft = document.body.scrollLeft;
        var eleScrollTop = document.body.scrollTop;
    } else {
        var eleScrollLeft = document.documentElement.scrollLeft;
        var eleScrollTop = document.documentElement.scrollTop; 
    } 
    var obj = {
        x: left - eleScrollLeft,
        y: top - eleScrollTop
    };
    return obj;
}
    
// 实现一个简单的Query
function $(selector) {

    //$("#adom");
	reg=/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/;
	if(reg.test(selector)){
		var idname=selector.replace("#","");
		return document.getElementById(idname);
	}

    //$(".classa"); 
	reg=/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/;
	if(reg.test(selector)){
		var classname=selector.replace(".","");
		if(document.getElementsByClassName){
			return document.getElementsByClassName(classname);
		}else{
			var list=[];
			var all=document.all;
			for(var i=0;i<all.length;i++){
				if(all[i].getAttribute("class")!=null){
					all[i].getAttribute("class").split(" ").join("-");
					if(all[i].getAttribute("class").indexOf(classname)>=0){
                        list.push(all[i]);	
				    }
				}
			}
			return list;
		}
	}

    //$("a");
	reg=/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/;
	if(reg.test(selector)){
		return document.getElementsByTagName(selector);
	}
    
    //$("[data-log]");
    //$("[data-time=2015]"); 
	reg=/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/;
	var list=[];
	if(reg.test(selector)){
		var reg1=/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*\]/;
		if(reg1.test(selector)){
			var attr=selector.replace("\"","");
			attr=attr.replace("\[","");
			attr=attr.replace("\]","");
			var all=document.all;
			for(var i=0;i<all.length;i++){
				if(all[i].getAttribute(attr)){
					//console.log(attr);
					list.push(all[i]);
				}
			}
		}else{
			var attr=selector.replace("\"","");
			attr=attr.replace("\[","");
			attr=attr.replace("\]","");
			var strs=attr.split("=");
			attr=strs[0];
			//console.log(attr);
			var value=strs[strs.length-1];
			var all=document.all;
			for(var i=0;i<all.length;i++){
				if(all[i].getAttribute(attr)==value){
					//console.log(attr);
					list.push(all[i]);	
				}
			}
		}
		return list;
	}

    //$("#adom .classa");
    var reg=/#((?:[\w\u00c0-\uFFFF-]|\\.)+)\s+\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/;
	if(reg.test(selector)){
		var strs=selector.replace(" ","");
		strs=strs.split("\.");
		var idname=strs[0],classname=strs[1],ele=$(idname);
		var lis=$("."+classname),list=[];
		for(var i=0;i<lis.length;i++){
			if(lis[i].parentNode==ele){
				list.push(lis[i]);
			}
		}
		return list;
		
	}
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    } else {
        element["on" + event] = null;
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
		console.log(event.keyCode);
		if (event.keyCode == 13) {
			listener();
		}
	};
}


$.on = function(selector, event, listener){
    if (selector.addEventListener) {
		selector.addEventListener(event, listener, false);
	} else if (selector.attachEvent) {
		selector.attachEvent("on" + event, listener);
	} else {
		selector["on" + event] = listener;
	}
}

$.click = function(selector, listener) {
    if (selector.addEventListener) {
		selector.addEventListener("click", listener, false);
	} else if (selector.attachEvent) {
		selector.attachEvent("onclick", listener);
	} else {
		selector["onclick"] = listener;
	}
}

$.un = function(selector, event, listener) {
    if (selector.removeEventListener) {
		selector.removeEventListener(event, listener, false);
	} else if (selector.detachEvent) {
		selector.detachEvent("un" + event, listener);
	} else {
		selector["un" + event] = null;
	}
}

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
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = navigator.userAgent.toLowerCase();
    var ie = ua.match(/rv:([\d.]+)/) || ua.match(/msie ([\d.]+)/);
    if(ie) {
        return ie[1];
    }
    else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent( cookieName ) + "=" + encodeURIComponent( cookieValue );
    if ( expiredays instanceof Date ) {
        cookieText += "; expire=" + expiredays.toGMTString();
    }
    document.cookie = cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    var coName = encodeURIComponent(cookieName) + "=",
         coStart = document.cookie.indexOf(coName),
         coValue = null;

    if ( coStart > -1 ) {
        var coEnd = document.cookie.indexOf(";", coStart);
        if ( coEnd == -1) {
            coEnd = document.cookie.length;
        }
        coValue = decodeURIComponent(document.cookie.subString( coStart + coName.length, coEnd ));
    }
    return coValue;
}













