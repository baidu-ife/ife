/*
function $(id) {
    return document.getElementById(id);
}

function add(num1, num2) {
    return num1 + num2;
}

function renderResult(result) {
    $("result").innerHTML = result;
}

function addEventHandle() {
    var num1 = $("number1").value;
    var num2 = $("number2").value;
    var result = add(num1, num2);
    renderResult(result);
}

function initEvent() {
    $("addbtn").addEventListener("click", addEventHandle, false);
}

initEvent();
*/
/*var arrs= new Array();
arrs[0]="test";
arrs[1]="a";
arrs[2]="lala";
for(i=0;i<3;i++)
{
    document.write(arrs[i]+"<br>");
}*/



function isFunction(fn){
    var b=Object.prototype.toString.call(fn);
    console.log(b);
}

function cloneObject(obj){
    var o,i,j,k;
    if(typeof(obj)!="object" || obj===null)
        {
            console.log("!!!!!!!!!");
            return obj;
        }
    if(obj instanceof(Array))
    {
        o=[];
        i=0;j=obj.length;
        for(;i<j;i++)
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)
            {
                o[i]=arguments.callee(obj[i]);
            }
            else
            {
                o[i]=obj[i];
            }
            console.log(obj[i]);
        }
        console.log("I am array");
    }
    else
    {
        o={};
        for(i in obj)
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)
            {
                o[i]=arguments.callee(obj[i]);//调用自身
            }
            else
            {
                o[i]=obj[i];
            }
            console.log("####"+obj[i]);
        }
        console.log("I am not array");
    }
 
    return o;
}

function uniqArray(arr){
    var n = {},r=[]; //n为hash表，r为临时数组
    for(var i = 0; i < arr.length; i++) //遍历当前数组
    {
        if (!n[arr[i]]) //如果hash表中没有当前项
        {
            n[arr[i]] = true; //存入hash表
            r.push(arr[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}

function trim(str){
    var strs="";
    console.log(str.charAt(5));
     if(str!=null&&str.length>0){
        for(i=0;i<str.length;i++){
            if(str.charAt(i)==" "){

            }else{
                strs=strs+str.charAt(i);
            }

        }

     }
     return strs;
}
/*var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output); */ 
function each(arr,fn){
    for(i=0;i<arr.length;i++){
        fn(arr[i],i);
    }

}
/*var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); */
function getObjectLength(obj){
    var sum=0;
    for(i in obj){
        sum++;

    }
    return sum;

}
/*var str="defrafe";
var str1="da@fda";
var str2="sfa@34.com";
console.log(isEmail(str));
console.log(isEmail(str1));
console.log(isEmail(str2));*/
function isEmail(emailStr){
    var regex=/^\w+@/;
    var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;  
    return Regex.test(emailStr);

}
/*var str="24343";
var str1="12233";
var str2="15201056989";
isPhone(str);
isPhone(str1);
isPhone(str2);*/
function isPhone(phone){
    var regex=/^1[0-9]{10}$/;
    console.log(regex.test(phone));
}
/*addClass("number2","blue");*/
function addClass(element,newClassName){
    document.getElementById(element).className=newClassName;
}
/*removeClass("number1","red");*/
function removeClass (element,oldClassName) {
    document.getElementById(element).className;
    // body...
}
/*console.log(isSiblingNode("number1","number2"))*/

function isSiblingNode(element,SiblingNode){
    var ele=document.getElementById(element);
    var sib=document.getElementById(SiblingNode);
    if(ele.parentNode==sib.parentNode){
        return true;

    }else{
        return false;
    }

}
/*console.log("hihihi");
console.log(getPosition("number1"));*/
function getPosition(element){
    var element=document.getElementById(element);
    var obj={
        x:0,
        y:0,
    }
    obj.x=element.clientHeight;
    obj.y=element.clientWidth;
    return obj;

}
document.body.hasAttributes();
/*test();
function test(){
    var ts=document.getElementsByTagName("*");
    for(var k in ts){
        var t=ts[k];
        if(t.id=="number1"){
            console.log(t);

        }
    }
  
}*/
/*console.log($("#number1 .blue") );*/


function $one(arr){
    var element=[];
    var tagName=/^\w+?$/;
    var i=0;
    var tags=document.getElementsByTagName("*");
        console.log("length=1!!");
        if(arr[i].indexOf("#")==0){
            arr[i]=arr[i].replace("#","");
            console.log("id!!"+arr[i]);
            element.push(document.getElementById(arr[i]));
        }
        if(tagName.test(arr[0])){
            element.push(document.getElementsByTagName(arr[i]));
        }
        if(arr[i].indexOf(".")==0){
             arr[i]=arr[i].replace(".","");
             console.log("class!!"+arr[i]);
             for(var k in tags){
                var t=tags[k];
                if(t.className==arr[i]){
                    element.push(t);
                }
            }
        }
        if(arr[i].indexOf("[")>-1&&arr[i].indexOf("]")>-1){
            if(arr[i].indexOf("=")>-1){
                var attrs=arr[i].replace("[","");
                attrs=attrs.replace("]","");
                attr=attrs.split("=")[0];
                var val=attrs.split("=")[1];
                for(var k in tags){
                    var t=tags[k];
                    if(k==tags.length-1){
                        break;
                    }
                    if(t.getAttribute(attr)){
                        if(t.getAttribute(attr)==val){
                            element.push(t);
                        }
                    }
                }

            }else{
                var attr=arr[i].replace("[","");
                attr=attr.replace("]","");
                console.log(attr+"!!");
                for(var k in tags){
                    if(k==tags.length-1){
                        break;
                    }
                    var t=tags[k];
                    if(t.getAttribute(attr)){
                    element.push(t);
                    
                    }else{
                        continue;
                    }
                }
            }
            
        }
        return element;
}

function $(selector){
    var element=[];
    var eles=[];
    var tagName=/^\w+?$/;
    var arr=new Array();
    array=selector.split(" ");
    if(array.length==0){
        return null;
    }
    var tags=document.getElementsByTagName("*");
    if(array.length==1){
        element=$one(array);

    }else{
        console.log("length>1!!");
        var n = {}; 
        for(i=0;i<array.length;i++){
            console.log(array[i]);
            var teat=new Array();
            test[0]=array[i].toString();
            /*console.log($one(test));*/
            element=$one(test);
            /*console.log(element);*/
            eles.concat($one(test));
            //eles.push($one(arr[i]));
        }
        console.log(eles);
        for(var i = 0; i < eles.length; i++) //遍历当前数组
        {
        if (n[eles[i]]) //如果hash表中没有当前项
        {
            n[eles[i]] = true; //存入hash表
            element.push(eles[i]); //把当前数组的当前项push到临时数组里面
        }
    }

    }
    if(element.length>0){
        console.log();
            return element[0];

    }else{
        return "null!!";
    }
    

}
$.on=function addEvent(selector,event,listener){
    element=$(selector);
    if(element.attachEvent){
        element.attachEvent('on'+event,listener); 
    }else{
        element.addEventListener(event,listener,false);
    }
    
}
$.un=function removeEvent(selector,event,listener){
    element=$(selector);
    if(listener!=null&&listener.length>0){
        if(element.detachEvent){
        element.detachEvent("on"+event,listener);
        }else{
        element.removeEventListener(event,listener,false);
        }
    }else{

    }


}

$.click=function addClickEvent(selector,listener){
    $.on(selector,"click",listener);
}
$.enter=function addEnterEvent(selector,listener){
    function EnterListener(){
       var e = window.event || arguments.callee.caller.arguments[0];
         if (e && e.keyCode == 13 ) {
             //alert("您按回车键了");
             listener();
             
         }
          
    }
    $.on(selector,"keydown",EnterListener);

}
    



/*function a (event) {
    console.log(event.type);
    
}
function b (event) {
    console.log("try");
    
}*/
/*addEvent($("#name1"),"click",b);
removeEvent($("#name1"),"click",b);*/


function c(){
    console.log("Enter!");
}


/*addEnterEvent($("#number2"),c);*/
/*function on(element,event,listener){
    addEvent(element, event, listener);
}
function un(element,event,listener){
    removeEvent(element, event, listener);
}

function $.click(element, listener){
    addClickEvent(element, listener);
}
function $.enter(element,listener){
    addEnterEvent(element, listener);
}*/
function clickListener(event) {
    console.log(event);
}

function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}

/*function init() {
    each($("#list").getElementsByTagName('li'), function(item) {
        $.click(item, clickListener);
    });

    $.click($("#btn"), renderList);
}
init();*/

$.delegate=function delegateEvent(selector,tag,eventName,listener){
    element=$(selector);
    function tar(event){
        var target=event.target;
        console.log(target.tagName.toLowerCase());
        if(target.tagName.toLowerCase()==tag){
            listener.call(element,event);
        }
    }
    $.on(selector,eventName,tar);
}
//$.delegate("#list", "li", "click", clickListener);
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var agent=navigator.userAgent.toString();
    return agent;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=cookieName+"="+escape(cookieValue)+
    ((expiredays==null)?"":";expires="+exdate.toGMTString())+";path=/";
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
     if (document.cookie.length>0)
    {
     c_start=document.cookie.indexOf(cookieName+"=");
     if (c_start!=-1)
     { 
      c_start=c_start + cookieName.length+1 ;
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1) c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
     } 
    }
    return "";
}
function ajax(url, options) {
    // your implement
    var xmlhttp;
    var datas="";
    var method="get";
    if(options.type){
       method=options.type;
    }
    if(options.data){
        if(typeof options.data=="object"){
            for(var k in options.data){
                datas=datas+k+"="+options.data[k]+"&";
            }
            datas=datas.substring(0,datas.length-1);
        }else{
            datas=options.data;
        }

    }
    if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }else{// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open(method,url+"?"+datas,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            options.onsuccess(xmlhttp.responseText);
        }else{
            options.onfail();
        }
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
var curOpac = 0;
var filterTimer;
function MyScroll(cnt, control){
    this.data = [];  
    this.interval = 3000;  
    this.timer;  
    this.container = cnt;
    this.curFrame = 0;
    this.oldFrame = 0;
    this.controls = control;  
    Global = this;          
    this.run = function(){
         this.timer = window.setInterval("Global.showFrame()", this.interval);
    }
        this.go = function(i){
            curOpac = 0;
            this.curFrame = i;  
            this.stop(); 
            this.showFrame(); 
            this.run();  
        }
        this.stop = function(){
            window.clearInterval(this.timer);
            window.clearInterval(filterTimer);
        }
        this.showFrame = function(){
            // 设置当前按钮样式
            //这个按钮样式不知道为什么，当轮播一次过后就会出现
            //重影。。不知道是哪里的问题，还望老师指点
            console.log("100"+curOpac);
        this.controls[this.oldFrame].className="piont";
        this.controls[this.curFrame].className="piont_foucs";
        //this.container.style.opacity= 30/100.0;
        this.container.innerHTML = this.data[this.curFrame];
        filterTimer = window.setInterval("blend()", 100);
        console.log(curOpac);
        this.oldFrame = this.curFrame;
        this.curFrame ++;
            if(this.curFrame == this.data.length){
                this.curFrame = 0;
            }
        //this.container.i
        //这里不知道应该如何淡出，求老师指点！
        //ft=window.setInterval("blannk()",100);            
        }
    }
     // 增加透明度
    function blend(){
        //console.log("**"+curOpac);
        curOpac+=10;
        Global.container.style.opacity =  curOpac/100.0;
        if(curOpac == 100){
            curOpac = 0;
            window.clearInterval(filterTimer);
        }
    }
    function blannk(){
        //console.log("@@"+curOpac);
        curOpac=curOpac-10;
        Global.container.style.opacity = curOpac/100.0;
        if(curOpac == 0){
            curOpac = 0;
            window.clearInterval(ft);
        }
    }
    //开始
    function startIt(){
        var imgArr = [];
        // 创建4个图片对象保存图片路径
        for(var i=0;i<4;i++){
            imgArr[i] = new Image();
            imgArr[i].src = "./img/img-" + (i + 1) + ".jpg";
        }
        var controlArr = $("#num").getElementsByTagName("li");
        for(var i=0;i<controlArr.length;i++){
            controlArr[i].tag = i;
            controlArr[i].onclick = function(){
                myScroll.go(this.tag);
            }
        }
        var myScroll = new MyScroll($("#pic"), controlArr);
        myScroll.data.push("<img src='" + imgArr[0].src + "'>");
        myScroll.data.push("<img src='" + imgArr[1].src + "'>");
        myScroll.data.push("<img src='" + imgArr[2].src + "'>");
        myScroll.data.push("<img src='" + imgArr[3].src + "'>");
        myScroll.go(0);
    }
    window.onload = startIt;
/*    function $(id){ return document.getElementById(id);}*/