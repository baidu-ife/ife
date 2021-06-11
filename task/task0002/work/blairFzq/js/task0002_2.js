

unit.addEvent(unit.$("#start"),"click",function(){

    //如何做到每一秒钟更新倒计时上显示的数
    var time = setInterval(update,1000);
    update();

});

function update(){
    var endDayArr = unit.$("#date").value.split("-");

    var nowDay = new Date();
    var endDay = new Date();

    //设置截止日期，为当天的凌晨
    endDay.setFullYear(endDayArr[0]);
    endDay.setMonth(endDayArr[1]-1);
    endDay.setDate(endDayArr[2]);
    endDay.setHours(0);
    endDay.setMinutes(0);
    endDay.setMilliseconds(0);

    console.log(endDay.getTime()-nowDay.getTime());
    //取得两个日期相隔的秒数，一个小时是3600秒，一天是86400
    var remainTime = parseInt((endDay.getTime()-nowDay.getTime() )/1000);
    //计算时差
    var day = parseInt(remainTime/86400);
    remainTime = remainTime-day*86400;
    var hour = parseInt(remainTime/3600);
    remainTime = remainTime-hour*3600;
    var min = parseInt(remainTime/60);
    remainTime = remainTime - min*60;

    unit.$("#p").innerHTML = "还剩下"+day+"天"+hour+"小时"+min+"分钟"+remainTime+"秒数";
}