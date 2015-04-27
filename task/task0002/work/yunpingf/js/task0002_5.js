var elems = $(".item");
for (var i = 0; i < elems.length; ++i) {
	addEvent(elems[i], "dragstart", function(ev){
		ev.dataTransfer.setData("text", ev.target.id);
	});
}

elems = $(".column");
for (var i = 0; i < elems.length; ++i) {
	addEvent(elems[i], "dragover", function(ev){
		ev.preventDefault();
	});

	addEvent(elems[i], "drop", function(ev){
		
		ev.preventDefault();
	    var data = ev.dataTransfer.getData("text");
	    
	    ev.target.appendChild(document.getElementById(data));
	});
}
