function loadData(text) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
    		var data = JSON.parse(xmlhttp.responseText);
    		var dataFilter = []
    		for (var i = 0; i < data.length; ++i) {
    			if (data[i].indexOf(text) == 0) {
    				dataFilter.push(data[i]);
    			}
    		}

			var tips = $("#tips");
			while (tips.firstChild) {
			    tips.removeChild(tips.firstChild);
			}
			for (var i = 0; i < dataFilter.length; ++i) {
				var item = document.createElement("div");
				if (i == 0)
					item.setAttribute("class", "highlight");
				var sp = document.createElement("span");
				sp.setAttribute("class", "red");
				sp.innerText = text;
				item.appendChild(sp);
				item.appendChild(document.createTextNode(dataFilter[i].substr(text.length, dataFilter[i].length-text.length)));
				tips.appendChild(item);
			}
			if (dataFilter.length != 0)
				$("#tips").setAttribute("class", "visible");
			else
				$("#tips").setAttribute("class", "invisible");
    	}
	}

	xmlhttp.open("GET","tips",true);
	xmlhttp.send();
};

addEvent($("#userInput"), "input", function(){
	var userInput = $("#userInput").value;

	loadData(userInput);
});

addEvent($("#userInput"), "keydown", function(e){
	if (e.keyCode == "38"){//up
		var previous = $(".highlight").previousSibling;
		$(".highlight").setAttribute("class", "");
		if (previous != null) {
			previous.setAttribute("class", "highlight");
		}
		else {
			$("#tips").lastChild.setAttribute("class", "highlight");
		}
	}
	else if (e.keyCode == "40"){//down
		var next = $(".highlight").nextSibling;
		$(".highlight").setAttribute("class", "");
		if (next != null) {
			next.setAttribute("class", "highlight");
		}
		else {
			$("#tips").firstChild.setAttribute("class", "highlight");
		}
	}
	else if (e.keyCode == "13"){//enter
		$("#userInput").value = $(".highlight").innerText;
		$("#tips").setAttribute("class", "invisible");
	}
});

addEvent($("#userInput"), "blur",function(){
	$("#tips").setAttribute("class", "invisible");
});