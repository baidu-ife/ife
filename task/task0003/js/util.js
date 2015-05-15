/**
 * Created by Y2X on 2015/4/20.
 */


/**
 * 1
 * */

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

/**
 * 2. JavaScript数据类型及语言基础
 */

//判断数组
function isArray(arr){
    return typeof arr == "object" &&
            Object.prototype.toString.call(arr) === "[object Array]";
}

function isFunction(fn){//判断函数
    if(typeof fn == "function"){
        return true;
    }
    else return false;
}

//深度克隆
function cloneObject(src){
    if(typeof(src)!="object" || src===null)//非对象：Number,String,Boolean,Null
        return src;
    if(src instanceof(Array)){//数组
        var o=[];
        for(var i=0;i<src.length;i++) {
            if(typeof(src[i])=="object" && src[i]!=null)
                o[i]=arguments.callee(src[i]);
            else
                o[i]=src[i];
        }
    }
    else{//其他对象
        o={};
        for(i in src) {
            if(typeof(src[i])=="object" && src[i]!=null)
                o[i]=arguments.callee(src[i]);
            else
                o[i]=src[i];
        }
    }
    return o;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr){
    if (!Array.prototype.indexOf){
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

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str){
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

//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数
function each(arr,fn){
    if(arr.forEach){
        arr.forEach(fn);
    }
    else{//ie8
        for(var o in arr){
            fn(arr[o]);
        }
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj){
    var count=0;
    for(var o in obj) count++;
    return count;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var pattern=/^(\w)+(\.\w+)*@\w+(.\w*)+$/;
    if(emailStr.search(pattern)==-1){
        return false;
    }
    else return true;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var pattern=/^1[3|5|7|8|][0-9]{9}$/;
    if(phone.search(pattern) == -1 ) {
        return false;
    }
    else return true;
}


/**
 * 3. DOM
 */

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(element==null)
        throw new Error(element + " does not exist");
    else if(element.classList.contains(newClassName))
        throw new Error(element + " already have " + newClassName);
    else
        element.classList.add(newClassName);
}

// 移除element中的样式oldClassName
function removeClass(element,oldClassName){
    if(element==null)
        throw new Error(element + " does not exist");
    else if(element.classList.contains(oldClassName))
        element.classList.remove(oldClassName);
    else
        throw new Error(element + "does not have" + oldClassName);
}

// 判断是否为同一个父元素下的同一级的元素
function isSiblingNode(element,siblingNode){
    return element.parentElement()===siblingNode.parentElement();
}

// 获取element相对于浏览器窗口的位置
function getPosition(element){
    var position = element.getBoundingClientRect();
    var result= { x:position.left,y:position.top };
    return result;
}

// mini $
function $(selector){
    //return document.querySelector(selector);
    var values = selector.trim().split(" ");
    if( values.length == 1 ) {
        switch (values[0].charAt(0)) {
            case "#":
                return document.getElementById(values[0].substring(1));
            case ".":
                return document.getElementsByClassName(values[0].substring(1))[0];
            case "[":
                return document.querySelector(selector);
            default:
                return document.getElementsByTagName(values[0].substring(1))[0];
        }
    }
    else{
        document.querySelector(selector);
    }

}


/**
 * 4. 事件
 **/

//给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener){
    if (element.addEventListener) {   //!(<=ie8)
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {  //>=ie5+ && (<ie9)
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element,event,listener){
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
    else{//HOW!!!!!!!!!!!!!!!!!!!!!?要写一个element的事件响应列表吗？
        element.onclick=null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element,listener){
    addEvent(element,"click",listener);
}

// 实现对于按Enter键的事件绑定
function addEnterEvent(element,listener){
    addEvent(element, "keydown", function(event){
        if(event.keyCode==13){
            listener();
        }
    });
}


//把上面几个函数和$做一下结合，把他们变成$对象的一些方法
function delegateEvent(element,tag,eventName,listener){
    each(element.getElementsByTagName(tag),function(item){
        addEvent(item,eventName,listener)
    });
}

//把上面几个函数变成$对象的一些方法
$.on=addEvent;
$.un=removeEvent;
$.click=addClickEvent;
$.enter=addEnterEvent;
$.delegate = delegateEvent;

//改进$，直接作用于selector而非element
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

//事件代理
$.delegate=function(selector,tag,event,listener){
    var element=$(selector);
    delegateEvent(element,tag,event,listener);
}


/**
 * 5. BOM
 */

// 判断是否为IE浏览器，返回-1或者版本号
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
}

// 设置cookie
function setCookie(cookieName,cookieValue,expiredays){
    var cookie = cookieName + "=" + encodeURIComponent(cookieValue);
    if(typeof expiredays === "number"){
        cookie += "; max-age=" + ( expiredays * 60 * 60 * 24 );
    }
    document.cookie=cookie;
}

// 获取cookie值
function getCookie(cookieName){
    if(!cookieName) {
        console.log("error cookieName!");
        return;
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
    }
    console.log("there is no cookie named "+cookieName);
}


/**
 *6. Ajax
 */

//学习Ajax，并尝试自己封装一个Ajax方法
//@Y2X：未进行测试
function ajax(url,options){
    var type = "GET";//default
    var data = null;
    var onsuccess= null;
    var onfail= null;

    for (var o in options){//解析options
        switch (o){
            case "data":
                data=options[o];
                break;
            case "type":
                type=options[o].toUpperCase();
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

    var request;//create request
    if(window.XMLHttpRequest){//for ie7+,firefox,chrom,opear,safari
        request=new XMLHttpRequest();
    }
    else{//for ie6,ie5
        request=new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.onnreadystatechange=function(){//check state of request
        if(request.readyState==4){
            if(request.status==200)
                onsussess("i like ajax()!",request);
            else if(request.status==404)
                onfail("i don't like ajax()!",request);
        }
    };
    var strData="";
    var flag=true;//for first item in data
    for(var o in data){
        if(flag){
            strData+=o+"="+data[o];
            flag=false;
        }
        else
            strData+="&"+o+"="+data[o];
    }
    //console.log(url+"?"+strData);
    if(type==="GET"){
        //console.log(type);
        request.open(type,url+"?"+strData,true);
        request.send(null);
    }
    else{//type==="POST"
        //console.log(type);
        request.open(type,"AjaxServlet",true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(strData);
    }
}


