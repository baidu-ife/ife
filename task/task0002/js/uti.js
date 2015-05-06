	// 判断arr是否为一个数组，返回一个bool值
	function isArray(arr) {
			var str = Object.prototype.toString.call(arr);
			return str == '[object Array]';
		}

	// 判断fn是否为一个函数，返回一个bool值
	function isFunction(fn) {
		var str = typeof fn;
		return str == 'function';
	}

	//创建一个函数实现对象的深度克隆：
	function cloneObject(obj) {
		var o, i, j, k;
		if (typeof(obj) != "object" || obj === null) return obj;
		if (obj instanceof(Array)) {
			o = [];
			i = 0;
			j = obj.length;
			for (; i < j; i++) {
				if (typeof(obj[i]) == "object" && obj[i] != null) {
					o[i] = arguments.callee(obj[i]);
				} else {
					o[i] = obj[i];
				}
			}
		} else {
			o = {};
			for (i in obj) {
				if (typeof(obj[i]) == "object" && obj[i] != null) {
					o[i] = arguments.callee(obj[i]);
				} else {
					o[i] = obj[i];
				}
			}
		}

		return o;
	}

	//对数组的去重操作
	function uniqArray(arr) {
		var h = {},
			a = []; //h为hash表  a为临时数组
		for (i = 0; i < arr.length; i++) {
			if (!h[arr[i]]) { //如果没有这个元素
				h[arr[i]] = true; //存入hash表
				a.push(arr[i]);
			}
		}
		return a;
	}

	// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
	//不用正则，分左右两边去空格字符
	function simpleTrim(str) {
		if (!typeof str === 'string') {
			return str;
		}
		var wspace = new String('\t\n\r'); //wspace为空格回车换行字符用来校对
		var i = 0,
			j = str.length;
		if (wspace.indexOf(str.charAt(0)) != -1) {
			while (wspace.indexOf(str.charAt(i) != -1)) {
				i++;
			}
			str = str.substring(i, j);
		}
		if (wspace.indexOf(str.charAt(j - 1)) != -1) {
			while (wspace.indexOf(str.charAt(j - 1)) != -1) {
				j--;
			}
			str = str.substring(i, j + 1);
		}
		return str;
	}

	//使用正则匹配
	function trim(str) {
		if (!typeof str === 'string') {
			return str;
		}
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}

	// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
	function each(arr, fn) {
		var i = 0,
			j = arr.length;
		for (; i < j; i++) {
			fn(arr[i], i);
		}
		return fn;
	}

	//获取对象第一层的元素个数
	function getObjectLength(obj) {
		var h = Object.keys(obj).length;
		return h;
	}

	//正则检验邮箱
	function isEmail(emailStr) {
		if (emailStr != null) {
			var reg = /^\w+((-\w)|(\.\w))*\@[a-z0-9A-Z]+\.[a-z0-9A-Z]+$/;
			var h1 = reg.test(emailStr);
		}
		return h1;
	}

	//正则检验手机
	function isMobilePhone(phone) {
		if (phone != null) {
			var pho = /^(13|15)\d{9}$/;
			var h2 = pho.test(phone);
		}
		return h2;
	}

	// 为element增加一个样式名为newClassName的新样式
	function addClass(element, newClassName) {
		var oldname = element.className;
		if (oldname == '') {
			element.className = newClassName;
			return;
		}
		if (oldname == newClassName || oldname.search(new RegExp(newClassName, "g")) != -1) {
			return;
		}
		return element.className = oldname + ' ' + newClassName;
	}

	//移除element中的样式oldClassName
	function removeClass(element, oldClassName) {
		element.className = element.className.replace(oldClassName, "");
	}

	// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
	function isSiblingNode(element, siblingNode) {
		return (element.parentNode == siblingNode.parentNode);
	}

	//获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
	function getPosition(element) {
		var rect = element.getBoundingClientRect();
		var top = document.documentElement.clientTop;
		var left = document.documentElement.clientLeft;
		return {
			top: rect.top - top + document.documentElement.scrollTop,
			left: rect.left - left + document.documentElement.scrollLeft
		}
	}

	//来个不完善的选择器顶着用
	function $(selector) {
		//ID选择器
		if (selector.substring(0, 1) == '#') {
			return document.getElementById(selector.substring(1));
		}
		//class选择器
		else if (selector.substring(0, 1) == '.') {
			selector = selector.substring(1);
			var vArry = [];
			el = document.getElementsByTagName('*');
			var pattern = new RegExp("(^|\\s)" + selector + "(\\s|$)");
			for (var i = 0; i < el.length; i++) {
				if (pattern.test(el[i].className)) {
					vArry.push(el[i]);
				}
			}
			return vArry[0];
		}
		//属性选择器
		else if (selector.substring(0, 1) == '[') {
			var vArry = [];
			selector = selector.substring(1, selector.length - 1);
			var e2 = document.getElementsByTagName('*');
			for (var i = 0; i < e2.length; i++) {
				if (e2[i].getAttribute(selector)) {
					vArry.push(e2[i]);
				}
			}
			return vArry[0];
		} else {
			var vArry = [];
			return document.getElementsByTagName(selector)[0];
		}
	}

	//任务4
	// 给一个element绑定一个针对event事件的响应，响应函数为listener
	function addEvent(element, event, listener) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + event, listener);
		} else {
			element['on' + event] = listener;
		}
	}

	// 移除element对象对于event事件发生时执行listener的响应
	function removeEvent(element, event, listener) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, false);
		} else {
			element.detachEvent('on' + event, listener);
		}
	}

	// 实现对click事件的绑定
	function addClickEvent(element, listener) {
		addEvent(element, 'click', listener);
	}

	// 实现对于按Enter键时的事件绑定
	function addEnterEvent(element, listener) {
		var keylistener = function(e) {
			if (e.keyCode == 13) {
				listener();
			}
		}
		addEvent(element, 'keydown', keylistener);
	}

	//接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
	$.on = function(element, event, listener) {
		addEvent(element, event, listener);
	}
	$.un = function(element, event, listener) {
		removeEvent(element, event, listener);
	}
	$.click = function(element, listener) {
		addClickEvent(element, listener);
	}
	$.enter = function(element, listener) {
		addEnterEvent(element, listener);
	}

	//事件代理
	$.delegate = function delegateEvent(element, tag, event, listener) {
		$.on(element, event, function(e) {
			var e = e || window.e;
			var tar = e.target || e.srcElement;
			if (tar.nodeName.toLowerCase() == tag) {
				listener(e);
			}
		});
	}

	// 判断是否为IE浏览器，返回-1或者版本号
	function isIE() //兼容IE11  来自百度= =、userAgent在IE11下无法判断
		{
			if (!!window.ActiveXObject || "ActiveXObject" in window) { //<IE10左右true IE11左fasle右true
				return true;
			} else {
				return false;
			}
		}

	// 设置cookie值
	function setCookie(cookieName, cookieValue, expiredays) {
		var cookie = cookieName + "=" + escape(cookieValue);
		if (expiredays > 0) {
			var date = new Date();
			date.setTime(date.getTime() + expiredays * 24 * 3600 * 1000);
			cookie = cookie + "; expires=" + date.toString();
		}
		document.cookie = cookie;
		alert(document.cookie);
		alert(cookie);
	}

	// 获取cookie值
	function getCookie(cookieName) {
		var ocookie = document.cookie;
		var scookie = ocookie.split('; ');
		for (var i = 0, l = scookie.length; i < l; i++) {
			var arr = scookie[i].split('=');
			if (arr[0] == cookieName) return arr[1];
		}
	}

	//学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
	/*options是一个对象，里面可以包括的参数为：
	•type:  post 或者 get ，可以有一个默认值
	•data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
	•onsuccess: 成功时的调用函数
	•onfail: 失败时的调用函数*/
	function ajax(url, options) {
		options.type = options.type || 'GET';
		if (typeof(options.data) === 'object') {
			var str = '';
			for (var x in options.data) {
				str = str + x + '=' + options.data[x] + '&';
			}
			var xx = str.substring(0, str.length - 1);
		}
		if (options.type = 'GET') {
			url = url + '?' + xx;
		}
		//获取XMLHttpRequest对象
		var oXhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		oXhr.open(options.type, url, true);
		if (options.type = 'GET') {
			oXhr.send(null);
		} else {
			oXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			oXhr.send(xx);
		}
		//响应函数
		oXhr.onreadystatechange = function() {
			if (oXhr.readyState = 4) {
				if (oXhr.status = 200)
					options.onsuccess.call(oXhr, oXhr.responseText);
				else
					options.onfail();
			}
		}
	}