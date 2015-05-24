function click(){
    alert("html");
    var date = document.getElementById("date").value;
    // alert(date);
    var cha;
    var a = /^(\d{4})-(\d{2})-(\d{2})$/;
    var Temp;
    if(!a.test(date)){
        alert("日期格式不正确！");
        return false;
    }
    var year = date[0]*1000+date[1]*100+date[2]*10+date[3]*1;
    var month = date[5]*10+date[6]*1;
    var day = date[8]*10+date[9]*1;
    // alert(year+' '+month+' '+day);
    setInterval(function(){
        var Today = new Date();
        var NowYear = Today.getFullYear();
        var NowMonth = Today.getMonth()+1;
        var NowDay = Today.getDate();
        var NowHour = Today.getHours();
        var NowMinute = Today.getMinutes();
        var NowSecond = Today.getSeconds();
        var YearLeft = year-NowYear;
        var MonthLeft = month-NowMonth;
        var DayLeft = day-NowDay;
        var HourLeft = 0-NowHour;
        var MinuteLeft = 0-NowMinute;
        var SecondLeft = 0-NowSecond;
        //alert("hello");
        if(SecondLeft<0){
            SecondLeft += 60;
            MinuteLeft--;
        }
        if(MinuteLeft<0){
            MinuteLeft +=60;
            HourLeft--;
        }
        if(HourLeft<0){
            HourLeft += 24;
            DayLeft--;
        }
        if(DayLeft<0){
            DayLeft +=30;
            MonthLeft--;
        }
        if(MonthLeft<0){
            MonthLeft += 12;
            YearLeft--;
        } 
        if(SecondLeft>=0 && MonthLeft>=0 && MinuteLeft>=0
        && HourLeft>=0 && DayLeft>=0 && YearLeft>=0) {
            Temp = YearLeft+'年'+MonthLeft+'月'+DayLeft+'日'
                +HourLeft+'小时'+MinuteLeft+'分'+SecondLeft+'秒';
            //alert(Temp);
            var cha = document.getElementById("cha");
            cha.innerHTML = Temp; 
        }
        else{
            return 0;
        }

    },1000);
    return 1;
}
var btn = document.getElementById("but");
btn.addEventListener("click", click, false);