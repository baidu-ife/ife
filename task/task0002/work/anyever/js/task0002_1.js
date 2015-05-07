function showtip(pid, content, btnid, color) {
	var button = $('#' + btnid);
	if ($("#checkdiv")) {
		button.parentNode.removeChild($('#checkdiv'));
	}
	if ($('#' + pid)) {
		$('#' + pid).innerText = content;
		$('#' + pid).style.color = color || 'black';
	} else {
		
		var tag = document.createElement('p');
		tag.setAttribute('id', pid);
		tag.style.color = color || 'black';
		tag.innerText = content;
		button.parentNode.appendChild(tag);
	}
}



window.onload = function() {

	$.click('#button1', function() {
		var hobbies = trim($('#hobby').value),
			button = $('#button1'),
			list = uniqArray(hobbies.split(/[\s,，;、]+/g));

		if (hobbies !== '') {
			if (list.length > 10) {
				showtip('tagcontent', '爱好数量过多', 'button1', 'red');
				return;
			} else {

				var innerHtml = '';
				each(list, function(value) {
					innerHtml = innerHtml + "<input type='checkbox'>" + value + '   ';
				});

				if ($("#checkdiv")) {
					$("#checkdiv").innerHTML = innerHtml;
				} else {
					if ($("#tagcontent")) {
						button.parentNode.removeChild($('#tagcontent'));
					}
					var checkdiv = document.createElement('div');
					checkdiv.setAttribute('id', "checkdiv");
					checkdiv.innerHTML = innerHtml;
					button.parentNode.appendChild(checkdiv);
				}
			}
		} else if (list.length === 0 || hobbies === '') {
			showtip('tagcontent', '爱好不可为空', 'button1', 'red');
			return;
		}
	});


};