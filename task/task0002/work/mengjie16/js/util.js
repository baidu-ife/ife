/**
 * Created by dell on 2015/5/5.
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    //return (arr instanceof Array);//method 1

    //method 2 Object.prototype.toString.call
    var getType=Object.prototype.toString;//注意toString不能加括号（）
    return getType.call(arr)==="[object Array]";//也可以用==号
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    return (fn instanceof Function);
}

/***test2**/
//了解值类型和引用类型的区别，了解各种对象的读取、遍历方式，并在util.js中实现以下方法
//// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等

function cloneObject(src) {
    // your implement
    if(typeof src!="object"){
        return src;
    }else {
        if (src instanceof Array){
            var arr=[];
            for ( var i= 0,len=src.length;i<len;i++){
                arr.push(src[i]);
            }
            return arr;
        }else{

            var o = {};
            for (var j in src) {
                o[j] = cloneObject(src[j]);
            }
            return o;
        }
    }
}

/*************test3***********/

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var res=[];
    var json={};
    for ( var i=0;i<arr.length;i++){
        if(!json[arr[i]]){
            res.push(arr[i]);
            json[arr[i]]=1;

        }
    }
    return res;
}

/*// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]*/

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
  for(var i=0;str.charAt(0)==" ";i++){
            str=str.substring(1,str.length);
    }
    console.log(str.length);
  for(var j=str.length;j>0;j--){
      if(str.charAt(str.length-1)==" "){//str长度还是可变的，因为下一句赋给了str，str在变
        str=str.substring(0,str.length-1);
        console.log(str.length);
      }else{
          break;
      }
    }
    return str;

}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    return str.replace(/^\s+|\s+$/g,'');
}

/*// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'*/

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
/*    if(!fn){
        return null;
    }
    arr.forEach(fn);*/
    if(!fn)
        return ;
    if(arr instanceof  Array){
        for (var i=0;i<arr.length;i++){
            fn(arr[i],i);
        }
    }
}

// 其中fn函数可以接受两个参数：item和index

/*// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html*/

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
   return Object.keys(obj).length;

}

/*// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3*/



// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    re=/^\w+(\.)*\w*[a-zA-Z0-9]+@(\w[\.]*)+[\.\w]+$/i;
    //re=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
   if(!re.test(emailStr)){
       alert("correct your email");
       return false;
   } else {
       alert("right");
       return true;
   }
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    re=/^1[0-9]{10}/i;
    //re=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    if(!re.test(phone)){
        alert("correct your phone");
        return false;
    } else {
        alert("right phone");
        return true;
    }
}

/**task3*************************************************/
/*test1*/
// 为element增加一个样式名为newClassName的新样式
/*function addClass(element, newClassName) {
    // your implement array.indexof es5
    //先split(" ")分割然后再通过indexOf( className)判断是否重复，最后在join(" " )拼接回来？
   if(!Array.indexOf){
       Array.prototype.indexOf=function(obj){
           for(var i=0;i<this.length;i++){
               if(this[i]==obj){
                   return i;
               }
           }
           return -1;
       }
   }
    if(new RegExp('(\\s^|)'+newClassName+('\\s|$'),'gi').test(element.className)) {
        element.className+=' '+newClassName;
    }
}*/
//为dom增加一个样式名为newClassName的样式
function addClass(element, newClassName) {
    if(!Array.indexOf){
        Array.prototype.indexOf=function(obj){
            for(var i=0;i<this.length;i++){
                if(this[i]==obj){
                    return i;
                }
            }
            return -1;
        }
    }
    if (element.className === null || element.className === "") {
        element.className = newClassName;
    }
    else {
        if (element.className.indexOf(newClassName) === -1) {
            element.className += " " + newClassName;
        }
    }
}

//移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    var oldClass = element.className.split(/\s+|\t+/);
    var newClass = [];
    for (var i = 0; i < oldClass.length; i++) {
        if (oldClass[i] !== oldClassName) {
            newClass.push(oldClass[i]);
        }
    }
    element.className = newClass.join(" ");
}
/*// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    reg=new RegExp('(^| )'+oldClassName+(' |$'),'gi');
    if(new RegExp('(^| )'+oldClassName+(' |$'),'gi').test(element.className)) {
        element.className=element.className.replace(reg,'');
    }


}*/

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return (element.parentNode==siblingNode.parentNode);

}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var pos={x:0,y:0};
    var offy=element.offsetTop;
    var offx=element.offsetLeft;
    if(element.offsetParent!=null){
        offx+=getPosition(e.offsetParent).x;
        offy+=getPosition(e.offsetParent).y;
        pos={x:offx, y:offy};
}

    return pos;
}
// your implement
/***test2*****/
//接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，
// 在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：

// 实现一个简单的Query
function $(selector) {
    var sel=selector.split(" ");
    var name=null;
    var val=null;
    var el=document;
    var re=/^\[(\w+[\-]*\w*)\]$/i;
    var re2=/^\[(\w+[\-]*\w*)=(\w+)\]$/i;
    for (var i=0;i<sel.length;i++){
        var eachSel=sel[i];
        var type=eachSel[0];
        if(type=='.'){
            if(el==document){
                name=eachSel.substr(1,eachSel.length-1);
                el= document.getElementsByClassName(name)[0];
            }else {
                var els=el.childNodes;
                for(var l=0;l<els.length;l++){
                    name=eachSel.substr(1,eachSel.length-1);
                    if(els[l].className==name){
                        el=els[l];
                        break;
                    }
                }
            }

        }else if(type=='#'){
            name=eachSel.substr(1,eachSel.length-1);
            el= document.getElementById(name);
        }
        else if(type =="["){
            var eles = document.getElementsByTagName("*");
            for(var j=0;j<eles.length;j++){
                if(re.test(eachSel)){//没有等号
                    var match=re.exec(eachSel);
                    name=match[1];
                    if(eles[j].getAttribute(name)){//存在data-log属性
                        el=eles[j];
                        break;
                    }
                }
                else{
                     var match2=re2.exec(eachSel);
                     name=match2[1];
                     val=match2[2];
                     if(val==eles[j].getAttribute(name)){
                         el=eles[j];
                         break;
                     }
                }
            }
        }else{
            name=eachSel;
            el=document.getElementsByName(name)[0];
        }
    }
 return el;
}

/*
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
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象*/


/***************task4****************/

/*test1*/
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    }else{
        element.attachEvent("on"+event,listener);
    }

}

/*// 例如：
function clicklistener(event) {

}
addEvent($("#doma"), "click", a);*/

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement

    if(element.removeEventListener){
        element.removeEventListener(event,listener,false);
    }else{
        element.detachEvent("on"+event,listener);
    }
}
//接下来我们实现一些方便的事件方法
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    if(element.addEventListener){
        element.addEventListener("click",listener,false);
    }else{
        element.attachEvent("onclick",listener);
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    if(element.addEventListener){
        element.addEventListener("keydown",function(event){
            if(event.keyCode==13){
                listener();
            }
        },
           false);
    }else{
        element.attachEvent("onkeydown",function(event){
            if(event.keyCode==13){
                listener();
            }
        });
    }
}

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    // your implement
    /*addEvent(element,eventName,function(e){
        e=e||window.event;
        var target= e.srcElement? e.srcElement: e.target;
        if(tag.indexOf('.')===-1){
            var targetName=target.nodeName.toLowerCase();
            if(targetName===tag){
                listener(e);
            }
        }else{
            var targetClassName=target.className;
            var className=targetClassName.replace('.','');
            if(targetClassName.indexOf(className)!==-1){
                listener(e);
            }
        }
    })*/
    $.on(element,eventName,function(e){
        if(this.nodeName.toLowerCase()===tag){
            listener.call(this,e);
        }
    });
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
//$.delegate($("#list"), "li", "click", clickHandle);

//addEvent(element, event, listener) -> $.on(element, event, listener);
//removeEvent(element, event, listener) -> $.un(element, event, listener);
//addClickEvent(element, listener) -> $.click(element, listener);
//addEnterEvent(element, listener) -> $.enter(element, listener);
$.on=function(selector,event,listener){
    var element=$(selector);
    addEvent(element,event,listener);
    return this;//为什么return this?
};
$.un=function(selector,event,listener){
    var element=$(selector);
    removeEvent(element,event,listener);
    return this;
};
$.click=function(selector,listener){
    var element=$(selector);
    addClickEvent(element,listener);
    return this;
};
$.enter=function(selector,listener){
    var element=$(selector);
    addEnterEvent(element,listener)
};


/**
 * 5.BOM
 *
*/
 // 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var agent = navigator.userAgent.toLowerCase();

    var regStr_ie = /msie [\d.]+;/gi;
    /*   var regStr_ff = /firefox\/[\d.]+/gi;
     var regStr_chrome = /chrome\/[\d.]+/gi ;
     var regStr_saf = /safari\/[\d.]+/gi ;*/
//IE
    if (agent.indexOf("msie") > 0) {
        return agent.match(regStr_ie);
    }
}
/*//firefox
    if(agent.indexOf("firefox") > 0)
    {
        alert( agent.match(regStr_ff)) ;
    }

//Chrome
    if(agent.indexOf("chrome") > 0)
    {
        alert(agent.match(regStr_chrome));
    }

//Safari
    if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
    {
        alert(agent.match(regStr_saf)) ;
    }
 */


 // 设置cookie
 function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
     var exdate=new Date();
     exdate.setDate(exdate.getDate()+expiredays);

     document.cookie=cookieName+"="+escape(cookieValue)+(expiredays==null?"":";expires="+exdate.toGMTString());
}

 // 获取cookie值
 function getCookie(cookieName) {
    // your implement
     if(document.cookie.length>0){
         c_start=document.cookie.indexOf(cookieName+"=");
         if(c_start!=-1){
             c_start=c_start+cookieName.length+1;
             c_end=document.cookie.indexOf(";",c_start);
             if(c_end==-1) c_end=document.cookie.length;
             return unescape(document.cookie.substring(c_start,c_end));
         }
     }
     return "";
}
/**6 AJAX*/
//
function ajax(url, options) {
    // your implement
    options.type=options.type||"GET";
    options.data=options.data||"username=mj&pswd=1234";
    options.onsuccess=options.onsuccess||function(msg){};
    options.onfail=options.onsuccess||function(msg){};
    var xmlhttp;
    var target =url;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var encodeFromData=function(data){
        var pairs=[];
        if(typeof data ==="string"){
            return data;
        }else if(typeof  data ==="object"){
            for(var i in data){
                if(data.hasOwnProperty(i)){
                    pairs.push(encodeURIComponent(i)+"="+encodeURIComponent(data[i].toString()));
                }
            }
            return pairs.join("&");
        }
    };
    if(options.type==="GET"){
        target=target+"?"+encodeFromData(options.data);
        xmlhttp.open(options.type,target,true);
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState==4&&xmlhttp.status==200){
                options.onsuccess(xmlhttp.responseText);
            }else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
                options.onfail();
            }
        };
        xmlhttp.send();
    }else if(options.type==="POST"){
        xmlhttp.open(options.type,url,true);
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                options.onsuccess(xmlhttp.responseText);
            } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
                options.onfail();
            }
        };
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlhttp.send(encodeFromData(options.data));
    }
}

// 使用示例：
