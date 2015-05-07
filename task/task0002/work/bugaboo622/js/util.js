//========2. JavaScript数据类型及语言基础=======

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr){
	return(arr instanceof Array);
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof(fn)=="function";
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(obj){
  if(typeof(obj)!="object"||obj===null){
        return obj;
    }
    var clone= obj instanceof(Array)?[]:{};
    for(var i in obj){
      if(typeof(obj[i])=="object" && obj[i]!=null){
        clone[i]=arguments.callee(obj[i]);
      }
      else{
        clone[i]=obj[i];
      }
    }
    return clone;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
   for(var i=0;i<arr.length;i++){
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function simpleTrim(str){
  while ((str.indexOf(" ")==0) && (str.length>1)){
    str=str.substring(1,str.length);
  }
  while ((str.lastIndexOf(" ")==str.length-1)&&(str.length>1)){
    str=str.substring(0,str.length-1);
  }
  if (str==" "){
    str="";
  }
  return str;
}
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g,'')
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn){
    var i;
  for(var i=0;i<arr.length;i++){
    fn.call(null,arr[i],i);
  }
} 
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
  var n=0;
  for(i in obj){
    n++
  }
  return n;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var re=/^\w+@[0-9a-z]+(\.[a-z]+){1,3}$/;
    return re.test(emailStr);
}
// 判断是否为手机号
function isMobilePhone(phone) {
    var re=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    return re.test(phone); 
}
//===========3. DOM=============

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {  
    if (!element.className.match(new RegExp('(\s|^)'+newClassName+'(\s|$)'))) {
    	element.className += " " + newClassName; 
    } 
}  
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (!element.className.match(new RegExp('(\s|^)'+oldClassName+'(\s|$)'))) {
        element.className = element.className.replace(new RegExp('(\\s|^)'+oldClassName+'(\\s|$)'),' ');
    }
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var eParent=element.parentNode;
    var sParent=siblingNode.parentNode;
    return eParent=sParent?true:false;
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var position = {x:0,y:0};
    var index=element;
 	while(index){
        position.x += index.offsetLeft;
        position.y += index.offsetTop;
        index = index.offsetParent;
    }
    return position;
}
// 实现一个简单的Query
function $(selector) {          
    var arr = selector.split(" ");
    var parentNode = null;
    var ele = null;
    var idExp = /^#[\w-]+$/;
    var attrExp = /^\[[\w\-=]+\]$/;
    var classExp = /^\.[\w\-]+$/;
    function getElementByAttributeValue (parent, attribute, value) {
	    if (parent) {
	        var allElements = parent.getElementsByTagName("*");
	    } else {
	        var allElements = document.getElementsByTagName('*');
	    }
	    console.log(allElements.length);
	    if (value) {
	        for (var i = 0; i < allElements.length; i++) {
	            if (allElements[i].getAttribute(attribute) == value) {
	                return allElements[i];
	            }
	        }
	    } else {
	        for (var i = 0; i < allElements.length; i++) {
	            if (allElements[i].getAttribute(attribute)) {
	                return allElements[i];
	            }
	        }      
	    }
	}

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].search(idExp) != -1) {
            var id = arr[i].slice(1);
            ele = document.getElementById(id);
        } else if (arr[i].search(classExp) != -1) {
            var classname = arr[i].slice(1);
            ele = parentNode ? parentNode.getElementsByClassName(classname)[0] : document.getElementsByClassName(classname)[0];
        } else if (arr[i].search(attrExp) != -1) {
            var index = arr[i].indexOf("=");
            if (index != -1) {
                var val = arr[i].slice(index+1, -1);
                var attr = arr[i].slice(1, index);
                ele = parentNode ? getElementByAttributeValue (parentNode, attr, val) : getElementByAttributeValue (null, attr, val);
            } else {
                var attr = arr[i].slice(1, -1);
                ele = parentNode ? getElementByAttributeValue (parentNode, attr,null) : getElementByAttributeValue (null, attr, null);
            } 
        } else {
            ele = parentNode ? parentNode.getElementsByTagName(arr[i])[0] : document.getElementsByTagName(arr[i])[0];
        }
        parentNode = ele;
    }
    return ele;
}
//===========4. 事件============
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
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
    if (e.keyCode == 13) {
        addEvent(element, "keyup", function(e){
            var e = e || window.event;
            listener.call(this);
        });
    }
}
// 把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

function delegateEvent(element, tag, eventName, listener) { 
    addEvent(element, eventName, function(event) {
        var e = event || window.event;
        var target = event.target || event.srcElement;
        if (target.nodeName.toLowerCase() == tag.toLowerCase()) {
            listener(e);
        }
    });
}
$.delegate = delegateEvent;
//估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变：
$.on = function (selector, event, listener) {
    addEvent($(selector), event, listener);
};

$.click = function (selector,listener) {
    addClickEvent($(selector),listener);
} 
$.un = function (selector, event, listener) {
    removeEvent($(selector), event, listener);
}

$.delegate = function (selector, tag, eventName, listener) {
    delegateEvent($(selector), tag, eventName, listener);
}


//=========5. BOM=================
// 判断是否为IE浏览器，返回-1或者版本号
function isIE () {
    if (window.ActiveXObject === undefined) return -1;
    if (!document.querySelector) return 7;
    if (!document.addEventListener) return 8;
    if (!window.atob) return 9;
    if (!document.__proto__) return 10;
    return 11;
}
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+expiredays);
    document.cookie=cookieName+'='+cookieValue;+';expires='+oDate.toGMTString();
}
// 获取cookie值
function getCookie(cookieName) {
    var arr1=document.cookie.split('; ');
    for (var i = 0;i<arr1.length;i++) {
    	var arr2=arr1[i].split('=');
    	if(arr2[0]==cookieName){
    		return decodeURI(arr2[1]);
    	}
	}
}
//=======6.ajax============
//学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
function ajax (url, option) { 
    var realUrl = "", realData, xmlhttp, isUrlData = false, type = "GET";
    if (option.type) {
        type = option.type;
    } 
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    if (option.data) {
        isUrlData = typeof option.data == Object ? false : true;
    }

    if (isUrlData) {
        realUrl = url + option.data;
        realData = "";
    } else {
        realUrl = url;
        realData = option.data;
    }

    if(xmlhttp != null) {
        xmlhttp.open(type,realUrl,true);
        xmlhttp.send(realData);        
        xmlhttp.onreadystatechange = function (){
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                this.call(onsuccess,xmlhttp.responseText,xmlhttp);
            } 
        };   
    }
    

    return xmlhttp;
}