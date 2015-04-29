window.onload = function(){
	var arr = ['fsdf','sdfsd'];
	var a = 1;
	var fn = function(){};
	var pattern1 = /at/g;
	var attern2 = /[bc]ac/gi;


	console.log(isArray(arr));
	console.log(isFunction(fn));
	console.log(arr.toString());

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
	
	console.log("isEmail:" + isEmail(document.getElementById("number1").value));
	//判断是否为邮箱地址
	function isEmail(emailStr) {
		var pattern = new RegExp("^[a-z]([a-z0-9]*_?[a-z0-9]+)+@[a-z0-9]+.com$", "gi");
		return pattern.test(emailStr);
	}

	console.log("isPoneNumber:" + isMobilePhone(document.getElementById("number2").value));
	//判断是否为手机号
	function isMobilePhone(phone) {
		var pattern = new RegExp("^1\\d{10}$", "g");
		return pattern.test(phone);
	}

//3
	addClass(document.getElementById("addbtn"), "red");
	// 为element增加一个样式名为newClassName的新样式
	function addClass(element, newClassName) {
		var classNames = element.className.split(/\s+/);
		classNames.push(newClassName);
		element.className = classNames.join(" ");

	}
	
	removeClass(document.getElementById("addbtn"), "yel");
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

	console.log(isSiblingNode(document.getElementById("addbtn"), document.getElementById("number1")));

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
	
	console.log("$():"+$("#test .m1").id);
	//实现简单的Query
	function $(select) {
		if(/^#\w+$/.test(select)) {
			var arr = select.split("");
			arr.shift();
			var str = arr.join("");
			return document.getElementById(str);
		}else if(/^\w+$/.test(select)) {
			return document.getElementsByTagName(select)[0];
		}else if(/^\.\w+$/.test(select)) {
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
		element.addEventListener(event, listener, false);
	}

	// 移除element对象对于event事件发生时执行listener的响应
	function removeEvent(element, event, listener) {
		element.removeEventListener(event, listener, false);
	}
	
	/*var fun = function(event, xun) {
		
	}*/
	var xun = function() {
		console.log(1);
	}

	// 实现对click事件的绑定
	function addClickEvent(element, listener) {
		element.addEventListener("click", listener, false);
	}
	addEnterEvent($("#number1"), xun);
	// 实现对于按Enter键时的事件绑定
	/*function addEnterEvent(element, listener) {
		function fun(event,fn) {
			if(event.keyCode == 13) {
				
			}
		}
		
		element.addEventListener("keyup", fun, false);
		
	}*/
}



