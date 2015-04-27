window.onload = function(){

    
    
    $.click($("#btn"), function(){setInterval(getCount, 1000)});

    
    function getCount(){
        var d = new Date();
        var nowTime = d.getTime();
        var dueDateArr = $("#input").value.split("-");
        for(var i=0; i<dueDateArr.length; i++){
            dueDateArr[i] = parseInt(dueDateArr[i]);
        }
        
        if(dueDateArr[0]<=d.getFullYear() && dueDateArr[1]<=d.getMonth()+1 && dueDateArr[2]<=d.getDate()){
            $("#countDown").innerHTML = dueDateArr[0]+"年"+dueDateArr[1]+"月"+dueDateArr[2]+"日已是过去式";
        } else {
            var dueTime = Date.parse(dueDateArr[1]+"/"+dueDateArr[2]+"/"+dueDateArr[0]);
            var minus = dueTime - nowTime;
            var seconds = 1000;
            var minutes = seconds*60;
            var hours = minutes*60;
            var days = hours*24;
            var years = days*365;
            var y = parseInt(minus/years);
            var day = parseInt(minus%years/days);
            var h = parseInt(minus%years%days/hours);
            var m = parseInt(minus%years%days%hours/minutes);
            var s = parseInt(minus%years%days%hours%minutes/seconds);
            if( y==0 && day==0 && h==0 && m==0 && s==0 ){
                $("#countDown").innerHTML = dueDateArr[0]+"年"+dueDateArr[1]+"月"+dueDateArr[2]+"日已是过去式";
            }else{
                $("#countDown").innerHTML = "距离"+dueDateArr[0]+"年"+dueDateArr[1]+"月"+dueDateArr[2]+"日还有"+y+"年"+day+"天"+h+"小时"+m+"分"+s+"秒";
            }
        }

    }

    



}