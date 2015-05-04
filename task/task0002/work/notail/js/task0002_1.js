var btn = $("#btn");
$.click(btn,handle);
function handle(){
	var hobbies = $("#input1").value;
	if(!hobbies){
		$("#tap").innerHTML = "请输入兴趣爱好！";
		return;
	}
	$("#res").innerHTML = "";
	var res = trim(hobbies).split(/,|\s|;|:|、/gm);
	if(res.length > 10){
		$("#tap").innerHTML = "兴趣爱好数量不能大于10";
		return;
	}
	res = uniqArray3(res);
	each(res,out);
}
function out(item){
	$("#res").innerHTML += "<label><input type='checkbox'>"+trim(item) +"</label>";
}