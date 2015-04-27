function isArray(arr) {// 判断arr是否为一个数组，返回一个bool值
    if(arr instanceof Array) return true;
    else return false;
}

function isFunction(fn) {// 判断fn是否为一个函数，返回一个bool值
    if(typeof(fn)=="function") return true;
    else return false;
}

function cloneObject(src) {// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
    if (typeof(src) == "undefined") return;
    if (isArray(src)) {
      var res = [];
      for (var i in src) {
      res[i] = cloneObject(src[i]);
    };
    return res;
  } else if (isObject(src)) {
    var res = {};
    for (var i in src) {
      if (src.hasOwnProperty(i)) {
        res[i] = cloneObject(src[i]);
      }
    }
    return res;
  }
  return res;
}

function isObject(obj) {// 判断fn是否为一个Object，返回一个bool值
  return (typeof obj).toLowerCase() === "object";
}

function uniqArray(arr) {// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
    arr.sort();
    var arrt = []; 
    arrt.push(arr[0]);
    for(var x=0; ++x<arr.length;){
        if(arr[x]!=arr[x+1]) arrt.push(arr[x]);
    }
    return arrt;
}


function trim(str) {// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
    for(var x in str) {
      if(str[x]==" "||str[x]=="\t") continue;
      else break;
    }
    for(var y = str.length-1; y >= 0; y--) {
      if(str[y]==" "||str[y]=="\t") continue;
      else break;
    }
    return str.substring(x,++y);
}


function each(arr, fn) {// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
    for(x in arr) fn(arr[x], x);
}

function getObjectLength(obj) {// 获取一个对象里面第一层元素的数量，返回一个整数
	var t = 0;
	for(x in obj) t++;
	return t; 
}

function isEmail(emailStr) {// 判断是否为邮箱地址
    if(emailStr.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)) return true;
    else return false;
}


function isMobilePhone(phone) {// 判断是否为手机号
	phone+="";
    if(phone.match(/^1[0-9]{10}$/)) return true;
    else return false;
}

function addClass(element, newClassName) {// 为dom增加一个样式名为newClassName的新样式
	if(element.className=="") element.className = newClassName;
    else element.className+=" "+newClassName;
}

function removeClass(element, oldClassName) {// 移除dom中的样式oldClassName
	if(element.className.indexOf(" "+oldClassName)!==-1) element.className = element.className.replace(" "+oldClassName,"");
    else element.className = element.className.replace(oldClassName,"");
}

function isSiblingNode(element, siblingNode) {// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
    return element.parentNode == siblingNode.parentNode;
}

function getPosition(element) {// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
    var res={x:0,y:0};
    var temp=element;
    while(temp.offsetParent !== null && temp.offsetParent!==document.body){
        res.x+=temp.offsetLeft;
        res.y+=temp.offsetTop;
        temp=temp.offsetParent;
    }
    res.x+=temp.offsetLeft;
    res.y+=temp.offsetTop;
    return res;
  }

function $(selector,father) {// 实现一个简单的Query,只返回一个元素
  	if(arguments.length==1) var father = document;
  	if(!selector.match(/[A-Za-z0-9_]/)) return father;
    if(selector.match(/^#[A-Za-z0-9_]+\b/)) return $(selector.replace(selector.match(/^#[A-Za-z0-9_]+\b\s*/),""),father.getElementById(selector.match(/^#([A-Za-z0-9_]+)\b/)[1]));
    if(selector.match(/^.[A-Za-z0-9_]+\b/)) return $(selector.replace(selector.match(/^.[A-Za-z0-9_]+\b\s*/),""),father.getElementsByClassName(selector.match(/^.([A-Za-z0-9_]+)\b/)[1])[0]);
    if(selector.match(/^[A-Za-z0-9_]+\b/)) return $(selector.replace(selector.match(/^[A-Za-z0-9_]+\b\s*/),""),father.getElementsByTagName(selector.match(/^[A-Za-z0-9_]+\b/))[0]);
  	//然而getElementById(id).getElementById(id)并不能实现，所以到此为止想不出应该如何操作了

    if (selector.match(/\[[A-Za-z0-9_]+\]/)) {
        var attrArr = selector.match(/\[([A-Za-z0-9_]+)\]/)[1];
        if (selector.match(/\[([A-Za-z0-9_]+)=([A-Za-z0-9_]+)\]/)) var attrVal = selector.match(/\[([A-Za-z0-9_]+)=([A-Za-z0-9_]+)\]/)[2];
        else var attrVal = false;
        var allElements = father.getElementsByTagName('*');
        if (attrVal) {
            for (var x = 0; x < allElements.length; x++) if (allElements[x].getAttribute(attrArr) == attrVal) return allElements[x];
        } else {
            for (var x = 0; x < allElements.length; x++) if (allElements[x].getAttribute(attrArr) !== null) return allElements[x];
        }
    }
}

function addEvent(element, event, listener) {// 给一个dom绑定一个针对event事件的响应，响应函数为listener
 
    if (element.addEventListener) {
        element.addEventListener(event, listener, false); 
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener); 
    } else {
        element["on" + event] = listener; 
    } 
}

function removeEvent(element, event, listener) {// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
    if (listener) {
        if (element.removeEventListener) {
            element.removeEventListener(event, listener, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + event, listener);
        } else {
            element["on" + event] = null;
        }
    } else {
        element.parentNode.replaceChild(element.cloneNode(true), element);
    }
}

function addClickEvent(selector, handler) {// 实现对click事件的绑定
    addEvent(element,"click",listener);
}

function addEnterEvent(selector, handler) {// 实现对于按Enter键时的事件绑定
    addEvent(element,"keydown",function (e) {
        if(e.keyCode===13){
            listener.call(element,e);
        }
    });
}

function getSelectorType (selector) {// 判断一个选择器是什么类别
    var res={
        idSelector:0,
        classSelector:0,
        attrSelector:0,
        tagSelector:0
    };
    trim(selector);
    if(selector[0]=="#"){
        res.idSelector=1;
    }else if(selector[0]=="."){
        res.classSelector=1;
    }else if(selector.match(/\[[A-Za-z0-9_=]+\]/)){
        res.attrSelector=1;
    }else{
        res.tagSelector=1;
    }
    return res;
}

function delegateEvent(element, tag, eventName, listener) {
  //这个实在不会做了，援引自yyzych，但是依然没有理解内容
    element=element||document.body;
    $.on(element,eventName,function (e) {
        e=e||window.event;
        var target=e.target||e.srcElement;
        var filters=tag.split(" ");//要考虑多个选择器时怎么办
        for(var i=filters.length-1;i>=0;i--){
            var temp=filters[i].replace(/[#\.\[\]]/g,"");
            var selectorType=getSelectorType(filters[i]);
            if(selectorType.tagSelector===1){
                if(target.nodeName.toLowerCase()!==temp.toLowerCase()){
                    return;
                }
                listener.call(target,e);
            }else if(selectorType.idSelector===1){
                if(target.getAttribute("id")!==temp){
                    return;
                }
                listener.call(target,e);
            }else if(selectorType.classSelector===1){
                if(!hasClass(target, temp)){
                    return;
                }
                listener.call(target,e);
            }else if(selectorType.attrSelector===1){
                temp=temp.split("=");
                var key=temp[0],
                    val=temp.length>1?temp[1]:"";
                if(val&&val===target.getAttribute(key)){
                    listener.call(target,e);
                }else if(!val&&target.getAttribute(key)){
                    listener.call(target,e);
                }
                return;
            }
        }
    })
}
// 将事件添加到$中
$.on=function (selector,eventName,listener) {
    var element;
    if(typeof selector ==="string"){
        element=$(selector);
    }else if(typeof selector ==="object"){
        element=selector;
    }
    if(!element) return;
    addEvent(element,eventName,listener);
};
$.un=function (selector,eventName,listener) {
    var element;
    if(typeof selector ==="string"){
        element=$(selector);
    }else if(typeof selector ==="object"){
        element=selector;
    }
    if(!element) return;
    removeEvent(element,eventName,listener);
};

function isIE() {// 判断是否为IE浏览器，返回-1或者版本号
    if(navigator.userAgent.match(/msie ([\d.]+)/i)) return navigator.userAgent.match(/msie ([\d.]+)/i)[1];
    else return -1;
}

function setCookie(cookieName,cookieValue,expiredays)// 设置cookie
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=cookieName+ "=" +escape(cookieValue)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(cookieName)// 获取cookie值
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(cookieName + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + cookieName.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

function ajax(url, options) {// ajax
  xmlhttp=null;
  xmlhttp=new XMLHttpRequest();
  if(options.onsuccess) xmlhttp.onreadystatechange=options.onsuccess;
  if(options.data){
  	url += "?";
  	for(var s in options.data)
  		url += s + "=" + options.data.s + "&";
  }
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
}