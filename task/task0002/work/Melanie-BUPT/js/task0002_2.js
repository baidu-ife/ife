/**************************
   Melanie-BUPT  2015/5/4
***************************/
var interval;

function calculate() {
    var inputDate = document.getElementById("input").value.split("-");
    var date = new Date(inputDate[0], inputDate[1], inputDate[2])
    var curDate = new Date();
    var year = inputDate[0]-curDate.getFullYear();
    //设置的日期返回月份与自动返回当前月份的方法不同
    //自动返回的月份为当前月份数减去1
    var month = inputDate[1]-1-curDate.getMonth();
    var day = inputDate[2]-curDate.getDate();
    //将日期设置为00:00:00的前1秒，这样计算起来方便些。最后计算总时间再将那一秒补回
    var hour = 23-curDate.getHours();
    var minute = 59-curDate.getMinutes();
    var second = 59-curDate.getSeconds();

    var days = year*365 + month*30 + day - 1;
    //console.log(days);
    //console.log(hour);
    //console.log(minute);
    //console.log(second);

    //补回之前少显示的1秒
    var seconds = days*24*60*60 + hour*60*60 + minute*60 + second + 1;
    //console.log(seconds);
    
    if (seconds>0) {
        document.getElementById("result").textContent = 
        "距离" + inputDate[0] + "年" + inputDate[1] + "月" + inputDate[2] + 
        "日还有" + days + "天" + hour + "小时" + minute + "分" + second + "秒";
    }
    else if (seconds==0) {
        clearInterval(interval);
        document.getElementById("result").textContent = "时间到！"
    }
    else {
        document.getElementById("result").textContent = 
        "距离" + inputDate[0] + "年" + inputDate[1] + "月" + inputDate[2] + 
        "日已经过去了" + -(days+1) + "天" + curDate.getHours() + "小时" + 
        curDate.getMinutes() + "分" + curDate.getSeconds() + "秒";
    }
}

function countTime() {
    var date = document.getElementById("input").value;
    var checkVal = date.split("-");
    var checkDate = (/\d{4}-\d{2}-\d{2}/).exec(date);
    if (checkDate==null || checkDate==undefined) {
        alert("请按照提示格式重新输入日期！");
    }
    else if (checkVal[1]>12 || checkVal[1]<1) {
        alert("请输入1-12之前的月份！");
    }
    else if (checkVal[2]<1 || checkVal[2]>30) {
        alert("请输入1-30之间的日期！");
    }
    else {
        interval = setInterval("calculate()", 1000);
    }
}


/************************************************
总结一下下：
    考查了Date对象的属性和方法以及计时器的使用
    关于设置新的日期对象，不同的设置方法会返回
    不同的月份值。这一点在计算中特别重要。
    另外，要注意一开始判断输入月份和日期的合法性。
*************************************************/