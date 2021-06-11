// JavaScript Document

function savehobbit() {
	var originaldata = document.getElementById("hobbits").value;
	var result=new Array();
	var num1=0,num2=0;
	for(var i=0; i<originaldata.length; i++){
		if(originaldata[i]==","){
			if(i==0 || i==num1){num1=i+1;}
			else{
			temp=originaldata.slice(num1,i);
			result[num2]=temp;
			num1=i+1;
			num2=num2+1;}
		}
		else if(i==originaldata.length-1){
			result[num2]=originaldata.slice(num1);}
		else{continue;}
	}
	result=uniqArray(result);
	document.getElementById("showresult").innerHTML =result;
}

function uniqArray(arr) {
    // your implement
	var key1, key2, temp, tflag;
	var result=new Array();
	var tflag = false;
	var key3=0;
	for(key1 in arr){
		tflag = false;
		
		if(key1==0){
			result[0]=arr[key1];
			continue;
			}
		else{
			for(key2 in result){
				temp=arr[key1];
				if(temp==result[key2]){
					tflag = true;
					break;
				}else{
					tflag = false;
				}
			}
		}
		
		if(tflag == true){continue;}
		else{
			key3=key3+1;
			result[key3]=arr[key1];
			}
    }
    return result;
	
}

function savehobbit2() {
	var originaldata = document.getElementById("hobbits2").value;
	var result=new Array();
	var num1=0,num2=0;
	for(var i=0; i<originaldata.length; i++){
		switch(originaldata[i]){
		case ";":
		case "，":
		case ",":
		case " ":
		case " ":
		case "、":
		case "\n":
		case ",":{
			if(i==0 || i==num1){num1=i+1;}
			else{
			temp=originaldata.slice(num1,i);
			result[num2]=temp;
			num1=i+1;
			num2=num2+1;
			break;}
		}
		default:{
			if(i==originaldata.length-1){
				result[num2]=originaldata.slice(num1);}
			else{continue;}
		}
	}
	}
	result=uniqArray(result);
	document.getElementById("showresult2").innerHTML =result;
}

function savehobbit3() {
	var originaldata = document.getElementById("hobbits3").value;
	var result=new Array();
	var num1=0,num2=0;
	for(var i=0; i<originaldata.length; i++){
		switch(originaldata[i]){
		case ";":
		case "，":
		case ",":
		case " ":
		case " ":
		case "、":
		case "\n":
		case ",":{
			if(i==0 || i==num1){num1=i+1;}
			else{
			temp=originaldata.slice(num1,i);
			
			if(num2>9){
				document.getElementById("alert").innerHTML ="输入过多，请重新输入";
				return;}
			else{
			result[num2]=temp;
			num1=i+1;
			num2=num2+1;
			break;}
			}
		}
		default:{
		if(i==originaldata.length-1){
			result[num2]=originaldata.slice(num1);}
		else{continue;}
		}
	}
	}
	
	if((result.length==0)||(result[0]=="")){
		document.getElementById("alert").innerHTML ="不能为空，请重新输入";
		return;}
	else{
		result=uniqArray(result);
		document.getElementById("alert").innerHTML ="";}
		
	var addul=document.getElementById("checkbox")
	
	for(var k=0; k<result.length; k++){
		var arr=result[k];
        var checkBox=document.createElement("input");
        checkBox.setAttribute("type","checkbox");
		checkBox.setAttribute("checked", "true");

        var li=document.createElement("li");
		li.appendChild(document.createTextNode(arr));
        li.appendChild(checkBox);        

        addul.appendChild(li);      
		}
}