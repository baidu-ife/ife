/**
 * Created by Administrator on 2015/4/28.
 */
window.onload = function() {
    var oTime = $('#time');
    var oTimeText = $('#time_text');
    var oTimeBtn = $('#time_btn');
    var timeShow = $('#time_show');
    var timeText = null;
    var timeDiff = null;
    var timer = null;
    var timeNotes = null;
    $.on(oTimeText, 'focus', function() {
        timeNotes = oTimeText.value;
        oTimeText.value = null;
    });
    $.on(oTimeText, 'blur', function() {
        if(oTimeText.value == '') {
            oTimeText.value = timeNotes;
        }
    });
    $.on(oTimeBtn, 'click', function() {
        clearInterval(timer);
        var text = oTimeText.value;
        var pattern =/^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/;
        if(timeText = text.match(pattern)) {
            timeShow.innerHTML = '距离' + timeText[0];
            timer = setInterval(function() {
                timeDiff = ((new Date(timeText[1], timeText[2]-1, timeText[3])).getTime() - (new Date()).getTime())/1000;
                if(timeDiff<=0) {
                    timeDiff = 0;
                }
                var dayDiff = parseInt(timeDiff/(24*3600));
                var hoursDiff = parseInt((timeDiff%(24*3600))/3600);
                var mDiff = parseInt(((timeDiff%(24*3600))%3600)/60);
                var sDiff = parseInt(((timeDiff%(24*3600))%3600)%60);
                timeShow.innerHTML =  '距离' +timeText[0] + '还有' +dayDiff + '天' + hoursDiff + ':' + mDiff + ':' + sDiff;
                if(timeDiff<=0) {
                    clearInterval(timer);
                }
            },1000)
        } else {
            timeShow.innerHTML = '请输入正确的时间格式。例如：2015-4-28'
        }

    });
};