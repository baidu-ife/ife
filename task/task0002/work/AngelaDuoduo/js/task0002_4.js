window.onload = function() {
	var input = $("input"),
		ul = $("ul"),
		tips = ul.getElementsByTagName("li"),
		innerKeywords = ul.getElementsByClassName("keyword"),
		restWords = ul.getElementsByClassName("rest"),
		searchStart = false,
		tipNum = 4,
		wordSet = ['text1', 'text123', 'text1234','texthahaha'],
		suggestData = null;

	function generateWords(keyword) {
		/*return wordSet.filter(function(elem) {
			return keyword !== "" && elem.indexOf(keyword) > -1;
		});*/
		return ajax("http://127.0.0.1:3000", {
			type: "get",
			data: {"keyword": keyword},
			onsuccess: function(responseText) {
				return responseText.result;
			}
		});
	}

	$.on(input, "keyup", function(event) {
		if (event.keyCode !== 13) {
			var keyword = input.value;
			suggestData = generateWords(keyword);			
			if (suggestData.length > 0) {
				removeClass(ul, "tip-hide");
				for (var i = 0; i < tipNum; i++) {
					removeClass(tips[i], "tip-hide");
				}
				for (i = tipNum - 1; i > suggestData.length - 1; i--) {
					addClass(tips[i], "tip-hide");
				}
				for (i = 0; i < suggestData.length; i++) {
					innerKeywords[i].innerText = keyword;
					restWords[i].innerText = suggestData[i].slice(keyword.length);
				}
			} else {
				addClass(ul, "tip-hide");
			}	
		}		
	});

	$.delegate(ul, "li", "click", function(event) {
		input.value = event.target.innerHTML.replace(/<span[^>]*>|<\/span>/g, "");
		searchStart = false;
		addClass(ul, "tip-hide");
	});

	Array.prototype.slice.call(tips).forEach(function(elem) {
		$.on(elem, "mouseover", function() {
			addClass(elem, "active");
		});
		$.on(elem, "mouseout", function() {
			removeClass(elem, "active");
		});
	});

	$.on(document, "keyup",function(event) {
		var activeTip = $(".active") || tips[suggestData.length - 1];
		for (var pos = 0; pos < tips.length; pos++) {
			if (activeTip === tips[pos]) {
				break;
			}
		}
		if (event.keyCode == 38) {
			removeClass(activeTip, "active");
			if (pos === 0) {				
				addClass(tips[suggestData.length - 1], "active");
			} else {
				addClass(tips[pos - 1], "active");
			}
		} else if (event.keyCode == 40) {
			removeClass(activeTip, "active");
			if (pos === suggestData.length - 1) {				
				addClass(tips[0], "active");
			} else {
				addClass(tips[pos + 1], "active");
			}
		}
	});

	$.enter(document, function() {
		input.value = $(".active").innerHTML.replace(/<span[^>]*>|<\/span>/g, "");
		searchStart = false;
		addClass(ul, "tip-hide");
	});	
}