/**
 * Created by Y2X on 2015/4/26.
 */

var result=document.getElementById("result");
var text=document.getElementById("txt");
var btn = document.getElementById("btn");
btn.addEventListener("click",clickListener,false);

function clickListener(){
    var str=text.value;
    var today=new Date();
    if(str==""){
        result.innerHTML="未输入";
    }
    else if(str.search(/^\d{4}-\d{2}-\d{2}$/)!=-1){//格式匹配，包括是否是数字
        var tmp=str.split("-");
        var year=tmp[0];
        var month=tmp[1];
        var date=tmp[2];
        //判断是否是真实存在的某天
        if(!checkDate(year,month,date)){
            result.innerHTML="该天不存在";
            return;
        }
        var oneDay=new Date(year,month-1,date,0,0,0);//类型自动转换
        var remain=Math.floor((oneDay.getTime()-today.getTime())/1000);
        console.log("remain:"+remain);
        if(remain>=0){//是将来某天
            document.getElementById("show").innerHTML="距离"+year+"年"+month+"月"+date+"日还有：";
            countDown(remain);
        }
        else{
            result.innerHTML="非未来时间";
        }
    }
    else{
        result.innerHTML="输入格式错误";
    }
}
function countDown(remain){
    console.log("countDown remain:"+remain);
    if(remain==0){
        result.innerHTML="00:00:00";
        clearTimeout(timer);
    }
    //显示
    var str="";
    var days=Math.floor(remain/60/60/24);//日
    days=polish(days);
    var hours=Math.floor(remain/60/60%24);//时
    hours=polish(hours);
    var minutes=Math.floor(remain/60%60);//分
    minutes=polish(minutes);
    var seconds=Math.floor(remain%60);
    seconds=polish(seconds);
    str=days+":"+hours+":"+minutes+":"+seconds;
    result.innerHTML=str;
    remain=remain-1;
    timer=setTimeout("countDown('"+remain+"')",1000);//注意函数有参数时的格式！！！

}
function checkDate(year,month,date){
    var leapYear=false;
    if(year%100==0&&year%400==0){
        leapYear=true;
    }
    else if(year%100!=0&&year%4==0){//非纪元年则整除4
        leapYear=true;
    }
    switch (month) {
        case 1,3,5,7,8,10,12:
            return (0<date<=31)? true:false;//大月
        case 4,6,9,11:
            return (0<date<=30)? true:false;//小月
        case 2:
            if(leapYear) return (0<date<=29)? true:false;
            else return (0<date<=28)? true:false;
    }
}
function polish(num){
    if(num<10){
        num="0"+num;
    }
    return num;
}
