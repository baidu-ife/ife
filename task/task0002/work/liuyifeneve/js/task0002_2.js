// JavaScript Document
var date = document.getElementById("date1").value;
var lefttime;
var IntervalID;
function savetime() {
	var Regex= /(\d{4}|)-((1[0-2])|(0?[1-9]))-(([12][0-9])|(3[01])|(0?[1-9]))/; 
	if (Regex.test(date)){
		var time=2000;
		IntervalID = window.setInterval("time=calculate(date)",1000);
　　	}            
	else {                                 
　　		alert("格式错误，请重新输入");                
　	}    
}

function calculate(str){
	
	var myDate=new Date(); 
	var aDate = str.split('-');
    var oDate1 = new Date(aDate[0],aDate[1],aDate[2]);
	var diffms=oDate1-myDate;
   	if((diffms)>0){
		isecs = parseInt((diffms/1000)%60); 
		imins = parseInt((diffms/1000/60)%60);
		ihors = parseInt((diffms/1000/60/60)%24);
		idays = parseInt(diffms/1000/60/60/24); 
		document.getElementById("showresult").innerHTML ="距离"+aDate[0]+"年"+aDate[1]+"月"+aDate[2]+"日还有"+idays+"天"+ihors+"小时"+imins+"分"+isecs+"秒";
	}
	else{(alert("日期输入错误"))}
	lefttime=diffms;
	if(diffms<1000){
		window.clearInterval(IntervalID);}
}

