/**
 * Created by jp on 2015/6/27.
 */
function isLeapYear(year) {
    if((year%4 == 0)&&(year%100 != 0)||(year%400 == 0))
        return 1;
    else
        return 0;
}
function showtime() {
    var endTime = document.getElementById("endtime").value.split(/-/);
    var endTime = new Date(endTime[0],endTime[1]-1,endTime[2]);
    var nowTime = new Date();
    console.log(endTime);
    if(endTime<nowTime)
       alert("必须输入大于今天的日期!");
    else {
      var endTimeYear = endTime.getFullYear();
      //var noWTimeYear = nowTime.getFullYear();
      //var leapyear = 0;
      //for(var i = noWTimeYear+1;i<=endTimeYear;i++) {
      //    if (isLeapYear(i))
      //        leapyear++;
      //}
      //  //方便计算把时间推到前一天的最后一秒
        var endTimeMonth = endTime.getMonth();

        var endTimeDay = endTime.getDate();
      //  var endTimeHour = 23;
      //  var endTimeMinute = 60;
      //  var endTimeSecond = 60;
      //  var nowTimeMonth = nowTime.getMonth()+1;
      //  var nowTimeDay = nowTime.getDate();
      //  var nowTimeHour = nowTime.getHours();
      //  var nowTimeMinute = nowTime.getMinutes();
      //  var nowTimeSecond = nowTime.getSeconds();
      //
      //  var yearSub =  endTimeYear-noWTimeYear;
      //  var monthSub =yearSub*12+ endTimeMonth-nowTimeMonth;
      //  var daySub =
      var leftTime = endTime - nowTime;
      var leftSecond = leftTime/1000;
      var leftDay = Math.floor(leftSecond/(24*60*60));
      var leftHour = Math.floor((leftSecond-leftDay*24*60*60)/3600);
      var leftMinute = Math.floor((leftSecond-leftDay*24*60*60-leftHour*3600)/60);
      var leftSecond = Math.floor(leftSecond-leftDay*24*60*60-leftHour*3600-leftMinute*60);
        document.getElementById("show").innerHTML ="距离"+endTimeYear+"年"+(endTimeMonth+1)+"月"+endTimeDay+"日"
        +"还有"+leftDay+"天"+leftHour+"小时"+leftMinute+"分钟"+leftSecond+"秒"+"了！";
    }
    if(leftTime)
    {
    var a = setTimeout("showtime()",1000);
    }
    if(leftTime==0)
    { clearTimeout(a);
    alert("时间到了");
    }



}

