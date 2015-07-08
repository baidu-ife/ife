(function() {
    var interval;

    // 开始计时函数
    $.click("#button", function() {
        clearInterval(interval);
        var input = trim($("#input").value);
        var re = /[0-9]{4}-[0,1][0-9]-[0-3][0-9]/;

        if (input.length == 10 && re.test(input)) {
            var dateArray = input.split("-");
            var targetDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
            var curDate = new Date();
            var diff = targetDate.getTime() - curDate.getTime();
            if (diff <= 0) {
                $("#time").innerText = "当前日期已经过去, 请重新输入";
                return ;
            }
            
            interval = setInterval(function() {
                calculateTime(targetDate)
            }, 1000);
        }
        else {
            $("#time").innerText = "输入日期格式不对， 请按照YYYY-MM-DD格式输入"
        }
    });

    // 计算距离目标日期的时间，并显示
    function calculateTime(targetDate) {
        var curDate = new Date();
        var diff = targetDate.getTime() - curDate.getTime();
        if (diff < 1000) {
            $("#time").innerText = "时间到";
            clearInterval(interval);
        }

        var days, hours, minutes, seconds;

        days = Math.floor(diff/24/60/60/1000);
        diff -= days*24*60*60*1000;

        hours = Math.floor(diff/60/60/1000);
        diff -= hours*60*60*1000;

        minutes = Math.floor(diff/60/1000);
        diff -= minutes*60*1000;

        seconds = Math.floor(diff/1000);

        $('#time').innerText = "距离" + targetDate.getFullYear() + "-" + (targetDate.getMonth() + 1) + "-" + targetDate.getDate() 
        + "还有" + days + "日" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    }
})();