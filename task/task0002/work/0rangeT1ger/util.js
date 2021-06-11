/**
 * Created by wujia_000 on 2015/4/19.
 */
var t;
function isArray(arr) {                                     //�ж��Ƿ�Ϊ����
    if (arr instanceof Array) console.log("It is an array.");
    else console.log("It is NOT an array");
}
testArray1=[1,2,3,4];
testArray2="1,2,3,4";
isArray(testArray1);
isArray(testArray2);
/*******************************�Ƿ��Ǻ���******************************************/
console.log("****************************");
function isFunction(fn) {                                   //�ж��Ƿ�Ϊ����
    if(typeof fn == 'function') console.log("It is a function");
    else console.log("It is not a function.");
}
isFunction(isFunction);
isFunction(testArray1);
/***************************ǳ���������*****************************************/
console.log("****************************");
function lightClone(object){                                //ǳ����
    var subject;
    var newObject={};
    for (subject in object){
        newObject[subject]=object[subject];
    }
    return newObject;
}
function cloneObject(object){                               //���
    var subject;
    var newObject={};
    for (subject in object){
        if(typeof  object[subject] == 'object')
            newObject[subject]=cloneObject(object[subject]); //�ݹ���ã������ڲ��ж��������ȿ�¡�ڲ��Ķ���
        else newObject[subject]=object[subject];
    }
    return newObject;
}
/****************��������********************************************************/
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
/*****************************ȥ���ظ�����****************************************/
console.log("****************************");
function uniqueArray(arr) {
    var targetArr = [,];
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] == 'number') {
            for (var j = 0; j < targetArr.length; j++) {
                if (arr[i] == targetArr[j]) {              //�˴���֤Դ�������Ƿ��к�Ŀ�������ظ�����,����У�������ԭ������������������Ƚ�
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
    if(str.match(/[\s,;����]+/g)!=null)
        var strByWords=str.split(/[\s,;����]+/g);
    else var strByWords=[str," "];
    var targetStr = [,];
    for (var i = 0; i < strByWords.length; i++) {
        if(strByWords[i]==""||strByWords[i]==" "||strByWords[i]=="  ") continue;
        if (typeof strByWords[i] == 'string') {
            strByWords[i]=trim(strByWords[i]);
            for (var j = 0; j < targetStr.length; j++) {
                if (strByWords[i] == targetStr[j]) {       //�˴���֤Դ�������Ƿ��к�Ŀ�������ظ�����,����У�������ԭ������������������Ƚ�
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
/*********************************ȥ���ո�Tab��**********************************/
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
/***************************�����е��ú���*************************************/
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
/****************************�����е�һ��Ԫ�ص�����*****************************/
console.log("****************************");
function getObjectLength(obj) {
    var i;
    var num=0
    for(i in obj){
        num++;
    }
    return num;
}

// ʹ��ʾ��
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
/***************************�ж��Ƿ�Ϊ�����ַ******************************/
console.log("****************************");
function isEmail(emailStr) {                     //���µ����ʼ���ַ��ģʽ�ǺϷ���
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
console.log(isEmail("��ֵĶ���","��ֵĶ���"));
/**************************�ж��Ƿ�Ϊ�ֻ���********************************/
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
/*****************�������ʽ*******************************************/
console.log($("#input").className);
                                                                 // Ϊdom����һ����ʽ��ΪnewClassName������ʽ
function addClass(element, newClassName) {
    if(element.className.indexOf(newClassName)==-1) element.className+=" "+newClassName;
}
addClass($("#input"),"bullshit");
console.log($("#input").className);
                                                                // �Ƴ�dom�е���ʽoldClassName
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
function CSSRule(element,attribute,cssValue){              //���������ʽ��Ҳ���Բ�ѯ������ʽ
    if(cssValue){
        element.style[attribute]=cssValue;
        return;
    }
    return window.getComputedStyle(element,null)[attribute];
}
                                                               // �ж�siblingNode��dom�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
function isSiblingNode(elementName, siblingNode) {
    var element=$(elementName);
    if(element.parentNode==siblingNode.parentNode)
    return true;
    else return false;
}
                                                              // ��ȡdom�������������ڵ�λ�ã�����һ������{x, y}
function getPosition(elementName) {                          //��ʱ��Ҫ���������и�Ԫ���Լ����ǵ����и�Ԫ��ֱ����Ԫ�ص�����ƫ����.
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


// ʵ��һ���򵥵�Query
function checkId(element,idName){
    if(idName==element.id) return true;
}
function checkClass(element,className){
    for(var i in element.classList){
        if(className==element.classList[i]) return true;           //������ȡԪ�ص�ÿ��class
    }
}
function checkAttribute(element,attributeName){
    for(var i in element.attributes){
        if(attributeName==element.attributes[i]) return true;      //������ȡԪ�ص�ÿ��attributes
    }
}
function checkTagName(element,tagName){
    if(tagName==element.tagName) return true;
}
function $(selector) {                                             //�����˼·��Ȼ�Ǵֱ��ı������Ӹ��ڵ㿪ʼ����
    if(!selector) return false;
    var selectByWords=selector.split(" ");                          //�Ƚ�������ַ�������
    for(var i=0;i<selectByWords.length;i++){
        if(selectByWords[i].indexOf(".")!=-1){
            var className=selectByWords[i].split(".")[1];           //��ȡ���е�������������
            continue;
        }
        else if(selectByWords[i].indexOf("#")!=-1){
            var idName=selectByWords[i].split("#")[1];              //��ȡ���е�id��
            continue;
        }
        var attributeByLetter=selectByWords[i].split("");
        for(var j= 0;j<attributeByLetter.length;j++){
            if(attributeByLetter[j]=="[") {
                var attributeName = attributeByLetter.slice(1, attributeByLetter.length-1).join("");//��ȡ���е�attribute��
                continue;
            }
        }
        var tagName=selectByWords[i].toUpperCase();           //ʣ��ľ��Ǳ�ǩ����~����Ϊ��ǩ��û��ǰ�����ʾ��~��
    }
    var iterator = document.createNodeIterator(document, NodeFilter.SHOW_ELEMENT, null, false);
    var current=document;
    for(;current!=null;current=iterator.nextNode()){         //�Ӹ��ڵ㿪ʼ��������������Ԫ�صĸ���������ϵĲ�ѯ����
        if(tagName==null){                                   //����ճ���Ĵ���ܶ࣬�����Ǹ���ģ������߼��ļ򻯱����ˡ���
            if(idName==null){                                //��Ȼ���ܼ򻯣���review�ĸ��������~~
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
/*******************************************�ⲿ��δ���*******************/
// ��һ��dom��һ�����event�¼�����Ӧ����Ӧ����Ϊlistener
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
function addEvent(elementName, event, listener) {        //����������addEventListener�ģ�Ȼ�����������ɾ��������Ӧ������ʱ��
    var element=$(elementName);
    if(!element) return false;
    if(!element.eventList) element.eventList=[];       //���������addEventListener�Ļ������޷�ȫ������ɾ���ˡ���
    if(!element.eventList[event]){                     //�������ÿ��element��������Ӧ�¼������飬���汣�������ĳһ���¼����¼�����Ϊ�±꡿��������Ӧ����
        element.eventList[event]=[];                   //Ȼ���޸���������Ϳ�������ɾ��������������
        element.eventList[event][0]=listener;          //�ҳ����ǽ����ĳƪ���ͣ������Ľ��˺ܶ���~
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


// �Ƴ�dom�������event�¼�����ʱִ��listener����Ӧ����listenerΪ��ʱ���Ƴ�������Ӧ����

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
    if(!element.eventList) element.eventList=[];               //����Ϊ�˱���������"keypress"��ʱ���±��ظ�������������element.eventList[]�����
    if(!element.eventList[event+"Enter"]){                     //�±���������"enter"�ַ�����
        element.eventList[event+"Enter"]=[];
        element.eventList[event+"Enter"][0]=listener;
    }
    else{
        element.eventList[event+"Enter"][element.eventList[event+"Enter"].length]=listener;
    }
    function listenerFinal(){
        for(var i=0;i<element.eventList[event+"Enter"].length;i++){
            if(window.event.keyCode==13){                      //�жϼ�ֵ�Ƿ����13������ǣ���ôִ��֮ǰ������¼���
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

/*********************************�¼�������**********************************/
function delegateEvent(elementName, tag, eventName, listener) { //��ʱ�Ѿ���װ����ˣ�����Ҫʹ��$("#div3")���Ƶ��﷨�ˣ�ֱ������selector���ݾ��С�
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
/**************************С����1******************************************/
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
/**************************����2***********************/
function getDate(){                                           //���ڻ�ȡ������������
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
    var remainDate= new Date();                      //��ʵ����˼·���ǽ������ʱ���뵱ǰʱ�����������һ��date����Ȼ��ֱ��ȡ�ö���������ա�
    remainDate.setTime(targetDate.getTime()-currentDate.getTime());
    if(remainDate.getFullYear()-currentDate.getFullYear()+45<0){
        $("#alertTimeError").innerHTML="Input time must later than today!";
    }
    if(remainDate.getFullYear()-currentDate.getFullYear()+45>0){
        $("#alertTimeError").innerHTML=" ";
    }
}
function showTime(){
    var targetDate=getDate();                         //����ע����д���е�ֱ������������������ж��Ƿ����������ķ�ʽ
    var currentDate=new Date();                       //�����ж�����Ƿ�С���㣬���С������ô���ϸ���λ��ʱ��
    t=window.setTimeout(showTime,500);                 //ÿ0.5��ˢ��һ�Ρ�
    var remainDate= new Date();
    remainDate.setTime(targetDate.getTime()-currentDate.getTime());
    $("#year").innerHTML=remainDate.getFullYear()-1970;//��֪��Ϊ��������Ǵ��˲��಻��1970��ֻ�ܼ�ȥ��console�µĽ����û����ģ���֪�Ƿ�����ʾ�����⣿
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
/****************************************����3:�ֲ�ͼ***************************************/
var config={                                                                            //����ѡ��
    imgNum:3,                             //ͼƬ������
    time:3                                //�Զ��ֲ�ʱ���ʱ��
}
var slideProgress=0;                     //��ǰ��������λ��
var slide;                               //�����setTimeOut���̵Ķ�������ֹͣ�Զ�����
var slidePx=2;                           //��������ڵ��������ٶȵģ�1���뻬�����ٸ�����
var targetPosition=0;                    //��ǰĿ��λ�ã�ͨ������Ŀ��λ�������Ļ����ķ����Ŀ�ĵ�
var ifOverSlide;                         //�����ж��Ƿ񻬶���Ŀ��ص㡣
var auto;                                //����ֹͣ�Զ����������ֵҲ����setTimeOut����ֵ��
function initial(){                     //��ʼ�Զ�������
    auto=setTimeout(slideNext,config.time*1000);
}
function slideNext(){                   //�Զ����������õĺ����������������»���һҳ����ʵ���ֲ�ͼ�����Ұ���Ҳ���Ե������������
    if(slideProgress<=-600*(config.imgNum-1)) {
        targetPosition=0; slidePx=10;
    }
    else{
        targetPosition=slideProgress-600;    slidePx=-5;
    }
    ifOverSlide=slideProgress==targetPosition?true:false;
    slide();
}
function slide(){                        //��Ҫ�ĺ��Ķ��������еĻ�������Ҫ����������������ĺ���ֻ��Ҫ���ĵ���targetPosition������
    var overSlide=slideProgress==targetPosition?true:false;
    clearTimeout(auto);                   //������д������չ�Ը��ã�����Ĺ��������Ҫ���룬ֻ��Ҫ����targetPosition��slidePx����
    if(ifOverSlide==overSlide){
        slideProgress+=slidePx;
        CSSRule($("#imageSlide"),"left",slideProgress.toString()+"px");
        setTimeout(slide,1);
    }
    else initial();
}
function clickDot(){                    //�����ť֮��ᷢ�������飺
    var dotId=window.event.target.id.split("dot")[1];
    targetPosition=(dotId-1)*(-600);     //��������ĸ���ť���ð�ťid����ÿ��ͼƬ��Ⱦ���Ŀ��λ�á�
    slideProgress=slideProgress-slideProgress%8;//�����ȡ����8������������Ϊ��λ������8����ȥ8������ʹ֮�ܹ���8�����������Ͳ���λ�ƹ������١�
    if(targetPosition>slideProgress) slidePx=8;//˲��仯8px�����û�Ӧ�ÿ��������ɡ��������㿴�ó�����
    else slidePx=-8;
    ifOverSlide=slideProgress==targetPosition?true:false;
    clearTimeout(auto);
    slide();
}

delegateEvent("#dotContainer","div","click",clickDot);//�������¼����������Ϳ���ʹ������ӵ�С�㶼���й���
initial();
/***************************����4**************************************/
var inputTipsCss={
    width: "200px",
    height: "20px",
    margin: "0px",
    "background-color":"#ffffff"
}
var focusPosition=-1;
function destroyOldQuery(){
    focusPosition=-1;                                                   //��ԭѡ�е�ѡ���ʼλ��
    if(window.event.keyCode!=38||window.event.keyCode!=40){
        var parent=$("#inputTips");
        parent.innerHTML="";
    }
}
function searchQuerys(){
    if(window.event.keyCode!=38||window.event.keyCode!=40||window.event.keyCode!=13){//������»س��������¼�����ô�������²�ѯ
        window.setTimeout(searchQuery,10);
    }
}
function searchQuery(){                                             //Ŀǰû�취������ȫ���ưٶȵ�������ʾ����Ϊ�������������
    var inputText=[$("#searchBox").value,];                          //����Ҫ�жϴʻ��������ϡ����㷨�������ο��������ö�ѧ����
    var resultText=[];
    for(var i in inputText){                                        //�����ܴﵽ�Ľ�����ǣ������ʱ���ܹ������Ѿ�����Ĵʻ㣬���������ʻ�
        for(var j in searchDictionary){                             //�������ʻ�Ļ����ᵼ���ظ����������ѳ��֡�
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
    if(window.event.keyCode==38){                                                 //��������ϼ�
        for(var i=0;i<$("#inputTips").childNodes.length;i++){                     //����������ѡ��ı�����ɫ
            CSSRule($("#inputTips").childNodes[i],"background-color","#ffffff");
        }
        if($("#inputTips").childNodes[0]){
            if(focusPosition==-1)  focusPosition=0;
            else focusPosition=focusPosition==0?$("#inputTips").childNodes.length-1:focusPosition-1;
            CSSRule($("#inputTips").childNodes[focusPosition],"background-color","#dddddd");//Ȼ��Ϊ��ѡ�е���һ����ӱ�����ɫ��
        }
    }
    if(window.event.keyCode==40){                                                  //��������¼�
        for(var i=0;i<$("#inputTips").childNodes.length;i++){                     //����������ѡ��ı�����ɫ
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
$.on("#searchBox","keydown",confirmFocus);                                                       //�����Լ����̨��������������û�����м��ಿ��
var searchDictionary=["haha","haha1","haha2","haha1234","haha235","haha625","haha253","haha164"];//�����õĴʿ�
/************************************����5*********************************/
var dragStartX,dragStartY,dragCurrentX,dragCurrentY;                               //���ĸ�ȫ�ֱ��������ں����䴫�ݲ�����������ʼ��ק�����ص�
var dragProcess;                                                                   //�Լ���ǰ���λ�ã�dragprogress�����ж��϶������Ƿ�ʼ��
function dragStarter(){                                                           //���û�п�ʼ��ô�ƶ���겻�ᴥ���¼�
    dragStartX=event.clientX;
    dragStartY=event.clientY;                                                      //�����������ڶ��ಭ�ϰ��µ�һ˲�䣬��¼��ǰ��������λ��
    dragProcess=1;                                                                 //�϶����̿�ʼ��
    drag();
}
function drag(){                                                                  //��ȡ��ǰ���λ��
    dragCurrentX=event.clientX;dragCurrentY=event.clientY;
    if (dragProcess==1){                                                           //������϶������У��ı�Ŀ����ಭ��CSS�����е�left �� top���ı���λ�ø������
        CSSRule(window.event.target,"left",(dragCurrentX-dragStartX).toString()+"px");
        CSSRule(window.event.target,"top",(dragCurrentY-dragStartY).toString()+"px");
    }
}
function dragFinisher(){                                                           //�϶������У�����ɿ���꣬�����˹��̡�
    if(dragProcess==1){
        dragStartX=event.clientX;                                                    //��ȡ��ǰ���λ�á�
        dragStartY=event.clientY;
        if(dragStartX>758&&dragStartX<850&&dragStartY>80&&dragStartY){              //�������ɿ���λ��λ��Ӧ�÷������ϵ�У���ô������ӽڵ��ɾ���ڵ��¼�
            var node=document.createElement("div");
            addClass(node,"dragBox");
            $("#dragBoxContainer2").appendChild(node);                               //��Ŀ����ಭ��ԭ���ĵط�ɾ��
            $("#dragBoxContainer1").removeChild($(".dragBox"));                      //��Ŀ����ϵ�����µĶ��ಭ
        }
        else{
            CSSRule(window.event.target,"left",(dragCurrentX-dragStartX).toString()+"px");//������ǣ���ô�����ಭ����ԭ��λ�á�
            CSSRule(window.event.target,"top",(dragCurrentY-dragStartY).toString()+"px");
        }
    }
    dragProcess=0;
}
delegateEvent(".dragBoxContainer","div","mousemove",drag);          //ʹ���¼�������Ϊ���е�dragBox����¼���
delegateEvent(".dragBoxContainer","div","mousedown",dragStarter);
$.on("#halfColRight","mouseup",dragFinisher);                       //֮�������̧����¼����뵽������ȥ����Ϊ��ʱ�����죬Ŀ�귽�������
//delegateEvent(".dragBoxContainer","div","mouseup",dragFinisher);  //Ȼ���û��Ѿ����������ұߵĻ�ɫ�������ˣ������ɿ����������ʱ����޷�������붯��
                                                                    //�û���ǳ���ɥ�ġ�����