// ==================================================================================================================
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
		console.log(arr instanceof Array)
	}
	// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
		console.log(fn instanceof Function)
	}
	// ==================================================================================================================
	// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
	// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function isClass(src) {
	if (src === null) return "Null";
	if (src === undefined) return "Undefined";
	return Object.prototype.toString.call(src).slice(8, -1);
}

function cloneObject(src) {
		var result = {},
			oClass = isClass(src);
		for (key in src) {
			var copy = src[key];
			if (isClass(copy) == "Object") {
				result[key] = arguments.callee(copy);
			} else if (isClass(copy) == "Array") {
				result[key] = arguments.callee(copy);
			} else {
				result[key] = src[key];
			}
		}
		return result;
	}
	// 测试用例：
var srcObj = {
	a: 1,
	b: {
		b1: ["hello", "hi"],
		b2: "JavaScript"
	},
	c: function() {}
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.c = function() {
	return 2;
};
srcObj.b.b1[0] = "Hello11";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a); // 1
console.log(tarObj.b.b1[0]); // "hello"
// ==================================================================================================================
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
		var n = {},
			r = [];
		for (var i = 0; i < arr.length; i++) {
			if (!n[arr[i]]) {
				n[arr[i]] = arr[i];
				r.push(arr[i]);
			}
		}
		return r;
	}
	// 使用示例	
var a = [9, 1, 3, 5, 7, 5, 3, 9];
var b = uniqArray(a);
console.log(b); // [9, 1, 3, 5, 7]
// ==================================================================================================================
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
	var i;
	for (i = 0; i < str.length; i++) {
		if (str.charAt(i) != ' ' && str.charAt(i) != '    ') {
			break;
		}
	}
	str = str.substring(i, str.length);

	for (i = str.length - 1; i >= 0; i--) {
		if (str.charAt(i) != ' ' && str.charAt(i) != ' ') break;
	}
	str = str.substring(0, i + 1);
	return str;
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'
// ==================================================================================================================
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
		for (var i = 0; i < arr.length; i++) {
			fn(arr[i], i)
		}
	}
	// 使用示例
var arr = ['java', 'c', 'php', 'html'];

function output(item, index) {
	console.log(item)
}
each(arr, output); // java, c, php, html
// ==================================================================================================================
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
		var count = 0,
			key;
		for (key in obj) {
			count++;
		}
		return count;
	}
	// 使用示例
var obj = {
	a: 1,
	b: 2,
	c: {
		c1: 3,
		c2: 4
	}
};
console.log(getObjectLength(obj)); // 3
// ==================================================================================================================

// 判断是否为邮箱地址
function isEmail(emailStr) {
	var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
	if (reg.test(emailStr)) {
		return true;
	} else {
		alert('您的电子邮件格式不正确');
		return false;
	}
}
	// 判断是否为手机号
function isMobilePhone(phone) {
	var reg = /1[0-9]{10}/;
	if (reg.test(phone)) {
		return true;
	} else {
		alert('手机号格式不正确');
		return false;
	}
}
//==================================================================================================================
// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	if (!element.className) {
		element.className = newClassName;
	} else {
		var classes = element.className.split(' ');
		classes.push(newClassName);
		element.className = classes.join(' ');
	}
}
// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
	if (element.className == '') {
		element.className = '';
	} else {
		var classes = element.className.split(' '),
			index = classes.indexOf(oldClassName);
		if (index > -1) {
			classes.splice(index, 1);
		}
		element.className = classes.join(' ');
	}
}
// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	eP = element.parentNode;
	sP = siblingNode.parentNode;
	return eleParent.isSameNode(sbParent);
}
// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	return {
		eL: element.offsetLeft,
		eT: element.offsetTop
	}
}

var o = document.getElementById('p1')
console.log(getPosition(o));
// your implement
// ==================================================================================================================
// mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集
// 实现一个简单的Query
function $(selector) {

}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
// ==================================================================================================================
// 我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习，还是在你的util.js，实现以下函数
// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
}
// 例如：
function clicklistener(event) {
}
addEvent($("#doma"), "click", a);

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    // your implement
}