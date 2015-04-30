/**
 * Created by Y2X on 2015/4/24.
 */

//level 1
$.click("#hobbyBtn",function(){

    var hobbies=$("#hobby").value;
    var result="";
    if(hobbies!=null){
        //deal hobbies
        var hobby=hobbies.split(",");
        var uniqHobby=uniqArray(hobby);
        //去重并过滤掉空的
        var hobby=uniqHobby.filter(function(x){
            return x!="";
        });
        result=hobby.join(",")
    }
    $("#hobbyShow").innerHTML="your hobbies are:"+result;
});

//level 2
$.click("#hobbyBtn2",function(){
    var hobbies=$("#hobby2").value;
    var result="";
    if(hobbies!=null){
        //deal hobbies
        var hobby=hobbies.split(/\n|,|，|\s|、|;|；/);
        var uniqHobby=uniqArray(hobby);
        //去重并过滤掉空的
        var hobby=uniqHobby.filter(function(x){
            return x!="";
        });
        result=hobby.join(",")
    }
    $("#hobbyShow2").innerHTML="your hobbies are:"+result;
});

//level 3
if (window.addEventListener) {//监听添加
    $("#hobby3").addEventListener("input", check);
} else {
    $("#hobby3").attachEvent("onpropertychange", check);
}

if (!!window.attachEvent && navigator.userAgent.match(/msie (\d)/i)[1] > 8) {//监听删除
    $("#hobby3").attachEvent("onkeydown", function () {
        var key = window.event.keyCode;
        (key == 8 || key == 46) && check();
    });
    $("#hobby3").attachEvent("oncut", check);
}//http://www.web92.net/760.html

function check(){//用addEvent更好，但是懒……
    var hobbies=$("#hobby3").value;
    var btn=$("#hobbyBtn3");
    var errorMsg=$("#errorMsg");
    if(hobbies==""){
        errorMsg.innerHTML="您未输入";
        btn.disabled=true;
    }
    else{
        var hobby=hobbies.split(/\n|,|，|\s|、|;|；/);
        if(hobby.length>10){
            errorMsg.innerHTML="您的爱好多余10个，请删掉一些";
            btn.disabled=true;
        }
        errorMsg.innerHTML="";
        btn.disabled=false;
    }
}

$.click("#hobbyBtn3",function(){
    var hobbies=$("#hobby3").value;
    var result=$("#hobbyShow3");
    if(hobbies!=null){
        //deal hobbies
        var hobby=hobbies.split(/\n|,|，|\s|、|;|；/);
        var uniqHobby=uniqArray(hobby);
        //去重并过滤掉空的
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