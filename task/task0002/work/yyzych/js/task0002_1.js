/*
* task0002_1.js
*/

var getHabitArr=function (str,splitType) {
    var temp=str.split(splitType);
    return uniqArray(temp);
};

// 1.
$.on("#sure1","click",function (e) {
    var res=getHabitArr($("#habit1").value,/,/g);
    if(!res) return;
    var resDom;
    if(resDom=$("#footerTip1")){
        resDom.lastChild.nodeValue=res.join(" - ");
    }else{
        resDom=$("#footerTip1")||document.createElement("p");
        resDom.id="footerTip1";
        resDom.appendChild(document.createTextNode(res.join(" - ")));
        this.parentNode.appendChild(resDom);
    }
})

// 2.
$.on("#sure2","click",function (e) {
    var res=getHabitArr($("#habit2").value,/[\s,，;、]+/g);
    if(!res) return;
    var resDom;
    if(resDom=$("#topTip2")){
        resDom.lastChild.nodeValue=res.join(" - ");
    }else{
        resDom=$("#topTip2")||document.createElement("p");
        resDom.id="topTip2";
        resDom.appendChild(document.createTextNode(res.join(" - ")));
        this.parentNode.appendChild(resDom);
    }
})

// 3.
var topTip3;
var showTip=function (tip) {
    if(topTip3){
        topTip3.style.display="block";
        topTip3.lastChild.nodeValue=tip;
    }else{
        topTip3=$("#topTip3")||document.createElement("p");
        topTip3.id="topTip3";
        topTip3.style.color="red";
        topTip3.style.display="block";
        topTip3.appendChild(document.createTextNode(tip));
        $(".field3").insertBefore(topTip3,$("#habit3"));
    }
};
var hideTip=function () {
    if(topTip3){
        topTip3.style.display="none";
    }
};
var createCheckbox=function (txt) {
    var checkbox=document.createElement("input");
    checkbox.type="checkbox";
    var label=document.createElement("label");
    label.style.marginRight="15px";
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(txt));
    return label;
};

$.on("#sure3","click",function (e) {
    var val;
    if(!(val=$("#habit3").value)){
        showTip("注意：请输入内容");
        return;
    }
    var res=getHabitArr(val,/[\s,，;、]+/g);
    var topTip;
    if(res.length<1) {
        showTip("注意：请输入内容");
        return;
    }else if(res.length>10){
        showTip("注意：不能超过10个爱好")
        return;
    }else{
        hideTip();
    }
    var resDom;
    if(resDom=$("#footerTip3")){
        resDom.innerHTML="";
        for (var i = 0; i < res.length; i++) {
            resDom.appendChild(createCheckbox(res[i]));
        };
    }else{
        resDom=$("#footerTip3")||document.createElement("div");
        resDom.id="footerTip3";
        for (var i = 0; i < res.length; i++) {
            resDom.appendChild(createCheckbox(res[i]));
        };
        this.parentNode.appendChild(resDom);
    }
})