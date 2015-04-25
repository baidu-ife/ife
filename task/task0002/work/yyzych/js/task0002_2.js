/*
* task0002_2.js
*/

(function () {
    var dayRadix=1000*60*60*24,
        hourRadix=1000*60*60,
        minuteRadix=1000*60,
        secondRadix=1000;

    var timer=null,
        remainTimeDom=$("#reaminDate");

    var getDate=function (date) {
        if(date.length!==3){
            return false;
        }
        try{
            date=new Date(date[0],date[1]-1,date[2]);
            return date;
        }catch(err){
            return false;
        }
    };

    var getRemainTime=function (date1,date2) {
        var remain=date2-date1;// 毫秒单位

        var days=Math.floor(remain/dayRadix);
        remain=remain%dayRadix;

        var hours=Math.floor(remain/hourRadix);
        remain=remain%hourRadix;

        var minutes=Math.floor(remain/minuteRadix);
        remain=remain%minuteRadix;

        var seconds=Math.floor(remain/secondRadix);

        return {
            day:days,
            hour:hours,
            minute:minutes,
            second:seconds
        };
    };

    var getTipStr=function (remainTime,finalDate) {
        var res="距离"+finalDate.getFullYear()+"年"+(finalDate.getMonth()+1)+"月"+finalDate.getDate()+"日还有";
        res+=remainTime.day+"天"+remainTime.hour+"时"+remainTime.minute+"分"+remainTime.second+"秒";
        return res;
    }

    var start=function (finalDate) {
        if(timer!==null){
            clearInterval(timer);
            timer=null;
        }

        run(finalDate);
        timer=setInterval(function () {
            run(finalDate);
        },1000);
    };

    var run=function (finalDate) {
        var curDate=new Date();
        if(curDate >= finalDate){
            clearInterval(timer);
            timer=null;
            remainTimeDom.innerHTML=getTipStr({day:0,hour:0,minute:0,second:0},finalDate);
            return;
        }
        var remainTime=getRemainTime(curDate,finalDate);
        remainTimeDom.innerHTML=getTipStr(remainTime,finalDate);
    };

    $.on("#getInputDate","click",function (e) {
        var dateTxt=$("#inputDate").value;
        if(!dateTxt) return;
        var date=getDate(dateTxt.split("-"));
        if(date instanceof Date){
            var curDate=new Date();
            if(curDate>date){
                alert("你输入的时间已过期");
                return;
            }
            start(date);
        }

    })
})();
