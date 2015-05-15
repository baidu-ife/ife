/**
 * Created by jiawen on 2015/4/26.
 */
window.onload = function(){
    var interval;
    $.click($('#btnSubmit'), function (e) {
        clearInterval(interval);
        var dateStr = trim($('#input').value);
        var regex = /^\d{1,4}-((0?[1-9])|(1[0-2]))-((0?[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/;
        if(!regex.test(dateStr)){
            $.showErrorTip($('#btnSubmit'),"日期格式错误");
        }else{
            $.hiddenErrorTip($('#btnSubmit'));
            var date = new Date(Date.parse(dateStr.replace(/-/g,"/")));
            $('#year').innerHTML = date.getFullYear();
            $('#month').innerHTML = date.getMonth()+1;
            $('#date').innerHTML = date.getDate();
            interval = setInterval(function () {
                var now = new Date();
                var sub = parseInt((date.getTime() - now.getTime())/1000);
                if(sub <= 0){
                    clearInterval(interval);
                    $('#days').innerHTML = '00';
                    $('#hours').innerHTML = '00';
                    $('#mins').innerHTML = '00';
                    $('#seconds').innerHTML = '00';
                    $.showErrorTip($('#btnSubmit'),"已经过期");
                }else{
                    $('#days').innerHTML = formatNum(parseInt(sub/60/60/24));
                    $('#hours').innerHTML = formatNum(parseInt(sub/60/60%24));
                    $('#mins').innerHTML = formatNum(parseInt(sub/60%60));
                    $('#seconds').innerHTML = formatNum(parseInt(sub%60));
                }
            },1000);
        }
    });
};

function formatNum(num){
    if(num < 10){
        return '0' + num;
    }else{
        return num;
    }
}