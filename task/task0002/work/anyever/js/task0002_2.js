var timer = null;

function showtip(pid, content, btnid, color) {
	var button = $('#' + btnid);
	if ($("#counting")) {
		button.parentNode.removeChild($('#counting'));
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

function showtime(time, datearray) {
	var d = Math.floor(time / 1000 / 60 / 60 / 24);
	time = time % (1000 * 60 * 60 * 24);
	var h = Math.floor(time / (1000 * 60 * 60));
	time = time % (1000 * 60 * 60);
	var m = Math.floor(time / (1000 * 60));
	time = time % (1000 * 60);
	var s = Math.floor(time / 1000);
	showtip('counting', '距离' + datearray[0] + '年' + datearray[1] + '月' + datearray[2] + '日还剩' + d + '天' + h + '时' + m + "分" + s + '秒', 'timebutton');
}

function countfunc(datetext, datearray) {
	timer = setInterval(function() {
		console.log('a');
		var time = (datetext.getTime() - new Date().getTime());
		if (time > 0) {
			showtime(time, datearray);
		} else {
			clearInterval(timer);
		}
	}, 1000);
}

window.onload = function() {

	$.click('#timebutton', function() {

		var button = $('#timebutton');
		var datearray = $('#datetext').value.split('-');
		var display = $('#counting');

		var datetext = new Date(datearray[0], datearray[1] - 1, datearray[2]);
		var time = datetext.getTime() - (new Date().getTime());

		if (time > 0) {
			showtip('counting', '成功', 'timebutton', 'red');
			showtime(time, datearray);
			countfunc(datetext, datearray);

		} else if (time < 0) {
			showtip('counting', '请输入之后的时间', 'timebutton', 'red');
			clearInterval(timer);
		} else {
			showtip('counting', '不可为空', 'timebutton', 'red');
			clearInterval(timer);
		}

	});

};