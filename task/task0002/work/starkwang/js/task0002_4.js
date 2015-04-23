addEvent($("#search"),"keyup",function(){
	var str = $("#search").value;
	$("#suggestbox").innerHTML = "";
	ajax(
		'http://localhost:1337', 
		{
			type:"GET",
			data: {
				name: str
			},
			onsuccess: function (responseText, xhr) {
        				var suggest_template = "<div class=\"suggest\">{{suggest}}</div>";
        				var arr = responseText.split(",");
        				console.log(arr);
        				arr.length = arr.length - 1;
        				each(arr,function(item,index){
        					$("#suggestbox").innerHTML = $("#suggestbox").innerHTML + suggest_template.replace(/{{suggest}}/g,item);
        				})
        			}
        		}
	);
});

addEvent($("body"),"keyup",function(event){
	var e = event || window.event;
	if(e && e.keycode==13){
	console.log("aa");		
	}

})