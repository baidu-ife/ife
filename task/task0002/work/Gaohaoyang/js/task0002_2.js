var clock;

$.click("button", function() {
    
    clearInterval(clock);
    
    var showDiv = $(".show");
    var inputValue = $("input").value;
    var pattern = /^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|(3[0-1]))$/; //判断时间格式

    if (pattern.test(inputValue)) {
        console.log("right");
        var futureTime = new Date(inputValue.replace("-", "/"));
        var futureTimeArr = inputValue.split("-");

        clock = setInterval(count, 900);

        function count() {
            var currentTime = new Date();
            console.log(futureTime);
            console.log(currentTime);
            var gap = futureTime - currentTime;
            if (gap < 0) {
                clearInterval(clock);
                showDiv.innerHTML = "请输入未来的某一天";
                return;
            } else if (gap === 0) {
                clearInterval(clock);
                showDiv.innerHTML = "距离" + futureTimeArr[0] + "年" + futureTimeArr[1] + "月" + futureTimeArr[2] + "日还有0天0小时0分0秒";
                return;
            } else { //倒计时开始
                var day = Math.floor(gap / 1000 / 3600 / 24);
                var hour = Math.floor(gap % (1000 * 3600 * 24) / (3600 * 1000));
                var minute = Math.floor(gap % (1000 * 3600 * 24) % (3600 * 1000) / (60 * 1000));
                var second = Math.floor(gap % (1000 * 3600 * 24) % (3600 * 1000) % (60 * 1000) / 1000);
                console.log(day + "  " + hour + "   " + minute + "   " + second);

                showDiv.innerHTML = "距离" + futureTimeArr[0] + "年" + futureTimeArr[1] + "月" + futureTimeArr[2] + "日还有" + day + "天" + hour + "小时" + minute + "分" + second + "秒";
            }
        }
    } else {
        showDiv.innerHTML = "请检查输入格式";
    }
});