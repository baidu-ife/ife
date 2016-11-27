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
	
	console.log("isEmail:" + isEmail(document.getElementById("number1").value));
	//�ж��Ƿ�Ϊ�����ַ
	function isEmail(emailStr) {
		var pattern = new RegExp("^[a-z]([a-z0-9]*_?[a-z0-9]+)+@[a-z0-9]+.com$", "gi");
		return pattern.test(emailStr);
	}

	console.log("isPoneNumber:" + isMobilePhone(document.getElementById("number2").value));
	//�ж��Ƿ�Ϊ�ֻ���
	function isMobilePhone(phone) {
		var pattern = new RegExp("^1\\d{10}$", "g");
		return pattern.test(phone);
	}

//3
	addClass(document.getElementById("addbtn"), "red");
	// Ϊelement����һ����ʽ��ΪnewClassName������ʽ
	function addClass(element, newClassName) {
		var classNames = element.className.split(/\s+/);
		classNames.push(newClassName);
		element.className = classNames.join(" ");

	}
	
	removeClass(document.getElementById("addbtn"), "yel");
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

	console.log(isSiblingNode(document.getElementById("addbtn"), document.getElementById("number1")));

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
	
	console.log("$():"+$("span").id);
	//ʵ�ּ򵥵�Query
	function $(select) {
		if(/#\w+/.test(select)) {
			var arr = select.split("");
			arr.shift();
			var str = arr.join("");
			return document.getElementById(str);
		}else if(/\w/.test(select)) {
			return document.getElementsByTagName(select)[0];
		}
		
		else {
			return -1;
		}
	}
}



