(function(){
    var show = $("#show");
    //倒计时天数、小时、分钟、秒钟的dom元素
    var dSpan = $("#day");  
    var hSpan = $("#hour");
    var mSpan = $("#min");
    var sSpan = $("#sec");

    $.click("#start", function(e){
        //输入的目标日期
        var arr = $("#inputDate").value.split("-");
        //提取目标年、月、日
        var year0 = arr[0], month0 = arr[1], day0 = arr[2];
        $("#targetDate").innerText = year0 + "年" + month0 + "月" + day0 + "日";

        //每一秒执行一次timer函数
        var counter = setInterval(timer, 1000);
        
        function timer () { 
            var now = new Date();
            var targetDate = new Date(year0,month0-1,day0,0,0,0,0);
            //计算当前时间距离目标时间的时常，以秒为单位
            var distance = Math.floor((targetDate.getTime() - now.getTime())/1000);         

            if (distance <= 0) {
                clearInterval(counter);
                show.innerText = "时间到！";
                return;
            }

            day = Math.floor(distance / (3600 * 24));
            hour = Math.floor((distance - day*3600*24) / 3600);
            min = Math.floor((distance - day*3600*24 - hour*3600) / 60);
            sec = (distance - day*3600*24 - hour*3600) % 60;
            
            dSpan.innerHTML = day;
            hSpan.innerHTML = hour;
            mSpan.innerHTML = min;
            sSpan.innerHTML = sec;
        }
    });

})();

