/**************************
   Melanie-BUPT  2015/5/5
***************************/

window.onload = function() {
    var suggestData = ['Simon', 'Erik', 'Kener', 'Melanie', 'BUPT'];
    var input = document.getElementById("search-box");
    var lists = document.getElementById("search-list");

    var value = true;
    var now = -1;

    input.addEventListener("keyup", function(event) {
        //输入时（包括重新输入时）弹出数据列表
        if(input.value != "" && value) {
            value = false;
            for (var i = 0; i < suggestData.length; i++) {
                var list = document.createElement("li");
                list.innerHTML = suggestData[i];
                list.style.border = "solid 1px #ddd";
                lists.appendChild(list);
                //用鼠标选择一项数据
                list.addEventListener("click", function() {
                    input.value = this.innerHTML;
                    lists.style.display = "none";
                }, false);
            }
        }
        //删除输入数据后，数据列表也消失
        else if (input.value == "") {
            for (var i = 0; i < lists.childNodes.length;) {
                lists.removeChild(lists.childNodes[i]);
                lists.childNodes[i]=null;
            }
            lists.style.display = "block";
            value = true;
        }
        //用上下键及回车选择并选中数据
        else {
            var list = lists.getElementsByTagName("li");
            var code = event.keyCode;
            console.log(event.keyCode);
            for (var i = 0; i < list.length; i++) {
                list[i].className = "";
            }
            if (code == 38) {
                now = select(now-1);
                list[now].className = "active";
            }
            else if (code == 40) {
                now = select(now+1);
                list[now].className = "active";
            }
            //控制键Enter键以及数字键盘的Enter键
            //如果文本框用form标签，按下Enter键会刷新页面而不是选择数据
            else if (code == 13 || code == 108) {
                input.value = list[now].innerHTML;
                lists.style.display = "none";
            }
        }
        function select(now) {
            if (now <= 0)
                return 0;
            else if (now >= suggestData.length-1)
                return suggestData.length-1;
            else
                return now;
        }
    }, false);
}

/************************************************
总结一下下：
    主要考察点应该是对于鼠标事件和键盘事件的处理。
    这部分，总体理解的还行。但不够深入。
*************************************************/