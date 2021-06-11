var result;
var t;
function starttime(){
	if(result==null){
		var date=new Date();
		var date2=new Date(document.getElementById("time").value);
		var result=Math.abs(date.getTime()-date2.getTime());
	}
	var d=Math.floor(result/86400000);
	var h=Math.floor((result%86400000)/(86400000/24));
	var m=Math.floor((result%(86400000/24))/(86400000/24/60));
	var s=Math.floor((result%(86400000/24/60))/1000);
	var time=d+"天"+h+"小时"+m+"分"+s+"秒";
	document.getElementById("txt").innerText=time;
	t=setTimeout('starttime()',1000);
	if(result>=1000){
		result-=1000;
	}
	else
	{
		clearTimeout(t);
	}
}