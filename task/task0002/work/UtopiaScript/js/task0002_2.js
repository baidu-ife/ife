var interval = 1000; 
var text;
var time;

function ShowCountDown(year,month,day,divname) 
{ 
    var now = new Date(); 
    var endDate = new Date(year, month-1, day); 
    var leftTime=endDate.getTime()-now.getTime(); 
    var leftsecond = parseInt(leftTime/1000); 
    var day1=Math.floor(leftsecond/(60*60*24)); 
    var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
    var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
    var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
    var tip = document.getElementById(divname); 
    tip.innerHTML = "UtopiaScript提示距离"+time[0]+"年"+time[1]+"月"+time[2]+"日还有："+day1+"天"+hour+"小时"+minute+"分"+second+"秒"; 
} 
 
function add(obj){
    var length=obj.value.length;
    //自动添加"-"
    if((length==4||length==7)&&event.keyCode!=8){
        obj.value=obj.value+'-';
    }
    text = obj.value;
    time = text.split('-');
    console.log(text);
    console.log(time);
}

function check(obj){
    var patm=/^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/;
    if(obj.value !="" && !patm.exec(obj.value)){
        warn = $("#warn")
        warn.innerHTML="请按照特定的格式YYYY-MM-DD输入年月日！"
        obj.focus();
        obj.select();
    }
}
var btn = $("#btn");
addEvent( btn, "click", btnHandle );

function btnHandle() {
    window.setInterval(function(){ShowCountDown(time[0],time[1],time[2],'tip');}, interval);
}