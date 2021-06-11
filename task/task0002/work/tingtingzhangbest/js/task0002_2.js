var mybtn = document.getElementById("btn");
var interval;
mybtn.onclick = function(){
	var time,
		timeData,
		text = document.getElementById("text").value,
	    ptag = document.getElementById("time"),
	    regExp = new RegExp("[0-9]{4}-[0,1][0-9]-[0-3][0-9]");
	if(regExp.test(text))
	{
		clearInterval(interval);
		timeData = text.split("-");
		time = new Date(timeData[0],timeData[1]-1,timeData[2]);
		interval = setInterval(function(){
			ptag.innerText = getTime(new Date(),time);
		},1000);


	}
	else
	{
		clearInterval(interval);
		ptag.innerText = "输入的日期格式错误";
	}


};
function get_time_differ(nowdata,laterdata){
	var oDiff = new Object();
	var totalDiff = laterdata.getTime()-nowdata.getTime();
	oDiff.totalDiff = totalDiff;
	//console.log(totalDiff);
	//计算天数
	oDiff.days = Math.floor(totalDiff/1000/60/60/24);
	totalDiff = totalDiff - oDiff.days*1000*60*60*24;
	//计算小时数
	oDiff.hours = Math.floor(totalDiff/1000/60/60);
	totalDiff = totalDiff - oDiff.hours*1000*60*60;
	//计算分钟数
	oDiff.minutes = Math.floor(totalDiff/1000/60);
	totalDiff = totalDiff - oDiff.minutes*1000*60;
	//计算秒数
	oDiff.seconds = Math.floor(totalDiff/1000);

	return oDiff;
}
//get_time_differ(new Date(),new Date(2015,04,06));
function getTime(nowdata,laterdata){
	var time = get_time_differ(nowdata,laterdata);
	var ret = "";
	var mouth = laterdata.getMonth()+1;
	if(time.totalDiff<0){
		clearInterval(interval);
		return "日期已经过去";
	}
	else{
		ret = ret +"距离"+laterdata.getFullYear() + "年" + mouth + "月" + laterdata.getDate() +"日还有"
		+ time.days + "日" +time.hours +"小时" + time.minutes +"分" +time.seconds +"秒";
		return ret;
	}
}