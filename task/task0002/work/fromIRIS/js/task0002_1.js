$.click("#btn1", getLove);
function getLove() {
	var sTr = $("#txt1").value;
	var arr = sTr.split(",");
	console.log(arr)
	var uniqArr = uniqArray(arr);
	console.log(uniqArr)
	var oP = document.createElement("p");
	$("#div1").appendChild(oP);
	for (var i = 0; i<uniqArr.length; i++) {
		if (uniqArr[i].match(/\s+/g)) {
			uniqArr.splice(i,1);
			i--;
		}
	}
	for (var j in uniqArr) {
			oP.innerHTML += uniqArr[j];
		}
}
$.click("#btn2", getLove2);
function getLove2() {
	var sTr = $("#txt2").value;
	var sep = "," || "，" || " " || "　" || "、" || ";";//wrong
	var arr = sTr.split(" ");
	console.log(arr)
	var uniqArr = uniqArray(arr);
	console.log(uniqArr)
	var oP = document.createElement("p");
	$("#div2").appendChild(oP);
	/*for (var i = 0; i<uniqArr.length; i++) {
		if (uniqArr[i].match(/\s+/g)) {
			uniqArr.splice(i,1);
			i--;
		}
	}*/
	for (var j in uniqArr) {
			oP.innerHTML += uniqArr[j];
		}
}
