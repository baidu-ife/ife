var oContainerl = document.getElementById('container_l');
var oOne = document.getElementById('one');
oOne.onmousedown = function(e){
	oOne.style.background = '#ff7076';
	var iDisX = iDisy = 0;
	iDisX = e.clientX - oOne.offsetLeft;
	iDisY = e.clientY - oOne.offsetTop;
	document.onmousemove = function(e){
		var iLeft = e.clientX - iDisX;
		var iTop = e.clientY - iDisY;
		if(iLeft < 0){
			iLeft = 0;
		}
		if(iTop < 0){
			iTop = 0;
		}
		if(iLeft > document.documentElement.clientWidth - oOne.offsetWidth){
			iLeft = document.documentElement.clientWidth - oOne.offsetWidth;
		}
		if(iTop > document.documentElement.clientHeight - oOne.offsetHeight){
			document.documentElement.clientHeight - oOne.offsetHeight;
		}
		if(iLeft > 150 && iTop > 0){
			iLeft = 299;	
		}
		oOne.style.left = iLeft + 'px';
		oOne.style.top = iTop + 'px';
	};
	document.onmouseup = function(){
		document.onmousemove = null;
		oOne.style.background = '#ff0000';
	};
};