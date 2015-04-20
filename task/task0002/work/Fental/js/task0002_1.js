/**
 * Created by T on 2015/4/19.
 */

//    第一阶段
var stepOne = (function() {
    var handleHobby = function() {
        console.log("in handle");
        var text = $("#hobby-1").value.split(",");
        text = uniqArray(text);
        var panel = document.createElement("p");
        panel.textContent = text.join();
        $("#step-1").appendChild(panel);
    };
    $.click("#btn-1", handleHobby);
})();
//    第二阶段
var stepTwo = (function() {
    var handleHobby = function() {
        console.log("in handle two");
        var text = $("#hobby-2").value.split(/[\s\t\n,，、；;]+/);
        text = uniqArray(text);
        console.log(text);
        var panel = document.createElement("p");
        panel.textContent = text.join();
        $("#step-2").appendChild(panel);
    };
    $.click("#btn-2", handleHobby);
})();
//    第三阶段
var stepThree = (function() {
    var handleHobby = function() {
        var text = $("#hobby-3").value.split(/[\s\t\n,，、；;]+/);
//        if()
        text = uniqArray(text);
        console.log(text);
        if (text.length > 10) {
            $("#tips").textContent = "爱好数量不能超过10个";
        }
        else if (text.length === 0) {
            console.log("no hobby");
            $("#tips").textContent = "请输入爱好";
        }
        else {
            var checkbox = "";
            for (var i = 0; i < text.length; i++) {
                checkbox += "<label for='hobby-" + i +"'>" + text[i] + "</label><input type='checkbox' name='hobby[]' id='hobby-" + i + "'>";
            }
            $("#hobby-panel").innerHTML = checkbox;
        }
    };
    $.click("#btn-3", handleHobby);
})();