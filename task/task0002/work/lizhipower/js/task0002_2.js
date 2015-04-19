/**
 * Created by Zhi_LI on 2015/4/19.
 */
var tmInput = $('#tm-input');
var tmBtn = $('#tm-btn');
var tmDiv = $('#tm-div')[0];
var tmNow =$('#tm-now');
var tmWarn =$('#tm-warn');
var tmContent =$('#tm-content');

tmInput.on('focus',tmCheck);

function tmCheck(){
    var timeSet = tmInput[0].value;
    console.log(timeSet);
    var tmReg = /^((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;

    //console.log(timeNow.match(tmReg));
    if (timeSet.match(tmReg) == null || timeSet.length != 10) {
        tmBtn[0].innerHTML = 'error';
        tmBtn[0].setAttribute('disabled','disable');
        tmWarn[0].innerHTML = '请按照YYYY-MM-DD格式输入时间';
        tmContent[0].style.visibility = "hidden";

    }else {
        console.log(timeSet.match(tmReg));
        tmBtn[0].innerHTML = '倒计时';
        tmBtn[0].removeAttribute('disabled');
        tmContent[0].style.visibility = "visible";

        tmNow[0].innerHTML = timeSet.match(tmReg)[0];

        var dateSet = timeSet.match(tmReg)[0].split('-');
        var ySet = parseInt(dateSet[0]);
        var mSet = parseInt(dateSet[1]);
        var dSet = parseInt(dateSet[2]);
        //console.log([ySet,mSet,dSet]);

        //var tmDate = new Date();
        //tmDate.setFullYear(ySet);
        //tmDate.setMonth(mSet);
        //tmDate.setDate(dSet);
        var d  = Date.UTC(ySet, mSet, dSet);
        var fmtm = new fnTimeCountDown(d, tmDiv);
        //var pms  = fmtm.f.dv();
    }

    tmInput.on('keydown',tmCheck);
    tmInput.on('keyup',tmCheck);

}

var fnTimeCountDown = function(d, o){
    var f = {
        zero: function(n){
            var n = parseInt(n, 10);
            if(n > 0){
                if(n <= 9){
                    n = "0" + n;
                }
                return String(n);
            }else{
                return "00";
            }
        },
        dv: function(){
            d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
            var future = new Date(d), now = new Date();
            //现在将来秒差值
            var dur = Math.round((future.getTime() - now.getTime()) / 1000) + future.getTimezoneOffset() * 60, pms = {
                sec: "00",
                mini: "00",
                hour: "00",
                day: "00",
                month: "00",
                year: "0"
            };
            if(dur > 0){
                pms.sec = f.zero(dur % 60);
                pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
                pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
                //月份，以实际平均每月秒数计算
                pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
                //年份，按按回归年365天5时48分46秒算
                pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
            }
            return pms;
        },
        ui: function(){
            if($('#tm-sec')[0]){
                $('#tm-sec')[0].innerHTML = f.dv().sec;
            }
            if($('#tm-min')[0]){
                $('#tm-min')[0].innerHTML = f.dv().mini;
            }
            if($('#tm-h')[0]){
                $('#tm-h')[0].innerHTML = f.dv().hour;
            }
            if($('#tm-d')[0]){
                $('#tm-d')[0].innerHTML = f.dv().day;
            }
            if($('#tm-m')[0]){
                $('#tm-m')[0].innerHTML = f.dv().month;
            }
            if($('#tm-y')[0]){
                $('#tm-y')[0].innerHTML = f.dv().year;
            }
            setTimeout(f.ui, 1000);
        }
    };
    f.ui();
    //console.log(f.dv());
};