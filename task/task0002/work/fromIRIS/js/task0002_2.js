window.onload = function () {
	$.click("#timeBtn", clickListener);
	function clickListener() {
		var timer = null;
		var oTimeBox = $("#time");
		var sTr = oTimeBox.value;
		var arr = sTr.split("-");
		var oInpuDay = Date.parse(arr[1] + " " + arr[2] + "," + arr[0]);
		var sMinutes = 60 * 1000;
		var sHours = sMinutes * 60;
		var sDays = sHours * 24;
		timer = setInterval(function () {
			var oD = new Date();
			var oCurDay = oD.getTime();
			var oDifferTime = oInpuDay - oCurDay;
			var leftDays = Math.floor(oDifferTime / sDays);
			var toDays = oDifferTime % sDays;
			var toHours = toDays % sHours;
			// console.log(toHours)
			var toMinutes = toHours % sMinutes;
			var leftHours = Math.floor(toDays / sHours);
			var leftMinutes = Math.floor(toHours / sMinutes);
			var leftSeconds = Math.ceil(toMinutes / 1000);
			// console.log(leftSeconds);
			// console.log(1 % 2)
			$("#timeTips").innerHTML = "距离" + arr[0] + "年" +arr[1] + "月" + arr[2] + "日 还有" + leftDays + "天" + leftHours+ "小时" + leftMinutes+ "分钟" + leftSeconds+ "秒";
			if (oDifferTime == 0) {
				clearInterval(timer);
			}
		}, 1000)
	}
}
