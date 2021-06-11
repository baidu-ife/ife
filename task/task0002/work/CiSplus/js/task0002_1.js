window.onload = function() {
    $.on("#check", "click", checkInput);
}

function checkInput() {
    var inputContent = document.getElementById("inputcontent").value;
    var inputTemp = inputContent.replace(/[,\uff0c\s\u3001;\n\t]+/g, " ");
    if (!inputTemp || trim(inputTemp).length == 0) {
        $("#errorcontent").innerHTML = "请至少输入一个爱好";
        $("#errorcontent").style.color = "red";
        return;
    } else {
        $("#errorcontent").innerHTML = "";
    }
    var inputArr = trim(inputTemp).split(" ");
    if (inputArr.length > 10) {
        $("#errorcontent").innerHTML = "输入爱好过多<br>请输入不超过10个爱好";
        $("#errorcontent").style.color = "red";
        return;
    } else {
        $("#errorcontent").innerHTML = "";
    }
    var uniqInputArr = uniqArray(inputArr);
    if ($("#checkarea").childNodes.length > 0) {
        $("#checkarea").innerHTML = "";
    }
    for (var key in uniqInputArr) {
        var labelTemp = document.createElement("label");
        var labelText = document.createTextNode(uniqInputArr[key]);
        
        var checkTemp = document.createElement("input");
        checkTemp.setAttribute("type", "checkbox");
        checkTemp.setAttribute("value", uniqInputArr[key]);
        checkTemp.setAttribute("name", "interest");
        
        labelTemp.appendChild(checkTemp);
        labelTemp.appendChild(labelText);
        $("#checkarea").appendChild(labelTemp);
    }
}