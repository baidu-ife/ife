//========2. JavaScript数据类型及语言基础=======

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr){
	return(arr instanceof Array);
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    if(typeof(fn)=="function"){
    	return true;
    }else{
    	return false;
    }
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(obj){
  if(typeof(obj)!="object"||obj===null)return obj;
    var o= obj instanceof(Array)?[]:{};
    for(var i in obj){
      if(typeof(obj[i])=="object" && obj[i]!=null){
        o[i]=arguments.callee(obj[i]);
      }
      else{
        o[i]=obj[i];
      }
    }
    return o;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
   for(var i=0;i<arr.length;i++){
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function simpleTrim(str){
  while ((str.indexOf(" ")==0) && (str.length>1)){
    str=str.substring(1,str.length);
  }
  while ((str.lastIndexOf(" ")==str.length-1)&&(str.length>1)){
    str=str.substring(0,str.length-1);
  }
  if (str==" "){
    str="";
  }
  return str;
}
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g,'')
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn){
  for(var i=0;i<arr.length;i++){
    item=arr[i];
    index=i;   
    fn(item,index);
  }
} 
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
  var n=0;
  for(i in obj){
    n++
  }
  return n;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var re=/^\w+@[0-9a-z]+(\.[a-z]+){1,3}$/;
    return re.test(emailStr);
}
// 判断是否为手机号
function isMobilePhone(phone) {
    var re=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    return re.test(phone); 
}
//===========3. DOM=============

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {  
    if (!element.className.match(new RegExp('(\s|^)'+newClassName+'(\s|$)'))) {
    	element.className += " " + newClassName; 
    } 
}  
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (!element.className.match(new RegExp('(\s|^)'+oldClassName+'(\s|$)'))) {
    	console.log(1);
        element.className = element.className.replace(new RegExp('(\\s|^)'+oldClassName+'(\\s|$)'),' ');
    }
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var eParent=element.parentNode;
    var sParent=siblingNode.parentNode;
    return eParent=sParent?true:false;
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var position = {x:0,y:0};
    var index=element;
 	while(index){
        position.x += index.offsetLeft;
        position.y += index.offsetTop;
        index = index.offsetParent;
    }
    return position;
}
// 实现一个简单的Query
function $(selector) {

}