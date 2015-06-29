/**
 * Created by zehuiguan on 15/6/10.
 */

//localStorage + JSON 存储任务数据
//catalog：任务目录; childCatalog:子目录； task：任务
var catalog;
var childCatalog;
var task;
var listArr = [];

var catalogText = '['
    + '{'
    +     '"id": 0,'
    +     '"name": "默认分类",'
    +     '"child": [0]'
    + '},'
    + '{'
    +     '"id": 1,'
    +     '"name": "百度IFE项目",'
    +     '"child": [1, 2]'
    + '},'
    + '{'
    +     '"id": 2,'
    +     '"name": "毕业设计",'
    +     '"child": [3]'
    + '},'
    + '{'
    +     '"id": 3,'
    +     '"name": "社团活动",'
    +     '"child": []'
    + '},'
    + '{'
    +     '"id": 4,'
    +     '"name": "家庭生活",'
    +     '"child": []'
    + '}'
+ ']';

var childCatalogText = '['
    + '{'
    +     '"id": 0,'
    +     '"name": "默认子分类",'
    +     '"child": [],'
    +     '"father": 0'
    + '},'  
    + '{'
    +     '"id": 1,'
    +     '"name": "task1",'
    +     '"child": [0, 1],'
    +     '"father": 1'
    + '},'
    + '{'
    +     '"id": 2,'
    +     '"name": "task2",'
    +     '"child": [2],'
    +     '"father": 1'
    + '},'
    + '{'
    +     '"id": 3,'
    +     '"name": "论XX的可行性",'
    +     '"child": [3],'
    +     '"father": 2'
    + '}'  
+ ']';

var taskText = '['
    + '{'
    +     '"id": 0,'
    +     '"name": "to-do 1",'
    +     '"father": 1,'
    +     '"finish": true,'
    +     '"date": "2015-05-28",'
    +     '"content": "开始 task0001 的编码任务。"'
    + '},'
    + '{'
    +     '"id": 1,'
    +     '"name": "to-do 2",'
    +     '"father": 1,'
    +     '"finish": true,'
    +     '"date": "2015-05-28",'
    +     '"content": "重构 task0001 的编码任务。"'
    + '},'
    + '{'
    +     '"id": 2,'
    +     '"name": "to-do 3",'
    +     '"father": 2,'
    +     '"finish": true,'
    +     '"date": "2015-05-30",'
    +     '"content": "完成 task0002 的编码任务。"'
    + '},'
    + '{'
    +     '"id": 3,'
    +     '"name": "to-do 4",'
    +     '"father": 3,'
    +     '"finish": false,'
    +     '"date": "2015-06-02",'
    +     '"content": "完成毕业设计。"'
    + '}'
+ ']';

// 初始化
// 生成任务分类列表
function generateType () {
    getCatalogNum();
    var chosen = $(".type-wrap .choose");	
    var typeHtml = '';
    for (var i = 0; i < catalog.length; i++) {
        typeHtml += ''
            + '<li>'
            +    '<h3 onclick = "typeClick(this)">'
            +        '<i class="icon-folder-open"></i>'
            +        '<span>' + catalog[i].name + '</span>' + '&nbsp;&nbsp;(' + catalog[i].num + ')'  
            +        '<i class="icon-cancel type-delete" onclick="del(event, this)"></i>'                            
            +    '</h3>'                    
            +    '<ul class="item">';

        for (var j = 0 ; j < catalog[i].child.length; j++) {
        	var childNode = getObjByAttr(childCatalog, 'id', catalog[i].child[j]);
        	typeHtml += ''
            +        '<li>'
            +            '<h4 onclick = "typeClick(this)"><i class="icon-doc"></i><span>' + childNode.name +'</span>&nbsp;&nbsp;(' + childNode.child.length + ')' + '<i class="icon-cancel type-delete" onclick="del(event, this)"></i></h4>'
            +        '</li>'
        }
        typeHtml += '' 
        	+    '</ul>'
        	+ '</li>';       
    };
     $(".item-wrap").innerHTML = typeHtml;
     $(".item-wrap").getElementsByTagName("li")[0].className = "unhover";

     if (chosen) {
     	var tag = chosen.tagName.toLowerCase();
     	var name = chosen.getElementsByTagName("span")[0].innerHTML;
     	var isClick = false;
     	switch (tag) {
     		case "h2":
     			$("h2").click();
     			isClick = true;
     			break;
 			case "h3":
 				var catalogElement = document.getElementsByTagName("h3");
 				for (var i = 0; i < catalogElement.length; i++) {
 					if (catalogElement[i].getElementsByTagName("span")[0].innerHTML === name) {
 						catalogElement[i].click();
 						isClick = true;
 						break;
 					}
 				};
 				break;
			case "h4":
				var childElement =  document.getElementsByTagName("h4");
				for (var i = 0; i < childElement.length; i++) {
                    if (childElement[i].getElementsByTagName('span')[0].innerHTML === name) {
                        childElement[i].click();
                        isClick = true;
                        break;
                    }
				};
     	}
     	if (!isClick) {
     		$("h2").click();
     	}
     } else {
     	$("h2").click();
     }	
     listHandler();
}

// 任务列表数据处理
function listHandler () {
	var element = $(".type .choose");
	var elementTag = element.tagName.toLowerCase();
	var name = element.getElementsByTagName('span')[0].innerHTML;
	listArr = [];
	switch (elementTag) {
		case "h2":
			for (var i = 0; i < task.length; i++) {
				listArr.push(task[i].id);
			};
			menuHandler();
			break;
		case "h3":
            var catalogObj = getObjByAttr(catalog, 'name', name);     
            for (var i = 0; i < catalogObj.child.length; i++) {
                var childObj = getObjByAttr(childCatalog, 'id', catalogObj.child[i]);  
                for (var j = 0; j < childObj.child.length; j++) {
                    listArr.push(childObj.child[j]);
                }
            }
			menuHandler();
            break;
		case "h4":
            var childObj = getObjByAttr(childCatalog, 'name', name);     
            for (var j = 0; j < childObj.child.length; j++) {
                listArr.push(childObj.child[j]);
            }
			menuHandler();            			
			break;
	}
}

// 生成任务列表
function generateList (listArr) {
	var chosen = $(".list-wrap .choose");

	var date = [];
	var listObj;
	for (var i = 0; i < listArr.length; i++) {
		listObj = getObjByAttr(task, "id", listArr[i]);
		date.push(listObj.date);
	};
	date = uniqArray(date);
	date = sortDate(date);

	var listHtml = '';
	for (var i = 0; i < date.length; i++) {
		listHtml += ''
		    + '<li>'
            +     '<h5>' + date[i] + '</h5>'
            +     '<ul class="item">';

        for (var j = 0; j < listArr.length; j++) {
        	listObj = getObjByAttr(task, "id", listArr[j]);

        	if (listObj.date === date[i]) {        	
        		listHtml += ''
        	+        '<li onclick = "listClick(this)">';
        		if (listObj.finish === true) {
                    listHtml += ''
            +             '<h6 class="list-finish">'; 
                }
                else if (listObj.finish === false) {
                    listHtml += ''
            +             '<h6>';
                }
        		listHtml += ''
            +                 '<span>' + listObj.name + '</span>'
            +                 '<i class="icon-cancel list-delete" onclick="del(event, this)"></i>'
            +             '</h6>'            
            +         '</li>';      
        	}
        }
        listHtml += ''
            +     '</ul>'
            + '</li>';
    };
	$('.list-wrap').innerHTML = listHtml;
	if ($('.list-wrap').hasChildNodes()){
		if ($(".list-wrap").getElementsByTagName('li')[0].hasChildNodes()) {
			$('.list-wrap').getElementsByTagName('li')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[0].className = "choose";	
		}
	}    
	if (chosen) { 
        var childElement = document.getElementsByTagName('h6');
        var name = chosen.getElementsByTagName('span')[0].innerHTML;
        var isClick = false;
        for (var i = 0; i < childElement.length; i++) {
            if (childElement[i].getElementsByTagName('span')[0].innerHTML === name) {
                childElement[i].click();
                isClick = true;
                break;
            }
            if (!isClick && $('h6')) {                                
                $('h6').click();
            }
        }
    } else if ($('h6')) {                   
        $('h6').click();
    }
	generateTask();
}

// 生成任务详细描述部分
function generateTask () {
	var element = $(".list-wrap .choose");
	var taskHtml = '';
	var taskObj = [];
	var info = $(".task").getElementsByTagName("span");

	if ($(".list-wrap").hasChildNodes()) {
	    var name = element.getElementsByTagName('span')[0].innerHTML;
	    taskObj = getObjByAttr(task, 'name', name);
		info[0].innerHTML = taskObj.name;
		info[1].innerHTML = taskObj.date;
		info[2].innerHTML = taskObj.content;	  
        $(".task-status").style.display = "block";  
	} else {
		info[0].innerHTML = "";
		info[1].innerHTML = "";
		info[2].innerHTML = "";
        $(".task-status").style.display = "none";
	}
}


// 新建分类
// 新分类弹窗，编辑新分类
function newType() {
    $('.box').style.display = 'block';
    $('.overlay').style.display = 'block';
    $('.box-name').innerHTML = '新增分类';
    var newTypeHtml = ''
        + '<p>'
        +     '新分类名称:'
        +     '<input type="text" class="new-type" placeholder="在此输入新分类的名称">'
        + '</p>'
        + '<p>'
        +     '新分类父节点:'
        +     '<select class="type-select">'
        +         '<option value="-1">无</option>';

    var itemWrap = $('.item-wrap');
    var itemName = itemWrap.getElementsByTagName('h3');
    for (var i = 0; i < itemName.length; i++) {
        newTypeHtml += ''
        +         '<option value="'+ i +'">' + itemName[i].getElementsByTagName('span')[0].innerHTML + '</option>'
    }

    newTypeHtml += ''
        +     '</select>'
        + '</p>'
        + '<p class="error"></p>'
        + '<button class="mybutton btn1" onclick="typeAdd()">确定</button>'       
        + '<button class="mybutton btn2" onclick="closeBox()">取消</button>';

    $('.box-main').innerHTML = newTypeHtml;
}
// 新分类添加
function typeAdd() {
	var name = $(".new-type").value;
	var fatherName = $(".type-select").value;
	name = trim(name);

    $('.error').innerHTML = '';
    if (name.length === 0) {              
        $('.error').innerHTML = '分类名称不能为空';
        return;
    }
    else if (name.length >= 10) {
        $('.error').innerHTML = '分类名称不能多于10个字符';
        return;
    }
    else if (getObjByAttr(catalog, 'name', name) && fatherName === '-1') {
        $('.error').innerHTML = '检测到相同名称的分类已存在';
        return;
    }
    else if (getObjByAttr(childCatalog, 'name', name)  && getObjByAttr(childCatalog, 'name', name).father === catalog[$('.type-select').value].id) {
        $('.error').innerHTML = '检测到相同名称的子分类已存在';
        return;
    }

    if (fatherName === '-1') {             
        var newCatalog = {
            "id": catalog[catalog.length - 1].id + 1,
            "name": name,
            "child": [],
            "num": 0
        };
        catalog.push(newCatalog);
        save();
    }
    else {                                
        var newChild = {
            "id": childCatalog[childCatalog.length - 1].id + 1,
            "name": name,
            "child": [],
            "father": catalog[$('.type-select').value].id
        };
        var father = getObjByAttr(catalog, 'id', newChild.father)   
        father.child.push(newChild.id);                       
        childCatalog.push(newChild);
        save();
    }
    generateType();

    var h3 = document.getElementsByTagName('h3');      
    for (var i = 0; i < h3.length; i++) {
        var span = h3[i].getElementsByTagName('span')[0];
        if (span.innerHTML === name) {
            span.click();
            break;
        }
    }
    var h4 = document.getElementsByTagName('h4');      
    for (var i = 0; i < h4.length; i++) {
        var span = h4[i].getElementsByTagName('span')[0];
        if (span.innerHTML === name) {
            span.click();
            break;
        }
    }    
	closeBox();
}
// 弹窗关闭按钮
function closeBox() {
    $('.box').style.display = 'none';
    $('.overlay').style.display = 'none';
}

// 新建任务
// 添加新任务
function newTask() {
    $(".list .add").onclick = "";
	$.click(".task-content .btn3", taskAdd);

    $(".task-title span").style.display = "none";
    $(".task-date span").style.display = "none";    
    $(".task-content span").style.display = "none";
    $(".task-title input").style.display = "inline";
    $(".task-date input").style.display = "inline";    
    $(".task-content textarea").style.display = "block";
    $(".task-content .btn3").style.display = "block";
    $(".task-content .btn4").style.display = "block";
    $(".task-content .task-error").style.visibility = "visible";
    $(".task-status").style.display = "none";
}

// 进入编辑模式，编辑新任务
function taskAdd() {

	var taskName = $(".task-title input").value;
	var taskDate = $(".task-date input").value;
	var taskContent = $(".task-content textarea").value;
	var dateSplit = taskDate.split("-");

    $('.task-error').innerHTML = '';

	if (taskName.length === 0) {
		$(".task-error").innerHTML = "任务标题不能为空";
		return;
	} else if (taskDate.length === 0) {
		$(".task-error").innerHTML = "任务日期不能为空";
		return;
	} else if (!taskDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        $('.task-error').innerHTML = '任务日期格式错误';
        return;
    } else if (dateSplit[1] < 1 || dateSplit[1] > 12 || dateSplit[2] < 1 || dateSplit[2] > 31) {
        $('.task-error').innerHTML = '日期错误';
        return;
    } else if (getObjByAttr(task, 'name', taskName)) {
        $('.task-error').innerHTML = '存在相同名称的任务';
        return;
    } else if (taskContent.length === 0) {
        $('.task-error').innerHTML = '任务内容不能为空';
        return;    	
    }

    var fatherID;
    var typeChoose = $(".type-wrap .choose");
    var typeTag = typeChoose.tagName.toLowerCase();
    var flag = 0;

    switch (typeTag) {
    	case "h2":
    		fatherID = 0;
            flag = 1;
    		break;
		case "h3":
			var typeName = typeChoose.getElementsByTagName("span")[0].innerHTML;
			var typeObj = getObjByAttr(catalog, "name", typeName);
			if (typeObj.child.length > 0) {
				fatherID = typeObj.child[0];
			} else {
		        var newChild = {
		            "id": childCatalog[childCatalog.length - 1].id + 1,
		            "name": "子分类",
		            "child": [],
		            "father": typeObj.id
		        };
		        typeObj.child.push(newChild.id);                      
		        childCatalog.push(newChild);
				fatherID = newChild.id;
			}
			break;
		case "h4":
			var childName = typeChoose.getElementsByTagName('span')[0].innerHTML;
			fatherID = getObjByAttr(childCatalog, "name", childName).id;
			break;
    }
    var newTask = {
        "id": task[task.length - 1].id + 1,
        "name": taskName,
        "father": fatherID,
        "finish": false,
        "date": taskDate,
        "content": taskContent
    };

    task.push(newTask);
    var fatherObj = getObjByAttr(childCatalog, 'id', newTask.father);
    fatherObj.child.push(newTask.id);    

    save();
    generateType();
    cancelAdd();

    var h6 = document.getElementsByTagName('h6');      
    for (var i = 0; i < h6.length; i++) {
        var span = h6[i].getElementsByTagName('span')[0];
        if (span.innerHTML === taskName) {
            span.click();
            break;
        }
    }
    if (flag) {
        $(".item").getElementsByTagName("h4")[0].click();
    }
    $.un(".task-content .btn3", "click", taskAdd);
}

// 退出编辑模式，放弃添加新任务
function cancelAdd() {

    $(".task-title input").value = "";
    $(".task-date input").value = "";    
    $(".task-content textarea").value = "";

    $(".task-title input").style.display = "none";
    $(".task-date input").style.display = "none";    
    $(".task-content textarea").style.display = "none";    
    $(".task-content .btn3").style.display = "none";
    $(".task-content .btn4").style.display = "none";
    $(".task-title span").style.display = "inline";
    $(".task-date span").style.display = "inline";    
    $(".task-content span").style.display = "block";   
    $(".task-content .task-error").style.visibility = "hidden";
    $(".task-status").style.display = "block";

    $.click(".list .add", newTask);                                 
}

// 修改已有的任务
function editTask () {
	var taskName = $(".task-title span").innerHTML;
	var taskDate = $(".task-date span").innerHTML;
	var taskContent = $(".task-content span").innerHTML;
	var taskObj = getObjByAttr(task, "name", taskName);

	$(".list .add").onclick = "";

	editSaveTemp = function (){
		editSave(taskObj);
	}
	$.click(".task-content .btn3", editSaveTemp);

    $(".task-title span").style.display = "none";
    $(".task-date span").style.display = "none";    
    $(".task-content span").style.display = "none";

    $(".task-title input").style.display = "inline";
    $(".task-date input").style.display = "inline";    
    $(".task-content textarea").style.display = "block";
    $(".task-content .task-error").style.visibility = "visible";
    $(".task-content .btn3").style.display = "block";
    $(".task-content .btn4").style.display = "block"; 
    $(".task-status").style.display = "none";

    $(".task-title input").value = taskName;
    $(".task-date input").value = taskDate;
    $(".task-content textarea").value = taskContent;
}	

// 保存修改
function editSave(taskObj) {
	$(".list .add").onclick = "";

	var taskName = $(".task-title input").value;
	var taskDate = $(".task-date input").value;
	var taskContent = $(".task-content textarea").value;
	var dateSplit = taskDate.split("-");

    $('.task-error').innerHTML = '';

	if (taskName.length === 0) {
		$(".task-error").innerHTML = "任务标题不能为空";
		return;
	} else if (taskDate.length === 0) {
		$(".task-error").innerHTML = "任务日期不能为空";
		return;
	} else if (!taskDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        $('.task-error').innerHTML = '任务日期格式错误';
        return;
    } else if (dateSplit[1] < 1 || dateSplit[1] > 12 || dateSplit[2] < 1 || dateSplit[2] > 31) {
        $('.task-error').innerHTML = '日期错误';
        return;
    } else if (getObjByAttr(task, 'name', name)) {
        $('.task-error').innerHTML = '检测到相同名称的任务已存在';
        return;
    } else if (taskContent.length === 0) {
        $('.task-error').innerHTML = '任务内容不能为空';
        return;    	
    }
	taskObj.name = taskName;
	taskObj.date = taskDate;
	taskObj.content = taskContent;

	save();
	generateType();
    cancelAdd();
	$.un(".task-content .btn3", "click", editSaveTemp);
}

// 保存数据
function save() {
    localStorage.catalog = JSON.stringify(catalog);
    localStorage.childCatalog = JSON.stringify(childCatalog);
    localStorage.task = JSON.stringify(task);
}

// 点击删除按钮
function del(event, element) {
    window.event ? window.event.cancelBubble = true : event.stopPropagation();  
	if (!confirm("删除操作不可逆，确认删除？")) {
		return;
	};

	var tag = element.parentNode.tagName.toLowerCase();
	var index;
	var name = element.parentNode.getElementsByTagName("span")[0].innerHTML;

	switch(tag) {
		case "h3":
			index = getIndexByAttr(catalog, "name", name);
			for (var i = 0; i < catalog[index].child.length; i++) {
				var childIndex = getIndexByAttr(childCatalog, "id", catalog[index].child[i]);

				for (var j = 0; j < childCatalog[childIndex].child.length; j++) {
					var taskIndex = getIndexByAttr(task, "id", childCatalog[childIndex].child[j]);
					task.splice(taskIndex, 1);
				}
				childCatalog.splice(childIndex, 1);
			};			
			catalog.splice(index, 1);
			break;

		case "h4":
			index = getIndexByAttr(childCatalog, "name", name);
			var fatherObj = getObjByAttr(catalog, "id", childCatalog[index].father);

			fatherObj.child.splice(fatherObj.child.indexOf(childCatalog[index].id), 1);

            for (var i = 0; i < childCatalog[index].child.length; i++) {       
                var taskIndex = getIndexByAttr(task, "id", childCatalog[index].child[i])
                task.splice(taskIndex, 1);
            }
            childCatalog.splice(index, 1);
			break;

		case "h6":
			index = getIndexByAttr(task, "name", name);
			var fatherObj = getObjByAttr(childCatalog, "id", task[index].father);

			fatherObj.child.splice(fatherObj.child.indexOf(task[index].id), 1);
			task.splice(index, 1);
			break;
	}
	save();
	generateType();
}
// 根据某对象的某属性得到某对象
function getObjByAttr(obj, attr, value) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][attr] === value) {
            return obj[i];
        }
    }
}

// 根据某对象的某属性得到某对象
function getIndexByAttr(obj, attr, value) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][attr] === value) {
            return i;
        }
    }
}

// 对任务时间进行排序
function sortDate(date) {
    return date.sort(function (a, b) {
        return a.replace(/-/g, '') - b.replace(/-/g, '');
    });
}

// 刷新分类对象的num属性
function getCatalogNum() {
    var sum;
    for (var i = 0; i < catalog.length; i++) {
        sum = 0;
        for (var j = 0; j < catalog[i].child.length; j++) {
            var childNum = getObjByAttr(childCatalog, 'id', catalog[i].child[j]).child.length;
            sum += childNum;
        }
        catalog[i].num = sum;
    };
}

// 设置任务为已完成状态
function finishTask() {
	var taskName = $(".task-title span").innerHTML;
	var taskObj = getObjByAttr(task, "name", taskName);

	if (taskObj.finish) {
        alert('任务已经完成');
        return;
	} else {
		if(!confirm("确定设置为已完成状态？")) {
			return;
		}
		taskObj.finish = true;
		save();
		generateType();
	}
}
// 特效
// 任务分类列表点击效果
function typeClick(element) {
	var other = $(".type").getElementsByTagName('*');
	for (var i = 0; i < other.length; i++) {
		if (other[i].className === "choose") {
			other[i].className = "";	
			break;		
		}
	};
	element.className = "choose";
	listHandler();
}
// 任务列表点击效果
function listClick(element) {
	var other = $(".list-wrap").getElementsByTagName('*');
	for (var i = 0; i < other.length; i++) {
		if (other[i].className === "choose") {
			other[i].className = "";	
			break;		
		}
	};
	element.className = "choose";
	generateTask();
}
// 筛选菜单点击效果
$.delegate(".list-menu", "li", "click", menuHandler);
function menuHandler(event) {
	var other = $(".list-menu").getElementsByTagName('*');
    var bool;
    var newListArr = [];

	if (!event) {
	    if ($(".list-menu .choose").innerHTML === "未完成") {
	        bool = false;
	    } else if ($(".list-menu .choose").innerHTML === "已完成") {
	        bool = true;
	    } else {
	        generateList(listArr);
	        return;
	    }
	} else {
	    var e = event || window.event;
	    var target = e.target || e.srcElement;
	    for (var i = 0; i < other.length; i++) {
	        if (other[i].className === "choose") {
	            other[i].className = "";
	            break;
	        }
	    };
	    target.className = "choose";
	    if (target.innerHTML === "未完成") {
	        bool = false;
	    } else if (target.innerHTML === "已完成") {
	        bool = true;
	    } else {
	        generateList(listArr);
	        return;
	    }
	}
   for (var j = 0; j < listArr.length; j++) {
    	for (var k = 0; k <task.length; k++) {
	        if (listArr[j] === task[k].id) {
	        	if (task[k].finish === bool) {
	            	newListArr.push(task[k].id);		        		
	        	}
	        }	    		
    	}
    }
	generateList(newListArr);      
}

window.onload = function() {
    if (!localStorage.getItem('catalog')) {  
        localStorage.catalog = catalogText;
        localStorage.childCatalog = childCatalogText;
        localStorage.task = taskText;
    }
    catalog = JSON.parse(localStorage.catalog);
    childCatalog = JSON.parse(localStorage.childCatalog);
    task = JSON.parse(localStorage.task);
    generateType();
}