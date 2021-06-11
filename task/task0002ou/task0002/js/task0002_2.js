
function getElement(id){
	return document.getElementById(id);
}

var begin=getElement('start');
var timeMessage = getElement('time');
var time;
var result=0;
begin.onclick = function(e){
	var endDate = new Date();
	
	var timeTemp = getElement('date').value;
    time = timeTemp.split('-');
	endDate.setFullYear(time[0],time[1]-1,time[2]);
	console.log(endDate);
	var now = new Date();
	
	result= endDate.getTime()-now.getTime();
	result = Math.floor(result/1000);

	timer();
	setInterval(function(){		
	timer();
	},1000);
}
function timer(){
	var day=Math.floor(result/(60*60*24)); 
	var hour=Math.floor((result-day*24*60*60)/3600); 
	var minute=Math.floor((result-day*24*60*60-hour*3600)/60); 
	var second=Math.floor(result-day*24*60*60-hour*3600-minute*60); 
	result=result-1;
	if(result>0){
		timeMessage.innerHTML='距离'+time[0]+'年'+time[1]+'月'+time[2]+'日还有'+day+'天'+hour+'小时'+minute+'分'+second+'秒';	
	}else{
		timeMessage.innerHTML="";
	}
	
	
}

