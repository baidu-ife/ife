//数组去重复操作
function uniqArray(arr) {
	var result=new Array();
   for(var i in arr){
	   if(result.indexOf(arr[i])==-1){
		   result.push(arr[i]);
	   }
   }
    return result;
}
//分割字符串获得爱好数组
function getHobbits(id) {
	var symbols=[" ",",","、",";","，","；"];
	var str=document.getElementById(id).value;
	var hobbits=new Array();
	for(var i in symbols){
		if(str.indexOf(symbols[i])!=-1){
			hobbits=str.split(symbols[i]);
			break;
		}
	}
	if(str!=""&&hobbits.length==0){
		hobbits[0]=str;
	}
	return hobbits;
}
//第一阶段
function p1(){
	var str=document.getElementById("hobbit").value;
	var hobbits=str.indexOf("，")>-1?str.split("，"):str.split(",");
	hobbits=uniqArray(hobbits);
	var copy="";
	//for in 循环数组获得的是数组下标而不是数组内的元素
	for (var index = 0; index < hobbits.length; index++) {
			if(hobbits[index]!=""){
				copy+=hobbits[index];
			}
		
	}
	document.getElementById("output").innerHTML=copy;
}
//第二阶段
function p2(){
	var hobbits=getHobbits("p2-hobbit");
	var copy="";
	for (var index = 0; index < hobbits.length; index++) {
			if(hobbits[index]!=""){
				copy+=hobbits[index];
			}
		
	}
	document.getElementById("p2-output").innerHTML=copy;
}
//第三阶段
function p3() {
	var hobbits=getHobbits("p3-hobbit");
	var msg=document.getElementById("msg");
	var copy="";
	if(hobbits.length>10||hobbits.length==0){
		msg.removeAttribute("hidden");
	}
	else{
		for(var i=0;i<hobbits.length;i++){
			copy+="<input type='checkbox' checked/><label>"+hobbits[i]+"</label>";
		}
		document.getElementById("p3-output").innerHTML=copy;
		if(msg.getAttribute("hidden")==null){
			msg.setAttribute("hidden","hidden");
		}
	}
}