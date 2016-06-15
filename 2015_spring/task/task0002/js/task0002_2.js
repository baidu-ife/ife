var clock;
addEvent($(".input-submit"),"click",function(){
	clearInterval(clock);
	var input_text=$(".input-text").value;
	input_text=input_text.trim();
	var showDiv=$(".showDiv");
	var pattern=/^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|(3[0-1]))$/;
	
	if(pattern.test(input_text)){
		var futureTimer=new Date(input_text.replace("-","/"));
		console.log(futureTimer);
		var futureTimerArr=input_text.split("-");
		//console.log(futureTimerArr);
		clock=setInterval(count,1000);
		function count(){
			var currentTimer=new Date();
			var gap=futureTimer-currentTimer;
		
				if(gap<0){
					clearInterval(clock);
					showDiv.innerHTML="请输入将来的时刻";
				}else if(gap==0){
					clearInterval(clock);
					showDiv.innerHTML="距离"+futureTimerArr[0]+"年"+futureTimerArr[1]+"月"+futureTimerArr[2]+"日"+"还有0分0秒";
				}else{
					var day=Math.floor(gap/1000/60/60/24);
					var hours=Math.floor(gap%(1000*60*60*24)/1000/60/60);
					var minutes=Math.floor(gap%(1000*60*60*24)%(1000*60*60)/1000/60);
					var second=Math.floor(gap%(1000*60*60*24)%(1000*60*60)%(1000*60)/1000);
					showDiv.innerHTML="距离"+futureTimerArr[0]+"年"+futureTimerArr[1]+"月"+futureTimerArr[2]+"日"+"还有"+
					day+"天"+hours+"日"+minutes+"分"+second+"秒";
				}
			
		}}
	else{
			clearInterval(clock);
			showDiv.innerHTML="请输入正确的格式";
		}
});