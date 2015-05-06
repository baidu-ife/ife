window.onload = function() {
	var int = $('#int');
	var oi = $('#oi');
	var oli = oi.getElementsByTagName('li');
	var index = -1;
	var list = ['ss', 'dd', 'ddd', 'tttt']; //伪造数据
	//显示提示框
	$.on(int, 'keyup', function() {
		if (int.value) {
			removeClass(oi, 'hid');
			var p = '';
			for (var i = 0; i < list.length; i++) {
				p = p + '<li>' + list[i] + '</li>';
			}
			oi.innerHTML = p;
		} else {
			addClass(oi, 'hid');
		}
	});
	//点击取值到文本框
	$.delegate(oi, 'li', 'click', function(e) {
		var e = e || window.e;
		var tar = e.target || e.srcElement;
		int.value = tar.innerText;
		addClass(oi, 'hid');
	});
	//再为文本框增加键盘事件
	int.onkeyup = function(e) {
		var e = e || window.e;
		var tar = e.target || e.srcElement;
		if (e.keyCode == 40) {
			index = index + 1;
			if (index > list.length - 1) {
				index = 0;
			}
			addClass(oli[index], 'backg');
		}
		if (e.keyCode == 38) {
			index = index - 1;
			if (index < 0) {
				index = oli.length - 1;
			}
			addClass(oli[index], 'backg');
		}
		console.log(oli[index]);
		if (e.keyCode == 13) {
			int.value = oli[index].innerText;
			addClass(oi, 'hid');
		}
	}
}