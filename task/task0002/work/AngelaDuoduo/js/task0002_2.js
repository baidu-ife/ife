window.onload = function() {
	
	var input = $("input"),
		button = $("button"),
		targetYearDom = $("#year"),
		targetMonthDom = $("#month"),
		targetDayDom = $("#day"),
		restDaysDom = $("#days"),
		restHoursDom = $("#hours"),
		restMinutesDom = $("#minutes"),
		restSecondsDom = $("#seconds"),
		targetYear = "",
		targetMonth = "",
		targetDay = "",
		restDays = 0,
		restHours = 0,
		restMinutes = 0,
		restSeconds = 0,
		minutesToSeconds = 60,
		hoursToSeconds = minutesToSeconds * 60,
		daysToSeconds = hoursToSeconds * 24,  
		timer = null;

	$.click(button, function() {
		var targetDate = input.value;
		if (/\d{4}-\d{2}-\d{2}/.test(targetDate)) {
			var items = targetDate.split("-");
			targetYearDom.innerText = items[0];
			targetMonthDom.innerText = items[1];
			targetDayDom.innerText = items[2];

			timer = setInterval(function() {
				calculateTime();
				drawInfo();
			}, 1000);
		}
	});

	function calculateTime() {
		var seconds = Math.round((new Date(input.value).getTime() - new Date().getTime())/ 1000) - 8 * hoursToSeconds;
		if (seconds <= 0) {
			clearInterval(timer);
			return;
		}
		restDays = Math.floor(seconds / daysToSeconds); 
		restHours = Math.floor((seconds - restDays * daysToSeconds) / hoursToSeconds);
		restMinutes = Math.floor((seconds - restDays * daysToSeconds - restHours * hoursToSeconds) / minutesToSeconds);
		restSeconds = seconds % minutesToSeconds;
	}

	function drawInfo() {
		restDaysDom.innerText = restDays;
		restHoursDom.innerText = restHours;
		restMinutesDom.innerText = restMinutes;
		restSecondsDom.innerText = restSeconds;
	}


}