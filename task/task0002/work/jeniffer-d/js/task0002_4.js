(function(){
    var index = 0;  //提示栏中li的序号
    var html = "";  //提示栏内部html
    var list = ["aa","bb","cc"];
    
    $.on("#search", "keyup", function(){         //输入框输入内容时，显示提示栏
        var e = e || window.event;
        var target = e.target || e.srcElement;
        var searchContent = target.value;

        if (!searchContent) {                     //输入为空，提示栏消失
            $("#result").style.display = "none";
        } else {
            $("#result").style.display = "block";
            for (var i = 0; i < list.length; i++) {
                if (i == 0) {
                    html = "<li class='active'>"+list[i]+"</li>";
                } else {
                    html += "<li>"+list[i]+"</li>";
                }
            }
            $("#result").innerHTML = html;            
        }
    });

    $.delegate("#result", "li", "mouseover", function(event) {  //鼠标hover到某个li时，显示选中
        var li = $("#result").getElementsByTagName("li");
        var length = li.length;
        var e = e || window.event;
        var target = e.target || e.srcElement;
        for (var i = 0; i < length; i++) {
            removeClass(li[i], "active");
        }
        addClass(target,"active");

    });
        
    document.onkeyup = function(e){      //使用键盘控制li的选中
        var li = $("#result").getElementsByTagName("li");
        var length = li.length;
        var e = e || window.event;

        if (e && e.keyCode == 38) {      
            console.log("up");
            if (index > 1) {
                index--;
            } else {
                index = 0;
            }
            for (var i = 0; i < length; i++) {
                removeClass(li[i],"active");
            }
            addClass(li[index],"active");
            return;
        }

        if (e && e.keyCode == 40) {
            console.log('down');
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
            console.log("enter");
            var text = li[index].innerText;
            $("#search").value = text;
            $("#result").style.display = "none";
            return;
        }
    };


    $.delegate("#result", "li", "click", function(e){   //点击某个li时，输入框变成该li的内容
        var event = e || window.event;
        var target = event.target || event.srcElement;
        $("#search").value = target.innerText;
        $("#result").style.display = "none";
    });

})();


