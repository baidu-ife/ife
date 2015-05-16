window.onload = function() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> master
    var index = 1;
    
    var oBox = $('#box');

    var aUl = oBox.getElementsByTagName('ul');

    var aLi1 = aUl[0].getElementsByTagName('li');

    var aLi2 = aUl[1].getElementsByTagName('li');

    changePos(aLi1);
    changePos(aLi2);
    

    bind(aUl[0],aUl[1]);
    bind(aUl[1],aUl[0]);


    //
    function bind(nowParent, targetParent) {
        nowParent.onmousedown = function(ev){
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;

            if (target.nodeName.toLowerCase() == "li") {
                //当前选中的li元素
                var nowLi = target;
                nowLi.style.background = 'blue';
                var str = nowLi.innerHTML;
                nowLi.innerHTML = '可以拖拽我移动咯';
                

                //鼠标按下 记录鼠标位置
                var disX = ev.clientX;
                var disY = ev.clientY;

                //保存到定位坐标
                var startX = nowLi.offsetLeft;
                var startY = nowLi.offsetTop;

                //使当前li层级提升
                nowLi.style.zIndex = index++;

                //鼠标移动
                document.onmousemove = function(ev) {
                    var ev = ev || window.event;
                    nowLi.style.left = startX + ev.clientX - disX + 'px';
                    nowLi.style.top = startY + ev.clientY - disY + 'px';
                    
                    if (pz(targetParent, nowLi)) {
                        nowLi.innerHTML = "可以释放鼠标啦！";
                        nowLi.style.background = "#000";
                    }
                };

                //鼠标抬起
                document.onmouseup = function() {
                    //当前拖拽的li在对面ul范围内
                    if (pz(targetParent, nowLi)) {
                        targetParent.appendChild(nowLi);
                    } else {    
                        nowParent.appendChild(nowLi);
                    }

                    //重新浮动布局在转为定位布局
                    fixpos(targetParent);
                    fixpos(nowParent);

                    //还原默认
                    nowLi.style.background = 'red';
                    nowLi.innerHTML = str;

                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                //阻止默认事件
                return false;
            }
        };
    }

    //把布局转成浮动，然后重新定位
    function fixpos(oParent) {
        var aLi = oParent.getElementsByTagName('li');
        for (var i = 0; i<aLi.length; i++) {
            aLi[i].style.position = '';
            aLi[i].style.float = 'left';            
        }
        changePos(aLi);
    }
    

    //布局转换，使用定位的方式实现效果
    function changePos(aLi) {
        var arr = [];
        for (var i = 0; i<aLi.length; i++) {
            arr.push([aLi[i].offsetLeft, aLi[i].offsetTop]);
        }

        for (var i = 0; i<aLi.length; i++) {
            aLi[i].style.position = 'absolute';
            aLi[i].style.left = arr[i][0] + 'px';
            aLi[i].style.top = arr[i][1] + 'px';
        }
    }

    //碰撞检测
    function pz(obj1, obj2) {
        var dis1 = getPosition(obj1);
        var dis2 = getPosition(obj2);

        var L1 = dis1.x;
        var R1 = dis1.x + obj1.offsetWidth;
        var T1 = dis1.y;
        var B1 = dis1.y + obj1.offsetHeight;

        var L2 = dis2.x;
        var R2 = dis2.x + obj2.offsetWidth;
        var T2 = dis2.y;
        var B2 = dis2.y + obj2.offsetHeight;

        if (L1 > R2 || R1 < L2 || T1 > B2 || B1 < T2) {
            return false;
        } else {
            return true;
        }

    }
    
<<<<<<< HEAD
=======
	var index = 1;
	
	var oBox = $('#box');

	var aUl = oBox.getElementsByTagName('ul');

	var aLi1 = aUl[0].getElementsByTagName('li');

	var aLi2 = aUl[1].getElementsByTagName('li');

	changePos(aLi1);
	changePos(aLi2);
	

	bind(aUl[0],aUl[1]);
	bind(aUl[1],aUl[0]);


	//
	function bind(nowParent, targetParent) {
		nowParent.onmousedown = function(ev){
			var ev = ev || window.event;
			var target = ev.target || ev.srcElement;

			if (target.nodeName.toLowerCase() == "li") {
				//当前选中的li元素
				var nowLi = target;
				nowLi.style.background = 'blue';
				var str = nowLi.innerHTML;
				nowLi.innerHTML = '可以拖拽我移动咯';
				

				//鼠标按下 记录鼠标位置
				var disX = ev.clientX;
				var disY = ev.clientY;

				//保存到定位坐标
				var startX = nowLi.offsetLeft;
				var startY = nowLi.offsetTop;

				//使当前li层级提升
				nowLi.style.zIndex = index++;

				//鼠标移动
				document.onmousemove = function(ev) {
					var ev = ev || window.event;
					nowLi.style.left = startX + ev.clientX - disX + 'px';
					nowLi.style.top = startY + ev.clientY - disY + 'px';
					
					if (pz(targetParent, nowLi)) {
						nowLi.innerHTML = "可以释放鼠标啦！";
						nowLi.style.background = "#000";
					}
				};

				//鼠标抬起
				document.onmouseup = function() {
					//当前拖拽的li在对面ul范围内
					if (pz(targetParent, nowLi)) {
						targetParent.appendChild(nowLi);
					} else {	
						nowParent.appendChild(nowLi);
					}

					//重新浮动布局在转为定位布局
					fixpos(targetParent);
					fixpos(nowParent);

					//还原默认
					nowLi.style.background = 'red';
					nowLi.innerHTML = str;

					document.onmousemove = null;
					document.onmouseup = null;
				};
				//阻止默认事件
				return false;
			}
		};
	}

	//把布局转成浮动，然后重新定位
	function fixpos(oParent) {
		var aLi = oParent.getElementsByTagName('li');
		for (var i = 0; i<aLi.length; i++) {
			aLi[i].style.position = '';
			aLi[i].style.float = 'left';			
		}
		changePos(aLi);
	}
	

	//布局转换，使用定位的方式实现效果
	function changePos(aLi) {
		var arr = [];
		for (var i = 0; i<aLi.length; i++) {
			arr.push([aLi[i].offsetLeft, aLi[i].offsetTop]);
		}

		for (var i = 0; i<aLi.length; i++) {
			aLi[i].style.position = 'absolute';
			aLi[i].style.left = arr[i][0] + 'px';
			aLi[i].style.top = arr[i][1] + 'px';
		}
	}

	//碰撞检测
	function pz(obj1, obj2) {
		var dis1 = getPosition(obj1);
		var dis2 = getPosition(obj2);

		var L1 = dis1.x;
		var R1 = dis1.x + obj1.offsetWidth;
		var T1 = dis1.y;
		var B1 = dis1.y + obj1.offsetHeight;

		var L2 = dis2.x;
		var R2 = dis2.x + obj2.offsetWidth;
		var T2 = dis2.y;
		var B2 = dis2.y + obj2.offsetHeight;

		if (L1 > R2 || R1 < L2 || T1 > B2 || B1 < T2) {
			return false;
		} else {
			return true;
		}

	}
	
>>>>>>> master
=======
>>>>>>> master
};