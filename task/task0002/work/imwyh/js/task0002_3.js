var autoSetting = new Array();
autoSetting.acting = 0;
autoSetting.move = false;
autoSetting.state = 1;
autoSetting.time = 1300;
autoSetting.speed = 500;

$("#auto_time").change(function(){
	if($(this).val()>autoSetting.speed/900) autoSetting.time = $(this).val()*1000;
	clearTimeout(autoSetting.state);
	autoSetting.state = setTimeout("auto()",autoSetting.time);
})

$("#ctrl li").click(function(){
	clearTimeout(autoSetting.state);
	autoSetting.state = setTimeout("auto()",autoSetting.time);
	move($("#ctrl li").index(this));
})

function move(tgt){
	if(autoSetting.move) return;
	autoSetting.move = true;
	if(tgt > autoSetting.acting){
		if(tgt >= $("#pic li").length) tgt = 0;
		$("#ctrl li").eq(tgt).addClass("ctrl_selected");
		$("#ctrl li").eq(autoSetting.acting).removeClass("ctrl_selected");
		$("#pic li").eq(tgt).css("left","100%").animate({"left":0},autoSetting.speed,"linear");
		$("#pic li").eq(autoSetting.acting).css("left",0).animate({"left":"-100%"},autoSetting.speed,"linear",function(){autoSetting.move=false});
		autoSetting.acting = tgt;
	}
	if(tgt < autoSetting.acting){
		if(tgt < 0) tgt = $("#pic li").length-1;
		$("#ctrl li").eq(tgt).addClass("ctrl_selected");
		$("#ctrl li").eq(autoSetting.acting).removeClass("ctrl_selected");
		$("#pic li").eq(tgt).css("left","-100%").animate({"left":0},autoSetting.speed,"linear");
		$("#pic li").eq(autoSetting.acting).css("left",0).animate({"left":"100%"},autoSetting.speed,"linear",function(){autoSetting.move=false});
		autoSetting.acting = tgt;
	}
}

function auto(){
	autoSetting.state = setTimeout("auto()",autoSetting.time);
	if($("#pause").is(":checked")) {
		autoSetting.state = setTimeout("auto()",autoSetting.time);
		return;
	}
	if($("#reverse").is(":checked")) move(autoSetting.acting-1);
	else move(autoSetting.acting+1);
}
$(document).ready(function(){setTimeout("auto()",autoSetting.time);});