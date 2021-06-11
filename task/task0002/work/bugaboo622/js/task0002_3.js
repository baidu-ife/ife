window.onload=function(){
	var slide = $('#slide');
	var oUl = $('#slide-wrapper');
	var aLi = slide.getElementsByTagName('li');
	var aImg = slide.getElementsByTagName('img');
	var oBtn = $('#btn');
	var aA =oBtn.getElementsByTagName('a');
	var imgWidth=1280;//固定图片宽度
	var iNow=0;//底部btn索引值
	var iNow2=0;//图片当前索引
    var timer;
	oUl.style.width=aImg.length*imgWidth+'px';//根据宽度及个数确定容器宽度
	for(var i=0;i<aA.length;i++){
		aA[i].index=i;
		aA[i].onclick =function(){
			for(var i=0;i<aA.length;i++){
				aA[i].className='';
			}
			move(oUl,{left:-this.index*imgWidth});
			this.className='active';
			iNow=this.index;
			iNow2=this.index;	//点击的时候停止当前自动循环并保存状态
		}
	}//点击切换
	timer =setInterval(clk,3000);
	window.onfocus = function(){
		timer =setInterval(clk,3000);
	}
	window.onblur = function(){
		clearInterval(timer);
	}//用于防止失去焦点后浏览器暂停定时器，但不会关闭后边的链式函数而产生的bug
	function clk(){          
		if(iNow==aA.length-1){
			aLi[0].style.position='relative';//走完后将第一张图片变为相对定位，跟在最后一张后面
			aLi[0].style.left=aLi.length*imgWidth+'px';
			iNow=0;
		}else{
			iNow++;
		}
		iNow2++;
		for(var i=0;i<aA.length;i++){
				aA[i].className='';
			}
		move(oUl,{left:-iNow2*imgWidth},function(){
			if(iNow==0){
				aLi[0].style.position='static';//第一张再次走完后，取消相对定位，并且赋回初值
				oUl.style.left=0;
				iNow2=0;
			}
		});
		aA[iNow].className='active';
	}
}
//1.获取某一个元素的某一项CSS属性值
function css(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}
//2.小运动函数封装，接受三个参数（要运动的对象，{运动目标点的属性:属性值(默认单位为px)(可同时运动多个属性)}，执行完一次运动后执行的函数）
function move(obj, json, fn) {
    clearInterval(obj.iTimer);
    var iCur = 0;
    var iSpeed = 0; 
    obj.iTimer = setInterval(function() {
        var iBtn = true;            
        for ( var attr in json ) {                  
            var iTarget = json[attr];
            iCur = parseInt(css(obj, attr));
            iSpeed = ( iTarget - iCur ) / 8;//用于缓冲，但最后几下一次一像素走的实在太慢
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (iCur != iTarget) {
                iBtn = false;
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
        if (iBtn) {
            clearInterval(obj.iTimer);
            fn && fn.call(obj);
        }
        
    }, 15);
}