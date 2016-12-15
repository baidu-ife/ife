/**
 * @author Js
 */
//2.1*************************************************************
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    if(arr.constructor==Array){
    	return true;
    }else{
    	return false;
    }
    
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    if(fn.constructor==Function){
    	return true;
    }else{
    	return false;
    }
}
//了解值类型和引用类型的区别，了解各种对象的读取、遍历方式，并在util.js中实现以下方法：
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
    var clone=new Object();
    for(attr in src){
    	if((typeof src[attr])=='object'){
    		//console.log(src[attr]+"@#@"+attr);
    		clone[attr]=cloneObject(src[attr]);
    	}else{
    		clone[attr]=src[attr];
    		//console.log(clone[attr]+"@@"+attr);
    	}
    }
    return clone;
}

//学习数组、字符串、数字等相关方法，在util.js中实现以下函数
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var arr1=[];
    var t;
    for(var i=0;i<arr.length;i++){
    	if(arr1[arr[i]]==1){
    		arr[i]=arr[arr.length-1];
    		arr.pop();
    		i--;
    	}else{
    		arr1[arr[i]]=1;
    	}
    }
    return arr;
}



// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    var arr=str.split("");
    for(var i=0;i<arr.length;i++){
    	if(arr[i]==' '){
    		arr[i]='';
    	}
    }
    return arr.join('');
}



// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    // your implement
    for(var i=0;i<arr.length;i++){
    	fn(arr[i],i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var i=0;
	for(attr in obj){
		i++;
	}
	return i;
}


//学习正则表达式，在util.js完成以下代码
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var remail = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
    return remail.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var rephone=/1[3,5,8]{1}[0-9]{1}[0-9]{8}|0[0-9]{2,3}-[0-9]{7,8}(-[0-9]{1,4})?/ ;
    return rephone.test(phone);
}

//3.1**************************************************************
// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.setAttribute("class",newClassName);
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    var clas=element.getAttribute("class");
    clas=clas.replace(oldClassName,"");
    element.setAttribute("class",clas);
    //console.log(clas);
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentNode==siblingNode.parentNode;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var l=element.offsetLeft;
    var t=element.offsetTop;
    return {
    	x:l,
    	y:t
    	};
}
// your implement
//接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集。继续在你的util.js中完成以下任务：

// 实现一个简单的Query
function $(selector) {
	var reg=/#((?:[\w\u00c0-\uFFFF-]|\\.)+)\s+\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/;//子元素选择器
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
	reg=/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/;//id选择器
	if(reg.test(selector)){
		var idname=selector.replace("#","");
		return document.getElementById(idname);
	}
	reg=/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/;//类选择器
	if(reg.test(selector)){
		var classname=selector.replace(".","");
		if(document.getElementsByClassName){
			return document.getElementsByClassName(classname);
		}else{
			var list=[];
			var eles=document.all;
			for(var i=0;i<eles.length;i++){
				if(eles[i].getAttribute("class")!=null){
					eles[i].getAttribute("class").split(" ").join("-");
					if(eles[i].getAttribute("class").indexOf(classname)>=0){
					list.push(eles[i]);	
				    }
				}
			}
			return list;
		}
	}
	reg=/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/;//标签选择器
	if(reg.test(selector)){
		return document.getElementsByTagName(selector);
	}
	reg=/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/;//属性选择器
	var list=[];
	if(reg.test(selector)){
		var reg1=/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*\]/;
		if(reg1.test(selector)){
			var attr=selector.replace("\"","");
			attr=attr.replace("\[","");
			attr=attr.replace("\]","");
			var eles=document.all;
			for(var i=0;i<eles.length;i++){
				if(eles[i].getAttribute(attr)){
					//console.log(attr);
					list.push(eles[i]);
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
			var eles=document.all;
			for(var i=0;i<eles.length;i++){
				if(eles[i].getAttribute(attr)==value){
					//console.log(attr);
					list.push(eles[i]);	
				}
			}
		}
		return list;
	}
}
//4.1**************************************************************
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if(element.addEventListener){
    	element.addEventListener(event,listener,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+event,listener);
    }else{
        element["on"+event]=listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    // your implement
    if(element.removeEventListener){
    	element.removeEventListener(event,listener,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+event,listener);
    }else{
        element["on"+event]=null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    addEvent(element, "keyup", prepare);
    var e=window.event||event;
    prepare=function(e){
    	if(e.keyCode==13){
    		listener(e);
    	}else{
    		
    	}
    };
}

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    // your implement    没看懂什么意思>.<
    each(element.getElementsByTagName(tag),function(item){
    	addEvent(item,eventName,listener);
    });
}

//$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
//估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变：

$.on=function(selector,event, listener){
	each($(selector),function(item){
    	addEvent(item, event, listener);
    });
};

$.click=function(selector, listener){
	each($(selector),function(item){
    	addClickEvent(item, listener);
    });
}; 
$.un=function(selector, event, listener){
	each($(selector),function(item){
    	removeEvent(item, event, listener);
    });
};

$.delegate=function(selector, tag, event, listener){
	each($(selector).getElementsByTagName(tag),function(item){
    	addEvent(item,event,listener);
    });
};
//5.1****************************************************************
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	if(navigator.userAgent.indexOf("MSIE")>0){
		return true;
	}else{
		return false;
	}
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=cookieName+ "=" +escape(cookieValue)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    if (document.cookie.length>0){
    	c_start=document.cookie.indexOf(cookieName + "=");
  		if (c_start!=-1){ 
    		c_start=c_start + cookieName.length+1 ;
    		c_end=document.cookie.indexOf(";",c_start);
    		if (c_end==-1){
    			c_end=document.cookie.length;
    		}
    	return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
}
//6.1**********************************************************
function ajax(url, options) {
    // your implement
    var xmlhttp;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var obj=options["data"],str="";
    for(p in obj){
    	str+=p+"="+obj[p]+"&";
    }
    var way="get";
    if(options["type"]){
    	way=options["type"];
    }
    xmlhttp.open(way,url+"?"+str,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function(){
   		if (xmlhttp.readyState==4 && xmlhttp.status==200){
    		options["onsuccess"](xmlhttp.responseText,xmlhttp);
    	}else{
    		if(options["onfail"]){
    			options["onfail"](xmlhttp.responseText,xmlhttp);
    		}
    	}
    };
}
