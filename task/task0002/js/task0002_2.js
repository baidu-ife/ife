window.onload = function() {
    var inp = $('#inp1'),
    btn = $('#btn1'),
    timer = $('#timer'),
    days = $('#days'),
    minutes = $('#minutes'),
    hours = $('#hours'),
    seconds = $('#seconds');
    var go;
    //对文本框格式进行判断并提取
    $.click(btn,
    function() {
        if (inp.value) {
            var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
            var isdata = reg.exec(inp.value);
            clearInterval(go);
            if (isdata) {
                var str = isdata[1] + '年' + isdata[2] + '月' + isdata[3] + '天';
                timer.innerHTML = str;
                go = setInterval(gettime, 1000);
            } else {
                alert('输入格式有误');
            }

            function gettime() {
                var now = new Date();
                var settime = new Date(isdata[1], isdata[2] - 1, isdata[3]);
                var distance = settime.getTime() - now.getTime();
                //console.log(now.getMonth());
                if (distance <= 0) {
                    alert('时间到');
                    clearInterval(go);
                    return;
                } else {
                    day = Math.floor(distance / (3600 * 24 * 1000));
                    hour = Math.floor(distance / (3600 * 1000));
                    minute = Math.floor(distance / (60 * 1000));
                    second = Math.floor(distance / 1000);
                    days.innerHTML = day;
                    hours.innerHTML = hour;
                    minutes.innerHTML = minute;
                    seconds.innerHTML = second;
                }
            }
        } else {
            alert('请输入时间');
        }
    });
}