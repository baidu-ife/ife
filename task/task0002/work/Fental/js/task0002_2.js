/**
 * Created by T on 2015/4/20.
 */
function checkTime(date) {
    var match = /^\d{4}-\d{2}-\d{2}$/.exec(date);
    return !(match === null || match === undefined);
}
function changeTime(i, isYear) {
    isYear = isYear || false;
    if (isYear) {
        if (i < 10) {
            i = "000" + i;
        }
        else if (i < 100) {
            i = "00" + i;
        }
        else if (i < 1000) {
            i = "0" + i;
        }
    }
    else {
        if (i < 10) {
            i = "0" + i;
        }
    }
    return i;
}
function countDown(){
    var date = trim($("#date").value);
    var test;
    var getTime = function() {
        var interval;
        var output;
        var currentTime = new Date();
//            console.log(date);
        interval = Date.parse(date) - Date.parse(currentTime);
//            console.log(interval);
        if (interval <= 0) {
            clearInterval(test);
            alert("����ʱֹͣ");
        }
        else {
//                console.log("in here");
            var y;
            var mon;
            var day;
            var h;
            var min;
            var s;
            s = parseInt(interval / 1000 % 60, 10);
            min = parseInt(interval / 1000 / 60 % 60, 10);
            h = parseInt(interval / 1000 / 60 / 60 % 24, 10);
            day = parseInt(interval / 1000 / 60 / 60 / 24 % 31, 10);
            mon = parseInt(interval / 1000 / 60 / 60 / 24 / 31 % 12, 10);
            y = parseInt(interval / 1000 / 60 / 60 / 24 / 365, 10);
            output = "����"
            + date.getFullYear() + "��"
            + changeTime(date.getMonth()) + "��"
            + changeTime(date.getDay()) + "�ջ���"
            + changeTime(y, true) + "��"
            + changeTime(mon) + "��"
            + changeTime(day) + "��"
            + changeTime(h) + "Сʱ"
            + changeTime(min) + "��"
            + changeTime(s) + "��";
            $("#panel").innerHTML = output;
//                console.log(output);
//                console.log(y);
//                console.log(mon);
//                console.log(day);
//                console.log(h);
//                console.log(min);
//                console.log(s);
        }
    };
    if (checkTime(date)) {
        date = new Date(date + " 00:00:00");
        test = setInterval(getTime, 1000);
    }
    else {
        alert("��������ȷ��ʽ��ʱ��:YYYY-MM-DD");
    }
}
$.click("#btn", countDown);