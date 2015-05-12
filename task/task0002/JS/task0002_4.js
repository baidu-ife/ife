/**
 * @file task0002_4.js
 * @author AlisonZhang(zhangxuejing_62@126.com)
 * learnfrom zchen9(zxcvbnm.pop@qq.com)
 */
window.onload = function() {
    var input = $("#s-input");
    var resultText = $("#s-result");
    var suggestBox = $("#s-suggest");

    //添加键盘和点击事件
    addEvent(document, "keyup", suggestSelected);
    addEvent(document, "click", suggestHide);

    //添加输入框键盘事件
    addEnterEvent(input, suggestEnter);
    addEvent(input, "keyup", suggestShow);

    //自定义建议数据
    var suggestData = [ 'hello', 'world', 'nice', 'to', 'see', 'you', 'I', 'love', 'you'];

    //定义当输入框获取内容时，触发建议栏出现事件

    function suggestShow() {
        var searchText = input.value;
        var data = suggestData;
        resultText.innerHTML = "";

        //添加建议内容
        for(var i = 0; i < data.length; i++) {
            var liText = document.createElement("li");
            liText.innerHTML = data[i];
            resultText.appendChild(liText);

            //添加建议项的监听事件，鼠标移入或点击为选中，鼠标移出取消选中
            addEvent(liText, "mouseover", addSelected);
            addEvent(liText, "mouseout", removeSelected);
            addEvent(liText, "click", suggestSelected);
        }

        //若输入框内容为空时，建议栏出现，否则隐藏
        if (searchText != "" ) {
            suggestBox.style.display = "block";
        }
        else {
            suggestBox.style.display = "none";
        }
    }

    //定义当document接受点击事件时，建议栏隐藏事件
    function suggestHide() {
        suggestBox.style.display = "none";
    }

    //定义建议项选中时，更改样式以及输入框内容事件
    function addSelected(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        addClass(target, "selected");
        input.value = target.innerHTML;
    }

    //定义建议栏未选中时，移除样式事件
    function removeSelected(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        removeClass(target, "selected");
    }

    //定义建议栏上下键选择事件
    var i = 0 ;
    function suggestSelected(e) {
        var list = $("#s-result").childNodes;
        e = e || window.event;
        var target = e.target || e.srcElement;
        //判断选择项是否为空
        if (list != null) {
            //若非空，遍历选择项，清除样式
            each (list, function(item) {
                removeClass(item,"selected");
            });
            //按向下键选择建议项，更改样式以及输入框内容
            if (e.keyCode == 40 || e.keyCode == 34 ) {
                addClass(list[i], "selected");
                input.value = list[i].innerHTML;
                i++;
                if (i > list.length-1) {
                    i = 0;
                }
            }
            //按向上键选择建议项，更改样式以及输入框内容
            if (e.keyCode == 38 || e.keyCode == 33) {
                i--;
                if (i < 0) {
                    i = list.length -1;
                }
                addClass(list[i], "selected");
                input.value = list[i].innerHTML;
            }
        }
    }

    //定义建议栏Enter键选择事件
    function suggestEnter(e) {
        //防止浏览器默认enter事件
        e = e || window.event;
        stopDefault(e);
        //获取当前suggest列表中被选中的内容，更改输入框的值
        var list = $("#s-result").childNodes;
        for(var i = 0; i < list.length; i++) {
            if (list[i].getAttribute("class") == "selected") {
                input.value = list[i].innerHTML;
            }
        }
    }
};
