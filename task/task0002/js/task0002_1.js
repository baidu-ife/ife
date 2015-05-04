var fun = function() {
	$(".error").innerHTML = " ";
	var list = document.getElementsByClassName("hobby");
	for(var i = list.length - 1;i >= 0;i--) {
		$(".hobbyList").removeChild(list[i]);
	}
	//init结束
	var hobbyList = uniqArray($(".input").value.split(/[,\s;\/]/));
	console.log(hobbyList);
	console.log(":"+hobbyList.length);
	for(var i = 0, len = hobbyList.length;i < len;i++) {
		if(hobbyList[i] == "") {
			console.log(123);
			console.log(hobbyList.splice(i,1));
		}
	}
	// hobbyList的length已经改变，需要重新赋值
	len = hobbyList.length;
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
