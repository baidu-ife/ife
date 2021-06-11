/**
 * @author Administrator
 */
//小练习二
addEvent(window,"load",function(){
	var oDateBtn=$("#dateButton");
	var oDateTxt=$("#dateInput");
	var oDate=$("#datemain");
	var dateCal=function(inputyear,inputmonth,inputday){
		var now=new Date();
		if(inputyear>=now.getFullYear()){
			year=inputyear-now.getFullYear();
        }else{
			year=0;
		}
        if(inputmonth>=(now.getMonth()+1)){
			month=inputmonth-(now.getMonth()+1);
		}else{
			month=inputmonth+(12-(now.getMonth()+1));
			year--;
		}
        if(inputday>=now.getDate()){
			day=inputday-now.getDate();
		}else{
			day=inputday+(30-now.getDate());
			month--;
        }
        if(inputyear<now.getFullYear()||(inputyear==now.getFullYear()&&inputmonth<(now.getMonth()+1))||(inputyear==now.getFullYear()&&inputmonth==(now.getMonth()+1)&&inputday<=now.getDate())){
        	return "倒计时无效";
        }
        return "距离"+inputyear+"年"+inputmonth+"月"+inputday+"日有"+year+"年"+month+"月"+day+"天"+(24-now.getHours()-1)+"小时"+(60-now.getMinutes()-1)+"分"+(60-now.getSeconds()-1)+"秒";
		
	};
	addClickEvent(oDateBtn,function(){
		if($("#change")){
					oDate.removeChild($("#change"));
	    }
		var input=oDateTxt.value;
		var inputs=input.split("-");
		var inputYear=inputs[0];
		var inputMonth=inputs[1];
		var inputDay=inputs[2];
		var dateprint=dateCal(inputYear,inputMonth,inputDay);
		var eledate=document.createElement("p");
		eledate.innerHTML=dateprint;
		eledate.setAttribute("id","change");
		oDate.appendChild(eledate);
		clearInterval(window.timer);
		window.timer=setInterval(function(){
			oDate.removeChild($("#change"));
			eledate.innerHTML=dateCal(inputYear,inputMonth,inputDay);
		    oDate.appendChild(eledate);
		},1000);
	});
});