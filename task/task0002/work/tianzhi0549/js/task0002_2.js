window.onload=function (e) {
    var timer=0;
    //从2015-04-27这样的字符串日期返回日期对象
    function parseDate(str){
        var date=null;
        if(/^(\d{4})-(\d{2})-(\d{2})$/.test(str)){
            date=new Date(str+" 00:00:00");
            return date;
        }
        return null;
    }
    function format(time){
        var d, h, m, s;
        d=Math.floor(time/(24*3600*1000));
        time=time-d*24*3600*1000;
        h=Math.floor(time/(3600*1000));
        time=time-h*3600*1000;
        m=Math.floor(time/(60*1000));
        time=time-m*60*1000;
        s=Math.floor(time/(1000));
        return d+"天"+h+"小时"+m+"分钟"+s+"秒";
    }
    $.on("#ok", "click", function (e){
        var date=parseDate($("#text-input").value);
        if(timer!==0){
            clearTimeout(timer);
        }
        timer=setTimeout(function callback(){
            var diff=date-new Date();
            if(diff>0){
                $("#diff").innerHTML="距离"+date.toString()+"还有"+format(diff)+"。";
                timer=setTimeout(callback, 1000);
            }else{
                $("#diff").innerHTML="已经到 "+date.toString()+".";
                timer=0;
            }
        }, 0);
    });
}
