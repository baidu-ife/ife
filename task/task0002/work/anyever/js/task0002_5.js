window.onload = function() {
	
	if ('draggable' in document.createElement('span')) {

		$.on("#leftcol li", 'dragstart', function(e) {
			e.dataTransfer.setData("Text", e.target.id);
			console.log('aaaa' + e.target.id);
		});
		$.on("#rightcol li", 'dragstart', function(e) {
			e.dataTransfer.setData("Text", e.target.id);
			console.log('aaaa' + e.target.id);
		});


		$.on("#rightcol", 'dragover', function(e) {
			e.preventDefault();
		});
		$.on("#leftcol", 'dragover', function(e) {
			e.preventDefault();
		});


		$.on("#rightcol", 'drop', function(e) {
			e.stopPropagation();
			var id = e.dataTransfer.getData("Text");
			console.log('aaaa' + id);
			$("#rightcol").appendChild(document.getElementById(id));
		});


		$.on("#leftcol", 'drop', function(e) {
			e.stopPropagation();
			var id = e.dataTransfer.getData("Text");
			console.log('aaaa' + id);
			$("#leftcol").appendChild(document.getElementById(id));
		});


	}

};