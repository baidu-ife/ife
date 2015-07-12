/**
 * Created by dell on 2015/6/1.
 */
window.onload=showDate;
function showDate(){
    var btn=document.getElementById('btn');

    addEvent(btn,'click',jiShi);

}
function jiShi(){

    var input=document.getElementById('date').value.toString();
    var wantYear=input.substr(0,4);
    var wantMonth=input.substr(5,2);
    var wantMonthCal=wantMonth.valueOf()-1;
    //console.log(wantMonth);
    var wantDay=input.substr(8,2);
    var inputDate=new Date(wantYear,wantMonthCal,wantDay,0,0,0);
    var wantmills=inputDate.getTime();

    var showDate=document.getElementById('showDate');
    var timer=setInterval(function() {
        var nowDate = new Date();
        var nowmills = nowDate.getTime();
            // console.log(nowDate,inputDate);
        var diffmills = wantmills - nowmills;
        var diffs =Math.floor(diffmills/1000) ;
        var diffDay=Math.floor(diffs/(24*60*60));
        var resth=diffs%(24*60*60);//剩余秒数
        var diffHour=Math.floor(resth/3600);
        var restm=resth%3600;
        var diffMinute=Math.floor(restm/60);
        var diffSeconds=restm%60;
        if(diffs>0){
            showDate.innerHTML="距离"+wantYear+"年"+wantMonth+"月"+wantDay+"日还有"+diffDay+"天"+diffHour+"小时"+diffMinute+"分"+diffSeconds+"秒";
        }
        else if(diffs===0){
            showDate.innerHTML="距离"+wantYear+"年"+wantMonth+"月"+wantDay+"日还有"+diffDay+"天"+diffHour+"小时"+diffMinute+"分"+diffSeconds+"秒";
            clearInterval(timer);

        }
    },1000);
}