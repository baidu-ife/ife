delegateEvent($("li"), "li", "mousedown", function(e){//按下鼠标
	holder.position = getPosition(this);
	holder.tag.style.top = holder.position.y+"px";
	holder.tag.style.left = holder.position.x+"px";
	holder.tag.style.display = "block";
	holder.Moving = true;
	holder.MovingItem = this.innerHTML;
	holder.tag.innerHTML = this.innerHTML;
	holder.msposition.y = e.y - holder.position.y;
	holder.msposition.x = e.x - holder.position.x;
});

$.on(document, "mousemove", function(e){//改变holder位置
	if(holder.Moving) {
		var y = e.y - holder.msposition.y;
		var x = e.x - holder.msposition.x;
		holder.tag.style.top =  y + "px";
		holder.tag.style.left = x + "px";
	}
});

delegateEvent($("li"), "li", "mousemove", function(){
	if(holder.Moving) holder.InsItem = this.id;
});

delegateEvent(document.body, "ul", "mousemove", function(){
	if(holder.Moving) holder.InsBox = this.id;
});

delegateEvent($("li"), "li", "mouseup", function(){
	del($("#item"+holder.tag.innerHTML));
	ins = document.createElement("li");
	ins.id = "item" + holder.tag.innerHTML;
	ins.innerHTML = holder.tag.innerHTML;
	this.parentNode.insertBefore(ins,this);
	holder.Moving = false;
	holder.tag.style.display = "none";
});

delegateEvent($("ul"), "ul", "mouseup", function(){
	del($("#item"+holder.tag.innerHTML));
	ins = document.createElement("li");
	ins.id = "item" + holder.tag.innerHTML;
	ins.innerHTML = holder.tag.innerHTML;
	this.appendChild(ins);
	holder.Moving = false;
	holder.tag.style.display = "none";
});

delegateEvent(document, "#main", "mouseup", function(){
	holder.Moving = false;
	holder.tag.style.display = "none";
});

function del(a){
	a.parentNode.removeChild(a);
}

var holder = [];
holder.InsItem = "item0";
holder.MovingItem = "item0";
holder.InsBox = "box0";
holder.Moving = false;
holder.position = {};
holder.tag = $("#holder");
holder.msposition = {};