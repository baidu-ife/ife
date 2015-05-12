/**
 * @file task0002_2.js
 * @author AlisonZhang(zhangxuejing_62@126.com)
 * learnfrom zchen9
 */
window.onload = function(){

    var btn = $("#btn");
    var dateInput = $("#time");
    //添加输入框检查事件
    addEvent( dateInput, "keyup", inputCheck );
    //添加按钮点击事件
    addEvent( btn, "click", btnHandle );

   //按钮点击后检查输入内容是否合理，合理即执行倒计时操作，否则弹出错误。

    function btnHandle() {
        if ( inputCheck() ) {
            timeCountDown();
        }
        else {
            alert("wrong date format");
        }
    }

    //判断输入日期是否合理

    function inputCheck() {
        var time = $("#time").value;
        var tip = $("#tip");
        var timeReg = /\d{4}-\d{2}-\d{2}/g;
        //检查输入日期格式
        if ( timeReg.test(time) ) {
            var times = time.split("-");

            //分隔输入日期，获得年、月、日等信息
            var inputDate = new Date( times[0], times[1]-1, times[2] );
            var inputYear = parseInt( times[0] );
            var inputMonth = parseInt( times[1] );
            var inputDay = parseInt( times[2] );

            //获得当前时间，获得年、月、日等信息
            var startDate = new Date();
            var startYear = parseInt( startDate.getFullYear() );
            var startMonth = parseInt( startDate.getMonth() );
            var startDay = parseInt( startDate.getDate() );

            //创建当前时间，格式为(YYYY,MM,DD)
            var curDate = new Date( startYear, startMonth, startDay );

            //获得输入月份对应的日期
            switch (inputMonth) {
                case 2:
                    var monthDay = 28; //2月默认28天
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    monthDay = 30;
                    break;
                default :
                    monthDay = 31;
                    break;
            }
            //判断输入年份是否合理
            if ( inputYear < 1970 ) {
                tip.innerHTML = "The YEAR you input is out of range.";
            }
            //判断月份是否输入合理
            else if ( inputMonth < 0 || inputMonth > 12 ) {
                tip.innerHTML = "The MONTH you input is out of range.";
            }
            //判断日期输入是否合理
            else if ( inputDay < 0|| inputDay > monthDay ) {
                tip.innerHTML = "The DAY you input is out of range.";
            }
            //判断输入时间是否合理
            else if ( inputDate < curDate ) {
                tip.innerHTML = "The DATE you input is out of range.";
            }
            else {
                tip.innerHTML = "";
                return true;
            }

        }
        //若输入时间格式有误，显示提示信息
        else {
            tip.innerHTML = "Use YYYY-MM-DD format";
            return false;
        }
    }

    /**
     * 获得输入时间、当前时间，进行倒计时计算
     *
     * @class
     */
    function timeCountDown() {
        var times = $("#time").value.split("-");

        var inputDate = new Date( times[0], times[1] - 1, times[2] );
        var startDate = new Date();

        //输入时间和当前时间的差值
        var dateCount = inputDate - startDate;

        //获得天数差值
        var dayCount = Math.floor( dateCount / 86400000 );

        //获得小时差值
        var dateRemain = dateCount - dayCount * 86400000;
        var hourCount = Math.floor( dateRemain / 3600000);

        //获得分钟差值
        dateRemain -= hourCount * 3600000;
        var minCount = Math.floor( dateRemain / 60000 );

        //获得秒差值
        dateRemain -= minCount * 60000;
        var secCount = Math.ceil( dateRemain / 1000 );

        //获得倒计时输出位置，显示倒计时内容
        var timeCount = $("#timeCount");
        timeCount.innerHTML =  "Still need:"+"<br>"
        + hourCount +  "Hour"+"<br>"
        + minCount + "Minute" + "<br>"
        + secCount + "Second"

        //设置间隔时间为1秒，每隔1秒执行一次倒计时计算
        var interval = setInterval(
            function() {
                timeCountDown();
                dateCount -= 1000;
            },
            1000
        );

        //当时间差值小于0,停止倒计时计算，输出提示信息
        if ( dateCount <= 0) {
            clearInterval( interval );
            timeCount.innerHTML = "Time is up!";
        }
    }
};