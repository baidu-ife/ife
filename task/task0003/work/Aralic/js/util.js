
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
	// return arr instanceof Array; /
	// 在一些极端情况下 用instanceof不可行 比如在iframe下
	if (!Array.isArray){
		return Object.prototype.toString.call(arr) === '[object Array]';
	} else {
		// IE9+
		return Array.isArray(arr);
	}
	
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
	return typeof fn === 'function';
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
	//判断类型 直接返回当前值
	if (src === null || src === undefined || typeof src !== 'object') {
		return src;
	}
	var obj = null;
	//判断数组 遍历数组
	if (isArray(src)) {
		obj = [];
		for (var i = 0; i < src.length; i++) {
			obj.push(cloneObject(src[i]));
		}
		return obj;
	} 
	//遍历对象
	else {
		obj = {};
		for (var attr in src) {
			var val = src[attr];
			obj[attr] = cloneObject(val);
		}
	}
	return obj;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
// 第二个参数可选，true表示去掉空元素
function uniqueArray(arr,empty) {
	var i,
		length;
	var	obj = {};
	var	newArr = [];
	for (i = 0, length = arr.length; i<length; i++) {
		//第二个参数为true 并且数组元素为空 则跳出循环进行下一次遍历
		if (empty == true && trim(arr[i]) == '') {
			continue;
		}
		if (!obj[arr[i]]) {
			obj[arr[i]] = arr[i];
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
// 使用示例
// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray(a);
// console.log(b); // [1, 3, 5, 7]


// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
	var re = /^\s+|\s+$/g;
	return str.replace(re,'');
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
	for (var i = 0; i<arr.length; i++) {
		fn(arr[i],i);
	}

}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var sum = 0;
    for (var attr in obj) {
        //hasOwnProperty 表示自有属性
        // if(obj.hasOwnProperty(attr)) {
        //     sum += 1;
        // }
        //in 表示自有属性 和 继承属性
        if ( attr in obj) {
            sum += 1;
        }
    }
    return sum;
}

// 判断是否为邮箱地址
// Aralic@163.com
function isEmail(emailStr) { 
	var re = /^[0-9a-z][\w\.-]+@[\da-z]{1,4}(\.[a-z]{1,4})+$/i;
	return re.test(emailStr)
}
// console.log(isEmail('Aralic@163.com'));

// 判断是否为手机号
// 以13 14 15 18开头
// 11位数

function isMobilePhone(phone) {
    var re = /^1[3458]\d{9}$/;
    return re.test(phone);
}
// console.log(isMobilePhone(13812345678)); //true


// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	var arr = trim(element.className).split(/\s+/);
	for (var i = 0; i<arr.length; i++) {
		//如果已经存在class等于新添加的class 不再添加
		if (arr[i] == newClassName) {
			return;
		}
	}
	element.className += ' ' + newClassName; 
	element.className = trim(element.className);
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
	var arr = trim(element.className).split(/\s+/);
	var str = '';
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] != oldClassName) {
			str += arr[i] + ' ';
		}
	}
	element.className = str;
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	return element.parentNode === siblingNode.parentNode;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	var pos = {
		"x": 0,
		"y": 0
	};
	while (element) {
		pos.x += element.offsetLeft;
		pos.y += element.offsetTop;
		element = element.offsetParent;
	}
	return pos;
}

//获取class元素 兼容ie低版本
function getClass(oParent,oClass) {
	var aElem = oParent.getElementsByTagName("*");
	var arr = [];
	for (var i = 0; i<aElem.length; i++) {
		if (aElem[i].className == oClass) {
			arr.push(aElem[i]);
		}
	}
	return arr;
}


// 接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集。

// 实现一个简单的Query

//实现功能：
//1、非层次嵌套：例如 #div1 .div1 p  div.header div[data-log]
//2、层次嵌套：例如 (#header div.title p[data])  (.title p)

function $(selector) {
   
	//清除首尾空格
	selector = trim(selector);
	var arr = [];
	//判断selector中间是否有空格需要拆分
	var space = selector.indexOf(' ');

	//有空格的情况 拆分查询
	if (space != -1) {
		//以空格形式分割字符串 从得到的数组最后进行逆向查询
		arr = selector.split(/\s+/);
		for (var i = arr.length; i>1; i++) {
			return query(arr[i-1],arr[i-2]);
		}
	//无空格情况 直接查询
	} else {
		return query(selector);
	}


	//主要查询器
	function query(selector,oParent) {

		//selector 中间有空格被拆分了
		if (arr[0]) {
			oParent = $(arr[0]);
		} else {
			oParent = document;
		}

		//判断首字符
		switch (selector.charAt(0)) {
			case '#' :
				return document.getElementById(selector.substring(1));
				break;
			case '.' :
				return getClass(oParent,selector.substring(1));
				break;
			case '[' :
				//返回第一个属性匹配元素
				return getQueryAttr(selector);
				break;

			//默认形式：
			//1、纯标签形式，例如 p
			//2、带属性形式，例如 p[data]
			//3、带.class形式，例如 p.info
			default :

				//  第三种情况
				if (selector.indexOf('.') != -1) {
	
					var defArr = selector.split('.');
					return getClass(oParent, defArr[1], defArr[0]);
				} 
				//	第二种情况
				else if (selector.indexOf('[') != -1) {
					
					var defArr = selector.split('[');
					defArr[1] = "["+defArr[1];
					return getQueryAttr(defArr[1], defArr[0]);

				}
				// 第一种情况
				else {
					return oParent.getElementsByTagName(selector)[0];
				}
			
				break;
			}
	}

	//匹配[]选择器
	function getQueryAttr(attr,tagName) {
		tagName = tagName || '*';
		var aElem = document.getElementsByTagName(tagName);
		//去掉首尾[]
		attr = attr.substring(1,attr.length-1);
		//判断是否有=
		if (attr.indexOf('=') != -1) {
			var arr = attr.split('=');
			for (var i = 0; i<aElem.length; i++) {
				if (aElem[i].getAttribute(arr[0]) == arr[1]) {
					return aElem[i];
				}
			}
		} else {
			for (var i = 0; i<aElem.length; i++) {
				if (aElem[i].getAttribute(attr) || aElem[i].getAttribute(attr) == "") {
					return aElem[i];
				}
			}
		}
		return '';
	}

	//获取class元素，兼容ie低版本,返回第一个符合条件
	//三个参数，1、父级 2、class名 3、标签名
	function getClass(oParent,oClass,tagName) {
        tagName = tagName || "*";
        var aElem = oParent.getElementsByTagName(tagName);
        var arr = [];

        for (var i = 0; i<aElem.length; i++) {
            
            if (aElem[i].className) {
                
                //对每个元素的class名进行处理
                var classNames = trim(aElem[i].className);
                          
                var arr2 = classNames.split(/\s+/);
            
                for (var j = 0; j<arr2.length; j++) {
                    //返回第一个符合条件的元素
                    if (arr2[j] === oClass) {
                        return aElem[i];
                    }
                }
            }  
        }
        return '';
    }

}


// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
	//设置事件名标识
	var evName = event;

	//把事件函数添加到绑定的元素自定义属性上
	if (element.evName) {
		element.evName.push(listener);
	} else {
		element.evName = [listener];
	}

	//添加自定义事件，兼容ie低版本
	if (element.addEventListener) {
		element.addEventListener(event,listener,false);
	} else {
		element.attachEvent('on'+event,listener);
	}
}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {

	//如果listener存在
	if (listener) {

		if (element.removeEventListener) {
			element.removeEventListener(event,listener, false);
		} else {
			element.detachEvent('on'+event,listener);
		}
	//listener不存在
	} else {

		if (element.evName) {
			
			for (var i = 0; i<element.evName.length; i++) {
				removeEvent(element, event, element.evName[i]);
			}
		}
	}
}


// 实现对click事件的绑定
function addClickEvent(element, listener) {
	addEvent(element,'click',listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
	var fn = function(ev) {
		var ev = ev || event;
		if (ev.keyCode == 13) {
            listener();
        }
	}
	addEvent(element, 'keydown', fn);
}


//获取行间样式
function getStyle(element,attr){
    if(element.currentStyle){
        return element.currentStyle[attr];
    }
    else{
        return getComputedStyle(element,false)[attr];
    }
}

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
// addEvent(element, event, listener) -> $.on(element, event, listener);

$.on = function(element, event, listener) {
    addEvent(element, event, listener);
}

$.un = function(element, event, listener) {
    removeEvent(element, event, listener);
}

$.click = function(element, listener) {
    $.on(element, 'click', listener);
}

$.enter = function(element, listener) {
	addEnterEvent(element, listener);
}

//事件代理
$.delegate = function(element, tag, event, listener) {
    // console.log(element);
    addEvent(element, event, function(ev){
        var ev = ev || event;
        //兼容处理 
        var target = ev.target || ev.srcElement;
        //nodeName 标签名字
        if (target.nodeName.toLowerCase() == tag) {
            listener(ev);
        }
    });
};

$.extend = function(json1, json2) {
    for (var attr in json1) {
        json2[attr] = json1[attr];
    } 
    return json2;
};

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + expiredays);
    document.cookie = cookieName + '=' + cookieValue + ';expires=' + oDate;
}

// 获取cookie值
function getCookie(cookieName) {
    var arr = document.cookie.split('; ');
	for (var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		if(arr2[0] == cookieName){
			return arr2[1];
		}
	}
	return '';
}

//删除cookie
function removeCookie(cookieName) {
	setCookie(cookieName, '', -1);
}


// 学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
// options是一个对象，里面可以包括的参数为：
// type: post或者get，可以有一个默认值
// data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
// onsuccess: 成功时的调用函数
// onfail: 失败时的调用函数
function ajax(url, options) {

	var userdata = '';
	//默认情况是‘get’方式
	options.type = options.type || 'get';

	//创建对象 兼容ie6
    if (window.XMLHttpRequest) {
    	var xhr = new XMLHttpRequest();
    } else {
    	var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
s
    //请求数据的处理 键值对 => 字符串
    if (typeof options.data === 'object') {
    	for (var attr in options.data) {
    		userdata += attr + '=' + options.data[attr] +'&';
    	}
    	userdata = userdata.substring(0,userdata.length-1);
    } else {
    	userdata = options.data || '';
    }

    //'get' 方式 发送数据
    if (options.type.toLowerCase() == 'get') {
    	
    	xhr.open('get', url+'?'+userdata,true);
    	xhr.send();
    //'post' 方式 发送数据
    } else {
    	// xhr.setRequestHeader("content-type","application/x-www-form-urlencoded; charset=UTF-8");
    	xhr.open('post', url, true);
    	xhr.send(userdata);
    }

    xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
	    	if (xhr.status == 200) {
	    		options.onsuccess && options.onsuccess(xhr.responseText);
	    	} else {
	    		options.onfail && options.onfail(xhr.status);
	    	}
	    }
    }

}
// 使用示例：
// ajax(
//     'http://localhost:8080/server/ajaxtest', 
//     {
		   // type: 'get',
//         data: {
//             name: 'simon',
//             password: '123456'
//         },
//         onsuccess: function (responseText, xhr) {
//             console.log(responseText);
//         }
//     }
// );

function getQueryAttr(attr,tagName,oParent) {
    tagName = tagName || '*';
    var aElem = oParent.getElementsByTagName(tagName);
    //去掉首尾[]
    attr = attr.substring(1,attr.length-1);
    var arr = attr.split('=');
    var arr2 = [];
    for (var i = 0; i<aElem.length; i++) {
        if (aElem[i].getAttribute(arr[0]) === arr[1]) {
            arr2.push(aElem[i]);
        }
    }
    return arr2;
}