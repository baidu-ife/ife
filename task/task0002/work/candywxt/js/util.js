function isArray(arr) {
    //your implement
    return Object.prototype.toString.call(arr) === '[object Array]';
}
}
function isFunction(fn){
    //your implement
    return Object.prototype.toString.call(arr) === '[object Function]';}
}
//使用递归实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
//被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、object对象。
function cloneObject(src){
    //your implement
    var result,oClass = isClass(src);
    if(oClass === "Object"){
        result = {};
    }else if(oClass === "Array"){
        result = [];
    }else{
        return src;
    }
    for(key in src){
        var copy = src[key];
        if(isClass(copy) == "Object"){
            result[key] = arguments.callee(copy);
        }else if(isClass(copy) == "Array"){
            result[key] = arguments.callee(copy);
        }else{
            result[key] = src[key];
        }
    }
    return result;
}
function isClass(o){
    if(o === null) return "Null";
    if(o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}
//测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello","hi"],
        b2: "JavaScript"
        }
}
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);    //1
console.log(tarObj.b.b1[0]);    //"hello"

//学习数字，字符串、数字等相关方法，在util.js中实现以下函数
//对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr){
var isEqual=function(obj1,obj2){
//两个对象地址相等，必相等
if(obj1===obj2){
return true;
}
if(typeof(obj1)==typeof(obj2)){
if(typeof(obj1)=="object"&&typeof(obj2)=="object"){
var pcount=0;
for(var p in obj1){
pcount++;
if(!isEqual(obj1[p],obj2[p])){
return false;
}
}
for(var p in obj2){
pcount--;
}
return pcount==0;
}else if(typeof(obj1)=="function"&&typeof(obj2)=="function"){
if(obj1.toString()!=obj2.toString()){
return false;
}
}else {
if(obj1!=obj2){
return false;
}
}
}else{
return false;
}
return true;
}
var temp=arr.slice(0);//数组复制一份到temp
for(var i=0;i<temp.length;i++){
for(j=i+1;j<temp.length;j++){
if(isEqual(temp[j],temp[i])){
temp.splice(j,1);//删除该元素
j--;
}
}
}
return temp;
}
//使用示例
var a = [1,3,5,7,5,3];
var b = uniqArray(a);
console.log(b); //[1,3,5,7]

//对字符串头尾行空格字符的去除，包括全角半角空格，Tab等，返回一个字符串
//先暂时不要简单的用一句增则表达式来实现
function trim(str){
    //your implement
    if(str == null) return "";
    //去除前面所有空格
    while( str.charAt(0) == '' ){
        str = str.substring(1,str.length);
    }
    //去除后面的空格
    while( str.charAt(str.length-1) == ''){
        str = str.substring(0,str.length-1);
    }
    return str;
}
//使用示例
var str = '    hi!   ';
str = trim(str);
console.log(str);//'hi!'

//实现一个遍历数组的方法，针对数组中每一个元素自行fn函数，并将数组索引和元素作为参数传递
function each(arr,fn){
    //your implement
    var result;
    for(var i = 0,j = 1 ;i<arr.length;i++){
        result = fn(arr[i],i);
    }
    return result;
}
//其中fn函数可以接受两个参数：item和index
//使用示例
var arr = ['java','c','php','html'];
function output(item){
    console.log(item)
}
each(arr,output);//java,c,php,html

//使用示例
var arr = ['java','c','php','html'];
function output(item,index){
    console.log(index+': '+item)
}
each(arr,output);


//获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj){}

//使用示例
var obj = {
    a: 1；
    b: 2;
    c:{
       c1:3,
       c2:4
      }
};
console.log(getObjectLength(obj));//3

//学会正则表达式，在util.js完成以下代码
//判断是否为邮箱地址
function isEmail(emailStr){
    //your implement
}

//判断是否为手机号
function isMobilePhone(phone){
    //your implement
}
//----------------------------------------------------
//任务三
//为dom增加一个样式名为newClassName的新样式
fu
function addClass(element,newClassName) {
    //your implement
}

//移除dom中样式oldClassName
function removeClass(element,oldClassName) {
    //your implement
}

//判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element,siblingNode){
    //your implement
}

//获取dom相对于浏览器的窗口的位置，返回一个对象{x，y}
function getPosition(element) {
    //your implement
}
//your implement

