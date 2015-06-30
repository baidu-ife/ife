
var lists = {
	"today":{  //today  week
      "listName": "今日清单列表", 
      tasks:[
      {
      	"taskName": "洗呀洗呀洗澡澡",
      	"createTime": "2015-06-03",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "睡呀么睡大觉",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "睡前刷牙",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "上床睡觉",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "洗呀洗呀洗衣服",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "completed"
      }
      ]
    },
    "week":{  //today  week
      "listName": "本周清单列表", 
      tasks:[
      {
      	"taskName": "洗呀洗呀洗澡澡",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "睡呀么睡大觉",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "睡前刷牙",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "上床睡觉",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "洗呀洗呀洗衣服",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "completed"
      },
      {
      	"taskName": "洗呀洗呀洗衣服1",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "completed"
      }
      ]
    },
    "list_shopping":{  //today  week
      "listName": "看来是要买点什么", 
      tasks:[
      {
      	"taskName": "买个杯子",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "上上网",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "玩会游戏",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "买火车票",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "算了，洗洗睡吧",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "completed"
      },
      {
      	"taskName": "算了，洗洗睡吧1",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "completed"
      }
      ]
    },
    "list_work":{  //today  week
      "listName": "吃饭", 
      tasks:[
      {
      	"taskName": "学习js",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "todolist项目进展",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "看看书",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "睡觉",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "uncomplete"
      },
      {
      	"taskName": "还是洗洗睡吧",
      	"createTime": "2015-06-05",
     	"updateTime": "",
      	"deadTIme": "2015-06-05",
      	"completeState": "completed"
      }
      ]
    },
};

/*
	*添加文档加载完成时执行的函数
	*@func——新添加的执行函数
*/
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

/*
	*函数功能————渲染从后台获取到的清单
	*lists——从后台获取到的lists
*/ 
function prepareList(lists){
	//获取清单列表
	var list_lists = document.getElementById("list_lists");
	//为清单列表框注册函数,如果点击的为li
	Util.delegate(list_lists,"li","click",function(target){
			//获取选中的清单项
			var list_lists_li_selected = document.getElementById("list_lists").getElementsByClassName("list_selected")[0];
			if(list_lists_li_selected){
				list_lists_li_selected.removeAttribute("class");
			}
			target.setAttribute("class","list_selected");
			prepareTask(lists);
		});
	//如果点击的a标签
	Util.delegate(list_lists,"a","click",function(target){
			//获取选中的清单项
			var list_lists_li_selected = document.getElementById("list_lists").getElementsByClassName("list_selected")[0];
			if(list_lists_li_selected){
				list_lists_li_selected.removeAttribute("class");
			}
			target.parentNode.setAttribute("class","list_selected");
			prepareTask(lists);
		});
	//为清单列表框注册函数,如果点击的span标签
	Util.delegate(list_lists,"span","click",function(target){
			//获取选中的清单项
			var list_lists_li_selected = document.getElementById("list_lists").getElementsByClassName("list_selected")[0];
			if(list_lists_li_selected){
				list_lists_li_selected.removeAttribute("class");
			}
			target.parentNode.setAttribute("class","list_selected");
			prepareTask(lists);
		});
	for(var i in lists){
		createNewList(i,lists[i].listName);
	}
	/*
		*函数功能————创建新的清单
		*参数
			*@name————新清单名称
	*/
	function createNewList(listId,listName){
		var list_lists = document.getElementById("list_lists");
		var new_list = document.createElement("li");
		new_list.setAttribute("id",listId);
		//默认显示今日清单列表
		if(listId == "today"){
			new_list.setAttribute("class","list_selected");
		}
		var new_list_a = document.createElement("a");
		var new_list_name = document.createTextNode(listName);
		new_list_a.appendChild(new_list_name);
		var new_list_edit = document.createElement("span");
		new_list_edit.setAttribute("class","edit_list");
		new_list.appendChild(new_list_a);
		new_list.appendChild(new_list_edit);
		list_lists.appendChild(new_list);
		
	}
}
/*
	*函数功能————渲染对应清单的任务列表
	*@lists——从后台获取到的lists
*/ 
function prepareTask(lists){
	if(!document.getElementsByClassName("list_selected")[0]) return false;
	//获取选中的清单名称
	var list_selected_listId = document.getElementsByClassName("list_selected")[0].getAttribute("id");
	if(lists[list_selected_listId]){
		var selected_task = lists[list_selected_listId].tasks;
	}
	//清空未完成列表
	document.getElementById("tasklist").innerHTML = "";
	//清空已完成列表
	document.getElementById("completetask").innerHTML = "";	
	for(var i in selected_task){
		createNewTask(selected_task[i]);
	}
	/*
		*函数功能————创建新的任务
		*@taskId———任务编号
		*@taskName——任务名称
		*@whichList——标识哪个列表，已完成列表还是未完成列表（参数为uncomplete/completed）
	*/
	function createNewTask(task){
		var taskId = task.taskId;
		var taskName = task.taskName;
		var taskTime = task.deadTIme;
		var whichList = task.completeState;
		//根据列表类型获取任务列表
		if(whichList == "uncomplete"){
			var tasklists = document.getElementById("tasklist");
		}else{
			var tasklists = document.getElementById("completetask");	
		}
		var new_task = document.createElement("li");
		if(taskId){
			new_task.setAttribute("id",taskId);
		}
		
		//var new_task_a = document.createElement("a");
		var new_task_checkbox = document.createElement("span");
		new_task_checkbox.setAttribute("class","checkbox");

		var new_task_span = document.createElement("span");
		new_task_span.setAttribute("class","taskname");
		var new_task_name = document.createTextNode(taskName);
		new_task_span.appendChild(new_task_name);

		var new_task_time = document.createElement("time");
		new_task_time.setAttribute("class","tasktime");
		var new_task_time_text = document.createTextNode(taskTime);
		new_task_time.appendChild(new_task_time_text);
		new_task.appendChild(new_task_checkbox);
		new_task.appendChild(new_task_span);
		new_task.appendChild(new_task_time);
		tasklists.appendChild(new_task);

		
	}
}
/*
	*定义添加清单（list）函数 
	*1.点击添加时，打开添加清单对话框
	*2.点击取消关闭对话框
	*3.点击确认提交对话框
*/
function addAndEditList(){
	var list_lists = document.getElementById("list_lists");
	//获取添加清单元素，并添加点击事件
	var add_list = document.getElementById("add_list");
	Util.addEvent(add_list,"click",cilckOnAddList);
	//获取添加清单输入框
	var add_list_dialog = document.getElementById("add_list_dialog");
	//获取添加清单对话框下的取消添加按钮,并添加点击事件
	var add_list_cancel = add_list_dialog.getElementsByClassName("full close")[0];
	Util.addEvent(add_list_cancel,"click",clickOnAddCancel);
	//获取添加清单对话框下的提交添加按钮
	var add_list_submit = add_list_dialog.getElementsByClassName("full submit")[0];
	Util.addEvent(add_list_submit,"click",clickOnAddSubmit);
	//获取输入框
	var add_list_input = add_list_dialog.getElementsByClassName("login_input")[0];

	//获取所有清单项
	var list_lists_li = document.getElementById("list_lists").getElementsByTagName("li");
	
	//为所有可编辑清单添加点击编辑弹出编辑对话框事件
	var list_lists_edit = document.getElementById("list_lists").getElementsByClassName("edit_list");
	var edit_list_dialog = document.getElementById("edit_list_dialog");
	//获取编辑清单对话框下的取消编辑按钮，并注册单击事件
	var edit_list_cancel = edit_list_dialog.getElementsByClassName("full close")[0];
	Util.addEvent(edit_list_cancel,"click",clickOnEditCancel);	
	//获取编辑清单对话框下的提交编辑按钮，并注册单击事件
	var edit_list_submit = edit_list_dialog.getElementsByClassName("full submit")[0];
	Util.addEvent(edit_list_submit,"click",clickOnEditSubmit);
	//获取编辑清单对话框下的删除按钮，并注册单击事件
	var edit_list_delete = edit_list_dialog.getElementsByClassName("full delete")[0];
	Util.addEvent(edit_list_delete,"click",clickOnEditDelete);
	//获取输入框
	var edit_list_input = edit_list_dialog.getElementsByClassName("login_input")[0];
	//为所有清单添加点击编辑，打开编辑窗口
	Util.delegate(list_lists,"span","click",function(target){
		cilckOnEditList(target);
	});
	
	//定义一个当前正在编辑的清单
	var edit_list;
	/*
		*点击添加清单时的函数
	*/
	function cilckOnAddList(){
		//显示添加清单对话框
		add_list_dialog.style.display="block";
		//聚焦到输入框
		add_list_input.focus();
	}
	/*
		*点击保存清单时调用的函数
	*/
	function clickOnAddSubmit(){
		var list_name = add_list_input.value;
		createNewList(list_name);
		//调用取消函数，即清空输入框内容，隐藏对话框
		clickOnAddCancel();
	}
	/*
		*点击取消添加清单时的函数
	*/
	function clickOnAddCancel(){
		//清空输入框内容
		add_list_input.value = "";
		//隐藏添加清单对话框
		add_list_dialog.style.display="none";

	}
	/*
		*函数功能————创建新的清单
		*参数
			*@name————新清单名称
	*/
	function createNewList(name){
		var list_lists = document.getElementById("list_lists");
		var new_list = document.createElement("li");
		var new_list_a = document.createElement("a");
		var new_list_name = document.createTextNode(name);
		new_list_a.appendChild(new_list_name);
		var new_list_edit = document.createElement("span");
		new_list_edit.setAttribute("class","edit_list");
		new_list.appendChild(new_list_a);
		new_list.appendChild(new_list_edit);
		list_lists.appendChild(new_list);
	}

	/*
		*点击编辑清单时的函数
	*/
	function cilckOnEditList(target){
		console.log(target);
		//显示添加清单对话框
		edit_list_dialog.style.display="block";
		edit_list = target.previousSibling;//在函数外部声明了该变量，可以在其他函数内使用
		var event_list_name = edit_list.innerHTML;
		//将点击的清单名称输入到输入框
		edit_list_input.value = event_list_name;
		//聚焦到输入框
		edit_list_input.focus();
	}
	/*
		*点击保存清单时调用的函数
		*@edit_list————正在编辑的列表
	*/
	function clickOnEditSubmit(){
		var list_name = edit_list_input.value;
		updateList(edit_list,list_name);
		//调用取消函数，即清空输入框内容，隐藏对话框
		clickOnEditCancel();
	}
	/*
		*点击删除清单时调用的函数
		*@edit_list————正在编辑的列表
	*/
	function clickOnEditDelete(){
		//调用取消函数，即清空输入框内容，隐藏对话框
		clickOnEditCancel();
		//移除正在编辑的清单
		console.log(edit_list);
		edit_list.parentNode.parentNode.removeChild(edit_list.parentNode);
	}
	/*
		*点击取消添加清单时的函数
	*/
	function clickOnEditCancel(){
		//清空输入框内容
		edit_list_input.value = "";
		//隐藏添加清单对话框
		edit_list_dialog.style.display="none";

	}
	/*
		*函数功能————更新清单名称
		*@edit_list————正在编辑的清单
		*@name————清单名称的更新值
	*/
	function updateList(edit_list,name){
		edit_list.innerHTML = name;
	}
}
function prepareMiddle() {
    var newtask = document.getElementById("newtask");
    var datetime = document.getElementById("taskdate");
    var details = document.getElementById("details");
    var tasklist = document.getElementById("tasklist");
    var completetask = document.getElementById("completetask");


    Util.delegate(newtask, 'input', 'change', function (target) {
        var taskname = newtask.value;
        var taskdate = datetime.value;
        var newlistitem = document.createElement("li");
        newlistitem.innerHTML = "<span class='checkbox'></span><span class='taskname'>" + taskname + "</span><time class='tasktime'>" + taskdate + "</time>";
        newtask.value = "";
        datetime.value = "";
        var toinsertbefore = (tasklist.children.length > 0) ? tasklist.childNodes[0] : null;
        tasklist.insertBefore(newlistitem, toinsertbefore);
    });


    Util.delegate(tasklist, 'span', 'click', function (target) {
        if(target.className != "taskname"){
            completetask.appendChild(target.parentNode);
        }
    });
    

    Util.delegate(completetask, 'span', 'click', function (target) {
        if(target.className != "taskname"){
            tasklist.appendChild(target.parentNode);
        }
    });
};

prepareList(lists);
prepareTask(lists);
addLoadEvent(addAndEditList);
addLoadEvent(prepareMiddle);