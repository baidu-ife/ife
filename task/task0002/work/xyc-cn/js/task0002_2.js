/**
 * Created by xieyicheng on 2015/4/19.
 */
(function () {
        var  interval;
        $.click('#btn', function () {
        var text = $("#text").value,
            time,
            timeData,
            pTag = $("#time"),
            regExp = new RegExp("[0-9]{4}-[0,1][0-9]-[0-3][0-9]");

        if(regExp.test(text)){
            clearInterval(interval);
            timeData = text.split('-');
            time = new Date(timeData[0],timeData[1]-1,timeData[2]);
            interval = setInterval(function(){
                pTag.innerText =  getTime(new Date(),time);
            },1000)
        }
        else{
            clearInterval(interval);
            pTag.innerText = "输入的日期格式错误";
        }
    });

    function get_time_difference(earlierDate,laterDate)
    {
        var oDiff = new Object();
        var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
        oDiff.nTotalDiff = nTotalDiff;

        oDiff.days = Math.floor(nTotalDiff/1000/60/60/24);
        nTotalDiff -= oDiff.days*1000*60*60*24;

        oDiff.hours = Math.floor(nTotalDiff/1000/60/60);
        nTotalDiff -= oDiff.hours*1000*60*60;

        oDiff.minutes = Math.floor(nTotalDiff/1000/60);
        nTotalDiff -= oDiff.minutes*1000*60;

        oDiff.seconds = Math.floor(nTotalDiff/1000);


        return oDiff;

    }

    function getTime(earlierDate,laterDate){
        var time = get_time_difference(earlierDate,laterDate);
        var ret = "";
        var mouth = laterDate.getMonth()+1;
        if(time.nTotalDiff <= 0){  //时差为0，停止计时
            clearInterval(interval);
            return "日期已经过去了";
        }
        ret = ret + "距离" + laterDate.getFullYear() + "年" + mouth +
            "月" + laterDate.getDate() + "日还有" + time.days + "日" + time.hours +"小时" + time.minutes + "分" +
            time.seconds + "秒";
        return ret;
    }
})();