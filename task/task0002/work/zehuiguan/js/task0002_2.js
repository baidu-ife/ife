var clock;

$.click("button", function() {

    clearInterval(clock);

    var content = $("input").value;
    var contentArr = content.split("-");
    var pattern = /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])$/;
    var showDiv = $(".show");

    if (pattern.exec(content)) {
        var futureTime = new Date(content.replace("-", "/"));
        
        tick();
        clock = setInterval(tick, 1000);
    } else {
        showDiv.innerHTML = "格式错误，请输入正确的格式~";
    }

    function tick () {
        var currentTime = new Date();
        var interval = futureTime - currentTime;

        if (interval > 0 ) {
            var days = Math.floor(interval / (24*60*60*1000));
            var hours = Math.floor(interval % (24*60*60*1000) / (60*60*1000));
            var minutes = Math.floor(interval % (24*60*60*1000) % (60*60*1000) / (60*1000));
            var seconds = Math.floor(interval % (24*60*60*1000) % (60*60*1000) % (60*1000) / 1000);
            showDiv.innerHTML = "距离" + contentArr[0] + "年" + contentArr[1] + "月" + contentArr[2] + "日还有" + days + "天" + hours +"小时" + minutes +"分" + seconds +"秒";

        } else if (interval < 0 ) {
            showDiv.innerHTML = "请输入一个未来的日子哈~";
            return;
        } else {
            clearInterval(clock);
            showDiv.innerHTML = "时间到！";
            return;
        }
}
});

