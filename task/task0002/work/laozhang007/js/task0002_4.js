/**
 * Created by Lenovo on 2015/5/4.
 */
function getData(e){
        var panel = $("#hint");
        var value = $("#search-box").value;
        var content = "";
        if (value) {
            //ajax("php/task0002_4.php",options);
            //模拟ajax返回的结果
            var hintdata = ['text','text1','text123','texthaha','text232'];
            var data = value;
            for (var i = 0; i < hintdata.length; i++) {
                content += "<li><span>" + data + "</span>" + hintdata[i].slice(data.length) + "</li>"
            }
            addClass(panel, "active");
            panel.innerHTML = content;
        }
        else {
            panel.innerHTML = "";
            removeClass(panel, "active");
        }
}
$.on($('#search-box'),'keyup',getData);
//点击事件处理
$.delegate($("#hint"), "li", "click", function(ev) {
    var panel = $("#hint");
    var ev = ev || event;
    //兼容处理
    var target = ev.target || ev.srcElement;
    $("#search-box").value = target.textContent;
    panel.innerHTML = "";
    removeClass(panel, "active");
});
//上下键及回车键监听
var index = 0;

document.onkeydown = function(e){      //使用键盘控制li的选中
    var li = $("#hint").getElementsByTagName("li");
    var length = li.length;
    var e = e || window.event;

    if (e && e.keyCode == 38) {
        if (index > 0) {//循环显示获取到的数据
            index--;
        } else {
            index = length - 1;
        }
        for (var i = 0; i < length; i++) {
            removeClass(li[i],"selected");
        }
        addClass(li[index],"selected");

        removeEvent($('#search-box'), 'keyup', getData);//取消事件绑定防止再次发送请求破坏输入数据
        var text = li[index].innerText;
        $("#search-box").value = text;
        return;
    }
    //有个问题就是按光标“上”键之后，即便取消keyup的事件监听，光标都会跑到输入文本框的开头，这个问题不知道怎么解决，还请大神们指点。

    if (e && e.keyCode == 40) {
        if (index < length-1) {
            index ++;
        } else {
            index = 0;
        }
        for (var j = 0; j < length; j++) {
            removeClass(li[j], "selected");
        }
        addClass(li[index], "selected");

        removeEvent($('#search-box'), 'keyup', getData);

        var text = li[index].innerText;
        $("#search-box").value = text;
        return;
    }

    if (e && e.keyCode == 13) {
        removeEvent($('#search-box'), 'keyup', getData);

        var text = li[index].innerText;
        $("#search-box").value = text;
        $("#hint").innerHTML = "";
        removeClass($("#hint"), "active");
        return;
    }

    document.onkeyup = function() {
        //重新绑定事件
        $.on($('#search-box'),'keyup',getData);
    }
};