window.onload = function() {
    $.on("#count", "click", countInterval);
}
var t;
function countInterval() {
    $("#info").innerHTML = "";
    $("#interval").innerHTML = "";
    var inputDate = $("#dateinput").value;
    if (!inputDate || trim(inputDate).length == 0) {
        displayError("请输入日期");
        return;
    }
    var inputDate = trim(inputDate);
    var inputDateArr = inputDate.split("-");
    if (inputDateArr.length != 3) {
        displayError("日期格式错误，请重新输入");
        return;
    }
    var partn = /^\d{1,4}-\d{1,2}-\d{1,2}$/;
    if (!partn.exec(inputDate)) {
        displayError("error");
        return;
    }
    var inputYear = inputDateArr[0];
    var inputMonth = inputDateArr[1];
    var inputDay = inputDateArr[2];
    inputDateArr[0] = parseInt(inputDateArr[0]);
    inputDateArr[1] = parseInt(inputDateArr[1]);
    inputDateArr[2] = parseInt(inputDateArr[2]);
    if (checkDate(inputDateArr)) {
        //如果上一次计时没有结束，就又点击按钮进行下一次计时的话，会有两个计时变量，同时在执行重复执行的函数，会有重叠
        //在这里，把t声明成全局变量，如果在计时前，就发现t被赋值了，那么就把先前的结束掉，免得干扰新的计时。
        if (t) {
            clearTimeout(t);
        }
        displayInterval(inputYear, inputMonth, inputDay);
        // displayInterval(inputDateArr);
    }
}
function displayError(error) {
    if (!error) {
        return;
    }
    $("#info").innerHTML = error;
    // $("#info").style.color = "red";
}
function checkDate(arr) {
    if (arr.length != 3) {
        displayError("日期输入错误，请核对后重新输入");
        return false;
    }
    var year = arr[0];
    var month = arr[1];
    var day = arr[2];
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        displayError("日期输入错误，请核对后重新输入");
        return false;
    }
    if (month < 0 || month > 12 || day < 0) {
        displayError("日期输入错误，请核对后重新输入");
        return false;
    }
    var flag = false;
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
        flag = true;
    }
    if ((",1,3,5,7,8,10,12,".indexOf("," + month + ",") != -1) && (day < 32)) {
        return true;
    } else if ((",4,6,9,11,".indexOf("," + month + ",") != -1) && (day < 31)) {
        return true;
    } else if (day < 29) {
        return true;
    } else if (flag && (day < 30)) {
        return true;
    } else {
        displayError("日期输入错误，请核对后重新输入");
        return false;
    }
}
function displayInterval(inputYear, inputMonth, inputDay) {
    var endDate = new Date(inputYear + "-" + inputMonth + "-" + inputDay);
    endDate.setFullYear(inputYear);
    console.log(endDate);
    var startDate = new Date();
    console.log(startDate);
    var intervalDate = Math.abs(endDate.getTime() - startDate.getTime());
    var days = Math.floor(intervalDate/(24*3600*1000));
    console.log(days);
    //除天后剩余的毫秒数用来继续计算小时，分钟，秒
    var leave1 = intervalDate % (24*3600*1000);
    var hours = Math.floor(leave1/(3600*1000));
    var leave2 = leave1 % (3600*1000);
    var minutes = Math.floor(leave2/(60*1000));
    var leave3 = leave2 % (60*1000);
    var seconds = Math.floor(leave3/1000);

    $("#info").innerHTML = "距离" + inputYear + "年" + inputMonth + "月" + inputDay + "日还有";
    $("#interval").innerHTML = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";

    t = setTimeout("displayInterval("+inputYear+","+ inputMonth+","+ inputDay + ")", 1000);
    //不可以这么写
    // t = setTimeout("displayInterval("+ inputDateArr + ")", 1000);
    // 为了给定时器传递参数，采用了上面的方法，就是把函数和参数拼接成字符串，处理的时候，会被当成js语句
    // 这种方法的缺陷就是参数不能被周期性的改变，但是本例中，传递的参数就是为了不改变，能一直保持不变。
    // 但是，多次试验表明(不实验也是，没仔细看参数类型，自己大意了)，拼接传递的参数只能是字符串，如果是数组什么的，也会被拆成字符串,可能是调用了对应的toString()方法，并且数组中的每一个元素都会被拆成一个参数
    // 比如，我本来想把年月日放在inputDateArr数组中传递，但是debug发现，在定时器经过一定时间响应时，参数列表变成了三个，分别是数组中的每一项。
    // 被坑了三个小时，两点半还不能睡，涨姿势了。
    if (intervalDate == 0) {
        clearTimeout(t);
    }
}