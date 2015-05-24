 var h = [];
function click(){
    var div=document.getElementById("document");
    var te = document.getElementById("input");
    var tishi = document.getElementById("tishi");
    var text = te.value; 
    var n = 0, i = 0;
    var temp = '';
    while(i<text.length){
        while((text[i] != ';'&&text[i] != ','&&text[i] != '、'
            &&text[i] != ' '&&text[i] != '\n'&&text[i] != '，'
            &&text[i] != ' ')
            &&i<text.length){
            temp += text[i];
            i++;
        }
        h[n] = temp;
        temp = '';
        n++;
        i++;
    }

    for(i = 0; i<n; i++){
        if(h[i] == ''){
            h.splice(i,1);
            n--;
            i--;
        }
    } 
    n = h.length; 
    for(i = 0; i<n; i++){
        for(var j = 0; j<i; j++){
            if(h[i] == h[j]){
                h.splice(i,1);
                n--;
                i--;
                continue;
            }
        }
    }
    alert(h.length);
    n = h.length; 
    if(n>=10||n<=0){
        
        tishi.innerHTML = "输入错误!";
        return 0;
    }
    tishi.innerHTML = "";
    alert(h);
    for(i = 0; i<n; i++){
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("label",h[i]);
        div.appendChild(checkBox);
    }
    // alert(pp.id);
}
var btn = document.getElementById("but");
btn.addEventListener("click", click, false);
