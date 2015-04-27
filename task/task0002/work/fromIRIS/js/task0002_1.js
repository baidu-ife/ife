//第一阶段
$.click("#btn1", getLove);
function getLove() {
	var sTr = $("#txt1").value;
	var reg = /\uff0c/g;
	if (reg.test(sTr)) {
		alert("请输入半角逗号");
	}else {
		var arr = sTr.split(",");
		var uniqArr = uniqArray(arr);
		var oP = document.createElement("p");
		$("#div1").appendChild(oP);
		for (var i = 0; i<uniqArr.length; i++) {
			if (uniqArr[i].match(/\s+/g)) {
				uniqArr.splice(i,1);
				i--;
			}
		}
		oP.innerHTML = uniqArr;
	}
}
//第二阶段
$.click("#btn2", getLove2);
function getLove2() {
	var sTr = $("#txt2").value;
	var sep = /[,\uff0c\s\u3001;\n\t]+/g
	var replaceStr = sTr.replace(sep, " ");
	var arr = replaceStr.split(" ");
	var uniqArr = uniqArray(arr);
	var oP = document.createElement("p");
	$("#div2").appendChild(oP);
	for (var i = 0; i<uniqArr.length; i++) {
		if (uniqArr[i].match(/\s+/g)) {
			uniqArr.splice(i,1);
			i--;
		}
	}
	oP.innerHTML = uniqArr;
}
//第三阶段
$.click("#btn3", getLove3);
var oTip = document.createElement('p');
$("#div3").insertBefore(oTip,$("#btn3"));
function getLove3() {
	$("#check-box").innerHTML = "";
	var sTr = $("#txt3").value;

	if (sTr != "") {
		var sep = /[,\uff0c\s\u3001;\n\t]+/g
		//先将字符转换成以空格为间隔的形式
		var replaceStr = sTr.replace(sep, " ");
		var arr = replaceStr.split(" ");
		if (arr.length >= 0 && arr.length <= 10) {
			oTip.innerHTML = "";
			var uniqArr = uniqArray(arr);
			for (var i = 0; i<uniqArr.length; i++) {
				//将去重得到的空数组去掉
				if (uniqArr[i].match(/\s+/g)) {
					uniqArr.splice(i,1);
					i--;
				}
			}
			//循环生成chenkbox
			for (var j in uniqArr) {
				var oLabel = document.createElement("label");
				oLabel.setAttribute("for", uniqArr[j]);
				var sCheckName = document.createTextNode(uniqArr[j]);
				oLabel.appendChild(sCheckName);
				$("#check-box").appendChild(oLabel);
				var oInput = document.createElement("input");
				oInput.setAttribute("type", "checkbox");
				oInput.setAttribute("id", uniqArr[j]);
				$("#check-box").appendChild(oInput);
				$("#check-box").appendChild(document.createElement("br"));
			}
			// oP.innerHTML = uniqArr;
		}else {
			oTip.innerHTML = "请输入小于等于10个兴趣";
		}
	}else {
		oTip.innerHTML = "请输入";
	}
}
