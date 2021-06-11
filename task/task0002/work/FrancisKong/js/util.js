//判断arr是否是一个数组
function isArray(arr){
	return Array.isArray(arr);
}
//判断arr是否是一个函数
function isFunction(fn){
	return typeof fn=='function';
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(obj) {
    var result,oClass=Object.prototype.toString.call(obj).slice(8,-1);
        //确定result的类型
    if(oClass==="Object"){
        result={};
    }else if(oClass==="Array"){
        result=[];
    }else{
        return obj;
    }
    for(var key in obj){
        var copy=obj[key];
        if(Object.prototype.toString.call(copy).slice(8,-1)=="Object"||"Array"){
            result[key]=arguments.callee(copy);//递归调用
        }else{
            result[key]=obj[key];
        }
    }
    return result;

}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
	var arr2=new Array();
	arr.sort();
	var j=0;
    for (var i = arr.length - 1; i >= 0; i--) {
    	if(i-1!=-1&&arr[i]!=arr[i-1]){
    		arr2[j++]=arr[i];
    	}
    	if(i==0&&arr.length%2==0&&arr[i]!=arr[i+1]){
    		arr2[j++]=arr[i];
    	}
    };
    return arr2;
}
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
	var startIndex=0;
	var endIndex=str.length-1;
    for(var i=0;i<str.length-1;i++){
    	if(str.charAt(i)=="　"||str.charAt(i)=="\t"||str.charAt(i)==" "){
    		startIndex++;
    	}
    	else{
    		break;
    	}
    }
    for (var i = str.length - 1; i >= 0; i--) {
    	if(str.charAt(i)=="　"||str.charAt(i)=="\t"||str.charAt(i)==" "){
    		endIndex--;
    	}
    	else{
    		break;
    	}
    }
    return str.substring(startIndex,endIndex+1)  ;
}
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g,'');
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i=0;i<arr.length;i++){
    	fn(arr[i],i);
    }
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var i=0;
	for(var a in Object.keys(obj)){
		i++;
	}
	return i;
}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.className+=newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var className=element.className;
    if(className!=null&&element.className.indexOf(oldClassName)>-1){
    	element.className=element.className.replace(oldClassName,"");
    }
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode==siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x=element.getBoundingClientRect().left;
    var y=element.getBoundingClientRect().top;
    var position={"x":x,"y":y};
    return position;
}
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
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    //element.addEventListener(event,listener,false);
    element['on'+event]=listener;
}

var func=function clicklistener(event) {
    alert("hello world!");
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.onclick=listener;
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
	var e=window.event;
   	if(e.which==13)
   		element.onkeydown=listener;
}


// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    element.unbind(event,listener);
}
// 判断是否为IE浏览器，返回-1或者版本号
function isIE(){
	if(navigator.appName=="ie"){
		return navigator.appVersion;
	}
	else{
		return -1;
	}
}
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
}

function init(){
	var arr=new Array(5);
	console.log("isArray:"+isArray(arr));
	console.log("isFunction:"+isFunction(function fun(){}));
	
	// 数组克隆测试：
	var srcObj = {
		a: 1,
		b: {
			b1: ["hello", "hi"],
			b2: "JavaScript"
		}
	};
	var abObj = srcObj;
	var tarObj = cloneObject(srcObj);
	srcObj.a = 2;
	srcObj.b.b1[0] = "Hello";
	console.log("数组克隆测试");
	console.log(abObj.a);
	console.log(abObj.b.b1[0]);
	console.log("tarObj.a:"+tarObj.a);      // 1
	console.log("tarObj.b.b1[0]:"+tarObj.b.b1[0]);    // "hello"
	
	//数组去重复测试
	var a = [1, 3, 5, 7, 5, 3];
	var b = uniqArray(a);
	console.log("数组去重复测试");
	console.log(b); // [1, 3, 5, 7]

	// 字符串tirm测试用例
	var str = '   hi!  ';
	var str2='   hello  ';
	str = simpleTrim(str);
	str2=trim(str2);
	console.log("simpleTrim测试")
	console.log(str); // 'hi!'
	console.log("tirm测试");
	console.log(str2);//'hello'

	// 遍历数组测试用例
	var arr = ['java', 'c', 'php', 'html'];
	console.log("遍历数组测试");
	function output(item, index) {
    	console.log(index + ': ' + item);
	}
	each(arr, output);  // 0:java, 1:c, 2:php, 3:html

	// 获取对象第一层元素数量测试用例
	var obj = {
    	a: 1,
    	b: 2,
    	c: {
        	c1: 3,
        	c2: 4
    	}
	};
	console.log("获取对象第一层元素数量测试");
	console.log(getObjectLength(obj)); // 3
	
	console.log("获取元素位置：");
	console.log(getPosition($("doma")));
	addClass($("doma"),"doma");
	removeClass($("doma"),"doma");
	console.log(isSiblingNode($("doma"),$("addbtn")));
	//addClickEvent($("doma"),func);
	//addEnterEvent($("doma"),func);
	
}
init();
//addEvent(document.getElementById("doma"), "click", func);
//addEvent($("doma"), "click", func);

