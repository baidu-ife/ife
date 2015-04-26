window.onload = function () {
	var arr = ["ab", "abb", "ac", "bc", "bcd"];
	
	$.on("#task4-txt", "focus", function () {
		$("#task4-ul").style.display = "block";
		if ($("#task4-txt").value == "") {
			$("#task4-ul").style.borderColor = "#fff";
		}
	});
	/*$.on("#task4-txt", "blur", function () {
		$("#task4-ul").style.display = "none";
		$("#task4-ul").style.borderColor = "#000";
	})*/
	$.on("#task4-txt", "keyup", listener);
	$.delegate("#task4-ul", "li", "mouseover", function (ev) {
		var e = ev || event;
		var target = e.target || e.srcElement;
		addClass(target, "task4-li-over");
	})
	$.delegate("#task4-ul", "li", "mouseout", function (ev) {
		var e = ev || event;
		var target = e.target || e.srcElement;
		removeClass(target, "task4-li-over");
	})
	$.delegate("#task4-ul", "li", "click", function (ev) {
		var e = ev || event;
		var target = e.target || e.srcElement;
		$("#task4-txt").value = target.innerHTML;
		$("#task4-ul").style.display = "none";
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	})
	function listener() {
		$("#task4-ul").innerHTML = "";
		var newArr = [];
		var sTr = $("#task4-txt").value;
		if (sTr != "") {
			reg = eval('/' + sTr + '/');
			for (var i = 0; i < arr.length; i++) {
				if (reg.test(arr[i])) {
					newArr.push(arr[i]);
				}
			}
		}
		console.log(newArr.length)
		if (newArr.length > 0) {
			$("#task4-ul").style.borderColor = "#000";
			for (var i = 0; i < newArr.length; i++) {
				var oLi = document.createElement("li");
				oLi.innerHTML = newArr[i];
				$("#task4-ul").appendChild(oLi);
			}
		}else {
			$("#task4-ul").style.borderColor = "#fff";
		}
	}
}
