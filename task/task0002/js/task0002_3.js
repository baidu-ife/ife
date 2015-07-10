var temp = 0;
var timer = null;
var picList = $(".pic").getElementsByTagName("li"),
	dotList = $(".dots").getElementsByTagName("li"),
	dots = $(".dots");

// 动态生成小圆点
for(var i = 0, len = picList.length;i < len;i++) {
	var dot = document.createElement("li");
	dot.style.display = "inline-block";
	dot.style.height = 10;
	dot.style.width = 10;
	dot.style.border = "1px solid #fff";
	//dot.style.borderRadius = 10;无法使用
	dot.style.marginRight = 10;
	dot.style.cursor = "pointer";
	dots.appendChild(dot);
}
// 第一个圆点初始为实心
dotList[0].className = "selected";
// dots定位
dots.style.left = "50%";
var dotsWidth = 22 * len;
dots.style.width = dotsWidth;
console.log(dotsWidth);
dots.style.marginLeft = -dotsWidth / 2;
console.log(dots.style.marginLeft);

// 点击小圆点，实现切换
for(var i = 0;i < len;i++) {
	dotList[i].index = i;
	dotList[i].onclick = function() {
		console.log(timer);
		if(timer) {
			clearInterval(timer);
			timer = null;
		}
		tabSwitch(this.index);
		timer = setInterval(run, 2000);
	}
	/*鼠标悬停
	picList[i].onmouseover = function() {
		if(timer) {
			clearInterval(timer);
			timer = null;
		}
	}
	picList[i].onmouseout = function() {
		timer = setInterval(run, 2000);	
	}*/
}

timer = setInterval(run, 2000);

// 显示当前索引对应的图片和实圆点
function tabSwitch(curIndex) {
	for(var j = 0;j < len;j++) {
		dotList[j].className = "";
		picList[j].style.display = "none";
	}
	dotList[curIndex].className = "selected";
	picList[curIndex].style.display = "block";
	temp = curIndex;
}

// 计时器运行
function run() {
	temp++;
	if(temp >= len) temp = 0;
	tabSwitch(temp);
	console.log(temp);
}