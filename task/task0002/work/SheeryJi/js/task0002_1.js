/**
 * @author Js
 */
//小练习一     第一阶段
addEvent(window,"load",function(){
	var oHabitBtn=$("#habitButton");
	var oHabitTxt=$("#habitText");
	var oHabit=$("#habit");
	addClickEvent(oHabitBtn,function(){
	var habits=oHabitTxt.value.split(",");
	habits=uniqArray(habits);
	for(var i=0;i<habits.length;i++){
		habits[i]=trim(habits[i]);
	}
	var habit=document.createElement("p");
	habit.innerHTML=habits.join(" ");
	oHabit.appendChild(habit);
	});
});
//小练习一     第二阶段
addEvent(window,"load",function(){
	var oHabitBtn=$("#habitButton1");
	var oHabitTxt=$("#habitText1");
	var oHabit=$("#habit1");
	addClickEvent(oHabitBtn,function(){
	var habits=oHabitTxt.value.replace("\n",",").replace(" ",",").replace("　",",").replace(",",",").replace("，",",").replace("、",",").replace(";",",").replace("；",",").split(",");
	habits=uniqArray(habits);
	for(var i=0;i<habits.length;i++){
		habits[i]=trim(habits[i]);
	}
	var habit=document.createElement("p");
	habit.innerHTML=habits.join(" ");
	oHabit.appendChild(habit);
	});
});
//小练习一     第三阶段
addEvent(window,"load",function(){
	var oHabitBtn=$("#habitButton2");
	var oHabitTxt=$("#habitText2");
	var oHabit=$("#habit2");
	var oHabitMessage=$("#habitmessage");
	var printHabit=function(){
		    var habits=oHabitTxt.value.replace("\n",",").replace(" ",",").replace("　",",").replace(",",",").replace("，",",").replace("、",",").replace(";",",").replace("；",",").split(",");
			habits=uniqArray(habits);
			for(var i=0;i<habits.length;i++){
				habits[i]=trim(habits[i]);
			}
			var habit=document.createElement("p");
			habit.innerHTML=habits.join(" ");
			oHabit.appendChild(habit);
	 };
	addEvent(oHabitTxt,"keyup",function(){
		var vvalue=oHabitTxt.value.trim();
		habits=vvalue.replace("\n",",").replace(" ",",").replace("　",",").replace(",",",").replace("，",",").replace("、",",").replace(";",",").replace("；",",").split(",");
		habits=uniqArray(habits);
		var temp=habits.join(",").split(",");
		//console.log(temp.length);
		var message=document.createElement("span");
		if(vvalue==""){
			message.innerHTML="输入内容不能为空";
			message.setAttribute("id","spemessage");
			oHabitMessage.appendChild(message);
			removeEvent(oHabitBtn,"click",printHabit);
		}else if(temp.length>10){
			if($("#spemessage")){
				oHabitMessage.removeChild($("#spemessage"));
			}
			message.innerHTML="输入爱好不能超过10个";
			message.setAttribute("id","spemessage");
			oHabitMessage.appendChild(message);
			removeEvent(oHabitBtn,"click",printHabit);
		}else{
			oHabitMessage.removeChild($("#spemessage"));
			addClickEvent(oHabitBtn,printHabit);
	}
			
	});
	
});
