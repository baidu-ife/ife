function showHobbies(inputselector, outputselector){
	var hobbiesArr = $(inputselector).value.split(/[\s\t\n,、;]+/);
	hobbiesArr = uniqArray(hobiesArr)
	$(outputselector).innerHTML = "他的爱好分别是：" + hobbiesArr;
}

function countHobbies(){
	var hobbies = $("#textarea3").value;
	var hobbiesArr = hobbies.split(/[\s\t\n,、;]+/);
	hobbiesArr = uniqArray(hobbiesArr);
	if(hobbies===""){
		$("#span3").innerHTML = "请输入爱好~";
		$("#button3").disabled=true;;
		$.un("#button3","click",showHobbiesList);
	}else if(hobbiesArr.length >10){
		$("#span3").innerHTML = "爱好不能超过10个，去掉几个吧。";
		$("#button3").disabled=true;
		$.un("#button3","click",showHobbiesList);
	}else{
		$("#span3").innerHTML = "";
		$("#button3").disabled=false;
		$.on("#button3","click",function(){
			showHobbiesList(hobbiesArr);
		});
	}
};

function showHobbiesList(hobbiesArr){
	var str = ""
	for (var i = 0, l = hobbiesArr.length - 1; i <= l; i++) {
		str += '<li><lable><input type="checkbox">' + hobbiesArr[i] + '</lable></li>'
	};
	
	$("#ul3").innerHTML = str;
};

$.on("#button1", "click" , function(){
	showHobies("#input1","#p1");
})

$.on("#button2", "click" , function(){
	showHobies("#textarea2","#p2");
})

$.on("#textarea3","keyup",countHobbies)