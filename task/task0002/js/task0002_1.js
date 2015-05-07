function getInput(target){
    var str = $(target).value;
    var result = [];
    if(trim(str) == ""){
        return -1;
    }else{
        var regex = /[,;；，、\s\n]+/;
        var arr = str.split(regex);
        for(var k in arr){
            var temp = trim(arr[k]);
            if(temp.length > 0){
                result.push(temp);
            }
        }
        result = uniqArray(result);
        if(result.length > 10){
            return -2;
        }
        return result;
    }
}

function showInput(event){
    var arr = getInput("#hobbies");
    var hintstr = "";
    if(arr == -1){
        hintstr = "此项输入不能为空，请填写您的兴趣爱好至少一项";
        $("#hint").innerHTML = hintstr;
        return;
    }else if(arr == -2){
        hintstr = "此处填写不能超过10项，请重新编辑您的输入";
        $("#hint").innerHTML = hintstr;
        return;
    }
    $("#hint").style.display = "none";
    var e = event || window.event;
    var target = e.target || e.srcElement;
    for(var k in arr){
        var chkbox = document.createElement("input");
        chkbox.type = "checkbox";
        chkbox.name = "hobitems";
        chkbox.id = "hobitem" + k;
        target.parentNode.appendChild(chkbox);
        var label = document.createElement("label");
        label.for = chkbox.id;
        label.innerHTML = arr[k];
        target.parentNode.appendChild(label);
    }
}

$.click("#sure", function(e){
    showInput(e);
});
