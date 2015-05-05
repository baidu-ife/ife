/**
 * [isArray 判断arr是否为数组]
 * @param  {[type]}  arr [description]
 * @return {Boolean}     [若返回true说明arr是数组，返回false说明不是]
 */
function isArray(arr){
	if(arr instanceof Array){
		return true;
	}
	return false;
}
// var arr = [1,2,3,4];
// console.log(isArray(arr));  //true
/**
 * [isFunction 判断fn是否为函数]
 * @param  {Function} fn [description]
 * @return {Boolean}     [若返回1说明arr是函数，返回false说明不是]
 */
function isFunction(fn){
	if(fn instanceof Function){
		return true;
	}
	return false;
}
var fn = function(){
	var add;
	add++;
};
//console.log(isFunction(fn)); //1

/**
 * [cloneObject 深度克隆对象]
 * @param  {[type]} src [源对象]
 * @return {[type]}     [返回克隆后的对象]
 */
function cloneObject(src){
	var result,i,j;
	if(typeof(src) != "object" || src === null) //若src为空或者不是对象，返回src
		return src;
	if(src instanceof Array){//若src为数组
		result = [];     //将result建为数组
		i = 0; j = src.length;
		for(;i < j; i++){
			if(typeof(src[i]) == "object" && src[i] != null){  //因为null的类型是对象，这里判断src[i]的类型
				result[i] = arguments.callee(src[i]);    //利用callee函数实现递归
			}else{
				result[i] = src[i];
			}
		}
	}else{
		result = {};
		for(i in src){
			if(typeof(src[i]) == "object" && src[i] != null){
				result[i] = arguments.callee(src[i]);
			}else{
				result[i] = src[i];
			}
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
    }
};
// var abObj = srcObj;
// var tarObj = cloneObject(srcObj);

// srcObj.a = 2;
// srcObj.b.b1[0] = "Hello";

// console.log(abObj.a);  //2
// console.log(abObj.b.b1[0]); //Hello

// console.log(tarObj.a);      // 1
// console.log(tarObj.b.b1[0]);    // "hello"

/**
 * [uniqArray 对数组进行去重操作]
 * @param  {[type]} arr [原始数组]
 * @return {[type]}     [去重后的数组]
 */
function uniqArray1(arr){
	var tmp = [];
	var len = arr.length;
	for(var i=0;i<len;i++){//两层循环，效率比较低
		for(var j=i+1;j<len;j++){
			if(arr[i] === arr[j]){
				j=++i;
			}
		}
		tmp.push(arr[i]);
	}
	return tmp;
}
// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray1(a);
// console.log(b); // 返回的是[1,7,5,3]与原始的顺序不同

function uniqArray2(arr){
	var tmp = [];
	var len = arr.length;
	for(var i=0;i<len;i++){
		if(tmp.indexOf(arr[i]) == -1){//若当前项不在tmp中，则加入其中
			tmp.push(arr[i]);
		}
	}
	return tmp;
}
// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray2(a);
// console.log(b); // 返回[1,3,5,7]

function uniqArray3(arr){ //利用hash表
	var tmp = [];
	var hash = {};
	var len = arr.length;
	for(var i=0;i<len;i++){
		if(!hash[arr[i]]){//如果hash表中没有当前项,存入其中
			hash[arr[i]] = true;
			tmp.push(arr[i]);
		}
	}
	return tmp;
}
//var a = [1, 3, 5, 7, 5];
//var b = uniqArray2(a);
//console.log(b); // 返回[1,3,5,7]

/**
 * [trim 去除字符串中首尾两端的空格]
 * @param  {[type]} str [原字符串]
 * @return {[type]}     [去除空格后字符串]
 */
function trim(str){
	var whitespace = ' \n\t\r'; //  '\n'换行，'\t' tab键，'\r'回车
	var len = str.length;
	for(var i=0; i<len; i++){
		if(whitespace.indexOf(str.charAt(i)) === -1){
			str =str.substring(i);
			break;
		}
	}

	for(i = len-1; i>=0; i--){
		if(whitespace.indexOf(str.charAt(i)) === -1){
			str = str.substring(0,i+1);
			break;
		}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
//var str = '   hi!  ';
//console.log(str);
//str = trim(str);
//console.log(str); // 'hi!'

/**
 * [each 实现遍历数组]
 * @param  {[type]}   arr [要遍历的数组]
 * @param  {Function} fn  [数组中每个元素要执行的函数，并将数组的索引和元素作为参数传递]
 * @return {[type]}       [description]
 */
function each(arr,fn){
	var len = arr.length;
	if(len<1)
		return;
	for(var i = 0; i<len;i++){
		if(arr[i]){
			fn(arr[i],i);
		}
	}
}

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item);
}
//each(arr, output);  // java, c, php, html

// 使用示例
var arr1 = ['java', 'c', 'php', 'html'];
function output1(item, index) {
    console.log(index + ': ' + item);
}
//each(arr1, output1);  // 0:java, 1:c, 2:php, 3:html

/**
 * [getObjectLength 获取对象里面第一层元素的数量]
 * @param  {[type]} obj [原始对象]
 * @return {[type]}     [第一层元素的数量]
 */
function getObjectLength(obj){
	var len=0;
	for(var item in obj){
			len++;
	}
	return len;
}
// 使用示例
var obj = {
    a: 1,
    b: 2,
    d: 3,
    c: {
        c1: 3,
        c2: 4
    }
};
//console.log(getObjectLength(obj)); // 4

/**
 * [isEmail 判断是否为邮箱地址]
 * @param  {[type]}  emailStr [输入的字符串]
 * @return {Boolean}          [返回true说明是邮箱地址，否则不是]
 */
function isEmail(emailStr){
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; 
	return reg.test(emailStr); 
}
// var email = "notail.wu@qq.com";
// console.log(isEmail(email));

function isMoblePhone(phone){
	var reg = /^((\+?86)|(\(\+86\)))?(13[012356789]\d{8}|15[012356789]\d{8}|18[02356789]\d{8}|147[0-9]{8}|1349\d{7})$/;
	return reg.test(phone);
}
// var phone = 13956874501;
// console.log(isMoblePhone(phone));

/**
 * 为element增加一个样式名为newClassName的新样式
 * @param {[type]} element      [元素]
 * @param {[type]} newClassName [新的类名]
 */
function addClass(element,newClassName){
	if(!element)
		return;
	element.className += " "+newClassName;
}
//var element = document.getElementById("h1");
//addClass(element,"c2");

function removeClass(element,oldclass){
	if(!element)
		return;
	var eleClassName = element.className;
	if(eleClassName.length == 0)  //若该元素不包含类，返回
		return;
	if(eleClassName == oldclass){//若该元素只包含一个oldclass类名
		element.className = "";
		return;
	}
	if(eleClassName.match(new RegExp("(^|\\s)"+oldclass+"(\\s|$)"))){
		element.className = eleClassName.replace((new RegExp("(^|\\s)"+oldclass+"(\\s|$)"))," ");
	}
}
//removeClass(element,"c1");

/**
 * [isSiblingNode 判断siblingNode和element是否为同一个父元素下的同一级的元素]
 * @param  {[type]}  element     [description]
 * @param  {[type]}  siblingNode [description]
 * @return {Boolean}             [返回bool值]
 */
function isSiblingNode(element,siblingNode){
	if(!element || !siblingNode)
		return false;
	if(element.nextSibling == null && element.previousSibling == null){
		return false;
	}
	while(element.nextSibling != null){
		if(element.nextSibling == siblingNode){
			return true;
		}
		element = element.nextSibling;
	}
	while(element.previousSibling != null){
		if(element.previousSibling == siblingNode){
			return true;
		}
		element = element.previousSibling;
	}
	return false;
}
// var element = document.getElementById("addbtn");
// var siblingNode = document.getElementsByTagName("h3");
// console.log(isSiblingNode(element,siblingNode));

/**
 * [getPosition 获取element相对于浏览器窗口的位置]
 * @param  {[type]} element [description]
 * @return {[type]}         [返回一个对象{x,y}]
 */
function getPosition(element){
	var actualLeft = element.offsetLeft;
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while(current!==null){
		actualLeft += current.offsetLeft;
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	var pos = {};
	pos.x = actualLeft;
	pos.y = actualTop;
	return pos;
}
//var element = document.getElementById("h1");
//console.log(getPosition(element));


/**
 * [$ 实现一个简单的jQuery]
 * @param  {[type]} selector [description]
 * @return {[type]}          [description]
 */

function $(selector){
    if(selector === undefined ) return;
    var getArr = function(name,tagName,attr){
            var tagName = tagName || '*',
                eles = document.getElementsByTagName(tagName),
                clas = (typeof document.body.style.maxHeight === "undefined") ? "className" : "class";//ie6
                attr = attr || clas,
                Arr = [];
            for(var i=0;i<eles.length;i++){
            	if(eles[i].getAttribute(attr) == name){               	
               		return eles[i];
             	}
            }
            //return Arr;
        };
   
    if(selector.indexOf('#') === 0){  //#id 
       return document.getElementById(selector.substring(1));
    }else if(selector.indexOf('.') === 0){  //.class
       return getArr(selector.substring(1));
     }else if(selector.match(/=/g)){  //attr=name
       return getArr(selector.substring(selector.search(/=/g)+1,-1),null,selector.substring(1,selector.search(/=/g)));
     }else if(selector.match(/\[/)){//attr
     	return getArr(selector.substring(1,-1));
     }else if(selector.match(/./g)){ //tagName.className
      return getArr(selector.split('.')[1],selector.split('.')[0]);
    }
  }
// console.log(e1);

//给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element,event,listener){
	if(!element || typeof element == "undefined")
		return;
	element.addEventListener(event,listener,false);
}
function clicklistener(event){
	console.log("clicked!");
}
//移除element对象对于event事件发生时执行listener的响应
function removeEvent(element,event,listener){
	if(!element || typeof element == "undefined")
		return;
	element.removeEventListener(event,listener,false);
}
//addEvent($("#addbtn"),"click",clicklistener);

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    if(!element || typeof element == "undefined")
    	return;
    element.onclick = function(event){
    	if(event){
    		listener();
    	}
    };
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    if(!element || typeof element == "undefined")
    	return;
    element.onkeydown = function(event){
    	if(event && event.keyCode == 13){
    		listener();
    	}
    };
}
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;


//事件代理
function delegateEvent(element,tag,eventName,listener){
	if(!element || typeof element == "undefined")
    	return;
    element["on"+eventName] = function(event){
    	event = event || window.event;
    	var target = event.target || event.srcElement;
    	if(target.tagName.toLowerCase() == tag){
    		listener();
    	}
    };	
}
$.delegate = delegateEvent;
$.delegate($("#list"), "li", "click", clicklistener);


//BOM操作
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	var ua = navigator.userAgent;
	if(/MSIE ([^;]+)/.test(ua)){
		return "IE "+RegExp["$1"];
	}else{
		return -1;
	}

}
//console.log(isIE());

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
	var now = new Date();
	var invalidTime = now.toUTCString(now.setDate(now.getDate() + expiredays));
    document.cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue) +"; expires = invalidTime";
}
// 获取cookie值
function getCookie(cookieName) {
    var cookieValue = "",
        cookieName = encodeURIComponent(cookieName) + "=",   
    	cookieStart = document.cookie.indexOf(cookieName);
    if(cookieStart > -1){
    	var cookieEnd = document.cookie.indexOf(";",cookieStart);
    	if(cookieEnd == -1){
    		cookieEnd = document.cookie.length;
    	}
    	cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
    }
    return cookieValue;

}
//Ajax方法
function ajax(url,options){
	var xhr;
	if(XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); //IE6以下
	}
	var type = (!!options.type && typeof options.type != "undefined") ? options.type : "post";
	var data = "";
	if(typeof options.data === "object"){
		for(var items in options.data){
			data += items + "=" + options.data[items] + "&";
		}
	}
	data = data.slice(0,-1); //去除最后一个多余的"&"
	if(type.toLowerCase() === "post" || type.toLowerCase() === "get"){
		if(type.toLowerCase() === "post"){//post方式
		xhr.open(type,url);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(data);
		}else if(type.toLowerCase() === "get"){
			url += "?"+data;
			xhr.open(type,url);
			xhr.send();
		}
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status === 200){
					var requestText = xhr.responseText;
					// console.log(requestText);
					options.onsuccess(requestText,xhr);
				}else{
					if(!options.onfail && typeof option.onfail ==="undefined"){
						options.onfail();
					}else{
						alert('发生错误'+request.status);
					}
				}
			}
		}
	}else{
		alert("type必须为post或者get");
	}

}
/*
var options = {
        type: "get",
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        },
        onfail: function(){
        	console.log("error");
        }
};*/
//ajax("ajax.php",options);