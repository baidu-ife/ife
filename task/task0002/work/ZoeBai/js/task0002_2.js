window.onload =function(){
    $.click("[type=button]", handler1);
}


var handler1 = function (){
    var arr = $("[type=text]").value.split("-");
    var submitDt = new Date(parseInt(arr[0]), parseInt(arr[1])-1, parseInt(arr[2]));
    var nowDt = new Date();
    if (submitDt - nowDt > 0) {
        var count = setInterval(function() {
        var nowDt = new Date();
        if (submitDt - nowDt > 0) {
            var days = parseInt((submitDt - nowDt)/1000/60/60/24);
            var hours = parseInt((submitDt - nowDt)/1000/60/60) - days * 24;
            var minutes = parseInt((submitDt - nowDt)/1000/60) - days * 24 * 60 -hours * 60;
            var seconds = parseInt((submitDt - nowDt)/1000) - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
            var str = "距离" + arr[0] + "年" + arr[1] + "月" + arr[2] + "日还有" + days +"天" + hours+ "小时" + minutes + "分" + seconds + "秒";
        }
        $("p").innerHTML = str;
    }, 1000);
    }
    if (submitDt - nowDt <= 0) {
        if (count) {
            clearInterval(count);
        }
        else {
            $("p").innerHTML = "该日期已过，请重新输入";
        }
        
    }
    // var countdown = function() {
    //     var nowDt = new Date();
    //     if (submitDt - nowDt > 0) {
    //         var days = parseInt((submitDt - nowDt)/1000/60/60/24);
    //         var hours = parseInt((submitDt - nowDt)/1000/60/60) - days * 24;
    //         var minutes = parseInt((submitDt - nowDt)/1000/60) - days * 24 * 60 -hours * 60;
    //         var seconds = parseInt((submitDt - nowDt)/1000) - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    //         var str = "距离" + arr[0] + "年" + arr[1] + "月" + arr[2] + "日还有" + days +"天" + hours+ "小时" + minutes + "分" + seconds + "秒";
    //     }
    //     $("p").innerHTML = str;
    // }
};
    
