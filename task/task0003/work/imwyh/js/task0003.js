/* global $ */
//正在显示的任务
var contentShowing = [];
//正在显示的任务列表
var tableItems = [];
//最后点击的任务
var latestTag = "";
//编辑或者新增任务
var isEditing = false;

//读取数据
var data = eval('(' + unescape(localStorage.contentData||getCookie("contentData")|| "%7B%22taskItem%22%3A%5B%7B%22name%22%3A%22%u9ED8%u8BA4%u9879%u76EE%22%2C%22default%22%3A%22true%22%2C%22num%22%3A%221%22%2C%22subdirectory%22%3A%5B%7B%22name%22%3A%22%u9ED8%u8BA4%22%2C%22default%22%3A%22true%22%2C%22num%22%3A%221%22%2C%22content%22%3A%5B%7B%22id%22%3A%221430901099000%22%2C%22title%22%3A%22%u8FD9%u662F%u81EA%u52A8%u751F%u6210%u7684%u9879%u76EE%22%2C%22time%22%3A%2220150507%22%2C%22isComplete%22%3A%22false%22%2C%22main%22%3A%22%u8D76%u5DE5%u5E72%u4E86%u597D%u51E0%u5929%uFF0C%u8FDE%u7EED%u71AC%u4E86%u4E09%u5929%u7684%u591C%uFF0C%u5E73%u5747%u6BCF%u5929%u7761%u77205%u5C0F%u65F6%u4E0D%u5230%uFF0C%u4E5F%u7B97%u662F%u6709%u4E86%u4E2A%u4EA4%u4EE3%u3002%u80FD%u505A%u51FA%u6765%u975E%u5E38%u5F00%u5FC3%uFF0C%u5373%u4F7F%u5DF2%u7ECF%u8FD9%u4E48%u665A%u4E86%u3002%u5927%u4F53%u90FD%u5B9E%u73B0%u4E86%uFF0C%u81EA%u5DF1%u6D4B%u8BD5%u4F9D%u7136%u6709%u82E5%u5E72%u53EF%u4EE5%u5728%u4EA4%u4E92%u4E0A%u4F18%u5316%u7684%u5730%u65B9%u5427%u3002%u4F9D%u7136%u611F%u8C22%u767E%u5EA6%u63D0%u4F9B%u7684%u8FD9%u6B21%u673A%u4F1A%uFF1A%uFF09%22%7D%5D%7D%5D%7D%5D%2C%22num%22%3A%221%22%7D") + ')');

//转换时间
function changeDate(time) {
	var y = Math.floor(time/10000);
	var m = Math.floor((time-y*10000)/100);
	var d = time - y*10000 - m*100;
	return ""+y+"-"+m+"-"+d;
}

//刷新taskbox
data.__proto__.freshTaskItemBox = function() {
	var str = "";
	for(var x = 0; x < this.taskItem.length; x++) {
		str += '<li><p id="taskItem-' + x + '" class="task-item"><span class="folder"></span>' + this.taskItem[x].name + '&nbsp;(' + this.taskItem[x].num + ')';
		if(this.taskItem[x].default != "true") {
			str += '<span class="del">+</span>';
		}
		str += '</p><ul>';
		for(var y = 0; y < this.taskItem[x].subdirectory.length; y++) {
			str += '<li id="taskSub-' + x + '-' + y + '" class="task-sub"><span class="file"></span>' + this.taskItem[x].subdirectory[y].name + '&nbsp;(' + this.taskItem[x].subdirectory[y].num + ')';
			if(this.taskItem[x].subdirectory[y].default != "true") {
				str += '<span class="del">+</span>';
			}
			str += '</li>';
		}
		str += '</ul></li>';
	}
	$("#task-item-box").innerHTML = str;
	onTaskSub();
};

//刷新datebox
data.__proto__.freshDateBox = function(e) {
	$("#dateAll").className="selected";
	$("#dateHangIn").className="";
	$("#dateComplete").className="";
	//根据动作发出者记录相应任务
	if(arguments.length === 0) {
		var i = [];
		if(typeof(this.content) !== "undefined") {
			for(var x = 0; x < this.content.length; x++) {
				i.push(this.content[x]);
			}
		}
		else if(typeof(this.subdirectory) !== "undefined") {
			for(var y = 0; y < this.subdirectory.length; y++) {
				for(var x = 0; x < this.subdirectory[y].content.length; x++){
					i.push(this.subdirectory[y].content[x]);
				}
			}
		}
		else if(typeof(this.taskItem) !== "undefined") {
			for(var z = 0; z < this.taskItem.length; z++){
				for(var y = 0; y < this.taskItem[z].subdirectory.length; y++) {
					for(var x = 0; x < this.taskItem[z].subdirectory[y].content.length; x++){
						i.push(this.taskItem[z].subdirectory[y].content[x]);
					}
				}
			}
		}
		
		//按时间排序
		i = i.sort(function(a,b) {
			return a.time>b.time?1:-1;
		});
	}else {
		var i = tableItems;
	}
	
	//当前输出时间
	var tempDate = 0;
	
	//输出
	var str = "";
	for(var x = 0; x < i.length; x++) {
		if(arguments.length === 1){
			if(e === true && i[x].isComplete === "false") {
				continue;
			}
			if(e === false && i[x].isComplete === "true") {
				continue;
			}
		}
		if(tempDate != i[x].time) {
			tempDate = i[x].time;
			str += '<li class="date-item">' + changeDate(tempDate) + "</li>";
			str += '<li id="tableItem-' + i[x].id + '" class="table-item';
			if(i[x].isComplete === "true"){
				str += ' completed';
			}
			str += '">' + i[x].title + '<span class="delTI">+</span></li>';
		}
		else {
			str += '<li id="tableItem-' + i[x].id + '" class="table-item';
			if(i[x].isComplete === "true"){
				str += ' completed';
			}
			str += '">' + i[x].title + '<span class="delTI">+</span></li>';
		}
	}
	$("#date-item-box").innerHTML = str;
	tableItems = i;
	onTableItem();
};

data.del = function(tag) {
	if(tag.length === 1 && this.taskItem[tag[0]].default != "true"){
		this.taskItem.splice(tag[0],1);
	}else if(tag.length === 2 && this.taskItem[tag[0]].subdirectory[tag[1]].default != "true"){
		this.taskItem[tag[0]].subdirectory.splice(tag[1],1);
	}else if(tag.length === 3){
		this.taskItem[tag[0]].subdirectory[[tag[1]]].content.splice(tag[2],1);
	}
	data.updateNum();
	data.freshTaskItemBox();
	data.freshDateBox();
	saveData();
}

data.updateNum = function() {
	this.num = 0;
	for(var z = 0; z < this.taskItem.length; z++){
		this.taskItem[z].num = 0;
		for(var y = 0; y < this.taskItem[z].subdirectory.length; y++) {
			this.taskItem[z].subdirectory[y].num = this.taskItem[z].subdirectory[y].content.length;
			this.taskItem[z].num += this.taskItem[z].subdirectory[y].content.length;
		}
		this.num += this.taskItem[z].num;
	}
	$("#task-num").innerHTML = this.num;
	saveData();
}

data.freshTaskItemBox();
data.freshDateBox();
$("#task-num").innerHTML = data.num;

//所有任务
$.on($("#allTask"), "click", function(){
	latestTag = this.id;
	data.freshTaskItemBox();
	data.freshDateBox();
});

//新增分类
$.on($("#newSub"), "click", function(){
	var t = latestTag.split("-");
	for(var p = ""; true; alert("输入2到6个字符")){
		p = prompt("新增分类",p);
		if(p === null) {
			return ;
		}
		p = trim(p);
		if( p.length < 7 && p.length > 1) {
			break;
		}
	}
	tableItems = [];
	if(t.length === 1){
		var x = {
			name: p,
			num: 0,
			subdirectory: []
		}
		data.taskItem.push(x);
		latestTag = "taskItem-" + (data.taskItem.length - 1);
	}else if(t.length >= 2){
		var x = {
			name: p,
			num: 0,
			content: []
		}
		data.taskItem[t[1]].subdirectory.push(x);
		latestTag = "taskSub-" + t[1] + "-" + (data.taskItem[t[1]].subdirectory.length - 1);
	}
	data.freshTaskItemBox();
	data.freshDateBox(0);
	saveData();
});

//新增任务浮层
$.on($("#newTask"), "click", function(){
	var t = latestTag.split("-");
	t[1]? t[1]: t[1] = 0;
	t[2]? t[2]: t[2] = 0;
	if(typeof(data.taskItem[t[1]].subdirectory[t[2]])==="undefined") {
		alert("请先从左侧选择一个子分类");
		return;
	}
	var d = new Date();
	$("#cover-date").placeholder = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();	
	$("#cover").style.display = "inline";
	saveData();
});

//新增任务
$.on($("#cover-check"), "click", function(){
	var title = trim($("#cover-title").value);
	if(!title) {
		alert("输入标题");
		return;
	}else {
		if(title.length > 8) {
			alert("输入太多字符");
			return;
		}
	}
	dt = $("#cover-date").value.replace("-","/");
	if(dt != ""){
		var d = new Date(dt);
		if(isNaN(d.valueOf())) {
			alert("时间非法");
			return;
		};
	}else {
		var d = new Date();
	}
	var time = d.getFullYear()*10000 + d.getMonth()*100 + d.getDate();
	var main = $("#cover-main").value;
	if(isEditing){
		var x = {
			id: data.taskItem[contentShowing[1]].subdirectory[contentShowing[2]].content[contentShowing[3]].id,
			title: title,
			time: time,
			isComplete: data.taskItem[contentShowing[1]].subdirectory[contentShowing[2]].content[contentShowing[3]].isComplete,
			main: main
		}
		data.taskItem[contentShowing[1]].subdirectory[contentShowing[2]].content[contentShowing[3]] = x;
	}else {
		var x = {
			id: Date.parse(new Date()),
			title: title,
			time: time,
			isComplete: "false",
			main: main
		}
		tableItems.push(x);
		var t = latestTag.split("-");
		t[1]? t[1]: t[1] = 0;
		t[2]? t[2]: t[2] = 0;
		isEditing = false;
		data.taskItem[t[1]].subdirectory[t[2]].content.push(x);
		data.updateNum();
		data.freshTaskItemBox();
		data.freshDateBox(0);
	}
	$("#cover").style.display = "none";
	$("#cover-title").value = "";
	$("#cover-date").value = "";
	$("#cover-main").value = "";
	saveData();
});

//确认完成任务
$.on($("#complete"), "click", function(){
	if(!contentShowing.length) {
		return;
	}
	if(data.taskItem[contentShowing[1]].subdirectory[contentShowing[2]].content[contentShowing[3]].isComplete == "false") {
		data.taskItem[contentShowing[1]].subdirectory[contentShowing[2]].content[contentShowing[3]].isComplete = "true";
	}else {
		data.taskItem[contentShowing[1]].subdirectory[contentShowing[2]].content[contentShowing[3]].isComplete = "false";
	}
	data.freshTaskItemBox();
	data.freshDateBox(0);
	saveData();
});

//编辑任务
$.on($("#edit"), "click", function(){
	$("#cover-title").value = contentShowing[0].title;
	$("#cover-date").value = changeDate(contentShowing[0].time);
	$("#cover-main").value = contentShowing[0].main;
	$("#cover").style.display = "inline";
	isEditing = true;
});

function onTableItem(){
	each($(".table-item"),function(e){
		//打开任务
		delegateEvent(e, "li", "click", function(e){
			contentShowing = findContentPosition(this.id.split("-")[1]);
			$("#content-title").innerHTML = contentShowing[0].title;
			$("#content-date").innerHTML = changeDate(contentShowing[0].time);
			$("#content-main").innerHTML = contentShowing[0].main;
		});
	});
	each($(".delTI"),function(e){
		delegateEvent(e, "span", "click", function(e){
			if(confirm("确认要删除？")) {
				var t = findContentPosition(this.parentNode.id.split("-")[1]);
				data.del([t[1],t[2],t[3]]);
			}
		});
	});
}
function onTaskSub() {
	each($(".task-sub"),function(e){
		delegateEvent(e, "li", "click", function(e){
			var t = this.id.split("-");
			data.taskItem[t[1]].subdirectory[t[2]].freshDateBox();
			latestTag = this.id;
		});
	});
	each($(".del"),function(e){
		delegateEvent(e, "span", "click", function(e){
			if(confirm("确认要删除？")) {
				var t = this.parentNode.id.split("-");
				t.splice(0,1);
				data.del(t);
			}
		});
	});
	each($(".task-item"),function(e){
		delegateEvent(e, "p", "click", function(e){
			data.taskItem[(this.id.split("-")[1])].freshDateBox();
			latestTag = this.id;
		});
	});
}

//取消新增任务
$.on($("#cover-cancel"), "click", function(){
	$("#cover").style.display = "none";
});

//定位任务所在数组
function findContentPosition (id) {
	for(var z = 0; z < data.taskItem.length; z++){
		for(var y = 0; y < data.taskItem[z].subdirectory.length; y++) {
			for(var x = 0; x < data.taskItem[z].subdirectory[y].content.length; x++){
				if(data.taskItem[z].subdirectory[y].content[x].id == id){
					return [data.taskItem[z].subdirectory[y].content[x], z, y, x];
				}
			}
		}
	}
	return false;
}

$.on($("#dateAll"), "click", function(){
	data.freshDateBox(0);
	$("#dateAll").className="selected";
	$("#dateHangIn").className="";
	$("#dateComplete").className="";
})
$.on($("#dateHangIn"), "click", function(){
	data.freshDateBox(false);
	$("#dateAll").className="";
	$("#dateHangIn").className="selected";
	$("#dateComplete").className="";
})
$.on($("#dateComplete"), "click", function(){
	data.freshDateBox(true);
	$("#dateAll").className="";
	$("#dateHangIn").className="";
	$("#dateComplete").className="selected";
})

//保存数据
function saveData(){
	if(typeof(Storage) !== "undefined")
		{
			localStorage.contentData = escape(JSON.stringify(data));
	   }
	 else
	   {
		   setCookie("contentData",JSON.stringify(data),99);
	   }
}