var container = document.getElementById('container');
var lis = document.getElementsByTagName('li');
var imgs = document.getElementsByTagName('img');
var index = 0;
for(var i=0; i<lis.length; i++){
	lis[i].index = i;
	lis[i].onclick = function(){
	index = this.index;
	changeImag( this.index );
	};
}
function changeImag(idx){
	for(var i=0; i<lis.length; i++){
		lis[i].className = "";
		imgs[i].className = "";
	}			
	lis[idx].className = "selected";
	imgs[idx].className = "selected";
	//setTimeout(timer(idx),1000);
}

setInterval(function(){
	if(index<lis.length){
		changeImag(index);
		index++;
		
	}else{
		index = 0;

	}
	
},2000);
			
			
			