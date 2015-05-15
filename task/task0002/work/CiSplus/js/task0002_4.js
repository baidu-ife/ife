window.onload = function() {
    $.on("#firstinput", "keyup", function() {
        str = this.value;
        if (str.length == 0) {
            $("#prompt").innerHTML = "";
            $("#prompt").style.display = "none";
            // $("#firstpra").innerHTML = "";
            return;
        }
        //对于输入内容的匹配放在了server里面做了。。。
        //返回的字符串是匹配好的。
        ajax(
            'js/gethint.php',
            {
                type: 'GET',
                data: {
                    q: str
                },
                onsuccess: function(responseText, xhr) {
                    promptMsg(responseText);
                }
            }
        );
    });
}
function promptMsg(responseText) {
    $("#prompt").innerHTML = "";
    if (responseText < 0) {
        $("#prompt").style.display = "none";
        // $("#firstpra").innerHTML = "暂无提示";
    } else {
        // $("#firstpra").innerHTML = responseText;
        var promptList = responseText.split(",");
        var liElement = null;

        for (var i in promptList) {
            liElement = document.createElement('li');
            liElement.innerHTML = '<a href="javascript:;">' + promptList[i] + '</a>';
            $("#prompt").appendChild(liElement);
        }
        $("#prompt").style.display = "block";
    }
    $.on("#firstinput", "blur", function() {
        var current = -1;
        var aElementList = $("#prompt").getElementsByTagName('a');
        var aElementLength = aElementList.length - 1;
        var aClick = function() {
            $("#firstinput").value = this.firstChild.nodeValue;
            $("#prompt").innerHTML = "";
            $("#prompt").style.display = "none";
            $("#firstinput").focus();
        };
        var aFocus = function() {
            for (var i = aElementLength; i >= 0; i --) {
                if (this.parentNode === $("#prompt").children[i]) {
                    current = i;
                    break;
                }
            }
            this.style.color = "#000";
            this.style.backgroundColor = "#ccc";
        }
        var aBlur = function() {
            this.style.color = "#000";
            this.style.backgroundColor = "#fff";
        };
        var aKeyDown = function(event) {
            event = event || window.event;
            if (current === aElementLength && event.keyCode === 9) {
                $("#prompt").style.display = "none";
            } else if (event.keyCode == 40) {
                current ++;
                if (current < -1) {
                    current = aElementLength;
                }
                if (current > aElementLength) {
                    current = -1;
                    $("#firstinput").focus();
                } else {
                    $("#prompt").getElementsByTagName("a")[current].focus();
                }
            } else if (event.keyCode == 38) {
                console.log(current);
                current --;
                if (current == -1) {
                    $("#firstinput").focus();
                } else if (current < -1) {
                    current = aElementLength;
                    $("#prompt").getElementsByTagName("a")[current].focus();
                } else {
                    $("#prompt").getElementsByTagName("a")[current].focus();
                }
            }
        };
        for (var i = 0; i < aElementList.length; i ++) {
            aElementList[i].onclick = aClick;
            aElementList[i].onfocus = aFocus;
            aElementList[i].onblur = aBlur;
            aElementList[i].onkeydown = aKeyDown;
        }
    });
    $.on("#firstinput", "keydown", function(event) {
        event = event || window.event;
        var aElementList = $("#prompt").getElementsByTagName("a");
        if (event.keyCode == 40) {
            if (aElementList[0]) {
                aElementList[0].focus();
            }
        } else if (event.keyCode == 38) {
            if (aElementList[aElementList.length - 1]) {
                aElementList[aElementList.length - 1].focus();
            }
        } else if (event.keyCode == 9) {
            if (event.shiftKey == true) {
                $("#prompt").style.display = "none";
            }
        }
    });
    //点击页面其他地方的时候，会隐藏提示框
    addClickEvent(document, function() {
        $("#prompt").style.display = "none";
    });
}