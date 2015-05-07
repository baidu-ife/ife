/**
 * Created by jp on 2015/5/6.
 */
function level1_show() {
    var text =  document.getElementById("text1").value;
    if(text == "")
      alert("请至少输入一个兴趣");
    else {
        var text1=text.split(",");
        console.log(text1);
        text1=uniqArray(text1);
        console.log(text1);
        var p = document.createElement("p");
        for(var i=0;i<text1.length;i++)
            p.innerHTML= p.innerHTML+text1[i]+" ";
        document.getElementById("level1").appendChild(p);
    }
}
function deletenode(){
    var a=document.getElementById("level1");
    var x=a.removeChild( a.childNodes[0]);
    x=null;
}
//阶段2
function level2_show() {
    var text =  document.getElementById("text2").value;
    if(text == "")
        alert("请至少输入一个兴趣");
    else {
        var text1=text.split(/[\n\s\t,;，；、]/);
        console.log(text1);
        text1=uniqArray(text1);
        console.log(text1);
        var p = document.createElement("p");
        for(var i=0;i<text1.length;i++)
            p.innerHTML= p.innerHTML+text1[i]+" ";
        document.getElementById("level2").appendChild(p);
    }
}
function deletenode1(){
    var a=document.getElementById("level2");
    var x=a.removeChild( a.childNodes[0]);
    x=null;
}
function level3_show() {
    var text =  document.getElementById("text3").value;
    //var text1=text.split(/[\n\s\t,;，；、]/);
    var text1=text.split(",");
    console.log(text1.length);
    console.log(text1);
    if(text1.length=="")
    {   document.getElementById("warning").innerHTML = "input at least one favor!";
        document.getElementById("warning").style.color="red";
    }
   else if(text1.length>0&&text1.length<=10)
    {
        document.getElementById("warning").innerHTML = "";
        text1=uniqArray(text1);
        for(var i = 0;i<text1.length;i++) {
            var favor = document.createElement("input");
            favor.type = "checkbox";
            favor.id = "favor" + i;
            var label = document.createElement("label");
            label.for = favor.id;
            label.innerHTML =text1[i] + "<br />";
            document.getElementById("level3").appendChild(favor);
            document.getElementById("level3").appendChild(label);
        }
    }
    else
    {
        document.getElementById("warning").innerHTML = "less than 10 favor!";
        document.getElementById("warning").style.color="red";
    }
}
function deletenode2(){
    var a=document.getElementById("level3");
    var x=a.removeChild( a.childNodes[0]);
    x=null;
}
