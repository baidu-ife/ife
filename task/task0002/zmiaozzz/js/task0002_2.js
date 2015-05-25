/**
 * @file task0002_2
 * @author zhangmiao
 */
var countNum;
//显示文字
var displayCount = '';
//输入日期转化成ms
var inputTime;
$.click('#startTiming',display);
function display() {
    var inputString = $('#input-time').value;
    //输入为空
    if(inputString === '') {
        $('#time-display').innerHTML = '请输入日期！';
        return;
    }
    //日期格式
    var dateFormat = /\d{4}-\d{1,3}-\d{1,3}/;
    if(!dateFormat.test(inputString)) {
        $('#time-display').innerHTML = '请输入正确的日期格式：YYYY-MM-DD';
        return;
    }
    displayCount = '距离' + inputString + ' 00:00:00 还有：<br>' ;
    var inputDate= inputString.split('-');
    inputTime = new Date();
    inputTime.setFullYear(inputDate[0], inputDate[1]-1, inputDate[2]);
    inputTime.setHours(0,0,0,0);
    inputTime = inputTime.getTime();
    count();
}
function count() {
    var date = new Date();
    var time = date.getTime();
    var differTime = inputTime - time;
    //输入的日期小于当前时间的日期
    if(differTime < 0) {
        clearTimeout(countNum);
        $('#time-display').innerHTML = '请输入大于当前时间的日期！';
        return;
    }
    //计时结束
    if(differTime === 0) {
        clearTimeout(countNum);
        $('#time-display').innerHTML = '计时停止！时间到！';
        return;
    }
    var DAY_MSECONDS = 24*60*60*1000;
    var HOUR_MSECONDS = 60*60*1000;
    var MINUTE_MSECONDS = 60*1000;
    var day = differTime/DAY_MSECONDS;
    day = Math.floor(day);
    var hour = differTime%DAY_MSECONDS/HOUR_MSECONDS;
    hour = Math.floor(hour);
    var minute = differTime%DAY_MSECONDS%HOUR_MSECONDS/MINUTE_MSECONDS;
    minute = Math.floor(minute);
    var second = differTime%DAY_MSECONDS%HOUR_MSECONDS%MINUTE_MSECONDS/1000;
    second = Math.floor(second);
    $('#time-display').innerHTML = '';
    var sb = displayCount + day + '天' + hour + '小时' + minute + '分' + second + '秒';
    $('#time-display').innerHTML = sb;
    countNum = setTimeout('count()',1000);
}

$.click('#endTiming',endTiming);
function endTiming() {
    clearTimeout(countNum);
}
