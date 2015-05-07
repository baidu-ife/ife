function checkInput(s) {
    return /^\d{4}-[01]\d-[0-3]\d$/.test(s)
}

function formatM(n) {
    var s = String(n + 1);
    return s.length===1?'0'+s:s;
}

function formatD(n) {
    var s = String(n);
    return s.length===1?'0'+s:s;
}

var clock;

$.click("#btn", function(e) {
    clearInterval(clock);
    var s = $("#time").value;
    if (!checkInput(s)) {
        alert("输入格式为YYYY-MM-DD");
        return;
    }
    // Node里可以这样啊。。。而且node不设定是08:00:00
    //var targetDate = new Date(s + ",00:00:00");
    var targetDate = new Date(s);
    clock = setInterval(countDown, 100)
    function countDown(){
        var now = new Date();
        var difftime = targetDate - now;
        if (difftime <= 0) {
            clearInterval(clock);
            $(".countdown").innerHTML = "距离" + targetDate.getFullYear() + "年"
            + formatM(targetDate.getMonth()) + "月"
            + formatD(targetDate.getDate()) + "日" + "还有"
            + formatD(0) + "天"
            + formatD(0) + "小时"
            + formatD(0) + "分"
            + formatD(0) + "秒";
            return;
        }
        var diffday = Math.floor(difftime / 1000 / 3600 / 24);
        var diffhour = Math.floor(difftime % (1000 * 3600 * 24) / (3600 * 1000));
        var diffminute = Math.floor(difftime % (1000*3600*24) % (3600*1000) / (60*1000));
        var diffsecond = Math.floor(difftime % (1000*3600*24) % (3600*1000) % (60*1000) / 1000);
        $(".countdown").innerHTML = "距离" + targetDate.getFullYear() + "年"
        + formatM(targetDate.getMonth()) + "月"
        + formatD(targetDate.getDate()) + "日" + "还有"
        + formatD(diffday) + "天"
        + formatD(diffhour) + "小时"
        + formatD(diffminute) + "分"
        + formatD(diffsecond) + "秒";
    }
    return;
})
