// JavaScript Document

//判定是否为一个数组
var a1="hello";
var b1=new Array();

function isArray(arr) {
   return (arr instanceof Array);
}
console.log(isArray(a1));

//判定是否为一个函数
function isFunc(arr) {
	
  var a;
  a=(typeof(arr)=="function")?true:false;
  return a;
}
isFunc(isArray);

//深度克隆
function cloneObject(src) {
    var key;
	var result,oClass=isClass(src);
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
            result[key]=arguments.callee(copy);
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

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      
console.log(tarObj.b.b1[0]);  

//去重操作
function uniqArray(arr) {
    // your implement
	var key1, key2, temp, tflag;
	var result=new Array();
	var tflag = false;
	var key3=0;
	for(key1 in arr){
		tflag = false;
		
		if(key1==0){
			result[0]=arr[key1];
			continue;
			}
		else{
			for(key2 in result){
				temp=arr[key1];
				if(temp==result[key2]){
					tflag = true;
					break;
				}else{
					tflag = false;
				}
			}
		}
		
		if(tflag == true){continue;}
		else{
			key3=key3+1;
			result[key3]=arr[key1];
			}
    }
    return result;
	
}

var a3 = [1, 3, 5, 7, 5, 3];
var b3 = uniqArray(a3);
console.log(b3); // [1, 3, 5, 7]

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
function simpleTrim(str) {
    var key, result;
	result=str;
	
	while(result[0]==' ')
		{
		result=result.slice(1);
		}

	while(result.slice(-1)==' ')
		{
		result=result.slice(0,-1);
		}
	
	return result;
}

var a4 = "         wifieur          ";
var b4 = simpleTrim(a4);
console.log(b4);

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g,""); 
}

var str = '   hi!  ';
str = trim(str);
console.log(str); 

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
	var key,temp;
	for(key in arr){
		temp=arr[key];
		fn(temp,key);
	}
}

var arr = ['java', 'c', 'php', 'html'];
//function output(item) {
//    console.log(item);
//	alert(item);
//}
//each(arr, output);  // java, c, php, html

function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output); 


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var key, result;
	result=0;
	for(key in obj){
		result=result+1;
		}
	return result;
	}
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); 


// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
	var Regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	
	if (Regex.test(emailStr)){                
　　		return true;            
　　		}            
　　else {                                 
　　		return false;                
　		}                
}
var email="liuyifenwuyi@126.com";
console.log(isEmail(email));

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
	var Regex=/^1\d{10}$/;
	if (Regex.test(phone)){                
　　		return true; 
		         
　　		}            
　　else {                                 
　　		return false;                
　		}     
}
var myphone="13426351769";
console.log(isMobilePhone(myphone));

function addClass(element, newClassName) {
    // your implement
	$("#element").addClass("newClassName");
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
	 $("element").removeClass("oldClassName"); 
}

function isSiblingNode(element, siblingNode) {
    // your implement
	 var parent1=element.parentNode;
	 var parent2=siblingNode.parentNode;
	 if((parent1.nodeName==parent2.nodeName)&&(parent1.nodeType==parent2.nodeType)&&(parent1.id==parent2.id)){
		 return true;
	 }
	else{return false};
}


function getPosition(element) {
    // your implement
	var x_offset=getTop(element);
	var y_offset=getLeft(element);
	var result="("+x_offset+","+y_offset+")";
	return result;
	
}

function getTop(e){ 
	var offset=e.offsetTop; 
	if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
	return offset; 
} 
 
function getLeft(e){ 
	var offset=e.offsetLeft; 
	if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
	return offset; 
} 

var tcon = document.getElementById("tcon");
console.log(getPosition(tcon));


function $(selector) {
	var data=selector.split(" ");
	var result;
	if(data.length==1){
		return getID(data[0]);
	}
	else{
		var result = getID(data[0]);
		var childs = result.childNodes;
		for(var i=0;i<childs.length;i++){
			var classa =  childs[i].className;
			if(typeof(classa)!="undefined"){
				var temp = childs[i].className.split(" ");
				for(var j=0;j<temp.length;j++){
					if(temp[j]==(data[1].slice(1))){
						return childs[i];
					}
				}
			}
			
		}
	}
}
function getID(str){
	if(/^[a-z]{1,10}$/.test(str)){
		return document.getElementsByTagName(str)[0]; 
		}
	else{
		switch(str[0]){
		case "#":
			return document.getElementById(str.slice(1));
		case ".":
			return document.getElementsByClassName(str.slice(1))[0];
		case "[":
			var temp2 = str.slice(1,selector.length-1);
			var alltag = document.getElementsByTagName("*");
			for(var j=0;j<alltag.length;j++) {
				var num = temp2.split("=");
				if(num.length==2){
					if(num[1] == alltag[j].getAttribute(num[0])) {
						return alltag[j];
					}
				} 
				else{
					
					if(alltag[j].getAttribute(temp2)) {
						return alltag[j];
					}
				}
			}
			break;
		default: return;
		}
	}	
	
}
console.log($("#con .good"));

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
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
    addEvent(element,"click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) { 
	var addenter = function(ev) {
        var ev = ev || event;
        if (ev.keyCode == 13) { 
            listener();
        }
    }
    addEvent(element, 'keydown', addenter); 
}

//中间dom时间处理内容看的太晕了，暂且跳过，回头有空就继续写

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
   var browser=navigator.appName;
   var Vernum=navigator.appVersion;
   if(browser=="Microsoft Internet Explorer"){
	   return Vernum.slice(0,3);
   }
   else{
	   return -1;
   }
}

// 设置cookie 不太理解，参考百度百科写的~~o(>_<)o ~~
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
	var exdate=newDate()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=cookieName+"="+escape(cookieValue)+
	((expiredays==null)?"":";expires="+exdate.toGMTString())
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
	var strCookie = document.cookie;
    var arrCookie = strCookie.split(";");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]){
            return arr[1];
        }
    }
    return "";
}

// 
function ajax(url, options) {
    // ~~o(>_<)o ~~
}

