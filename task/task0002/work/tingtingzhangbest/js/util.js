/*建立自己的小型jQurey库*/
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
   return arr instanceof(Array);
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return  typeof (fn) == "function";
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var res = [],hash = {};
    for(var i=0,elem;(elem = arr[i]) !=null;i++)
    {
    	if(!hash[elem])
    	{
    		res.push(elem);
    		hash[elem] = true;
    	}
    }
    return res;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    var i;
    //头部进行检测空格
    for(i = 0;i<str.length;i++)
    {
    	if(str.charAt(i)!=' '&&str.charAt(i)!=' 	')
    	{
    		break;
    	}
    }
    str=str.substring(i,str.length);
    //尾部进行检测空格
    for(i=str.length-1;i>=0;i--)
    {
    	if(str.charAt(i)!=' '&&str.charAt(i)!=' 	')
    	{
    		break;
    	}
    }
    str=str.substring(0,i+1);
    return str;
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i =0;i < arr.length;i++)
    {
    	fn.call(this,arr[i],i);
    }
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) 
{
	var count = 0,content;
	for(content in obj)
	{
		count++;
	}
	return count;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var address = /([a-zA-Z0-9_]{5,25})+\@+([a-zA-Z0-9]{1,3})+\.+([a-zA-Z0-9]{2,4})/g;
    return address.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
     var tele = /1[3458]\d{9}/g;
     return tele.test(phone);
}
//console.log(isMobilePhone(13121172026));
//console.log(isEmail('1182310101@qq.com'));
//console.log(isEmail('tingtingzhang_best@163.com'));


//任务三
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    elememt.className=elememt.className + " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var classNames = elememt.className.split(/\s+/);  //类名拆分成数组
    var pos = -1;                                     //找到要删除的类名
        i;
        len;
    for(i=0,len=classNames.len;i<len;i++)
    {
        if(classNames[i] == oldClassName)
        {
            pos = i;
            break;
        }
    }
    classNames.splice(i,1);                         //删除类名
    elememt.className = classNames.join(" ");       //类名拼成字符串并重新设置
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) 
{
    var nodeList = elememt.parentNode.childNodes;
    for(var i=0;i<nodeList.length;i++)
    {
        if(nodeList[i] == siblingNode)
           {
                return true;
           } 
    }
    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
     var top = document.documentElement.clientTop;
     var left = document.documentElement.clientLeft;
     var x = element.getBoundingClientRect().left-left;
     var y = element.getBoundingClientRect().top-top;
     return
     {
      x,y
     }
 }

// 实现一个简单的Query
function $(selector)
{
    if(selector === null || selector === undefined)
    {
        return document;
    }
    var selectors = selector.split(/\s+|\t+/);
    var domObject = document;
    for(var i = 0;i<selectors.length;i++)
    {
        var temp;
        //ID选择器
        if(selectors[i].indexOf("#") === 0)
        {
            temp = selectors[i].replace("#","");
            domObject = domObject.getElementById(temp);
        }
        //标签选择器
        else if((selectors[i].indexOf(".") != 0) && (selectors[i].indexOf("[") !=0))
        {
            temp = selectors[i];
            domObject = domObject.getElementsByTagName(temp)[0];
        }
        //类选择器
        else if(selectors[i].indexOf(".") == 0)
        {
            temp = selectors[i].replace(".","");
            domObject = domObject.getElementsByClassName(temp);  //必须改一下，没有实现
        }
    }
    return domObject;
}

// 可以通过id获取DOM对象，通过#标示，例如
//$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
//$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
//$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
//$("[data-log]"); // 返回第一个包含属性data-log的对象

//$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
//$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

//任务4

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener)
    {
        element.addEventListener(event,listener,false);
    }
    else
    {
        element.attachEvent("on"+event,listener);
    }
}

// 例如：
//function clicklistener(event) {
 //   ...
//}
//addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(listener)
    {
        if(element.removeEventListener)
        {
            element.removeEventListener(event,listener,false);
        }
        else
        {
            element.detachEvent("on"+event,listener);
        }
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
     if(element.addEventListener)
    {
        element.addEventListener("click",listener,false);
    }
    else
    {
        element.attachEvent("onclick",listener);
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    if(element.addEventListener)
    {
        element.addEventListener("keydown",function(event){
            var theEvent = event || window.event;
            if(theEvent.keyCode == 13){
                listener();
            }
        },false);
    }
    else
    {
        element.attachEvent("onkeydown",function(event){
            var theEvent = event || window.event;
            if(theEvent.keyCode == 13){
                listener();
            }
        });
    }
}

function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(e){
        e =e || window.event;
        var target = e.src.Element ? e.srcElement : e.target;
        //标签代理
        if(tag.indexOf(".")===-1)
        {
            var targetName = target.nodeName.toLowerCase();
            if(targetName == tag){
                listener(e);
            }
        }
        //对类进行代理
        else{
            var targetClassName = target.className;
            var className =tag.replace(".","")
            if(tergetClassName.indexOf(className)!==-1){
                listener(e);
            }
        }
    });
}


$.on =function(selector, event, listener) {
    var element = $(selector);
    addEvent(elememt,event,listener);
    return this;
};

$.click =function(selector, listener) {
    var element = $(selector);
    addClickEvent(elememt,event,listener);
    return this;
}

$.un =function(selector, event, listener) {
    var element = $(selector);
    removeEvent(elememt,event,listener);
    return this;
}

$.delegate =function(selector, tag, event, listener) {
    var element = $(selector);
    delegateEvent(element, tag, event, listener);
    return this;
}

//任务5

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = window.navigator.userAgent;
    var msie = us.indexOf("MSIE ");
    if(msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11./)){
        return true;
    }
    else{
        return false;
    }
}
// 设置cookie
//function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
//}

// 获取cookie值
//function getCookie(cookieName) {
    // your implement
//}


//任务6
function ajax(url, options) {
    var xmlhttp,
        type = options.type?options.type:"get",
        data = options.data?options.data:"",
        onsuccess = options.onsuccess,
        onfail = options.onfail?options.onfail:function(err){console.log(err);};
 
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState == 4){
            if(xmlhttp.status == 200){
                onsuccess(xmlhttp.responseText,xmlhttp);
            }
            else{
                onfail(xmlhttp.responseText,xmlhttp);
            }
        }
    };
    xmlhttp.open(type,url,true);
    xmlhttp.send();
}