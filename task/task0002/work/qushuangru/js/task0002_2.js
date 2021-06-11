function showCountDown() {
    var myYear, myMonth, myDay, diffrentTime;
    var myDate = curDate = new Date()
    var curTime = Date.parse(curDate);
    var inputDate = $("input").value;
    var inputDateArr = inputDate.split("-");
    myDate.setFullYear(inputDateArr[0], inputDateArr[1] - 1, inputDateArr[2]);
    myTime = myDate.setHours(0, 0, 0, 0);
    diffrentTime = myTime - curTime;

    clock(diffrentTime,inputDateArr);
    diffrentTime -= 1000;
    var interval = setInterval(function(){
        	clock(diffrentTime,inputDateArr);
        	diffrentTime -= 1000;
        }, 1000);

    function clock(diffrentTime,inputDateArr) {
    	var myYear,myMonth,myDay,diffrentDay,diffrentHour,diffrentMin,diffrentSec,timeRemain;
    	if (diffrentTime <= 0) {
    		clearInterval(interval);
    		str = "时间到！BOOM!";
    		$("p").innerHTML = str;
    		return;
    	};
    	
        myYear = inputDateArr[0]
        myMonth = inputDateArr[1]
        myDay = inputDateArr[2]

        
        diffrentDay = Math.floor(diffrentTime / 86400000);
        timeRemain = diffrentTime - diffrentDay * 86400000;
        diffrentHour = Math.floor(timeRemain / 3600000);
        timeRemain -= diffrentHour * 3600000;
        diffrentMin = Math.floor(timeRemain / 60000);
        timeRemain -= diffrentMin * 60000;
        diffrentSec = Math.floor(timeRemain / 1000);

        str = "距离" + myYear + "年" + myMonth + "月" + myDay + "日还有" + diffrentDay + "天" + diffrentHour + "小时" + diffrentMin + "分" + diffrentSec + "秒";
        $("p").innerHTML = str;
    }   
}

$.on("button", "click", showCountDown);
