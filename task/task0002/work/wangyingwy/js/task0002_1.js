function clickHandler() {
    var arr = $(".text").value.split(/[,，]/);
    var newArr = uniqArray(arr);
    var newStr = newArr.join(" ");
    var oP = document.createElement("p");
    oP.innerHTML = newStr;
    document.body.appendChild(oP);
}

$.click(".btn", clickHandler);

function clickHandler1() {
    var arr = $(".text1").value.split(/[,，]/);
    var newArr = uniqArray(arr);
    var newStr = newArr.join(" ");
    var oP = document.createElement("p");
    oP.innerHTML = newStr;
    document.body.appendChild(oP);
}

$.click(".btn1", clickHandler1);

function clickHandler2() {
    var arr = $(".text2").value.split(/[,，]/);
    if(arr.length > 10 || arr.length == 0) {
        var alert = document.createElement("p");
        alert.innerHTML = "您的输入有误"
        alert.style.color = "#ff0000";
    }else {
        var oForm = document.createElement("form");
        oForm.innerHTML = str;
        oForm.id = "form1";
        this.parentNode.appendChild(oForm);
        for(var i = 0; i<arr.length; i++) {
            str += '<lable><input type="checkbox">' + arr[i] + '</lable>'
        }
    }
}

$.click(".btn2", clickHandler2);