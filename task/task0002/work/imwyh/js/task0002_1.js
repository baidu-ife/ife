function  task1(){
	var h = uniqArray(document.getElementById("hobby").value.split(/[\n\s,，、;；]/));
	if(h[0]==""||h.length>10) {result.innerHTML="输入非法";return;}
    result.innerHTML = "";
    for (x in h){
        var a = document.createElement("p");
    	a.innerHTML=h[x];
    	document.getElementById("result").appendChild(a);
    }
}

function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false); 
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener); 
    } else {
        element["on" + event] = listener; 
    } 
}

function uniqArray(arr) {
    if(arr.length==1)return arr;
    arr.sort();
    var arrt = []; 
    arrt.push(arr[0]);
    for(var x=0; ++x<arr.length;){
        if(arr[x]!=arr[x+1]) arrt.push(arr[x]);
    }
    return arrt;
}

addEvent(document.getElementById("submit"),"click",task1);