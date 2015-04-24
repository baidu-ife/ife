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
function trim(str){
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