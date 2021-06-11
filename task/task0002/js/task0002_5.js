window.onload = function() {
	var left = $('#left');
	var right = $('#right');
	var contain = $('#contain');
	var center = $('.center');
	$.delegate(contain, 'li', 'mousedown', function(e) {
		e = e || window.e;
		var target = e.target || e.srcElement;
		disX = e.clientX - target.offsetLeft;
		disY = e.clientY - target.offsetTop;
		var a = e.clientX; //保存点击时的位置
		document.onmousemove = function(e) {
			e = e || window.e;
			target.style.left = e.clientX - disX + 'px';
			target.style.top = e.clientY - disY + 'px';
			//给目标增加绝对定位
			addClass(target, 'active');
			//给用户添加指导
			center.style.display = 'block';
			center.innerHTML = '两边可以拖拽哦~';
			if (Math.abs(e.clientX - a) > 400) {
				center.innerHTML = '鼠标可以松开了~';
			}
		}
		document.onmouseup = function(e) {
			document.onmousemove = null;
			document.onmouseup = null;
			center.style.display = 'none';
			//移动距离检测
			if (Math.abs(e.clientX - a) < 400) {
				removeClass(target, 'active');
			} else {
				if (target.parentNode.id == 'left') {
					addoli(right);
				}
				if (target.parentNode.id == 'right') {
					addoli(left);
				}
			}
		}
			//两边生成元素
		function addoli(er) {
			var addli = document.createElement('li');
			addli.className = 'list';
			addli.innerHTML = target.innerHTML;
			er.appendChild(addli);
			target.style.display = 'none';
		}
	})
}