addClickEvent($("#submit1"), function(){
	var userInput = $("#userText1").value.split(",");
	var data = [];
	for (var i = 0; i < userInput.length; ++i) {
		var re = /\w/;
		if (re.test(userInput[i]) && data.indexOf(userInput[i]) == -1){
			data.push(userInput[i])
		}
	}
	$("#para1").innerText = data;
});

addClickEvent($("#submit2"), function(){
	var userInput = $("#userText2").value.split(/(?:,|，|\s|;|、|\n)+/);
	var data = [];
	for (var i = 0; i < userInput.length; ++i) {
		var re = /\w/;
		if (re.test(userInput[i]) && data.indexOf(userInput[i]) == -1){
			data.push(userInput[i]);
		}
	}
	$("#para2").innerText = data;
});

addEvent($("#userText3"),"input", function(){
	var userInput = $("#userText3").value.split(/(?:,|，|\s|;|、|\n)+/);
	if (userInput.length > 10){
		$("#warning").innerText = "Too much hobbies";
	}
	else {
		$("#warning").innerText = "";
	}
});

addClickEvent($("#submit3"), function(){
	var userInput = $("#userText3").value.split(/(?:,|，|\s|;|、|\n)+/);
	var data = [];
	for (var i = 0; i < userInput.length; ++i) {
		var re = /\w/;
		if (re.test(userInput[i]) && data.indexOf(userInput[i]) == -1){
			data.push(userInput[i]);
		}
	}
	for (var i = 0; i < data.length; ++i) {
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "hobby";
		checkbox.value = data[i];
		checkbox.id = "hobby_"+data[i];

		var label = document.createElement('label')
		label.htmlFor = "hobby_"+data[i];
		label.appendChild(document.createTextNode(data[i]));

		$("#checkBox").appendChild(checkbox);
		$("#checkBox").appendChild(label);
	}
});