window.onload = function () {
    
    var oBtn = $('#btn');
    var oInput = $('#input1');
    var oP = $("p");

    oBtn.onclick = function() {
        var D,H,M,S,time;
        //对用户输入的时间格式化
        var arr = oInput.value.split('-');
        //设置时间
        var oSetDate = new Date(arr[0], arr[1]-1, arr[2]);
        //得到时间戳差值
        time = oSetDate.getTime() - new Date().getTime();
        //输入时间大于当前时间 
        if (time>=0) {
            //立即执行，修复定时器一秒延迟，使得页面立刻得到渲染
            show();
            oP.style.color = '#000';
        } else if (time<0) {
            oP.style.color = "red";
            oP.innerHTML = "您输入的时间小于当前时间！";
        } else {
            oP.style.color = "red";
        }

        //开启定时器 
        var timer = setInterval(function(){
            //获取时间差值
            time = oSetDate.getTime() - new Date().getTime();
            if (time>0) {
                show();
            } else if (time<=0) {
                clearInterval(timer);
            } 
        },1000);
        
        //封装时间动态改变
        function show() {

            //获取天数
            D = Math.floor(time / (1000 * 60 * 60 * 24));
            time = time % (1000 * 60 * 60 * 24);
            //获取小时
            H = Math.floor(time / (1000 * 60 * 60));
            time = time % (1000 * 60 * 60);
            //获取分钟
            M = Math.floor(time / (1000 * 60));
            time = time % (1000 * 60);
            //获取秒
            S = Math.floor(time / 1000);      
            oP.innerHTML = '您距离' + arr[0]+ '年' + arr[1] + '月'+ arr[2] + '日还剩'+D + '天' + H + '小时' + M + "分钟" + S + '秒'; 
        }
    };
};

