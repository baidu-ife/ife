$.click("#btn1",function(){
    var str=$("#txt1").value;
    if(str!=""){
        str=trim(str);
        var strarr=str.split(",");
        var uniqstrarr=uniqArray(strarr);
        var p1=document.createElement("p");
        $(".div1").appendChild(p1);
        for (var i = 0; i<uniqstrarr.length; i++) {
            if (uniqstrarr[i].match(/\s+/g)) {
                uniqstrarr.splice(i,1);
                i--;
            }
        }
        p1.innerHTML = uniqstrarr;
    }
});
$.click("#btn2", function () {
    var str = $('#txt2').value;
    if(str != ""){
        str=trim(str);
        var strarr = str.split(/[',','，','、',';','，','\s+']/);
        var uniqstrarr=uniqArray(strarr);
        var p2 = document.createElement("p");
        $(".div2").appendChild(p2);
        for (var i = 0; i<uniqstrarr.length; i++) {
            if (uniqstrarr[i].match(/\s+/g)) {
                uniqstrarr.splice(i,1);
                i--;
            }
        }
        p2.innerHTML = uniqstrarr;
    }
});
var cbContainer = document.createElement("div");
$("body").appendChild(cbContainer);
cbContainer.setAttribute("class","div4");
$.click("#btn3", function () {
    var str = $("#txt3").value;
    var p3 = document.createElement("p");
    if(str != ""){
        str=trim(str);
        var strarr = str.split(/[',','，','、',';','，','\s+']/);
        var uniqstrarr=uniqArray(strarr);
        if(uniqstrarr.length>0&&uniqstrarr.length<=10) {
            for (var i = 0; i<uniqstrarr.length; i++) {
                if (uniqstrarr[i].match(/\s+/g)) {
                    uniqstrarr.splice(i,1);
                    i--;
                }
            }
            for (var j in uniqstrarr) {
                var cb = document.createElement("input");
                cb.setAttribute("type", "checkbox");
                cb.setAttribute("id", uniqstrarr[j]);
                $(".div4").appendChild(cb);
                var cbLabel = document.createElement("label");
                cbLabel.setAttribute("for", uniqstrarr[j]);
                var cbName = document.createTextNode(uniqstrarr[j]);
                cbLabel.appendChild(cbName);
                $(".div4").appendChild(cbLabel);
            }
            $(".div4").appendChild(document.createElement("br"));
        }
        else {
            $(".div3").appendChild(p3);
            p3.innerHTML="请您输入小于等于10个爱好";
        }
    }
    else{
        console.log("oops");
        $(".div3").appendChild(p3);
        p3.innerHTML="请您输入爱好，不能为空";
    }
});

