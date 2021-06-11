$(function () {
    var input = $('#input');
    var show = $('#show');
    var timer = null;

var monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function deltaDateTime(from, to) {

    var deltaSecond = to.getSeconds() - from.getSeconds();
    var deltaMinute = to.getMinutes() - from.getMinutes();
    var deltaHour = to.getHours() - from.getHours();
    var deltaDay = to.getDate() - from.getDate();
    var deltaMonth = to.getMonth() - from.getMonth();
    var deltaYear = to.getFullYear() - from.getFullYear();

    if (deltaSecond < 0) {
        deltaSecond += 60;
        deltaMinute--;
    }

    if (deltaMinute < 0) {
        deltaMinute += 60;
        deltaHour--;
    }

    if (deltaHour < 0) {
        deltaHour += 24;
        deltaDay--;
    }

    if (deltaDay < 0) {
        var lastMonth = from.getMonth();

        deltaDay += monthDay[lastMonth];

        if (lastMonth === 1) {
            var lastYear = from.getFullYear();
            if (lastYear % 400 === 0 || lastYear % 4 === 0 && lastYear % 100 !== 0) {
                deltaDay += 1;
            }
        }

        deltaMonth--;
    }

    if (deltaMonth < 0) {
        deltaMonth += 12;
        deltaYear--;
    }


    return deltaYear + '年' + deltaMonth + '月' + deltaDay + '日'
        + deltaHour + '小时' + deltaMinute + '分' + deltaSecond + '秒';
}

    $('#button').click(function () {

        // 停止现有的倒计时
        if (timer) {
            clearInterval(timer);
            timer = null;
        }

        var value = input.val();
        if (/^(\d{4})-(\d{2})-(\d{2})$/.test(value)) {
            var dateTo = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);

            var dateFrom = new Date();

            if (dateTo <= dateFrom) {
                return;
            }

            show.html('距结束还有：' + deltaDateTime(dateFrom,dateTo));

            setInterval(function () {

                if (dateTo <= dateFrom) {
                    clearInterval(timer);
                    timer = null;
                    return;
                }
                dateFrom = new Date();
                show.html('距结束还有：' + deltaDateTime(dateFrom,dateTo));
                console.log(deltaDateTime(dateFrom,dateTo));
            }, 1000);
        }
    });
});