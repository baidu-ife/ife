function countdown(){
    var endtime = $("#date").value;
    var datearr = endtime.split("-");
    var errinfo = "";
    var lefttime = 1;
    if(datearr[0].match(/^\d{4}$/) == null){
        errinfo = "年份输入不符合格式要求"
        return;
    }else if(datearr[1].match(/^\d{2}$/) == null){
        errinfo = "月份输入不符合格式要求"
        return;
    }else if(datearr[2].match(/^\d{2}$/) == null){
        errinfo = "日期输入不符合格式要求"
        return;
    }
    endtime = new Date(datearr[0], datearr[1]-1, datearr[2], 0, 0, 0);
    var now = new Date();
    lefttime = endtime.getTime() - now.getTime();
    if(lefttime <= 0){
        window.clearTimeout(t);
        return;
    }
    var leftsecond = lefttime/1000;
    var leftd = Math.floor(leftsecond / (24*60*60));
    var lefth = Math.floor((leftsecond - leftd*24*60*60) / 3600);
    var leftm = Math.floor((leftsecond - leftd*24*60*60 - lefth*3600) / 60);
    var lefts = Math.floor(leftsecond - leftd*24*60*60 - lefth*3600 - leftm*60);
    leftd = checktime(leftd);
    lefth = checktime(lefth);
    leftm = checktime(leftm);
    lefts = checktime(lefts);
    var obj = $("#countdown");
    obj.innerHTML = "距离目标日期还有"+ leftd + "天" + lefth + "小时" + leftm + "分" + lefts + "秒";
    var t = window.setTimeout(arguments.callee, 1000);
}
function checktime(item){
    if(item < 10){
        item = "0" + item;
    }
    return item;
}
$.click("#start",countdown);