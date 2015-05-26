/**
 * Created by Zhi_LI on 2015/4/19.
 */
var tmInput = $('#tm-input');
var tmBtn = $('#tm-btn');
var tmDiv = $('#tm-div')[0];
var tmNow = $('#tm-now');
var tmWarn = $('#tm-warn');
var tmContent = $('#tm-content');
var timeoutId;

//var fmtm;

tmInput.on('focus', inputChanged);
tmInput.on('keydown', inputChanged);
tmInput.on('keyup', inputChanged);

//tmInput.on('blur', timer);
tmBtn.click(timer);

function timer() {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    fnTimeCountDown(tmCheck(), tmDiv);
}
function inputChanged() {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    tmCheck();
    if ($('#tm-sec')[0]) {
        $('#tm-sec')[0].innerHTML = '';
    }
    if ($('#tm-min')[0]) {
        $('#tm-min')[0].innerHTML = '';
    }
    if ($('#tm-h')[0]) {
        $('#tm-h')[0].innerHTML = '';
    }
    if ($('#tm-d')[0]) {
        $('#tm-d')[0].innerHTML = '';
    }
    if ($('#tm-m')[0]) {
        $('#tm-m')[0].innerHTML = '';
    }
    if ($('#tm-y')[0]) {
        $('#tm-y')[0].innerHTML = '';
    }
}

function tmCheck() {
    var timeSet = tmInput[0].value;
    //console.log(timeSet);
    var tmReg = /^((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;

    //console.log(timeNow.match(tmReg));
    if (timeSet.match(tmReg) == null || timeSet.length != 10) {
        falseInput('format');
        return -1;
    }
    else {
        //console.log(timeSet.match(tmReg));
        tmBtn[0].innerHTML = '倒计时';
        tmBtn[0].removeAttribute('disabled');
        tmContent[0].style.visibility = "visible";

        tmNow[0].innerHTML = timeSet.match(tmReg)[0];

        var dateSet = timeSet.match(tmReg)[0].split('-');
        var ySet = parseInt(dateSet[0]);
        var mSet = parseInt(dateSet[1]);
        var dSet = parseInt(dateSet[2]);
        console.log([ySet,mSet,dSet]);

        df = Date.UTC(ySet, mSet-1, dSet);
        //console.log(df)
        if (df < Date.now()) {
            falseInput('overdue');
            return -1;
        }
        else {
            return df ;
        }

    }

    function falseInput(mode) {
        tmBtn[0].innerHTML = 'error';
        tmBtn[0].setAttribute('disabled', 'disable');
        if (mode == 'format'){
            tmWarn[0].innerHTML = '请按照YYYY-MM-DD格式输入时间';

        }else if (mode == 'overdue'){
            tmWarn[0].innerHTML = '已过期';

        }
        tmContent[0].style.visibility = "hidden";
    }

}

var fnTimeCountDown = function (df, o) {

    var f = {
        zero: function (n) {
            var n = parseInt(n, 10);
            if (n > 0) {
                if (n <= 9) {
                    n = "0" + n;
                }
                return String(n);
            } else {
                return "00";
            }
        },
        dv: function () {
            var future = df || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
            var now = Date.now();
            //现在将来秒差值
            console.log(future - now);
            var dur = Math.floor((future - now) / 1000), pms = {
                sec: "00",
                mini: "00",
                hour: "00",
                day: "00",
                month: "00",
                year: "0",
                dur: dur
            };
            //if (dur > 0) {
            console.log(dur)
            pms.sec = f.zero(dur % 60);
            pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : "00";
            pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) - 8 : "00";
            pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : "00";
            //月份，以实际平均每月秒数计算
            pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
            //年份，按按回归年365天5时48分46秒算
            pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : "0";
            //}else {
            //    console.log('hi');


            //}
            return pms;
        },
        ui: function () {
            console.log(f.dv().dur);
            timeoutId = setTimeout(f.ui, 1000);

            if (f.dv().dur > 0) {
                if ($('#tm-sec')[0]) {
                    $('#tm-sec')[0].innerHTML = f.dv().sec;
                }
                if ($('#tm-min')[0]) {
                    $('#tm-min')[0].innerHTML = f.dv().mini;
                }
                if ($('#tm-h')[0]) {
                    $('#tm-h')[0].innerHTML = f.dv().hour;
                }
                if ($('#tm-d')[0]) {
                    $('#tm-d')[0].innerHTML = f.dv().day;
                }
                if ($('#tm-m')[0]) {
                    $('#tm-m')[0].innerHTML = f.dv().month;
                }
                if ($('#tm-y')[0]) {
                    $('#tm-y')[0].innerHTML = f.dv().year;
                }
            }else {
                console.log('clearT')
                clearTimeout(timeoutId);

                tmWarn[0].innerHTML = '已过期';
                tmContent[0].style.visibility = "hidden";

            }

        }
    };
    f.ui();
    //console.log(f.dv());
};