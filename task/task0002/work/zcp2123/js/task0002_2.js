/**
 * Created by zcp2123 on 2015/4/24.
 */
window.onload = function() {
    var interval;
    $.click("#btn", function(){
        var date = $("#inputDate").value;
        var zShow = $("#show");
        var regExp = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
        var time;

        if (regExp.test(date)) {
            clearInterval(interval);
            var timeArr = date.split("-");
            time = new Date(timeArr[0], timeArr[1] - 1, timeArr[2]);
            interval = setInterval(function(){
                zShow.innerHTML = getTimeDiff(new Date(), time);
            }, 1000);
        } else {
            clearInterval(interval);
            zShow.innerHTML = "输入的日期格式错误";
        }

        function getTimeDiff(now, target){
            var timeDiff = (target.getTime() - now.getTime()) / 1000;

            if (timeDiff <= 0) {
                clearInterval(interval);
                return "计时结束";
            }

            var dayDiff = Math.floor(timeDiff / (60 * 60 * 24));
            var hourDiff = Math.floor(timeDiff % (60 * 60 * 24) / (60 * 60));
            var minuteDiff = Math.floor(timeDiff % (60 * 60 * 24) % (60 * 60) / 60);
            var secondDiff = Math.floor(timeDiff % (60 * 60 * 24) % (60 * 60) % 60);

            return "距离" + target.getFullYear() + "年" + (target.getMonth() + 1) + "月" +
                target.getDate() + "日还有" + dayDiff + "天" + hourDiff + "小时" + minuteDiff +
                "分" + secondDiff + "秒";
        }
    });
}