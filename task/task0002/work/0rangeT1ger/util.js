/**
 * Created by wujia_000 on 2015/4/19.
 */
var t;
function isArray(arr) {                                     //判断是否为数组
    if (arr instanceof Array) console.log("It is an array.");
    else console.log("It is NOT an array");
}
testArray1=[1,2,3,4];
testArray2="1,2,3,4";
isArray(testArray1);
isArray(testArray2);
/*******************************是否是函数******************************************/
console.log("****************************");
function isFunction(fn) {                                   //判断是否为函数
    if(typeof fn == 'function') console.log("It is a function");
    else console.log("It is not a function.");
}
isFunction(isFunction);
isFunction(testArray1);
/***************************浅拷贝与深拷贝*****************************************/
console.log("****************************");
function lightClone(object){                                //浅拷贝
    var subject;
    var newObject={};
    for (subject in object){
        newObject[subject]=object[subject];
    }
    return newObject;
}
function cloneObject(object){                               //深拷贝
    var subject;
    var newObject={};
    for (subject in object){
        if(typeof  object[subject] == 'object')
            newObject[subject]=cloneObject(object[subject]); //递归调用，对象内部有对象继续深度克隆内部的对象
        else newObject[subject]=object[subject];
    }
    return newObject;
}
/****************测试用例********************************************************/
console.log("****************************");
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);
var tarObj2 = lightClone(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);                               // 1
console.log(tarObj.b.b1[0]);                         // "hello"

console.log(tarObj2.a);                              // 1
console.log(tarObj2.b.b1[0],"This is lightCopy");    // "Hello"
/*****************************去掉重复数组****************************************/
console.log("****************************");
function uniqueArray(arr) {
    var targetArr = [,];
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] == 'number') {
            for (var j = 0; j < targetArr.length; j++) {
                if (arr[i] == targetArr[j]) {              //此处验证源数组中是否有和目标数组重复的项,如果有，则跳过原数组中这个数，继续比较
                    break;
                }
                else if (j == targetArr.length - 1) {
                    targetArr.push(arr[i]);
                }
            }
        }
    }
    return targetArr;
}
function uniqueStr(str) {
    if(str.match(/[\s,;、，]+/g)!=null)
        var strByWords=str.split(/[\s,;、，]+/g);
    else var strByWords=[str," "];
    var targetStr = [,];
    for (var i = 0; i < strByWords.length; i++) {
        if(strByWords[i]==""||strByWords[i]==" "||strByWords[i]=="  ") continue;
        if (typeof strByWords[i] == 'string') {
            strByWords[i]=trim(strByWords[i]);
            for (var j = 0; j < targetStr.length; j++) {
                if (strByWords[i] == targetStr[j]) {       //此处验证源数组中是否有和目标数组重复的项,如果有，则跳过原数组中这个数，继续比较
                    break;
                }
                else if (j == targetStr.length - 1) {
                    targetStr.push(strByWords[i]);
                }
            }
        }
    }
    return targetStr;
}
var a = [1, 3, 5, 7, 5, 3];
var b = uniqueArray(a);
var c="haha,heihei,good,haha";
var d=uniqueStr(c);
console.log(b);    //[1, 3, 5, 7]
console.log(d);
/*********************************去除空格Tab等**********************************/
console.log("****************************");
function trim(str) {
    if (str=="") return null;
    var tempStr = str.split("");
    var targetStr=[];
    var i,j=0;
    for(i in tempStr){
        if (tempStr[i]==" "||tempStr[i]=="  "||tempStr[i]=="")
        continue;
        targetStr[j] = tempStr[i];
        j++;
        }
    return targetStr.join("");
}
var str = '   hi!  ';
str = trim(str);
console.log(str);                                // 'hi!'
/***************************参数中调用函数*************************************/
console.log("****************************");
function each(arr, fn) {
    var i;
    for(i in arr) fn(arr[i]);
}
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(item)
}
each(arr, output);  // java, c, php, html
/****************************对象中第一层元素的数量*****************************/
console.log("****************************");
function getObjectLength(obj) {
    var i;
    var num=0
    for(i in obj){
        num++;
    }
    return num;
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
/***************************判断是否为邮箱地址******************************/
console.log("****************************");
function isEmail(emailStr) {                     //以下电子邮件地址的模式是合法的
    var regexp=/^\w+[.<]?\w*@\w+\.\w+>?|^"\w+"@\w+\.\w+|^\w+@\[\d{3}\.\d{3}\.\d{3}\.\d{3}]/g      //1. qingsky@somewhere.com
    var targetStr;
    targetStr=emailStr.match(regexp);                                                                //2. qingsky.aqing@somewhere.somewhere.com
    if(targetStr!=null) return true;                                                               //3. Aqing<qingsky@somwhere.com>
    else return false;                                                                             //4. "qingsky"@somewhere.com
                                                                                                      //5. qingsky@[IP Address]
}
console.log(isEmail("qingsky@somewhere.com:","qingsky@somewhere.com"));
console.log(isEmail("qingsky.aqing@somewhere.somewhere.com","qingsky.aqing@somewhere.somewhere.com"));
console.log(isEmail("Aqing<qingsky@somwhere.com>","Aqing<qingsky@somwhere.com>"));
console.log(isEmail("\"qingsky\"@somewhere.com","\"qingsky\"@somewhere.com"));
console.log(isEmail("qingsky@[255.255.255.255]","qingsky@[255.255.255.255]"));
console.log(isEmail("奇怪的东西","奇怪的东西"));
/**************************判断是否为手机号********************************/
console.log("****************************");
function isPhoneNum(phoneArray) {
    var regexp=/^\+\d{2}[ -]?1\d{2}[ -]?\d{4}[ -]?\d{4}|1\d{2}[ -]?\d{4}[ -]?\d{4}/g;
    var targetArr;
    targetArr=phoneArray.match(regexp);
    if(targetArr!=null) return true;
    else return false;
}
console.log("15652914836:",isPhoneNum("15652914836"));
console.log("156-5291-4836:",isPhoneNum("156-5291-4836"));
console.log("+86-15652914836:",isPhoneNum("+86-15652914836"));
console.log("+86 15652914836:",isPhoneNum("+86 15652914836"));
console.log("+86 156-5291-4836:",isPhoneNum("+86 156-5291-4836"));
console.log("353150777:",isPhoneNum("353150777"));
/*****************添加新样式*******************************************/
console.log($("#input").className);
                                                                 // 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(element.className.indexOf(newClassName)==-1) element.className+=" "+newClassName;
}
addClass($("#input"),"bullshit");
console.log($("#input").className);
                                                                // 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    var  classNameByWord=element.className.split(" ");
    for(var i in classNameByWord){
        if(classNameByWord[i]==oldClassName) {
            classNameByWord[i]=" ";
            element.className=classNameByWord.join(" ");
            break;
        }
    }
}
removeClass($("#input"),"bullshit");
console.log($("#input").className);
function CSSRule(element,attribute,cssValue){              //可以添加样式，也可以查询返回样式
    if(cssValue){
        element.style[attribute]=cssValue;
        return;
    }
    return window.getComputedStyle(element,null)[attribute];
}
                                                               // 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(elementName, siblingNode) {
    var element=$(elementName);
    if(element.parentNode==siblingNode.parentNode)
    return true;
    else return false;
}
                                                              // 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(elementName) {                          //此时需要考虑其所有父元素以及他们的所有父元素直到根元素的所有偏移量.
    var element=$(elementName);
    var x=element.offsetLeft;
    var y=element.offsetTop;
    var current=element.offsetParent;

    while(current!=null){
        x+=current.offsetLeft;
        y+=current.offsetTop;
        current=current.offsetParent;
    }
    return [x,y];
}


// 实现一个简单的Query
function checkId(element,idName){
    if(idName==element.id) return true;
}
function checkClass(element,className){
    for(var i in element.classList){
        if(className==element.classList[i]) return true;           //遍历获取元素的每个class
    }
}
function checkAttribute(element,attributeName){
    for(var i in element.attributes){
        if(attributeName==element.attributes[i]) return true;      //遍历获取元素的每个attributes
    }
}
function checkTagName(element,tagName){
    if(tagName==element.tagName) return true;
}
function $(selector) {                                             //这里的思路仍然是粗暴的遍历，从根节点开始遍历
    if(!selector) return false;
    var selectByWords=selector.split(" ");                          //先将输入的字符串分组
    for(var i=0;i<selectByWords.length;i++){
        if(selectByWords[i].indexOf(".")!=-1){
            var className=selectByWords[i].split(".")[1];           //提取其中的类名，存起来
            continue;
        }
        else if(selectByWords[i].indexOf("#")!=-1){
            var idName=selectByWords[i].split("#")[1];              //提取其中的id名
            continue;
        }
        var attributeByLetter=selectByWords[i].split("");
        for(var j= 0;j<attributeByLetter.length;j++){
            if(attributeByLetter[j]=="[") {
                var attributeName = attributeByLetter.slice(1, attributeByLetter.length-1).join("");//提取其中的attribute名
                continue;
            }
        }
        var tagName=selectByWords[i].toUpperCase();           //剩余的就是标签名啦~【因为标签名没有前面的提示符~】
    }
    var iterator = document.createNodeIterator(document, NodeFilter.SHOW_ELEMENT, null, false);
    var current=document;
    for(;current!=null;current=iterator.nextNode()){         //从根节点开始遍历，做出输入元素的各种排列组合的查询。。
        if(tagName==null){                                   //复制粘贴的代码很多，本来是更多的，经过逻辑的简化变少了。。
            if(idName==null){                                //仍然不能简化，求review的哥哥给点意见~~
                if(className==null){
                    if(attributeName==null){
                        console.log("error:WTF?");
                        return false;
                    }
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
                else if(className!=null&checkClass(current,className)){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
            }
            else if(idName!=null&checkId(current,idName)){
                if(className==null){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
                else if(className!=null&checkClass(current,className)){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
            }
        }
        if(tagName!=null&checkTagName(current,tagName)){
            if(idName==null){
                if(className==null){
                    if(attributeName==null){
                        return current;
                    }
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
                else if(className!=null&checkClass(current,className)){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
            }
            else if(idName!=null&checkId(current,idName)){
                if(className==null){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
                else if(className!=null&checkClass(current,className)){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
            }
        }
    }
}
/*******************************************这部分未完成*******************/
// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function freak(){
    console.log("freak");
}
function freak2(){
    console.log("freak2");
}
function freak3(){
    console.log("freak3");
}
function freak4(){
    console.log("freak4");
}
function addEvent(elementName, event, listener) {        //本来是想用addEventListener的，然而做到后面的删除所有响应函数的时候
    var element=$(elementName);
    if(!element) return false;
    if(!element.eventList) element.eventList=[];       //发现如果用addEventListener的话，就无法全部遍历删除了。。
    if(!element.eventList[event]){                     //于是针对每个element加入了响应事件的数组，里面保存了针对某一个事件【事件名作为下标】的所有响应函数
        element.eventList[event]=[];                   //然后修改这个函数就可以做到删除或者增加啦！
        element.eventList[event][0]=listener;          //我承认是借鉴了某篇博客，不过改进了很多呢~
    }
    else{
        element.eventList[event][element.eventList[event].length]=listener;
    }
    function listenerFinal(){
        for(var i=0;i<element.eventList[event].length;i++){
            element.eventList[event][i].call(this);
        }
    }
    element["on"+event]=listenerFinal;
}


// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数

function removeEvent(elementName, event, listener) {
    var element= $(elementName);
    if(arguments[2]==null) {
        element.eventList[event]=null;
    }
    else{
        if(!element.eventList) return;
        else if(!element.eventList[element]) return;
        else{
            for(var i in element.eventList[event]){
                if(element.eventList[event][i]==listener){
                    delete element.eventList[event][i];
                    return;
                }
            }
        }
    }
}
/****************clickEvent*************************/
function addClickEvent(elementName, listener) {
    var element=$(elementName);
    addEvent(elementName, "click", listener);
}
function addEnterEvent(elementName, listener){
    var element=$(elementName)
    var event="keypress";
    if(!element.eventList) element.eventList=[];               //这里为了避免与其他"keypress"的时间下标重复，所以擅自在element.eventList[]数组的
    if(!element.eventList[event+"Enter"]){                     //下标后面加入了"enter"字符串。
        element.eventList[event+"Enter"]=[];
        element.eventList[event+"Enter"][0]=listener;
    }
    else{
        element.eventList[event+"Enter"][element.eventList[event+"Enter"].length]=listener;
    }
    function listenerFinal(){
        for(var i=0;i<element.eventList[event+"Enter"].length;i++){
            if(window.event.keyCode==13){                      //判断键值是否等于13，如果是，那么执行之前加入的事件。
                element.eventList[event+"Enter"][i].call(this);
            }
        }
    }
    element["on"+event]=listenerFinal;
}
$.on=addEvent;
$.un=removeEvent
$.click=addClickEvent;
$.enter=addEnterEvent;

/*********************************事件代理函数**********************************/
function delegateEvent(elementName, tag, eventName, listener) { //此时已经封装完毕了，不需要使用$("#div3")类似的语法了，直接输入selector内容就行。
    var element=$(elementName);
    function eventHandle(e){
        e=window.event;
        var target= e.target|| e.srcElement;
        if(target.tagName.toLowerCase() === tag) {
            listener();
        }
    }
    $.on(elementName,eventName,eventHandle);
}
delegateEvent("#ul","li","click",freak2);
$.delegate = delegateEvent;
/**************************小任务1******************************************/
function destroyOldResult(){
    var result=sortHobby($("#input"));
    var parent=$("#parent");
    parent.innerHTML="";
}
function displayResult(){
    var result=sortHobby($("#input").value);
    var parent=$("#parent");
    for(var i=1;i<result.length;i++){
        var newNode=document.createElement("label");
        newNode.innerHTML="<input type=\"checkbox\">"+result[i];
        parent.appendChild(newNode);
    }
}
function alert(){
    $("#div1").style.display="none";
    var e=$("#input"),alertText=$("#alert"),btn=$("#submit"),resultText=$("#div1");
    var result=sortHobby(e);
    if(result.length==1||result.length>11) {
        alertText.style.color="red";
        alertText.style.display="block";
    }
    if(sortHobby(e).length<10){
        alertText.style.display="none";
    }
}
$.on("#input","keydown",alert)
function sortHobby(src){
    src==src;
    var targetHobby=uniqueStr($("#input").value);
    return targetHobby;
}
$.click("#submit",destroyOldResult);
$.click("#submit",displayResult);
/**************************任务2***********************/
function getDate(){                                           //用于获取输入框里的日期
    var year=$("#inputYear").value;
    var month=$("#inputMonth").value;
    var day=$("#inputDay").value;
    var targetDate= new Date();
    targetDate.setDate(day);
    targetDate.setMonth(month-1);
    targetDate.setFullYear(year);
    targetDate.setHours(0);
    targetDate.setMinutes(0);
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);
    return targetDate;
}
function detectTimeError(){
    var targetDate=getDate();
    var currentDate=new Date();
    var remainDate= new Date();                      //其实基础思路就是将输入的时间与当前时间相减后生成一个date对象然后分别获取该对象的年月日。
    remainDate.setTime(targetDate.getTime()-currentDate.getTime());
    if(remainDate.getFullYear()-currentDate.getFullYear()+45<0){
        $("#alertTimeError").innerHTML="Input time must later than today!";
    }
    if(remainDate.getFullYear()-currentDate.getFullYear()+45>0){
        $("#alertTimeError").innerHTML=" ";
    }
}
function showTime(){
    var targetDate=getDate();                         //以下注释中写的有点粗暴。。不过基本上是判断是否加两个输出的方式
    var currentDate=new Date();                       //就是判断相减是否小于零，如果小于零那么加上个单位的时间
    t=window.setTimeout(showTime,500);                 //每0.5秒刷新一次。
    var remainDate= new Date();
    remainDate.setTime(targetDate.getTime()-currentDate.getTime());
    $("#year").innerHTML=remainDate.getFullYear()-1970;//不知道为何年份总是大了不多不少1970，只能减去，console下的结果是没问题的，不知是否是显示的问题？
    $("#month").innerHTML=remainDate.getMonth();
    $("#day").innerHTML=remainDate.getDate()-1;
    $("#second").innerHTML=remainDate.getSeconds();
    $("#minute").innerHTML=remainDate.getMinutes();
    $("#hour").innerHTML=remainDate.getHours()-8;
    //$("#year").innerHTML=(currentDate.getMonth()-targetDate.getMonth())<0?targetDate.getFullYear()-currentDate.getFullYear()+1:targetDate.getFullYear()-currentDate.getFullYear();
    //$("#month").innerHTML=(currentDate.getMonth()-targetDate.getMonth())<0?targetDate.getMonth()-currentDate.getMonth():targetDate.getMonth()-currentDate.getMonth()+12;
    //$("#day").innerHTML=(currentDate.getDate()-targetDate.getDate())<0?targetDate.getDate()-currentDate.getDate():targetDate.getDate()-currentDate.getDate()+30;
    //$("#hour").innerHTML=(currentDate.getHours()-targetDate.getHours())<0?targetDate.getHours()-currentDate.getHours():targetDate.getHours()-currentDate.getHours()+24;
    //$("#minute").innerHTML=(currentDate.getMinutes()-targetDate.getMinutes())<0?targetDate.getMinutes()-currentDate.getMinutes():targetDate.getMinutes()-currentDate.getMinutes()+60;
    //$("#second").innerHTML=(currentDate.getSeconds()-targetDate.getSeconds())<0?targetDate.getSeconds()-currentDate.getSeconds():targetDate.getSeconds()-currentDate.getSeconds()+60;

}
$.click("#startTiming",showTime);
$.click("#startTiming",detectTimeError);
/****************************************任务3:轮播图***************************************/
var config={                                                                            //设置选项
    imgNum:3,                             //图片的数量
    time:3                                //自动轮播时间隔时间
}
var slideProgress=0;                     //当前滑动到的位置
var slide;                               //这个是setTimeOut进程的对象，用于停止自动滑动
var slidePx=2;                           //这个是用于调整滑动速度的，1毫秒滑动多少个像素
var targetPosition=0;                    //当前目标位置，通过更改目标位置来更改滑动的方向和目的地
var ifOverSlide;                         //用于判断是否滑动到目标地点。
var auto;                                //用于停止自动滑动，这个值也是由setTimeOut来赋值。
function initial(){                     //开始自动滑动。
    auto=setTimeout(slideNext,config.time*1000);
}
function slideNext(){                   //自动滑动所调用的函数，仅仅负责向下滑动一页，其实，轮播图的左右按键也可以调用这个函数。
    if(slideProgress<=-600*(config.imgNum-1)) {
        targetPosition=0; slidePx=10;
    }
    else{
        targetPosition=slideProgress-600;    slidePx=-5;
    }
    ifOverSlide=slideProgress==targetPosition?true:false;
    slide();
}
function slide(){                        //主要的核心动画，所有的滑动都需要调用它，而且其余的函数只需要关心调整targetPosition就行了
    var overSlide=slideProgress==targetPosition?true:false;
    clearTimeout(auto);                   //经过重写，可扩展性更好，更多的功能如果需要加入，只需要调整targetPosition和slidePx就行
    if(ifOverSlide==overSlide){
        slideProgress+=slidePx;
        CSSRule($("#imageSlide"),"left",slideProgress.toString()+"px");
        setTimeout(slide,1);
    }
    else initial();
}
function clickDot(){                    //点击按钮之后会发生的事情：
    var dotId=window.event.target.id.split("dot")[1];
    targetPosition=(dotId-1)*(-600);     //看点的是哪个按钮，用按钮id乘以每个图片宽度就是目标位置。
    slideProgress=slideProgress-slideProgress%8;//这里获取关于8的余数。。因为单位长度是8，减去8的余数使之能够被8整除，这样就不会位移过多或过少。
    if(targetPosition>slideProgress) slidePx=8;//瞬间变化8px以内用户应该开不出来吧。。。？你看得出来吗？
    else slidePx=-8;
    ifOverSlide=slideProgress==targetPosition?true:false;
    clearTimeout(auto);
    slide();
}

delegateEvent("#dotContainer","div","click",clickDot);//这里用事件代理函数，就可以使所有添加的小点都具有功能
initial();
/***************************任务4**************************************/
var inputTipsCss={
    width: "200px",
    height: "20px",
    margin: "0px",
    "background-color":"#ffffff"
}
var focusPosition=-1;
function destroyOldQuery(){
    focusPosition=-1;                                                   //还原选中的选项初始位置
    if(window.event.keyCode!=38||window.event.keyCode!=40){
        var parent=$("#inputTips");
        parent.innerHTML="";
    }
}
function searchQuerys(){
    if(window.event.keyCode!=38||window.event.keyCode!=40||window.event.keyCode!=13){//如果敲下回车或者上下键，那么不再重新查询
        window.setTimeout(searchQuery,10);
    }
}
function searchQuery(){                                             //目前没办法做到完全类似百度的搜索提示框，因为如果加入多个词语
    var inputText=[$("#searchBox").value,];                          //就需要判断词汇的排列组合。。算法基础不牢靠。。还得多学多练
    var resultText=[];
    for(var i in inputText){                                        //现在能达到的结果就是，输入的时候能够基于已经输入的词汇，联想其他词汇
        for(var j in searchDictionary){                             //输入多个词汇的话，会导致重复的输入提醒出现。
            if(searchDictionary[j].indexOf(inputText[i])!=-1){
                resultText[resultText.length]=searchDictionary[j];
            }
        }
    }
    resultText=uniqueStr(resultText.join(" "));
    if(resultText){
        for(var h=1;h<resultText.length;h++){
            var newP=document.createElement("p");
            for(var m in inputTipsCss) CSSRule(newP,m,inputTipsCss[m]);
            newP.innerHTML=resultText[h];
            $("#inputTips").appendChild(newP);
        }
    }
    if (resultText.length>1) CSSRule($("#inputTips"),"border","1px solid darkgray");
    else CSSRule($("#inputTips"),"border","none");
}
function changeFocus(){
    if(window.event.keyCode==38){                                                 //如果按下上键
        for(var i=0;i<$("#inputTips").childNodes.length;i++){                     //先重置所有选项的背景颜色
            CSSRule($("#inputTips").childNodes[i],"background-color","#ffffff");
        }
        if($("#inputTips").childNodes[0]){
            if(focusPosition==-1)  focusPosition=0;
            else focusPosition=focusPosition==0?$("#inputTips").childNodes.length-1:focusPosition-1;
            CSSRule($("#inputTips").childNodes[focusPosition],"background-color","#dddddd");//然后为被选中的那一项添加背景颜色。
        }
    }
    if(window.event.keyCode==40){                                                  //如果按下下键
        for(var i=0;i<$("#inputTips").childNodes.length;i++){                     //先重置所有选项的背景颜色
            CSSRule($("#inputTips").childNodes[i],"background-color","#ffffff");
        }
        if(($("#inputTips").childNodes[0])){
            if(focusPosition==-1) focusPosition=0;
            else  focusPosition=focusPosition==$("#inputTips").childNodes.length-1?0:focusPosition+1;
            CSSRule($("#inputTips").childNodes[focusPosition],"background-color","#dddddd");
        }
    }
}
function confirmFocus(){
    if(window.event.keyCode==13){
        $("#searchBox").value=$("#inputTips").childNodes[focusPosition].innerHTML;
        destroyOldQuery();
    }
}
$.on("#searchBox","keypress",destroyOldQuery);
$.on("#searchBox","keypress",searchQuerys);
$.on("#searchBox","keydown",changeFocus);
$.on("#searchBox","keydown",confirmFocus);                                                       //不会自己搭建后台服务器。。所以没有做中级班部分
var searchDictionary=["haha","haha1","haha2","haha1234","haha235","haha625","haha253","haha164"];//搜索用的词库
/************************************任务5*********************************/
var dragStartX,dragStartY,dragCurrentX,dragCurrentY;                               //这四个全局变量用于在函数间传递参数，包括开始拖拽的鼠标地点
var dragProcess;                                                                   //以及当前鼠标位置，dragprogress用于判断拖动过程是否开始，
function dragStarter(){                                                           //如果没有开始那么移动鼠标不会触发事件
    dragStartX=event.clientX;
    dragStartY=event.clientY;                                                      //当力场触手在二相箔上按下的一瞬间，记录当前力场触手位置
    dragProcess=1;                                                                 //拖动进程开始。
    drag();
}
function drag(){                                                                  //获取当前鼠标位置
    dragCurrentX=event.clientX;dragCurrentY=event.clientY;
    if (dragProcess==1){                                                           //如果在拖动过程中，改变目标二相箔的CSS对象中的left 和 top来改变其位置跟上鼠标
        CSSRule(window.event.target,"left",(dragCurrentX-dragStartX).toString()+"px");
        CSSRule(window.event.target,"top",(dragCurrentY-dragStartY).toString()+"px");
    }
}
function dragFinisher(){                                                           //拖动过程中，如果松开鼠标，触发此过程。
    if(dragProcess==1){
        dragStartX=event.clientX;                                                    //获取当前鼠标位置。
        dragStartY=event.clientY;
        if(dragStartX>758&&dragStartX<850&&dragStartY>80&&dragStartY){              //如果鼠标松开的位置位于应该放入的星系中，那么触发添加节点和删除节点事件
            var node=document.createElement("div");
            addClass(node,"dragBox");
            $("#dragBoxContainer2").appendChild(node);                               //将目标二相箔从原来的地方删除
            $("#dragBoxContainer1").removeChild($(".dragBox"));                      //在目标星系加入新的二相箔
        }
        else{
            CSSRule(window.event.target,"left",(dragCurrentX-dragStartX).toString()+"px");//如果不是，那么将二相箔弹回原来位置。
            CSSRule(window.event.target,"top",(dragCurrentY-dragStartY).toString()+"px");
        }
    }
    dragProcess=0;
}
delegateEvent(".dragBoxContainer","div","mousemove",drag);          //使用事件代理来为所有的dragBox添加事件。
delegateEvent(".dragBoxContainer","div","mousedown",dragStarter);
$.on("#halfColRight","mouseup",dragFinisher);                       //之所以鼠标抬起的事件加入到背景中去，因为有时鼠标过快，目标方块跟不上
//delegateEvent(".dragBoxContainer","div","mouseup",dragFinisher);  //然而用户已经将鼠标放入右边的灰色方框中了，并且松开了左键，这时如果无法完成拖入动作
                                                                    //用户会非常沮丧的。。。