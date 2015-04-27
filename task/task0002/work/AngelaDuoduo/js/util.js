function isArray(arr) {
	return Array.isArray(arr) || Object.prototype.toString.call(arr) === '[object Array]';
}

function isFunction(fn) {
	return typeof fn === 'function';
}

function cloneObject(src) {
	var type = Object.prototype.toString.call(src).match(/\[object\s([a-zA-z]+)\]/)[1],
		result;
	console.log(type);
	switch(type) {
		case 'Date': 
			result =  new Date(src.getTime());
			break;
		case 'Array':
			result = [];
			for (var i = 0, len = src.length; i < len; i++) {
				result[i] = cloneObject(src[i]);
			}
			break;
		case 'Object':
			result = {};
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					result[key] = cloneObject(src[key]);
				}
			}
			break;
		default: 
			result = src;
	};
	return result;
}

function uniqArray(arr){
	var newArr = [], map = {};
	for (var i = 0, len = arr.length; i < len; i++) {
		if (!map[arr[i]]) {
			map[arr[i]] = true;
			newArr.push(arr[i]);
		} 
	}
	return newArr;
}

function trim(str) {
	var result = [];
	for (var i = 0, len = str.length; i < len; i++) {
		if (str[i] == ' ' || str[i] == '\u3000' || str[i] == '\t'){
			continue;
		}
		result.push(str[i]);
	}
	console.log(result);
	return result.join('');
}

function each(arr, fn) {
	for (var i = 0, len = arr.length; i < len; i++) {
		fn.call(null, arr[i], i);
	}
}

function getObjectLength(obj) {
	if (Object.prototype.toString.call(obj) !== '[object Object]') {
		return -1;
	}
	var count = 0;
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			count++;
		}
	}
	return count;
}

function isEmail(emailStr) {
	return /^[\w-]@\w+(?:\.[\w]+)*$/.test(emailStr);
}

function isMobilePhone(phone) {
	return /^(?:\+\d+\s)?\d{11}$/.test(phone);
}

function addClass(element, newClassName) {
	if (element.className === '') {
		element.className = newClassName;
	} else {
		element.className += " " + newClassName;
	}
	return element;
}

function removeClass(element, oldClassName){
	var reg = new RegExp("\s?" + oldClassName, "g");
	element.className = element.className.replace(reg, "");
	return element;
}

function isSiblingNode(element, siblingNode) {
	if (element.nodeType !== 1 || element.nodeType !== 1) {
		return false;
	}
	if (element.parentNode !== siblingNode.parentNode) {
		return false;
	}
	return true;
}

function getPositionOnPage(element) {
	var temp = element, 
		left = 0, 
		top = 0;
	if (temp.offsetParent) {
		left += temp.offsetLeft;
		top += temp.offsetTop;
		temp = temp.offsetParent;
	}
	return {
		x: left,
		y: top
	};
}

function getPositionOnclient(element) {
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
		scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
		pagePos = getPositionOnPage(element);
	return {
		x: pagePos.x - scrollLeft,
		y: pagePos.y - scrollTop
	};

}

var $ = function() {

	function getElementsByAttributeName(element, attribute, value) {
		var result = [], 
			root = element.getElementsByTagName("*");

		var process = function(rootSet) {
			if (rootSet.length > 0) {
				for (var i = 0, len = rootSet.length; i < len; i++) {
					var attrValue = rootSet[i].getAttribute(attribute);
					if (attrValue !== '') {
						if (value){
							attrValue === value && result.push(rootSet[i]);
						} else {
							result.push(rootSet[i]);
						}
					}
					arguments.callee(rootSet[i]);
				}

			}
		};

		process(root);
		return result;
	}

	return function (selector) {
			var items = selector.split(/\s+/),
				root = [document,], temp = [];
			for (var i = 0, len = items.length; i < len; i++) {
				var type = items[i][0];
				switch(type) {
					case '#':
						for(var j = 0, len2 = root.length; j < len2; j++) {
							var result = root[j].getElementById(items[i].slice(1));
							if (result){
								temp.push(result);
							}
						}
						break;
					case '.':
						for (var j = 0, len2 = root.length; j < len2; j++) {
							var results = root[j].getElementsByClassName(items[i].slice(1));
							if (results) {
								temp = temp.concat(Array.prototype.slice.call(results));
							}
						}
						break;
					case '[':
						var keyValue = items[i].match(/([\w-])+(=[\w-]+)?/),
							key = keyValue[1],
							value = keyValue[2];
						for (var j = 0, len2 = root.length; j < len; j++) {
							var results = getElementsByAttributeName(root[j], key, value);
							temp = temp.concat(results);
						}
						break;
					default: 
						if (type >= 'a' && type <= 'z') {
							for (var j = 0, len2 = root.length; j < len2; j++) {
								var results = root[j].getElementsByTagName(items[i]);
								if (results) {
									temp = temp.concat(Array.prototype.slice.call(results));
								}
							}
						}
					}//end of switch
					root = temp;
					temp = [];
				}//end of for
			return root[0];
	};

}();

var addEvent = $.on = function (element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event, listener);
	} else {
		element["on" + event] = listener;
	}
};

var removeEvent = $.un = function(element, event, listener) {
	if (element.removeEventListener) {
		element.removeEventListener(event, listener);
	} else if (element.detachEvent) {
		element.detachEvent("on" + event, listener);
	} else {
		element["on" + event] = null;
	}
};

var addClickEvent = $.click = function (element, listener) {
	addEvent(element, "click", listener);
};

var addEnterEvent = $.enter = function (element, listener) {
	addEvent(element, "keypress", function(event) {
		if (event.keyCode === 13) {
			listener();
		}
	});
};

var delegateEvent = $.delegate = function (element, tag, eventName, listener) {
	addEvent(element, eventName, function(event) {
		var target = event.target || event.srcElement;
		if (target.tagName.toLowerCase() === tag.toLowerCase()) {
			listener(event);
		}
	});
};

function isIE() {
	return navigator.userAgent.indexOf("Trident") > -1;
}

function setCookie(cookieName, cookieValue, expiresdays) {
	var now = new Date.getTime(),
		expireDate = new Date(now + expiresdays * 24 * 60 * 60 * 1000);
	document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";expires="+expireDate.toGMTString();
}

function getCookie(cookieName) {
	var reg = new RegExp("(?:^\\b|;)\\s*" + cookieName + "=" + "([^;]+)(?:;|\\b$)");
	var result = document.cookie.match(reg);
	return result && result[1] || "";
}

function ajax(url, options) {
	var formData = function(type, data) {
		if (type === 'get' && typeof data === 'object') {
			var result = [];
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					result.push(key + "=" + data[key]);
				}
			}
			return result.join("&");
		} else if (type === "post" && typeof data === 'string'){
			var result = {}, 
				items = data.split("&");
			for (var i = 0, len = items.length; i < len; i++) {
				var keyValue = items[i].split("=");
				result[keyValue[0]] = keyValue[1];
			}
			return result;
		}
		return data;
	};


	options.type = options.type || 'get';
	options.data = options.data || "";

	var xhr = new XMLHttpRequest();

	xhr.onreadystatuschange = function(event) {
		if (xhr.readyState === 4) {
			//重定向信息不可以算作成功吗？
			if (xhr.status >= 200 && xhr.status < 300) {
				return options.onsuccess && options.onsuccess(xhr.responseText);
			} else {
				return options.onfail && options.onfail(xhr.responseText, xhr.status);
			}
		} 
	};

	if (options.type.toLowerCase() === 'get') {
		xhr.open("get", url + "?" + formData("get", data));
		xhr.send(null);
	} else if (options.type.toLowerCase() === 'post'){
		xhr.open("post", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(formData("post", data));
	}
}









