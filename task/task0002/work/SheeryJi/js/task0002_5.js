/**
 * @author Administrator
 */
addEvent(window,"load",function(){
	var oSubs=$(".sub");
	var parents=$(".contain");
	//辅助函数，移除节点，添加节点
	for(var i=0;i<oSubs.length;i++){
		addEvent(oSubs[i],"mousedown",function(e){
			this.style.opacity=0.6;
			this.style.left=(e.target.offsetLeft)+"px";
			this.style.top=(e.target.offsetTop)+"px";
			this.style.position="absolute";
			var rLeft=e.clientX-e.target.offsetLeft;
			var rTop=e.clientY-e.target.offsetTop;
			var obj=this;
			document.onmousemove=function(e){
				obj.style.left=(e.clientX-rLeft)+"px";
				obj.style.top=(e.clientY-rTop)+"px";
			};
			document.onmouseup=function(e){
				obj.style.opacity=1;
				obj.style.position="inherit";
				var finalLeft=((obj.style.left).replace("px",""))*1+100;
				for(var j=0;j<parents.length;j++){
					var comleft=parents[j].offsetLeft*1;
					if(finalLeft>=comleft&&(finalLeft<=comleft+200)){
						parents[j].appendChild(obj.parentNode.removeChild(obj));
					}
				}
				document.onmousemove=null;
  				document.onmouseup=null;
			};
		});
	}
});