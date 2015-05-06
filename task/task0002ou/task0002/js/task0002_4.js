function getElements(id){
		return document.getElementById(id);
}
	
function getElementLeft(element){
	var left= element.offsetLeft;
	var parent = element.offsetParent;
	while(parent!=null){
		left+=parent.offsetLeft;
		parent=parent.offsetParent;
	}
	return left;

}
function getElementTop(element){
	var top= element.offsetTop;
	var parent = element.offsetParent;
	while(parent!=null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;

}
function removeChildren(element){
	var children = document.getElementsByTagName('li');
	if(children!=null){
		while(children.length>0){
			element.removeChild(children[0]);
		}										
	}
}
function each(arr,value){
	var ul=getElements('list');
	removeChildren(ul);
	if(value!=''){
		for(var i=0;i<arr.length;i++){
			var start=arr[i].indexOf(value);		
			//console.log(start);
			if(start==0){
				var li=document.createElement('li');
				var node=document.createTextNode(arr[i]);
				li.appendChild(node);
			
				ul.appendChild(li);
			
			}
		
		}

	}
	  
}
getElements('search').onkeyup=function(e){
	var value=getElements('search').value;
	console.log(value);
	var message = ['aa','abc','bc','cc','ad','ds'];
	//console.log(message);
	each(message,value);

	getElements('suggest').style.top=getElementTop(getElements('search'))+22+'px';
	getElements('suggest').style.left=getElementLeft(getElements('search'))+'px';
	getElements('suggest').style.position='absolute';
	getElements('suggest').style.display='block';
}
document.getElementsByTagName('li').onclick=function(e){
	alert('a');
}