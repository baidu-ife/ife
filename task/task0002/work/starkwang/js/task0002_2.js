function countTime (future) {
    var now = new Date;
    var output = [];
    var interval = 0;
    interval = (Date.parse(future) - Date.parse(now))/1000;
    if (interval < 0) {
        return false;
    };
    console.log(interval);
    output[0] = Math.floor(interval/86400);
    interval = interval%86400;
    output[1] = Math.floor(interval/3600);
    interval = interval%3600;
    output[2] = Math.floor(interval/60);
    output[3] = interval%60;
    console.log(output);
    $("#count").innerHTML = "距离" + future.getFullYear() + "年" + future.getMonth() + "月"+ future.getDate() + "日还有" + output[0] + "天"+ output[1] +"小时"+ output[2] +"分钟"+ output[3] +"秒";
}

addEvent($("#button"),"click",function(){
    var timeArray = $("#time").value.split("-");
    each(timeArray,function(item,index){
        timeArray[index] = parseInt(item);
    });
    var future = new Date;
    future.setFullYear(timeArray[0]);
    future.setMonth(timeArray[1] -1);
    future.setDate(timeArray[2]);
    future.setHours(0);
    future.setMinutes(0);
    future.setSeconds(0);
    future.setMilliseconds(0);
    if(Date.parse(future) - Date.parse(new Date)){
        if(window.timer){
            clearInterval(window.timer);
        }
        window.timer = setInterval(function(){
            countTime(future);
        },1000);
    }
})