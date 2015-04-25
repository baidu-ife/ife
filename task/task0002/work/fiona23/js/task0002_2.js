
$.on('#time-submit','click',computeTime)

function computeTime(){
    var timeInput = $('#time-input').value;
    var timer;//定时器
    //正则检查格式 不包含闰年检测 闰年检测用if语句完成
    if(/2\d{3}\-((0?[13578]|1[012])\-(0?[1-9]|[12][0-9]|3[01])|(0?[469]|11)\-(0?[1-9]|[12][0-9]|3[01])|0?2\-(0?[1-9]|[12][0-9]))$/.test(timeInput)){
        var countdown = $('#countdown');//获取倒计时模块
        var timeInputArr = timeInput.split("-")//整理输入的时间为数组
        var resultStr;//输出的倒计时字符串
        var inputYear = parseInt(timeInputArr[0]),//取得输入的年份
            inputMonth = parseInt(timeInputArr[1])-1,//-1是为了符合Date类型格式
            inputDay = parseInt(timeInputArr[2]);
        if ((inputYear%4 != 0 || inputYear%400 != 0) && inputMonth ==1 && inputDay == 29) {
            //输入的时间不是闰年却有了2月29
            countdown.innerHTML = "这一年二月只有28天哦~"
        } else {
            //startCountdown();//首先调用一次，防止首次延时,但是调用这一次后再次输入必须多按一次。
            timer = setTimeout(startCountdown,1000);
            
        }
    } else {
        clearTimeout(timer)
        $('#countdown').innerHTML = "输入时间格式不正确，请重新输入"
    }

    //计算主函数
    function startCountdown () {
        var now = new Date();//取得此时此刻的时间
        var nowYear = now.getFullYear(),
            nowMonth = now.getMonth(),
            nowDay = now.getDate();
        var timeInputDate = new Date(inputYear,inputMonth,inputDay)//将输入的时间转换为Date类型
        var diff=(timeInputDate.getTime() - now.getTime())/1000;//计算时间差的秒数
        resultStr = "距离"+inputYear+"年"+(inputMonth+1)+"月"+inputDay+"还有"
        if (diff>0) {
            var subYear = Math.floor(diff/(60*60*24*365)),
                subMonth = Math.floor(diff/(60*60*24*30))-12*subYear,
                subDay = Math.floor(diff/(60*60*24))-subMonth*30-subYear*365,
                subHour = Math.floor(diff/(60*60)) - Math.floor(diff/(60*60*24))*24,
                subMin = Math.floor(diff/(60)) - Math.floor(diff/(60*60))*60,
                subSec = Math.ceil(diff) - Math.floor(diff/(60))*60
                resultStr += subYear+"年"+subMonth+"月"+subDay+"日"+subHour+"时"+subMin+"分"+subSec+"秒";
                countdown.innerHTML = resultStr;//输出结果
                timer = setTimeout(startCountdown,1000);//每隔一秒更新结果
                $.on('#time-submit','click',function () {
                    clearTimeout(timer);
                    computeTime;
                })
            } else if(diff === 0) {
                //倒计时结束
                clearTimeout(timer);

            } else {
                //输入时间不正确
                countdown.innerHTML = "时间已经过去啦"
            }
    }

}

