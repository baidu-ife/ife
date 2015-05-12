/**
 * @file task0002_1.js
 * @author AlisonZhang(zhangxuejing_62@126.com)
 */
//阶段一
$.click("#hobbyBtn", function() {
    var hobbies = $("#hobby").value;
    var result = "";
    if (hobbies != null) {
        var hobby = hobbies.split(",");
        var uniqHobby = uniqArray(hobby);
         //过滤掉空的爱好
        var hobby = uniqHobby.filter(function(x) {
            return x != ""
        });
        result = hobby.join("，")
    }
    $("#hobbydisp").innerHTML = "您的兴趣爱好为：" + result;
});

//阶段二
//level 2
$.click("#hobbyBtn2",function(){
    var hobbies = $("#hobby2").value;
    var result = "";
    if(hobbies != null){
        var hobby = hobbies.split(/\n|,|\s|，|;|；|、/);
        var uniqHobby = uniqArray(hobby);
        var hobby = uniqHobby.filter(function(x){
            return x!="";
        });
        result = hobby.join(",")
    }
    $("#hobbydisp2").innerHTML = "your hobbies are:"+result;
});
//阶段三
if (window.addEventListener) {
    $("#hobby3").addEventListener("input", check);
} else {
    $("#hobby3").attachEvent("onpropertychange", check);
}

if (!!window.attachEvent && navigator.userAgent.match(/msie (\d)/i)[1] > 8) {
    $("#hobby3").attachEvent("onkeydown", function () {
        var key = window.event.keyCode;
        (key == 8 || key == 46) && check();
    });
    $("#hobby3").attachEvent("oncut", check);
}

function check(){
    var hobbies=$("#hobby3").value;
    var btn=$("#hobbyBtn3");
    var tip=$("#tip");
    if(hobbies==""){
        tip.innerHTML="您未输入";
        btn.disabled=true;
    }
    else{
        var hobby=hobbies.split(/\n|,|\s|，|;|；|、/);
        if(hobby.length>10){
            tip.innerHTML="您的爱好多余10个，请删掉一些";
            btn.disabled=true;
        }
        tip.innerHTML="";
        btn.disabled=false;
    }
}

$.click("#hobbyBtn3",function(){
    var hobbies=$("#hobby3").value;
    var result=$("#hobbydisp3");
    if(hobbies!=null){
        var hobby=hobbies.split(/\n|,|\s|，|;|；|、/);
        var uniqHobby=uniqArray(hobby);
        var hobby=uniqHobby.filter(function(x){
            return x!="";
        });
    }
    for(var o in hobby){
        console.log("om");
        var box=document.createElement("input");
        box.setAttribute("type","checkbox");
        box.setAttribute("value",hobby[o]);

        var label=document.createElement("label");
        label.setAttribute("for",hobby[o]);
        label.innerHTML=hobby[o];

        result.appendChild(box);
        result.appendChild(label);
    }
});

