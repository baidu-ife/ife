(function() {
	var _ID3_content,_ID123,_ID1_title,_ID2_title;
	var _newID1,_newID2,_newID3;
	var category_list_template = "<div class=\"category-item\" id=\"category-item-{{id}}\"><i class=\"iconfont\">&#xe6a1;</i>{{title}}<i class=\"iconfont delete\" act=\"deleteCategory\">&#xe69d;</i></div><div class=\"category-tasklist\" id=\"category-item-{{id}}-tasklist\"></div>";
	var category_list_total = 0;
	var category_list_task_template = "<div class=\"category-task\" id=\"task-{{parentID}}-{{taskID}}\"><i class=\"iconfont\">&#xe6a2;</i>{{content}}({{childtask-amount}})<i class=\"iconfont delete\" act=\"deleteTask\">&#xe69a;</i></div>";
	var child_task_template = "<div class=\"childtask\" id=\"{{ID3}}\">{{title}}</div>";
	var childtask_date_template = "<div id=\"childtask-{{date}}\"><div class=\"childtask-date\">{{date}}</div></div>";

	function addClass(ele,classname){
		ele.setAttribute("class",ele.getAttribute("class")+" "+classname);
	}

	function sortID3ByDate(id31,id32){
		var dateArr1 = _ID3_content[id31].date.split("-");
		var dateArr2 = _ID3_content[id32].date.split("-");
		if(dateArr1[0]>dateArr2[0]){
			return 1;
		}
		if(dateArr1[0] == dateArr2[0] && dateArr1[1] > dateArr2[1]){
			return 1;
		}
		if(dateArr1[0] == dateArr2[0] && dateArr1[1] == dateArr2[1] && dateArr1[2] > dateArr2[2]){
			return 1;
		}
		return -1;
	}

	function getChildTask(category_task_id) {
		//比如说task-1-1
		var childArray = [];
		category_id = category_task_id.split("-")[1];
		console.log(category_id);
		task_id = category_task_id.split("-")[2];
		console.log(_ID123[category_id]);
		for(item in _ID123[category_id]["task"][task_id]["childtask"]){
			console.log(item);
			childArray.push(item);
		}
		return childArray;
	}

	function init(){
		//ID3_content为ID3-内容表，ID123为ID1-ID2-ID3三层表，ID1_title、ID2_title为ID-标题表
		category_list_total = 0;
		if(localStorage.newID1 == undefined){
			_newID1 = 1;
			localStorage.newID1 = _newID1;
		}else{
			_newID1 = localStorage.newID1;
		}
		if(localStorage.newID2 == undefined){
			_newID2 = 1;
			localStorage.newID2 = _newID2;
		}else{
			_newID2 = localStorage.newID2;
		}
		if(localStorage.newID3 == undefined){
			_newID3 = 1;
			localStorage.newID3 = _newID3;
		}else{
			_newID3 = localStorage.newID3;
		}

		//读取LS，实例化_ID1_title
		if(localStorage.getItem("ID1_title")){
			if(localStorage.ID1_title){
				_ID1_title = JSON.parse(localStorage.ID1_title);
			}else{
				_ID1_title = {};
			}
		}else{
			localStorage.ID1_title = "";
			_ID1_title = {};
		}

		//读取LS，实例化_ID123
		if(localStorage.getItem("ID123")){
			if(localStorage.ID123){
				_ID123 = JSON.parse(localStorage.ID123);
			}else{
				_ID123 = {};
			}
		}else{
			localStorage.ID123 = "";
			_ID123 = {};
		}

		//读取LS，实例化_ID2_title
		if(localStorage.getItem("ID2_title")){
			if(localStorage.ID2_title){
				_ID2_title = JSON.parse(localStorage.ID2_title);
			}else{
				_ID2_title = {};
			}
		}else{
			localStorage.ID2_title = "";
			_ID2_title = {};
		}

		//读取LS，实例化_ID3_content
		if(localStorage.getItem("ID3_content")){
			if(localStorage.ID3_content){
				_ID3_content = JSON.parse(localStorage.ID3_content);
			}else{
				_ID3_content = {};
			}
		}else{
			localStorage.ID3_content = "";
			_ID3_content = {};
		}

		if(_ID1_title[1] == undefined){
			addID1("默认分类");
			addID2("默认子分类","1");
		}
		//初始化category
		document.getElementById("category-list").innerHTML = "";
		for(var item in _ID1_title){
			console.log(item);
			
			$("#category-list").innerHTML += category_list_template.replace(/{{title}}/g, _ID1_title[item].title).replace(/{{id}}/g,item);
			for(var task in _ID123[item]["task"]){
				var childtask_amount = 0;
				for(var childtask in _ID123[item]["task"][task]["childtask"]){
					childtask_amount++;
					category_list_total++;
				}
				$("#category-item-"+item+"-tasklist").innerHTML += category_list_task_template.replace(/{{parentID}}/g,item).replace(/{{taskID}}/g,task).replace(/{{content}}/g,_ID2_title[task].title).replace(/{{childtask-amount}}/g,childtask_amount);

			}
			console.log($("#category-item-"+item));
			// $("#category-item-"+item).addEventListener("click",function(){
			// 	alert("aaa");
			// 	//$(this.id + "-tasklist").setAttribute("class",document.getElementById(this.id + "-tasklist").getAttribute("class")+" category-tasklist-clicked");
			// 	//addClass($(this.id + "-tasklist"),"category-tasklist-clicked");

			// });

		}
		$("#category-alltask").innerHTML = "所有任务("+category_list_total+")";

		if($("#category-item-1 .delete").length>0){
			$("#category-item-1 .delete")[0].remove();
		}
		addEvent();
	}

	function addID1(title){
		if(_ID1_title[_newID1]==undefined){
			_ID1_title[_newID1] =  {	id : _newID1,
							title : title};
			
			localStorage.ID1_title = JSON.stringify(_ID1_title);

			_ID123[_newID1] = {	id:_newID1,
				task : {}
			}
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID1++;
			localStorage.newID1 = _newID1;
		}else{
			while(_ID1_title[_newID1]!=undefined){
				_newID1++;
			}
			_ID1_title[_newID1] = {	id : _newID1,
							title : title};
			localStorage.ID1_title = JSON.stringify(_ID1_title);

			_ID123[_newID1] = {	id:_newID1,
				task : {}
			}
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID1++
			localStorage.newID1 = _newID1;
		}
		if(_newID1>2){
			init();
		}
		console.log(_ID1_title,_ID123);
	}

	function addID2(title,parentID){
		if(_ID2_title[_newID2]==undefined){
			_ID2_title[_newID2] =  {	id : _newID2,
							title : title,
						};
			
			localStorage.ID2_title = JSON.stringify(_ID2_title);

			_ID123[parentID]["task"][_newID2] = {	id : _newID2,
							parentID : parentID,
							childtask : {}
						};
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID2++;
			localStorage.newID2 = _newID2;
		}else{
			while(_ID2_title[_newID2]!=undefined){
				_newID2++;
			}
			_ID2_title[_newID2] =  {	id : _newID2,
							title : title,
						};
			
			localStorage.ID2_title = JSON.stringify(_ID2_title);

			_ID123[parentID]["task"][_newID2] = {	id : _newID2,
							parentID : parentID,
							childtask : {}
						};
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID2++;
			localStorage.newID2 = _newID2;
		}
		if(_newID2>2){
			init();
		}
		console.log(_ID1_title,_ID123,_ID2_title);
	}

	function addID3(title,date,content,ID2,ID1){
		if(_ID3_content[_newID3]==undefined){
			_ID3_content[_newID3] =  {	id : _newID3,
								title : title,
								date : date,
								content : content};
			
			localStorage.ID3_content = JSON.stringify(_ID3_content);

			_ID123[ID1]["task"][ID2]["childtask"][_newID3] = {	id : _newID3,
												ID2 : ID2,
												ID1 : ID1};
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID3++;
			localStorage.newID3 = _newID3;
		}else{
			while(_ID3_content[_newID3]!=undefined){
				_newID3++;
			}
			_ID3_content[_newID3] =  {	id : _newID3,
								title : title,
								date : date,
								content : content};
			
			localStorage.ID3_content = JSON.stringify(_ID3_content);

			_ID123[ID1]["task"][ID2]["childtask"][_newID3] = {	id : _newID3,
												ID2 : ID2,
												ID1 : ID1};
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID3++;
			localStorage.newID3 = _newID3;
		}
		init();
	}

	function addEvent(){
		var doc = document.getElementsByTagName('body')[0];
		doc.onkeyup = function(e){
			console.log(e.path[0].id);
			var target = e.path[0];
			if(target.id == "childtask-title"){
				var str = target.value;
				if(str.length<=20){
					$("#childtask-title-count").innerHTML = "还可输入"+(20-str.length)+"个字";
				}else{
					$("#childtask-title").value = str.slice(0,19);
				}
			}

			if(target.id == "childtask-time"){
				var time = $("#childtask-time").value;
				console.log(/^\d\d\d\d-\d\d-\d\d$/.test(time));
				if(/^\d\d\d\d-\d\d-\d\d$/.test(time)){
					$("#childtask-time-alert").style.display = "none";
					$("#childtask-time").style.border = "2px solid green";
				}else{
					$("#childtask-time-alert").style.display = "block";
					$("#childtask-time").style.border = "1px solid #aaaaaa";
				}
			}
			if(target.id == "content-body"){
				var str = target.innerHTML;
				if(str.length<=200){
					$("#content-body-count").innerHTML = "还可输入"+(200-str.length)+"个字";
				}else{
					$("#content-body").innerHTML = str.slice(0,199);
				}
			}
		}
		doc.onclick = function(e){
			console.log(e);
			e = e || window.event;
			var tagChild=e.srcElement||e.target; 
			if(tagChild.nodeType==1 && (tagChild.getAttribute("class")=="category-item" || tagChild.getAttribute("class")=="category-item category-item-clicked")){ 
				console.log(tagChild.nextSibling.getAttribute("class"));
				if(tagChild.nextSibling.getAttribute("class")!="category-tasklist"){
					tagChild.nextSibling.setAttribute("class","category-tasklist");
					return;
				}
				// if($(".category-tasklist-clicked")[0]!=undefined){
				// 	$(".category-tasklist-clicked")[0].setAttribute("class","category-tasklist");
				// }
				if($(".category-item-clicked")[0]!=undefined){
					$(".category-item-clicked")[0].setAttribute("class","category-item");
				}
				addClass(tagChild,"category-item-clicked");
				addClass($("#"+tagChild.id + "-tasklist"),"category-tasklist-clicked");
			} 
			if(tagChild.nodeType==1 && tagChild.getAttribute("class")=="category-task"){ 
				var arr = getChildTask(tagChild.id).sort(sortID3ByDate);
				var dateArr = [];
				for(var i = 0 ; i < arr.length ; i++){
					if(dateArr.indexOf(_ID3_content[arr[i]].date)==-1){
						dateArr.push(_ID3_content[arr[i]].date);
					}
				}
				console.log(dateArr);
				$("#task-body").innerHTML = "";
				for(var i = 0 ; i < dateArr.length ; i++){
					$("#task-body").innerHTML += childtask_date_template.replace(/{{date}}/g,dateArr[i]);
				}
				for(var i = 0 ; i < arr.length ; i++){
					$("#childtask-"+_ID3_content[arr[i]].date).innerHTML += child_task_template.replace(/{{ID3}}/g,"childtask-"+arr[i]).replace(/{{title}}/g,_ID3_content[arr[i]]["title"]);
				}

				if($(".category-task-clicked").length > 0){
					$(".category-task-clicked")[0].setAttribute("class","category-task");
				}
				addClass(tagChild,"category-task-clicked");
				if($(".category-item-clicked")[0]!=undefined){
					$(".category-item-clicked")[0].setAttribute("class","category-item");
				}
				addClass(tagChild.parentNode.previousSibling,"category-item-clicked");
				$('#task-header-all').click();

			}
			if(tagChild.nodeType==1 && tagChild.id=="addCategory"){ 
				$("#prompt").setAttribute("style","display:block;");
				$("#prompt").setAttribute("class","category-input");
			}
			if(tagChild.nodeType==1 && tagChild.id=="prompt-cancel"){ 
				$("#prompt").removeAttribute("style");
				$("#prompt").removeAttribute("class");
			}
			if(tagChild.nodeType==1 && tagChild.id=="prompt-yes"){ 
				if($("#prompt").getAttribute("class")=="category-input" && $("#prompt-input").value){
					addID1($("#prompt-input").value);
				}
				$("#prompt").removeAttribute("style");
				$("#prompt").removeAttribute("class");
			}


			if(tagChild.nodeType==1 && tagChild.id=="addTask"){ 
				if($(".category-item-clicked")[0] != undefined){
					if($(".category-item-clicked")[0].id == "category-item-1"){
						alert("不能为默认分类添加子分类！");
						return;
					}
					$("#prompt2").setAttribute("style","display:block;");
					$("#prompt2").setAttribute("class","category-input");
				}
			}
			if(tagChild.nodeType==1 && tagChild.id=="prompt2-cancel"){ 
				$("#prompt2").removeAttribute("style");
				$("#prompt2").removeAttribute("class");
			}
			if(tagChild.nodeType==1 && tagChild.id=="prompt2-yes"){ 
				addID2($("#prompt2-input").value,$(".category-item-clicked")[0].id.split("-")[2]);
				$("#prompt2").removeAttribute("style");
				$("#prompt2").removeAttribute("class");
			}
			
			if(tagChild.nodeType==1 && tagChild.id=="addChildTask"){
				$("#content-header1").innerHTML = "";
				$("#content-header2").innerHTML = "";
				$("#content-body").innerHTML = "";
				var item = $(".category-task-clicked")[0];
				console.log(item);
				var ID1 = item.id.split("-")[1];
				var ID2 = item.id.split("-")[2];
				addID3("新任务","","",ID2,ID1);
				$("#task-"+ID1+"-"+ID2).click();
				$("#childtask-"+(_newID3-1)).click();
				$("#taskEdit").click();
				$("#childtask-title").focus();
				init();
			}
			if(tagChild.nodeType==1 && tagChild.getAttribute("class")=="childtask"){
				var ID = tagChild.id.split("-")[1];
				$("#content-header1").innerHTML = _ID3_content[ID].title;
				$("#content-header2").innerHTML = _ID3_content[ID].date;
				$("#content-body").innerHTML = _ID3_content[ID].content;

				if(_ID3_content[ID].status != undefined && _ID3_content[ID].status == "complete"){
					$("#taskComplete").setAttribute("class","iconfont complete");
				}else{
					$("#taskComplete").setAttribute("class","iconfont");
				}

				if($(".childtask-clicked").length>0){
					$(".childtask-clicked")[0].setAttribute('class','childtask');
				}
				addClass(tagChild,"childtask-clicked");
			}

			if(tagChild.nodeType==1 && tagChild.id=="task-header-all"){
				if($(".task-header-clicked").length>0){
					$(".task-header-clicked")[0].setAttribute("class","");
				}
				addClass(tagChild,"task-header-clicked");

				var arr = getChildTask($(".category-task-clicked")[0].id).sort(sortID3ByDate);
				var dateArr = [];
				for(var i = 0 ; i < arr.length ; i++){
					if(dateArr.indexOf(_ID3_content[arr[i]].date)==-1){
						dateArr.push(_ID3_content[arr[i]].date);
					}
				}
				console.log(dateArr);
				$("#task-body").innerHTML = "";
				for(var i = 0 ; i < dateArr.length ; i++){
					$("#task-body").innerHTML += childtask_date_template.replace(/{{date}}/g,dateArr[i]);
				}
				for(var i = 0 ; i < arr.length ; i++){
					$("#childtask-"+_ID3_content[arr[i]].date).innerHTML += child_task_template.replace(/{{ID3}}/g,"childtask-"+arr[i]).replace(/{{title}}/g,_ID3_content[arr[i]]["title"]);
				}
			}

			if(tagChild.nodeType==1 && tagChild.id=="task-header-yes"){
				$("#task-body").innerHTML = "";
				if($(".task-header-clicked").length>0){
					$(".task-header-clicked")[0].setAttribute("class","");
				}
				addClass(tagChild,"task-header-clicked");

				var arr = getChildTask($(".category-task-clicked")[0].id).sort(sortID3ByDate);
				var arr_filter=[];
				for(item in arr){
					if(_ID3_content[arr[item]].status != undefined){
						arr_filter.push(arr[item]);
					}
				}
				console.log(arr_filter);
				var dateArr = [];
				for(var i = 0 ; i < arr_filter.length ; i++){
					if(dateArr.indexOf(_ID3_content[arr_filter[i]].date)==-1){
						dateArr.push(_ID3_content[arr_filter[i]].date);
					}
				}
				console.log(dateArr);
				
				for(var i = 0 ; i < dateArr.length ; i++){
					$("#task-body").innerHTML += childtask_date_template.replace(/{{date}}/g,dateArr[i]);
				}
				for(var i = 0 ; i < arr_filter.length ; i++){
					$("#childtask-"+_ID3_content[arr_filter[i]].date).innerHTML += child_task_template.replace(/{{ID3}}/g,"childtask-"+arr_filter[i]).replace(/{{title}}/g,_ID3_content[arr_filter[i]]["title"]);
				}
			}


			if(tagChild.nodeType==1 && tagChild.id=="task-header-no"){
				$("#task-body").innerHTML = "";
				if($(".task-header-clicked").length>0){
					$(".task-header-clicked")[0].setAttribute("class","");
				}
				addClass(tagChild,"task-header-clicked");

				var arr = getChildTask($(".category-task-clicked")[0].id).sort(sortID3ByDate);
				var arr_filter=[];
				for(item in arr){
					if(_ID3_content[arr[item]].status == undefined){
						arr_filter.push(arr[item]);
					}
				}
				console.log(arr_filter);
				var dateArr = [];
				for(var i = 0 ; i < arr_filter.length ; i++){
					if(dateArr.indexOf(_ID3_content[arr_filter[i]].date)==-1){
						dateArr.push(_ID3_content[arr_filter[i]].date);
					}
				}
				console.log(dateArr);
				
				for(var i = 0 ; i < dateArr.length ; i++){
					$("#task-body").innerHTML += childtask_date_template.replace(/{{date}}/g,dateArr[i]);
				}
				for(var i = 0 ; i < arr_filter.length ; i++){
					$("#childtask-"+_ID3_content[arr_filter[i]].date).innerHTML += child_task_template.replace(/{{ID3}}/g,"childtask-"+arr_filter[i]).replace(/{{title}}/g,_ID3_content[arr_filter[i]]["title"]);
				}
			}

			if(tagChild.nodeType==1 && tagChild.getAttribute("class")=="iconfont delete"){
				if(tagChild.getAttribute("act")=="deleteTask"){
					var ID1 = tagChild.parentNode.id.split('-')[1];
					var ID2 = tagChild.parentNode.id.split('-')[2];
					if(confirm("确定要删除此子分类吗")){
						tagChild.parentNode.style.display = "none";
						delete _ID123[ID1]["task"][ID2];
						delete _ID2_title[ID2];
						localStorage.ID123 = JSON.stringify(_ID123);
						localStorage.ID2_title = JSON.stringify(_ID2_title);
					}
				}

				if(tagChild.getAttribute("act")=="deleteCategory"){
					var ID1 = tagChild.parentNode.id.split('-')[2];
					if(confirm("确定要删除此分类吗")){
						tagChild.parentNode.style.display = "none";
						delete _ID123[ID1];
						delete _ID1_title[ID1];
						localStorage.ID123 = JSON.stringify(_ID123);
						localStorage.ID1_title = JSON.stringify(_ID1_title);
					}
				}
			}

			if(tagChild.id == "taskEdit" && $(".childtask-clicked").length>0){
				if($("#childtask-title") != undefined){
					return;
				}
				$("#taskSave").style.display = "inline";
				$("#taskComplete").style.display = "none";
				var temp1 = $("#content-header1").innerHTML;
				var temp2 = $("#content-header2").innerHTML;
				$("#content-header1").innerHTML = "<input class=\"content-header-input\" id=\"childtask-title\"><p id=\"childtask-title-count\">还可输入{{count}}个字</p>";
				$("#content-header2").innerHTML = "<input class=\"content-header-input\" id=\"childtask-time\"><p id=\"childtask-time-alert\">请使用yyyy-mm-dd格式</p>";
				$("#childtask-title").value = temp1;
				$("#childtask-time").value = temp2;
				$("#content-body").contentEditable = true;

				$("#content-body-count").style.display = "block";
				$("#childtask-title-count").innerHTML = "还可输入" + (20-$("#childtask-title").value.length) + "个字";
			}

			if(tagChild.id == "taskSave" && $(".childtask-clicked").length>0){
				var time = $("#childtask-time").value;
				if(!/\d\d\d\d-\d\d-\d\d/.test(time)){
					alert("时间格式不正确！请使用yyyy-mm-dd格式！");
					return;
				}
				if(parseInt(time.split("-")[0])<2000 || parseInt(time.split("-")[0])>2100 || parseInt(time.split("-")[1])>12 || parseInt(time.split("-")[1])<1 || parseInt(time.split("-")[2])>31 || parseInt(time.split("-")[2])<1){
					alert("时间数值错误！");
					return;
				}
				if(confirm("确定要保存吗？")){
					$("#taskSave").style.display = "none";
					$("#taskComplete").style.display = "inline";
					var item = $(".childtask-clicked")[0];
					var ID3 = item.id.split("-")[1];
					_ID3_content[ID3].title = $("#childtask-title").value;
					_ID3_content[ID3].date = $("#childtask-time").value;
					_ID3_content[ID3].content = $("#content-body").innerHTML;
					$("#content-body").contentEditable = false;		
					$("#content-body-count").style.display = "none";
					var ID = item.id.split("-")[1];
					$("#content-header1").innerHTML = _ID3_content[ID].title;
					$("#content-header2").innerHTML = _ID3_content[ID].date;
					$("#content-body").innerHTML = _ID3_content[ID].content;
					$("#task-header-all").click();
					localStorage.ID3_content = JSON.stringify(_ID3_content);
				}
			}
			if(tagChild.id == "taskComplete" && tagChild.getAttribute("class").split(" ").length==1 && $(".childtask-clicked").length > 0){
					if(confirm("确定任务完成？")){
						var item = $(".childtask-clicked")[0];
						var ID3 = item.id.split("-")[1];
						_ID3_content[ID3].status = "complete";
						localStorage.ID3_content = JSON.stringify(_ID3_content);
						addClass($("#taskComplete"),"complete");
				}
			}

			tagChild=null; 
		}

	}

	window.init = init; 
})()
	init();

window.onload = window.onresize = function(){
	if(document.documentElement.clientHeight<600){
		$("#category").style.height = "600px";
		$("#task").style.height = "600px";
		$("#category-list").style.height = "500px";
		$("#task-body").style.height = "500px";
	}else{
		$("#category").style.height = "100%";
		$("#task").style.height = "100%";
		$("#category-list").style.height = "100%";
		$("#task-body").style.height = "100%";
	}
	if(document.documentElement.clientWidth<1000){
		$("#header").style.width = "1000px";
		$("#content").style.width = "600px";
	}else{
		$("#header").style.width = "100%";
		$("#content").style.width = " ";
	}
}
