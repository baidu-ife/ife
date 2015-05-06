var submit=$('#submit');
var parent = $('#two');
function removeChildren(){
	var children1 = parent.getElementsByTagName('input');
	var children2 = parent.getElementsByTagName('label');
	if(children1!=null){
		while(children1.length>0){
			parent.removeChild(children1[0]);
			if(children2!=null){
				while(children2.length>0){
					parent.removeChild(children2[0]);
				}
			}
			
		}										
	}
}
submit.onclick=function(e){
	removeChildren();
	var str=getValue($('#hobbies'));
var allhobbies;
console.log(str);
function splitAll(){
	var result=str.replace(/ /g,',');
	result=result.replace(/　/g,',');
	result=result.replace(/，/g,',');
	 result=result.replace(/、/g,',');
	 result=result.replace(/;/g,',');
	 result=result.replace(/\r\n/g,',');
	 allhobbies=result.split(',');
}
console.log(allhobbies);
function listHobbies(){
	
	var result;
		//拆分
		splitAll();
		//去重
		console.log(allhobbies.length);
		if(allhobbies.length<11&&allhobbies.length>-1){
			//alert('a');
			result=uniqArray(allhobbies);
			console.log(result);
			for(var i=0;i<result.length;i++){
				var para = document.createElement('input');
				para.type='checkbox';
				var label = document.createElement('label');
				var node =  document.createTextNode(result[i]);
				label.appendChild(node);
				//console.log(label);
				//para.appendChild(label);
				console.log(para);
				
				parent.appendChild(para);
				parent.appendChild(label);
				console.log(parent);
			}
		}else{
			document.getElementById('error').style.display='block';
			
		}

		
	}
	listHobbies();

}

 	

	



