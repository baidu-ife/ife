/**
 * Created by Lenovo on 2015/5/4.
 */
 var input;
 var targetDateArr;
 var int;
 $.click($("#btn"), function () {
     input = $("#input").value;
     //判断日期格式是否正确,暂时没有考虑闰年问题
     if (input.match(/\d{4}-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0,1])/) != null) {
         targetDateArr = $("#input").value.split("-");
     }
     else {
         $("#display").innerHTML = "请输入正确格式的日期";
         return;
     }
     int = setInterval(countDown, 1000)
 });
 function countDown() {
     var d = new Date();
     var nowTime = d.getTime();
     var targetTime = Date.parse(targetDateArr[1] + "/" + targetDateArr[2] + "/" + targetDateArr[0]);
     var minus = targetTime - nowTime;
     for (var i = 0; i < targetDateArr.length; i++) {
         targetDateArr[i] = parseInt(targetDateArr[i]);
     }
     if (minus < 0) {
         $("#display").innerHTML = targetDateArr[0] + "年" + targetDateArr[1] + "月" + targetDateArr[2] + "日已经过去了!";
     }
     else if(minus == 0){
         $("#display").innerHTML = targetDateArr[0] + "年" + targetDateArr[1] + "月" + targetDateArr[2] + "日到了！";
         //取消倒计时
         clearInterval(int);
     }
     else {
         //倒计时显示部分，暂时没有考虑闰年问题
         var seconds = 1000;
         var minutes = seconds * 60;
         var hours = minutes * 60;
         var days = hours * 24;
         var years = days * 365;
         var y = parseInt(minus / years);
         var day = parseInt(minus % years / days);
         var h = parseInt(minus % years % days / hours);
         var m = parseInt(minus % years % days % hours / minutes);
         var s = parseInt(minus % years % days % hours % minutes / seconds);
         if (y == 0 && day == 0 && h == 0 && m == 0 && s == 0) {
             $("#display").innerHTML = targetDateArr[0] + "年" + targetDateArr[1] + "月" + targetDateArr[2] + "日已是过去式";
         } else {
             $("#display").innerHTML = "距离" + targetDateArr[0] + "年" + targetDateArr[1] + "月" + targetDateArr[2] + "日还有" + y + "年" + day + "天" + h + "小时" + m + "分" + s + "秒";
         }
     }

 }
