addClickEvent($(".click"), function() {	
	$(".display").innerHTML = "";
	clearInterval(t);
	t = run();
});

var t = run;

function run() {
	var textContent = $(".input").value;
	return setInterval(function(){
		if(/^\d+-\d+-\d+$/.test(textContent)) {
			var dateList = textContent.split("-").join("/");
			var date = new Date(dateList);
			var present = new Date();//现在的时间

			if(date >= present) {
				var allTime = date - present;
				var difDay = Math.floor(allTime / (24 * 60 * 60 * 1000));
				var difHour = Math.floor((allTime - difDay * (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
				var difMin = Math.floor((allTime / (60 * 60 * 1000) - Math.floor(allTime / (60 * 60 * 1000))) * 60);
				var difSec = Math.floor((allTime / (60 * 1000) - Math.floor(allTime / (60 * 1000))) * 60);
				$(".display").innerHTML = "距离" + date.getFullYear() + "年" +
					(date.getMonth() + 1) + "月" + date.getDate() + "日还有" + difDay + "天" + 
					difHour + "小时" + difMin + "分" + difSec + "秒";
			}else {
				$(".display").innerHTML = "输入格式不正确，或者输入时间比现在小";
			}
		}else {
			$(".display").innerHTML = "输入格式不正确，或者输入时间比现在小";
		}
	}, 1000);
}



