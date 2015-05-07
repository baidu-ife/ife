(function(){
	var index = 0;
	var name = ["Simon","Josh","Justin","Mile","Michaela","Mica","Indira","Izefia"];

	$.on("#input","keyup",function(evn){//输入包含的内容时显示内容
		var tips = [];
		var evn = evn||window.event;
		var target = evn.target||evn.srcElemment;
		var text = target.value;
		var reg = new RegExp(text,"i");//不区分大小写
		if(!text){
			$("#tips").style.display = "none";//
		}else{
			$("#tips").style.display = "block";
			for(var i=0;i<name.length;i++){
				if(name[i].search(reg)!=-1){
					tips.push("<li><a>"+name[i]+"</a></li>");//匹配则将该项加入数组
				}
			}
			$("#tips").innerHTML = tips.join("");//数组转换为字符串后加入列表
		}
	});

	$.delegate("#tips", "a", "click", function(evn){   //点击某个a则输入该a内容
        var event = evn || window.event;
        var target = event.target || event.srcElement;
        $("#input").value = target.innerText;
        $("#tips").style.display = "none";
    });

	document.onkeyup = function(e){     //键盘事件
        var li = $("#tips").getElementsByTagName("a");
        var length = li.length;
        var e = e || window.event;
        if (e && e.keyCode == 38) {      
            if (index > 1) {
                index--;
            } else {
                index = 0;
            }
            for (var i = 0; i < length; i++) {
                removeClass(li[i],"active");
            }
            addClass(li[index],"active");

        }
        if (e && e.keyCode == 40) {
            if (index < length-1) {
                index ++;
            } else {
                index = length - 1;
            }
            for (var j = 0; j < length; j++) {
                removeClass(li[j], "active");
            }
            addClass(li[index], "active");
            return;
        }
        if (e && e.keyCode == 13) {
            var text = li[index].innerText;
            $("#input").value = text;
            $("#tips").style.display = "none";
            return;
        }
    };
})();
