function item_hover(){
	$("#selecter li").hover(function(){
		$(".selected").removeClass("selected");
		$(this).toggleClass("selected");
	}).click(function(){
		$("#text").val($(this).text());
		$("#selecter").css("display","none");
		//location.href="http://www.baidu.com/s?wd="+$(this).text();
	})
}

$(document).ready(function(){item_hover();});//因为删除元素要重新绑定事件

$("#text").focus(function(){
	if ($(this).val()!="") refresh();
}).keydown(function(e){
	if (e.keyCode=="38") select_control(false);
	if (e.keyCode=="40") select_control(true);
	if ((e.keyCode==8)||(48<=e.keyCode&&e.keyCode<57)||(65<=e.keyCode&&e.keyCode<90)||(96<=e.keyCode&&e.keyCode<105)) refresh();
	if ($(this).val()!="") $("#selecter").css("display","block");
	if ($(this).val()=="") $("#selecter").css("display","none");
	//if (true) {location.href="http://www.baidu.com/s?wd="+$(this).text();};
}).blur(function(){
	setTimeout('$("#selecter").css("display","none")',230);
})

function select_control(drc){
	if($("#selecter li").length==0) return;
	var focus_now = $(".selected");
	if (focus_now.length == 0){
		if(drc) $("#selecter li").eq(0).toggleClass("selected");
		else $("#selecter >li:last-child").toggleClass("selected");
	}
	else {
		focus_now.eq(0).toggleClass("selected");
		if (drc){
			if (focus_now.eq(0).next("li").length!=0) focus_now.eq(0).next("li").toggleClass("selected");
			else $("#selecter li").eq(0).toggleClass("selected");
		}else {
			if (focus_now.eq(0).prev("li").length!=0) focus_now.eq(0).prev("li").toggleClass("selected");
			else $("#selecter >li:last-child").toggleClass("selected");
		}
	}
	$("#text").val($(".selected").eq(0).text());
}

function refresh(){
	$.ajax({
        dataType:"jsonp",
        success:function(d){
        	$("#selecter li").unbind()
        	$("#selecter").empty();
        	for(x in d.data){
        		$("#selecter").append("<li>"+d.data[x]+"</li>")
        	}
        	item_hover();
        	if(d.data.length!=0&&$(text).val()!="") $("#selecter").css("display","block");
        	else $("#selecter").css("display","none");
        },
        type:"GET",
        url:"http://api.wedc.cc/baidu_ife/task0002_4.php/?callback=?"
    });
}