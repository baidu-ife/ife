window.onload =function(){
    $.click("#step1 [type=button]", handler1);
    $.click("#step2 [type=button]", handler2);
    $.click("#step3 [type=button]", handler3);
}


var handler1 = function (){
    var arr = $("#step1 [type=text]").value.split(",");
    var uniqArr = uniqArray(arr);
    $("#result1").innerHTML = display(uniqArr);
};

var handler2 = function (){
    var str = $("#step2 [type=text]").value;
    var arr = splitStr(str);
    var uniqArr = uniqArray(arr);
    $("#result2").innerHTML = display(uniqArr);
};

var handler3 = function (){
    var str = $("#step3 [type=text]").value;
    var arr = splitStr(str);
    var uniqArr = uniqArray(arr);
    for(var i =0; i<uniqArr.length; i++) {
        //移除可能的无效值（由连续分隔符引起）
        if (uniqArr[i] === "") {
            uniqArr.splice(uniqArr[i]);
            break;
        }
    }
    if (!uniqArr) {
        $(".warning").innerHTML = "您还未输入兴趣呢";
    }
    else if (uniqArr.length > 10) {
        $(".warning").innerHTML = "啊哦，请输入至多十个标签";
    }
    else {
        displayAdv(uniqArr);
    }  
};

var splitStr = function(str){
    var match = /[、\u3000\x20\t\n\r\f；;,，]/g;
    return str.replace(match,",").split(",");

};

var display = function (arr){
    var str = "兴趣标签： ";
    each(arr, function(item){
        if (item) {
            str += "<span> " + item + " </span>";
        }  
    });
    return str;
};

var displayAdv = function (arr){
    var str = [];
    var resultForm = document.createElement("form");
    each(arr, function(item){
        str += '<label><input type="checkbox">' + item + "</label><br>";
    });
    resultForm.innerHTML = str;
    $("#step3").appendChild(resultForm);
}
