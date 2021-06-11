var btn = $("#btn");
var handle = function(){
	var date = $("#date").value;
	var reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig;
	if(!reg.test(date)){
		alert("请输入正确日期");
		return;
	}
	var dates = date.split(/-/g);
	var ending = Date.parse(new Date(dates[0],dates[1]-1,dates[2])); //注意月份是从0开始的，要减1
	var now = Date.parse(new Date());
	if(ending-now < 0){
		alert("输入日期应大于当前日期");
		return;
	}
	var increseTime = function(){//计时
		now += 1000;
		if(now<ending){
			var day = 0,hour = 0,minitue = 0,second = 0;
			var leftSecond = (ending-now) / 1000;
			day = parseInt(leftSecond / 3600 / 24) || 0;  //剩余天数
			hour = parseInt((leftSecond /3600) % 24);     //剩余小时数
			minitue = parseInt((leftSecond / 60) % 60);   //剩余分钟数
			second = parseInt(leftSecond % 60);           //剩余秒数
			$("#show").innerHTML = "距离"+dates[0]+"年"+dates[1]+"月"+dates[2]+"日还有"+day+"天"+hour+"小时"+minitue+"分"+second+"秒";
			setTimeout(increseTime,1000);
		}else{
			alert("倒计时结束");
		}
	}
	var timer = setTimeout(increseTime,1000);
};
$.click(btn,handle);