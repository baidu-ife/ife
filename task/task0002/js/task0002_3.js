window.onload = function() {
	var contain = $('#contain');
	var list = $('#list');
	var btns = $('#btns').getElementsByTagName('span');
	var oback = $('#oback');
	var onext = $('#onext');
	var index = 1;
	var amd = false; //判断是否在动画中
	var timer; //存定时器
	//点击按钮产生新left值并且设置left值达到无线滚动
	function anni(e) {
		amd = true;
		var newLeft = parseInt(list.style.left) + e;
		var time = 400; //位移总时间
		var itv = 10;
		var speed = e / (time / itv);
		//动画函数
		function go() {
			if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {
				list.style.left = parseInt(list.style.left) + speed + 'px';
				setTimeout(go, itv);
			} else {
				amd = false;
				list.style.left = newLeft + 'px';
				if (newLeft > -600) {
					list.style.left = -3000 + 'px';
				}
				if (newLeft < -3000) {
					list.style.left = -600 + 'px';
				}
			}
		}
		go();
	}

	function play() {
		timer = setInterval(fn2, 3000);
	}

	function stop() {
			clearInterval(timer);
		}
		//切换时给小圆点设置背景
	function showbtn() {
			for (var i = 0; i < btns.length; i++) {
				if (btns[i].className == 'on') {
					btns[i].className = '';
					break;
				}
			}
			btns[index - 1].className = 'on';
		}
		//给左右按钮设置偏移量并且小圆点随着切换
	var fn1 = function() {
		if (amd == false) {
			anni(600);
		index -= 1;
		if (index < 1) {
			index = 5;
		}
		showbtn();
		}
	}
	var fn2 = function() {
		if (amd == false) {
			anni(-600);
		
		index += 1;
		if (index > 5) {
			index = 1;
		}
		showbtn();
	}
	}
	$.click(oback, fn1);
	$.click(onext, fn2);
	//点击小圆点切换图片
	for (var i = 0; i < btns.length; i++) { //给每个小圆点增加事件
		$.click(btns[i], function() {
			var newIndex = parseInt(this.getAttribute('va'));
			var e = -600 * (newIndex - index); //算出偏移量left的值
			if (amd == false) {
				anni(e);
			}
			index = newIndex;
			showbtn();
			if (e == 0) {
				return;
			}
		})
	}
	$.on(contain, 'mouseover', stop);
	$.on(contain, 'mouseout', play);
	play();
}