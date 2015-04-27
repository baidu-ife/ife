var timer;

function updateDiff() {
	if (dateDiff[5] > 0){
		dateDiff[5] = dateDiff[5] - 1;
	}
	else if (dateDiff[5] == 0){
		if (dateDiff[4] == 0) {
			if (dateDiff[3] == 0) {
				if (dateDiff[2] == 0) {
					if (dateDiff[1] == 0) {
						if (dateDiff[0] == 0) {
							clearInterval(timer);
						}
						else if (dateDiff[0] > 0) {
							dateDiff[0] = dateDiff[0] - 1;
							dateDiff[1] = 11;
							dateDiff[2] = 29;
							dateDiff[3] = 23;
							dateDiff[4] = 59;
							dateDiff[5] = 59;
						}
					}
					else if (dateDiff[1] > 0) {
						dateDiff[1] = dateDiff[1] - 1;
						dateDiff[2] = 29;
						dateDiff[3] = 23;
						dateDiff[4] = 59;
						dateDiff[5] = 59;
					}
				}
				else if (dateDiff[2] > 0) {
					dateDiff[2] = dateDiff[2] - 1;
					dateDiff[3] = 23;
					dateDiff[4] = 59;
					dateDiff[5] = 59;
				}
			}
			else if (dateDiff[3] > 0) {
				dateDiff[3] = dateDiff[3] - 1;
				dateDiff[4] = 59;
				dateDiff[5] = 59;
			}
		}
		else if (dateDiff[4] > 0) {
			dateDiff[4] = dateDiff[4] - 1;
			dateDiff[5] = 59;
		}
	}

	$("#yearLeft").innerText = dateDiff[0];
	$("#monthLeft").innerText = dateDiff[1];
	$("#dayLeft").innerText = dateDiff[2];
	$("#hour").innerText = dateDiff[3];
	$("#min").innerText = dateDiff[4];
	$("#sec").innerText = dateDiff[5];
	$("#timeCounter").style.display = "block";
};

addClickEvent($("#submit"), function(){
	var userInput = $("#userInput").value;
	var re = /2\d{3}-(\d{2})-\d{2}/
	if (re.test(userInput)){
		if (new Date(userInput) == "Invalid Date") {
			$("#warning").innerText = "Invalid input";
		}
		else {
			var dates = userInput.split('-');
			dateDiff = [0,0,0,0,0,0];
			$("#year").innerText = dates[0];
			$("#month").innerText = dates[1];
			$("#day").innerText = dates[2];
			var date1 = new Date();
			var date2 = new Date(userInput);
			date2.setHours(date2.getHours() + date2.getTimezoneOffset() / 60)
			var secs = (date2 - date1) / 1000;
			if (date2 > date1){
				dateDiff[0] = (secs - secs % (24*3600*365)) / (24*3600*365);
				secs = secs % (24*3600*365);
				dateDiff[1] = (secs - secs % (24*3600*30)) / (24 * 3600*30);
				secs = secs % (24*3600*30);
				dateDiff[2] = (secs - secs % (24*3600)) / (24 * 3600);
				secs = secs % (24*3600);
				dateDiff[3] = (secs - secs % 3600) / 3600;
				secs = secs % 3600;
				dateDiff[4] = (secs - secs % 60) / 60;
				dateDiff[5] = Math.ceil(secs % 60);

				timer = setInterval(updateDiff, 1000);
			}
			else {
				$("#yearLeft").innerText = dateDiff[0];
				$("#monthLeft").innerText = dateDiff[1];
				$("#dayLeft").innerText = dateDiff[2];
				$("#hour").innerText = dateDiff[3];
				$("#min").innerText = dateDiff[4];
				$("#sec").innerText = dateDiff[5];
				$("#timeCounter").style.display = "block";
			}
		}
		
	}
	else {
		$("#userInput").value = "";
		$("#warning").innerText = "Invalid input";
	}
});

addEvent($("#userInput"),"input",function(){
	$("#warning").innerText = "";
});