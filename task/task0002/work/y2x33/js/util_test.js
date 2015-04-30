/**
 * Created by Y2X on 2015/4/20.
 */

//for task1,因为与下面的$()不兼容，所以暂时注释掉
/*
 function $(id){
 return document.getElementById(id);
 }

 function add(num1,num2){
 return num1+num2;
 }

 function renderResult(result){
 $("result").innerHTML=result;
 }

 function addEventHandle(){
 var num1 = $("number1").value;
 var num2 = $("number2").value;
 var result = add(num1,num2);
 renderResult(result);
 }

 function initEvent(){
 $("addbtn").addEventListener("click",addEventHandle,false);
 }
 initEvent();
 */

//for task2
function test_type_judge_method() {//自用，先无视
    var typeof_test = {
        mystr: "y2x",
        myint: 1,
        mybool: true,
        myundf: undefined,
        myfun: function () {},
        mynull: null,
        myarr: [1, 2, 3],
        myobj: {x: 1, y: 2}
    };
    //typeof
    for (var i in typeof_test) {
        console.log(i + ":" + typeof typeof_test[i]);
    }//object三种类型不能区分
    //instanceof
    //range.method.isPrototypeOf()
    //constructor
    //js权威指南chapter9 对象
}

function isArray(arr){
    return typeof arr == "object" &&
        Object.prototype.toString.call(arr) === "[object Array]";
}//js权威指南 P7.10

function isFunction(fn){
    if(typeof fn == "function"){
        return true;
    }
    else return false;
}

/*解值类型和引用类型的区别，了解各种对象的读取、遍历方式*/
function cloneObject(src){
    if(typeof(src)!="object" || src===null)//非对象：Number,String,Boolean,Null
        return src;

    //对"object"进行特殊处理
    //分为数组和非数组，因为符号不同
    if(src instanceof(Array)){//数组
        var o=[];
        for(var i=0;i<src.length;i++) {
            if(typeof(src[i])=="object" && src[i]!=null) {
                o[i]=arguments.callee(src[i]);//递归
            }
            else {
                o[i]=src[i];
            }
        }
    }
    else{//其他对象
        o={};
        for(i in src) {
            if(typeof(src[i])=="object" && src[i]!=null) {
                o[i]=arguments.callee(src[i]);//递归
            }
            else {
                o[i]=src[i];
            }
        }
    }
    return o;
}

//参考：http://qianduanblog.com/post/js-learning-30-object-clone-copy.html

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: [["hello","world"], "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0][0] = "Hello";
console.log("CLONE!!!");
console.log(abObj.a);
console.log(abObj.b.b1[0][0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0][0]);    // "hello"

/*学习数组、字符串、数字等相关方法*/
function uniqArray(arr){// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
    if (!Array.prototype.indexOf){//ie8，参考http://blog.csdn.net/xb12369/article/details/20922301
        Array.prototype.indexOf = function(elt /*, from*/){
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
    var arr_clone=[];
    for(var i=0;i<arr.length;i++){
        if(arr_clone.indexOf(arr[i])==-1)
            arr_clone.push(arr[i]);
    }
    return arr_clone;
}
// 使用示例
var a = [1,3,4,5,6,2,4,"a","a",9,0];
var b = uniqArray(a);
console.log(a);
console.log(b);

function trim(str){// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
    for(var i=0;i<str.length;i++){
        if(str.charAt(i)==" ")
            str=str.substring(i+1);
        else break;
    }
    for(var i=str.length-1;i>0;i--){
        if(str.charAt(i)==" ")
            str=str.substring(0,i);
        else break;
    }
    console.log(str.length);
    return str;
}
// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'
//熟悉了String.substring(from,to),截取String的[from,to)位置的子串

function each(arr,fn){//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数
    if(arr.forEach){
        arr.forEach(fn);
    }
    else{//ie8
        for(var o in arr){
            fn(arr[o]);
        }
    }
}
// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item);
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output2(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output2);  // 0:java, 1:c, 2:php, 3:html


function getObjectLength(obj){// 获取一个对象里面第一层元素的数量，返回一个整数
    var count=0;
    for(var o in obj) count++;
    return count;
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


/**
 * 学习正则表达式
 **/
function isEmail(emailStr) {// 判断是否为邮箱地址
    // your implement
    var pattern=/^(\w)+(\.\w+)*@\w+(.\w*)+$/;
    if(emailStr.search(pattern)==-1){
        return false;
    }
    else return true;
}
//使用示例
var str="sei_yxx@126.com";
if(isEmail(str)) console.log(str+" is email");
else console.log(str+" is not email");


function isMobilePhone(phone) {// 判断是否为手机号
    // your implement
    var pattern=/^1[3|5|7|8|][0-9]{9}$/;
    if(phone.search(pattern) == -1 ) {
        return false;
    }
    else return true;
}
//使用示例
var phone=13122300568;
if(isMobilePhone(phone+"")) console.log(phone+" is mobile phone number");
else console.log(phone+" is not mobile phone number");

/**
 * 3. DOM
 */

function addClass(element, newClassName) {// 为element增加一个样式名为newClassName的新样式
    /*
     //省略newClassName检查
     //if (hasClass) return;
     var classes = element.className;
     if (classes && classes[classes.length - 1] != " ")
     newClassName += " ";
     classes += newClassName;
     以上是js权威指南中的实现方法*/
    if(element.classList.contains(newClassName))
        console.log(element + " already have " + newClassName);
    element.classList.add(newClassName);
}

function removeClass(element,oldClassName){// 移除element中的样式oldClassName
     /*
     //类名不合法
     if(oldClassName.length === 0 || oldClassName.index(" ") != -1)
     throw new Error("Invalid class name: '" + c + "'");
     var pattern = new RegExp("\\b" + c + "\\b\\s*","g");
     element.className = element.className.replace( pattern,"");
     以上是js权威指南中的实现方法*/
    if(element.classList.contains(oldClassName))
        element.classList.remove(oldClassName);
    else
        console.log(element + "does not have" + oldClassName);

}
/*
 function hasClass(element,cname){//检查element是否包含cname类
 var classes=element.className;
 if(!classes) return false;
 if(classes===cneme) return true;
 return (classes.search("\\b"+cname+"\\b")!=-1);
 }*/

function isSiblingNode(element,siblingNode){
    if(element.parentElement()===siblingNode.parentElement()){// 判断是否为同一个父元素下的同一级的元素
        return true;
    }
    else return false;
}

function getPosition(element){// 获取element相对于浏览器窗口的位置
    var position = element.getBoundingClientRect();
    var result = { x:position.left,y:position.top };
    return result;
}

/***
 *mini $，document.querySelector的功能子集，
 * 在不直接使用document.querySelector的情况下完成
 **/
 //那我可以用querySelectorAll吗！！QAQ
function $(selector){//实现一个简单的query
    return document.querySelector(selector);

    /*    var values = selector.trim().split(" ");
     if( values.length == 1 ) {
     switch (values[0].charAt(0)) {
     case "#":
     return document.getElementById(values[0].substring(1));
     case ".":
     return document.getElementsByClassName(values[0].substring(1))[0];
     case "["://不会写
     return document.querySelector(selector);
     default:
     return document.getElementsByTagName(values[0].substring(1))[0];
     }
     }
     else{
     //不会写
     document.querySelector(selector);
     }*/

}
/**
 * 4. 事件
 **/

function addEvent(element, event, listener){//给一个element绑定一个针对event事件的响应，响应函数为listener
    if(element===null) {
        //throw new Error("element is null");
        return;
    }
    if (element.addEventListener) {   //!(<=ie8)
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {  //>=ie5+ && (<ie9)
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}//js 权威指南 P454
//使用
function test(){
    console.log("i like addEvent()! (if removeEvent() succeed,you only see me!)");
}
function test2(){
    console.log("i like addEvent() ,too!")
}
addEvent($("#addEventBtn"),"click",test);
addEvent($("#addEventBtn"),"click",test2);

function removeEvent(element,event,listener){// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
    if(element===null) {
        throw new Error("element is null");
        return;
    }
    if(listener!=null){
        if(element.removeEventListener){
            element.removeEventListener(event,listener,false);
        }
        else if(element.detachEvent){
            element.detachEvent("on"+event,listener);
        }
        else{
            element["on"+event]= null;
        }
    }
    else{//HOW!!!!!!!!!!!!!!!!!!!!!1
        element.onclick=null;
    }
}
removeEvent($("#addEventBtn"),"click",test2);

function addClickEvent(element,listener){// 实现对click事件的绑定
    addEvent(element,"click",listener);
}
//使用
addClickEvent($("#addClickEventBtn"),function(){
    console.log("i like addClickEvent()!");
});

function addEnterEvent(element,listener){// 实现对于按Enter键时的事件绑定
    addEvent(element, "keydown", function(event){
        if(event.keyCode==13){
            listener();
        }
    });
}
//使用
addEnterEvent($("#enterEvent"),function(){
    console.log("i like addEnterEvent()!");
});

//把上面几个函数和$做一下结合，把他们变成$对象的一些方法
function delegateEvent(element,tag,eventName,listener){
    each(element.getElementsByTagName(tag),function(item){
        addEvent(item,eventName,listener)
    });
}
//直接把addEvent(element.getElementsByTagName(tag),eventName,listener)作function
// ↑这样是不行的！each()会报错。

//var $ = new Object();不需要！！因为函数本身就是一个对象了QAQQQQ
$.on=addEvent;
$.un=removeEvent;
$.click=addClickEvent;
$.enter=addEnterEvent;
$.delegate = delegateEvent;

//Uncaught TypeError: object is not a function，因为给$重新定义了一个对象
$.delegate($("#myList"), "li", "click",function(){
    console.log("i like $.delegate(element)!")
});

$.on=function(selecor,event,listener){
    var element=$(selecor);
    addEvent(element,event,listener);
}
$.click=function(selector,listener){
    var element=$(selector);
    addClickEvent(element,listener);
}
$.un=function(selector,event,listener){
    var element=$(selecor);
    removeEvent(element,event,listener);
}
$.delegate=function(selector,tag,event,listener){
    var element=$(selector);
    delegateEvent(element,tag,event,listener);
}
//使用示例：
$.click("#jqueryBtn",function(){console.log("i like $.click(selector)!")});
$.delegate("#myList","li","click",function(){
    console.log("i like $.delegate(selector)!")
})

/**
 * 5. BOM
 */

function isIE(){
    console.log(navigator.appVersion);
    if (!!window.ActiveXObject || "ActiveXObject" in window){
        if(!window.ActiveXObject) return 11;
        else{

            var version=navigator.appVersion;
            var tmp=version.split("MSIE ");
            var version=tmp[1].substring(0,3);
            return Number(version);
        }
    }
    else
        return -1;
}//stackflow上一堆解答
console.log("isIE:"+isIE()+"(by ActiveXObject)");

function getInternetExplorerVersion()//from stack-overflow,more reasonable
{
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}
console.log("isIE:"+getInternetExplorerVersion()+"(by msie || rv(for ie11))");

/*参考：
 * http://www.cnblogs.com/fsjohnhuang/p/3817418.html
 * https://msdn.microsoft.com/en-us/library/ie/bg182625(v=vs.110).aspx
 * http://stackoverflow.com/questions/17907445/how-to-detect-ie11?answertab=votes#tab-top
 * */

function setCookie(cookieName,cookieValue,expiredays){// 设置cookie
    var cookie = cookieName + "=" + encodeURIComponent(cookieValue);
    if(typeof expiredays === "number"){
        cookie += "; max-age=" + ( expiredays * 60 * 60 * 24 );
    }
    document.cookie=cookie;
}//js 权威指南 P589

function getCookie(cookieName){
    if(!cookieName) {
        console.log("error cookieName!");
        return;//该return什么比较好？
    }
    var all = document.cookie;
    if(all === "")
        return all;
    var list = all.split("; ");
    for(var i = 0;i<list.length;i++){
        var cookie = list[i];
        var p = cookie.indexOf("=");
        var name = cookie.substring(0,p);
        var value = cookie.substring(p+1);
        //cookie[name] = value;
        if(name==cookie)
            return value;
        //否则的话什么也不做，进入下一层循环
    }
    console.log("there is no cookie named "+cookieName);
}
/**
 *6. Ajax
 */
function ajax(url,options){
    var type = "GET";//default
    var data = null;
    var onsuccess= null;
    var onfail= null;

    for (var o in options){//解析options
        switch (o){
            case "data":
                data=options[o];
                // console.log(options[o]);//一个键值对象
                break;
            case "type":
                type=options[o].toUpperCase();
                console.log(type);//test
                break;
            case "onsuccess":
                onsussess=options[o]
                break;
            case onfail:
                onfail=options[o];
                break;
            default:
                break;
        }
    }
    var request;
    if(window.XMLHttpRequest){//for ie7+,firefox,chrom,opear,safari
        request=new XMLHttpRequest();
    }
    else{//for ie6,ie5
        request=new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.onreadystatechange=function(){//check state of request
        if(request.readyState==4){
            if(request.status==200)
                onsussess("i like ajax()!",request);
            else if(request.status==404)
                onfail("i don't like ajax()!",request);
        }
    };
    var strData="";
    var flag=true;//for first time
    for(var o in data){
        if(flag){
            strData+=o+"="+data[o];
            flag=false;
        }
        else
            strData+="&"+o+"="+data[o];
    }
    console.log(url+"?"+strData);//test
    if(type==="GET"){
        console.log(type);
        request.open(type,url+"?"+strData,true);
        request.send(null);
    }
    else{//type==="POST"
        console.log(type);
        request.open(type,"AjaxServlet",true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(strData);
    }

}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        },
        onfail:function(responseText,xhr){
            console.log(responseText);
        }
    }
);