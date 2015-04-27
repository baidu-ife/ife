window.onload = function() {
	var textarea = $("textarea"),
		button = $("button"),
		tip = $("span"),
	    parent = button.parentNode;
	$.on(textarea, "keyup", function(event) {
		var habits = textarea.value.split(/[\n \u3000,\uff0c;\u3001]+/g).filter(function(elem) {
			return elem !== "";
		});
		if (habits && habits.length > 10) {
			textarea.value = textarea.value.slice(0, -1);
			tip.innerText = "您好，爱好的数目不能超过10个";
		} else {
			tip.innerText = "";
		} 
	});
	$.click(button, function(event) {
		var habits = textarea.value.split(/[\n \u3000,\uff0c;\u3001]+/g);
		habits = uniqArray(habits);
		var boxes = document.createDocumentFragment();
		habits.forEach(function(elem, index) {

			var checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("id", elem);
			checkbox.setAttribute("name", "habit");

			var label = document.createElement("label");
			label.setAttribute("for", elem);
			label.innerText = elem;

			boxes.appendChild(label);
			boxes.appendChild(checkbox);
		});
		parent.appendChild(boxes);
	});
}

