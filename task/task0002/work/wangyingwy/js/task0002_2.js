var date = document.getElementById("date");
var but = document.getElementById("but");
var day = document.getElementById("day");
var hours = document.getElementById("hours");
var min = document.getElementById("min");
var second = document.getElementById("second");

but.onclick = function(){

    var res = date.value.split("-");
    var resDate = new Date(res[0],res[1]-1,res[2]).getTime();

    var timer = setInterval(correctTime,1000);



    function correctTime(){
        var curDate = new Date().getTime();


        var _days = Math.floor(( resDate - curDate )/24/60/60/1000);
        var _hours =Math.floor((( resDate - curDate )/24/60/60/1000 - _days ) * 24);

        var _min = Math.floor(((( resDate - curDate )/24/60/60/1000 - _days ) * 24 - _hours) * 60);

        var _sec = Math.floor((((( resDate - curDate )/24/60/60/1000 - _days ) * 24 - _hours) * 60 - _min ) * 60);

        if(_days<0){
            clearInterval(timer);
            alert("当前时间已超出所给出的时间~");
            return ;
        }else if(_days === 0 && _hours === 0 && _min === 0 && _sec === 0){
            clearInterval(timer);
            alert("时间已到~");
            return;
        }

        day.innerHTML = _days;
        hours.innerHTML = _hours;
        min.innerHTML  = _min;
        second.innerHTML = _sec;
    }
};
