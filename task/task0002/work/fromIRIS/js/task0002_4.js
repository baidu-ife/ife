window.onload = function () {
	var arr = ["blue", "balck", "function", "click", "text", "a", "push", "border", "style", "text123", "text12", "text", "text1235678",];
	var arrT = uniqArray(arr);
	var Num = 0; //全局变量
	$.on("#task4-txt", "click", function (ev) {
		var e = ev || event;
		$("#task4-ul").style.display = "block";
		if ($("#task4-txt").value == "") {
			$("#task4-ul").style.borderColor = "#fff";
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	});
	//当框内有字符串但光标没有focus时，点击框运行listener函数
	$.on("#task4-txt", "click", function (ev) {
		if ($("#task4-txt").value != "") {
			clickListener();
			$("#task4-ul").style.display = "block";
			var e = ev || event;
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		}

	});
	//鼠标点击除字框之外的地方
	document.onclick = function () {
		$("#task4-ul").style.display = "none";
		$("#task4-ul").style.borderColor = "#000";
	}
	//鼠标在出现的ul上moveover&moveout&click事件
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
		//阻止冒泡到document上的click事件
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	})
	//输入字符时响应keyListener
	$.on("#task4-txt", "keyup", keyListener);
	function keyListener(ev) {
		console.log(ev.keyCode)
		var e = ev || event;
		if ( e.keyCode == 32 || e.keyCode == 8 || e.keyCode <= 90 && e.keyCode >= 65 ||e.keyCode >= 48 && e.keyCode <= 57) {
			$("#task4-ul").style.display = "block";
			Num = 0; //当改变字符串时，令num = 0
			$("#task4-ul").innerHTML = "";
			var newArr = [];
			var sTr = $("#task4-txt").value;
			//当退格键将字符删没了时需判断，不然reg会出错
			if (sTr != "") {
				// reg = eval('/' + sTr + '/');
				reg = new RegExp("\^" + sTr);
				for (var i = 0; i < arrT.length; i++) {
					if (reg.test(arrT[i])) {
						newArr.push(arrT[i]);
					}
				}
			}
			console.log(newArr.length)
			if (newArr.length > 0) {
				$("#task4-ul").style.borderColor = "#000";
				for (var i = 0; i < newArr.length; i++) {
					var oLi = document.createElement("li");
					oLi.style.padding = 10 + "px";
					oLi.innerHTML = newArr[i];
					$("#task4-ul").appendChild(oLi);
				}
			}else {
				$("#task4-ul").style.borderColor = "#fff";
			}
		} else if (e.keyCode >=37 && e.keyCode <= 40) {
			if (e.keyCode == 38 ) {
				
				var aNewLi = $("#task4-ul").getElementsByTagName("li");
				if (Num == 0) {
					Num = aNewLi.length;
				}
				for (var i=0; i<aNewLi.length; i++) {
					removeClass(aNewLi[i], "task4-li-over");
				}
				addClass(aNewLi[Num-1], "task4-li-over");
				Num--;

			}else if (e.keyCode == 40) {

				var aNewLi = $("#task4-ul").getElementsByTagName("li");
				//获取的li伪数组就是每次生成的，所以更新后能够遍历。
				Num++;
				if (Num == aNewLi.length) {
					Num = 0;
				}
				for (var i=0; i<aNewLi.length; i++) {
					removeClass(aNewLi[i], "task4-li-over");
				}
				addClass(aNewLi[Num], "task4-li-over");
				
			}
		} else if (e.keyCode == 13) {
			var aNewLi = $("#task4-ul").getElementsByTagName("li");
			$("#task4-txt").value = aNewLi[Num].innerHTML;
			$("#task4-ul").style.display = "none";
		}
	}
	//鼠标点击框时运行listener
	function clickListener() {
		$("#task4-ul").innerHTML = "";
		var newArr = [];
		var sTr = $("#task4-txt").value;
		//当退格键将字符删没了时需判断，不然reg会出错
		if (sTr != "") {
			// reg = eval('/^' + sTr + '/');
			reg = new RegExp("\^" + sTr);
			console.log(reg)
			for (var i = 0; i < arrT.length; i++) {
				if (reg.test(arrT[i])) {
					newArr.push(arrT[i]);
				}
			}
		}
		console.log(newArr.length)
		if (newArr.length > 0) {
			$("#task4-ul").style.borderColor = "#000";
			for (var i = 0; i < newArr.length; i++) {
				var oLi = document.createElement("li");
				oLi.style.padding = 10 + "px";
				oLi.innerHTML = newArr[i];
				$("#task4-ul").appendChild(oLi);
			}
		}else {
			$("#task4-ul").style.borderColor = "#fff";
		}
	}
}
