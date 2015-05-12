var oDateInput=$(".dateInput");
var oDateBtn=$(".date-btn");
var oDateOutput=$(".dateOutput");
addClickEvent(oDateBtn,Countdown);

   function Countdown(){
    var arr=oDateInput.value.split("-");

  //假设每个月有30天。。。

        if((arr[0]>=2015&&arr[0]<=9999)&&(arr[1]>0&&arr[1]<13)&&(arr[2]>0&&arr[2]<=30)&&arr.length==3){//输入年份大于2015，月份1-12月，日期1-30号
            var today=new Date();
            if((arr[0]==2015)&&(arr[1]<today.getMonth()+1||((arr[1]==today.getMonth()+1)&&(arr[2]<=today.getDate()))))
            {
                alert("请输入当前时间之后的日期");
            }else{

                timer=setInterval(function(){
                 var today=new Date();
                var outputSeconds=60-today.getSeconds();//倒计时秒
              var outputMinutes=59-today.getMinutes();//倒计时分
                var outputHours=23-today.getHours();//倒计时时
                if(arr[2]<=today.getDate())//求剩下的月份数和天数
                {
                    var outputDate=30+parseInt(arr[2])-today.getDate()-1;
                    var outputMonth=arr[1]-1-(today.getMonth()+1);

                }else{
                    outputDate=parseInt(arr[2])-today.getDate()-1;
                    outputMonth=parseInt(arr[1])-(today.getMonth()+1);
                }
                var outputYear=parseInt(arr[0])-today.getFullYear();
                if(outputMonth<0)
                {outputMonth=outputMonth+12;
                    outputYear=outputYear-1;}

                oDateOutput.value=outputYear+"年"+outputMonth+"月"+outputDate+"日"+outputHours+"时"+
                    outputMinutes+"分"+outputSeconds+"秒";


            },1000);}}else{
            alert('请按正确格式重新输入');
        }
if(outputYear==0&&outputMonth==0&&outputDate==0&&outputHours==0&&outputMinutes==0&&outputSeconds==0){
    clearInterval(timer);
}

}

