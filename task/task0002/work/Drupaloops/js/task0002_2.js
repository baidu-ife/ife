/**
 * Created by Ooop on 2015/5/3.
 */

window.onload = function () {
    var btn=document.getElementById("btn");
    addClickEvent(btn,function(){
        var timer =null;
        var inpDate = document.getElementById("txt").value;
        console.log(inpDate);
        var timearr = inpDate.split("-");
        inpDate = new Date(timearr[0],timearr[1]-1,timearr[2]);
        var inpTime = inpDate.getTime();
        timer =setInterval(function(){
            var curTime = new Date().getTime();
            var countTime = inpTime-curTime;
            var calDay =  Math.floor(countTime/(1000*60*60*24));
            var calHour = Math.floor(countTime%(1000*60*60*24)/(1000*60*60));
            var calMinute =Math.floor(countTime%(1000*60*60*24)%(1000*60*60)/(1000*60));
            var calSecond =Math.floor(countTime%(1000*60*60*24)%(1000*60*60)%(1000*60)/1000);
            var tp = document.getElementById("time");
            tp.innerHTML="距离"+timearr[0]+"年"+timearr[1]+"月"+timearr[2]+"日还有" +calDay+"天"+calHour+"小时"+calMinute+"分"+calSecond+"秒";
            if (countTime == 0)
                clearInterval(timer);
        },1000);
    });
}

