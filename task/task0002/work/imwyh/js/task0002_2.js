function show_except_time(){
	var endDate = new Date(document.getElementById("date").value.replace("-","/"));
	if(isNaN(endDate.valueOf())) return;
	var now = new Date();
	var lastTime = (endDate.getTime()-now.getTime());
	if(lastTime < 0){
		except_time.innerHTML = "时间到";
		return;
	}
	var e_daysold = lastTime/(24*60*60*1000)
	var daysold = Math.floor(e_daysold);
	var e_hrsold = (e_daysold-daysold)*24;
	var hrsold = setzero(Math.floor(e_hrsold));
	var e_minsold = (e_hrsold-hrsold)*60;
	var minsold = setzero(Math.floor((e_hrsold-hrsold)*60));
	var seconds = setzero(Math.floor((e_minsold-minsold)*60));
	except_time.innerHTML = "距离"+document.getElementById("date").value+"还有"+daysold+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒";
	setTimeout("show_except_time()", 1000);
}

function setzero(i){
if (i<10)
{i = "0" + i};
return i;
}

function $(tar){
	return document.getElementById(tar).value;
}

function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false); 
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener); 
    } else {
        element["on" + event] = listener; 
    } 
}


addEvent(document.getElementById("submit"), "click", show_except_time);