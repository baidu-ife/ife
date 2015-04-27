window.onload = function() {
	var uLeft = $("#left"),
		uRight = $("#right"),
		leftList = uLeft.childNodes,
		rightList = uRight.childNodes,
		tip = $("#tip"),
		uHeight = uLeft.offsetHeight,
		uWidth = uLeft.offsetWidth,
		liHeight = leftList[0] && leftList[0].offsetHeight || 30,
		liWidth = uWidth,
		disX = 0,
		disY = 0,
		isDrag = false;

	$.delegate(uLeft, "li", "mousedown", function(event) {
		isDrag = true;
		var event = event || window.event,
			target = event.target || event.srcElement;
		addClass(target, "active");
		disX = event.clientX - target.offsetLeft;
		disY = event.clientY - target.offsetTop;
	});

	$.delegate(uRight, "li", "mousedown", function(event) {
		isDrag = true;
		var event = event || window.event,
			target = event.target || event.srcElement;
		addClass(target, "active");
		disX = event.x - target.offsetLeft;
		disY = event.y - target.offsetTop;
	});

	$.delegate(uLeft, "li", "mousemove", function(event) {
		if (isDrag) {
			var event = event || window.event,
				target = event.target || event.srcElement;
			target.style.left = event.x - disX + "px";
			target.style.top = event.y - disY + "px";

			if (isHalf(uRight, target)) {
				showTip(target);
			} else {
				hideTip();
			}
		}
	});

	$.delegate(uRight, "li", "mousemove", function(event) {
		if (isDrag) {
			var event = event || window.event,
				target = event.target || event.srcElement;
			target.style.left = event.x - disX + "px";
			target.style.top = event.y - disY + "px";

			if (isHalf(uLeft, target)) {
				showTip(target);
			} else {
				hideTip();
			}
		}
	});

	$.delegate(uLeft, "li", "mouseup", function(event) {
		isDrag = false;
		var target = event.target || event.srcElement;
		if (isHalf(uRight, target)) {
			hideTip();
			insertIntoList(uRight, target);
		} else {
			removeClass(target, "active");
		}
	});

	$.delegate(uRight, "li", "mouseup", function(event) {
		isDrag = false;
		var target = event.target || event.srcElement;
		if (isHalf(uLeft, target)) {
			hideTip();
			insertIntoList(uLeft, target);
		} else {
			removeClass(target, "active");
		}
	});

	function isHalf(ul, li) {
		var posLi = getPositionOnPage(li),
			posUl = getPositionOnPage(ul);
		return ( (posLi.x < posUl.x && posLi.x > (posUl.x - liWidth / 2)) ||
			     (posLi.x > posUl.x && posLi.x < (posUl.x + uWidth - liWidth / 2))
			    ) 
				&& 
				(posLi.y > posUl.y && posLi.y < posUl.y + uHeight);		
			
	}

	function showTip(li) {
		tip.style.display = "block";
		tip.style.left = parseInt(li.style.left, 10) + liWidth / 2 - tip.offsetWidth / 2 + "px";
		tip.style.top = parseInt(li.style.top, 10) - tip.offsetHeight - 10 + "px";
	}

	function hideTip() {
		tip.style.display = "none";
	}

	function insertIntoList(targetUl, li) {
		var offsetYInTargetUl = getPositionOnPage(li).y - getPositionOnPage(targetUl).y,
			index = offsetYInTargetUl / liHeight + 1,
			list = targetUl.childNodes;
		if (index < 0) {
			if (list.length > 0) {
				targetUl.insertBefore(li, list[0]);
			} else {
				targetUl.appendChild(li);
			}
		} else if (index >= list.length) {
			targetUl.appendChild(li);
		} else {
			targetUl.insertBefore(li, list[index]);
		}
		removeClass(li, "active");
		li.style.top = "";
		li.style.left = "";
		
	}
}