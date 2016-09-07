
var input_button=$("#input-btn");
addEvent(input_button,"click",function(){
	
	var input_text=$(".input-text");
	var warming=$("#prompt");
	var listDiv=$(".list");
	var value=trim(input_text.value);
	warming.style.display="none";
	if(value==""){
		warming.style.display="block";
		listDiv.style.display="none";
		warming.innerHTML="不能超过10或者不能不输入";
		
	}else{
		console.log(value);
	//var pattern=//;
	var valueArr=value.split(/\n|\s+|,|，|;|；|、/);
	valueArr=uniqArray(valueArr);
	console.log(valueArr);
	var str="";
	
	if(valueArr.length<=10){
		for(var i=0;i<valueArr.length;i++){
		str+="<input type='checkbox'>"+valueArr[i]+"<br>";
		}
		listDiv.style.display="block";
		listDiv.innerHTML=str;
	}else {
		warming.style.display="block";
		listDiv.style.display="none";
		warming.innerHTML="不能超过10或者不能不输入";
	}
	}
	
	
	
});