var fun = function() {
	$(".error").innerHTML = " ";
	var list = document.getElementsByClassName("hobby");
	for(var i = list.length - 1;i >= 0;i--) {
		$(".hobbyList").removeChild(list[i]);
	}
	//init结束
	var hobbyList = uniqArray($(".input").value.split(/[,\s;\/]/));
	console.log(hobbyList);
	for(var i = 0, len = hobbyList.length;i < len;i++) {
		if(hobbyList[i] == "") {
			hobbyList.splice(i,1);
		}
	}
	if(len <= 10 && len > 0) {
		
		for(var i = 0;i < len;i++) {
			var choice = document.createElement("input");
			choice.type = "checkbox";
			choice.name = "hobby";
			var hobby = document.createElement("label");
			hobby.innerHTML = hobbyList[i];
			hobby.className = "hobby";
			hobby.appendChild(choice);
			$(".hobbyList").appendChild(hobby);
		}
	}else {
		$(".error").innerHTML = "error";
	}
}

$(".click").addEventListener("click", fun, false);
