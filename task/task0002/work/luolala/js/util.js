function isArray(arr){
    return Array.isArray(arr);
    /*或 return arr instanceof Array;
    或 return Object.prototype.toString.call(value)=="[object Array];"*/
}
function isFunction(fn){
    return typeof fn==='function';
    /*或return Object.prototype.toString.call(fn)=="[object RegExp]"*/
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ?
                cloneObject(obj[i]) : obj[i];
        }
    }
    return newobj;
}


// 测试用例：
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

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
//数组去重
//方法一
function uniqArray(arr){
    var n=[];//一个新的临时数组
    for(var i=0;i<arr.length;i++)//遍历当前数组
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，否则把当前项push到临时数组里面
        if(n.indexOf(arr[i])==-1)
            n.push(arr[i]);
    }
    return n;
}
//方法二
/*Array.prototype.unique2=function()
{
    var n={},r=[];//n为hash表，r为临时数组
    for(var i=0;i<this.length;i++)//遍历当前数组
    {
        if(!n[this[i]])//如果hash表中没有当前项
        {
            n[this[i]]=true;//存入hash表
            r.push(this[i]);//把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}
Array.prototype.unique3=function()
{
    var n=[this[0]];//结果数组
    for(var i=1;i<this.length;i++)//从第二项开始遍历
    {
        //如果当前数组的第i项在当前数组中第一次出现的位置不是i,
        //那么表示第i项是重复的，忽略掉。否则存入结果数组
        if(this.indexOf(this[i])==i)
            n.push(this[i]);
    }
    return n;
}
Array.prototype.unique4=function()
{
    this.sort();
    var re=[this[0]];
    for(var i=1;i<this.length;i++)
    {
        if(this[i]!==re[re.length-1])
        {
            re.push(this[i]);
        }
    }
    return re;
}*/
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement

    while((str.length>0)&&(str.charAt(0)==' '))
        str  =   str.substring(1, str.length);
    while((str.length>0)&&(str.charAt(str.length-1)==' '))
        str= str.substring(0, str.length-1);
    return str;
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    str = str.replace(/(^\s*)|(\s*$)/g,'');
    return str;
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    var i=0;
    for(i=0;i<arr.length;i++)
    {
        fn(arr[i],i);
    }
}
/*var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html*/

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
  return Object.keys(obj).length;
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
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
  var re=/\w+[\w.]*@[\w.]+\.\w+/;
   /*var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/*/
   return re.test(emailStr);
}
console.log(isEmail("1058217571@qq.com"));
console.log(isEmail("zhangyueluckier@qq.com"));
console.log(isEmail("1058217571@q.com"));
console.log(isEmail("1058217571@163.com"));
console.log(isEmail("zhangyueluckier@163.com"));


// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    re = /^1[3-9]\d{9}$/;
    return re.test(phone);
}

console.log(isMobilePhone(15933021105));
console.log(isMobilePhone(1593302110));
console.log(isMobilePhone(12432211134));


// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
// your implement

   if (!element) return;
    var elementClassName = element.className;
    if (elementClassName.length == 0)
    {
        element.className = newClassName;
        return;
    }
    if (elementClassName == newClassName || elementClassName.match(new RegExp("(^|\\s)" + newClassName + "(\\s|$)")))
        return;
    console.log(newClassName);
    element.className = elementClassName + " " + newClassName;

}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
// your implement
    if (!element) return;
    var elementClassName = element.className;
    if (elementClassName.length == 0) return;
    if(elementClassName == oldClassName)
    {
        element.className = "";
        return;
    }
    if (elementClassName.match(new RegExp("(^|\\s)" + oldClassName + "(\\s|$)")))
        element.className = elementClassName.replace((new RegExp("(^|\\s)" +oldClassName + "(\\s|$)"))," ");
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
// your implement
    if(!siblingNode.parentNode&&!element.parentNode)
    {    var chid=element.parentNode.firstElementChild;
         while(chid!=element.parentNode.lastElementChild)//IE9+以上支持
         {if (siblingNode == child)
                return true;
           chid=chid.nextSibling; }
    }
        return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
// your implement
    var x=element.scrollLeft;
    var y=element.scrollTop;
    return{x:x,y:y};
}
// your implement
// 实现一个简单的Query
function $(selector) {
var newSel=trim(selector);

var selFirst=newSel.substr(0,1);
 var   allElement=document.getElementsByTagName("*");
 switch(selFirst){
     case "#":
         return document.getElementById(newSel.substr(1));
        break;
     case".":
         return document.getElementsByClassName(newSel.substr(1))[0];
         break;
     case"[":
         var result;
         var position=newSel.indexOf("=");
         for(var i=0;i< allElement.length;i++)
         {
          if(newSel.indexOf("=")&&allElement[i].getAttribute(newSel.substring(1,position-1))==newSel.substring(position+1,newSel.length-1))
          { result=allElement[i];
         break;}
         else if(allElement[i].hasAttribute==newSel.substring(1,newSel.length-1))
          {result=allElement[i];
             break;}
             }



    default:
         return document.getElementsByTagName(newSel)[0];
        break;


 }
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
// your implement
    //console.log(element);
    if(element.addEventListener){
    element.addEventListener(event,listener,false);
    }else if(element.attachEvent){
       element.attachEvent("on"+event,listener);
    } else{
        element["on"+event]=listener;
    }
}

// 例如：
function clicklistener(event) {
//...//
}
//addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
// your implement
    if(element.removeEventListener){
        element.removeEventListener(event,listener,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+event,listener)

    }
    else{
        element["on"+event]=null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
//your implement
    addEvent(element,"click",listener);
}

// 实现对于按Enter键时的事件绑定
 function addEnterEvent(element, listener) {
// your implement
     document.onkeydown=function(event)
     {
         var e=event||window.event;
         if(e.keyCode==13)
         addEvent(element,"keyup",listener);
     }
}


//addEvent(element, event, listener) -> $.on(element, event, listener);
//removeEvent(element, event, listener) -> $.un(element, event, listener);
//addClickEvent(element, listener) -> $.click(element, listener);
//addEnterEvent(element, listener) -> $.enter(element, listener);


// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
// your implement
   $.on(element,eventName,function(){
       var e=event||window.event,
           target= e.srcElement? e.srcElement: e.target;
       if(target.tagName.toLowerCase()==tag)
       {
           listener();
       }
   });

}

$.delegate = delegateEvent;

// 使用示例// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
//$.delegate($("#list"), "li", "click", clickHandle);

//估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变：
$.on=function(selector, event, listener){
    // your implement
addEvent($(selector),event,listener);
};

$.click=function(selector, listener){
    // your implement
    addClickEvent(selector,listener);
};

$.un=function(selector, event, listener){
    // your implement
    removeEvent($(selector),event,listener);
};

//$.delegate(selector, tag, event, listener) {
    // your implement
//}

// 使用示例：
//$.click("[data-log]", logListener);
//$.delegate('#list', "li", "click", liClicker);

function isIE() {
    // your implement
    var ua=navigator.userAgent.toLowerCase();
    if(window.ActiveXObject)

      return ua.match(/mise([\d.]+)/)[1];
    else return -1;
}


//设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var cookieText=encodeURIComponent(cookieName)+"="+encodeURIComponent(cookieValue);
    if(expiredays instanceof Date){
        cookieText+=";expiredays="+expiredays.toGMTString();
    }

}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    var name=encodeURIComponent(cookieName)+"=",
        cookieStart=document.cookie.indexOf(name),
        cookieValue=null;
    if(cookieStart>-1){
        var cookieEnd=document.cookie.indexOf(";",cookieStart);
        if(cookieEnd==-1){
            cookieEnd=document.cookie.length;
        }
        cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
    }
    return cookieValue;
}
 function ajax(url, options) {
// your implement
     var xhr=new XMLHttpRequest();
     if(options.type)
     {
         xhr.open(options.type,url,false);
     }
     else xhr.open("get",url,false);
     xhr.send(options.data);
     if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
         options.onsuccess();
     }else{
         options.onfail();
     }
}

// 使用示例：
/*ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);*/

