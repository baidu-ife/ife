// JavaScript Document
window.onload = function(){
	var search1 = $("#text");
	var keyindex=-1;
	var index = $("li");
	var onkey = $(".on");

	addEvent(search1,'keydown',function(){
		$("#suggest").style.left = getLeft(search1)+'px';
		$("#suggest").style.top = getTop(search1)+30+'px';
		$("#suggest").style.display = 'block';
	});	

	addkeyEvent(search1,keyup,38);
	addkeyEvent(search1,keydown,40);
	
	
	for(var i=0;i<index.length;i++){
		index[i].onclick = function(){
			$("#text").value = this.innerText;
			$("#suggest").style.display = 'none';
			this.className='off';
			keyindex=-1;
		}
		
		index[i].onmouseover = function(){
			this.className = 'on';
		}
		
		index[i].onmouseout = function(){
			this.className = 'off';
		}
	}
	function $(str){
		if(/^[a-z]{1,10}$/.test(str)){
			return document.getElementsByTagName(str); 
			}
		else{
			switch(str[0]){
			case "#":
				return document.getElementById(str.slice(1));
			case ".":
				return document.getElementsByClassName(str.slice(1));
			default: return;
			}
		}
	}
	function addEvent(ele,event,fn){
		var ele = ele||document;
		if(ele.addEventListener){
			
			ele.addEventListener(event,fn,false);
		}
		else if(ele.attachEvent){
			ele.attachEvent('on'+event,fn);
		}
		else{
			ele['on'+event]=fn;
		}
	}
	function addkeyEvent(element,fn,num) { 
		var addenter = function(ev) {
			var ev = ev || event;
			if (ev.keyCode == num) { 
				fn();
			}
		}
		addEvent(element, 'keydown', addenter); 
	}
	function getTop(e){ 
		var offset=e.offsetTop; 
		if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
		return offset; 
	} 
	function getLeft(e){ 
		var offset=e.offsetLeft; 
		if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
		return offset; 
	} 
	function keyup(){
		if(keyindex>-1) {index[keyindex].className = 'off';}
		
		if(keyindex == 0||keyindex == -1)
			keyindex = index.length-1;
		else keyindex = keyindex-1;
	
		index[keyindex].className = 'on';
		
	}
	function keydown(){
		if(keyindex>-1) {index[keyindex].className = 'off';}
		
		if(keyindex == index.length-1)
			keyindex = 0;
		else keyindex = keyindex+1;
	
		index[keyindex].className = 'on';
	}
}
