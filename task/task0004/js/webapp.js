var documentWidth = window.innerWidth,
    documentHeight = window.innerHeight,
    data = getData(),
    main = document.getElementsByClassName("main");

window.onload = function() {
    initClassifyList();
    initCount();
}

function initClassifyList() {
    var list = [],
        classifyList = document.getElementsByClassName("classifyList")[0];
    for(var i = 0;i < data.length;i ++) {
        list.push(data[i][0]);
    }
    var len = list.length;
    for(var i = 0;i < len;i ++) {
        var ele = document.createElement("li");
        ele.classList.add("ele");
        ele.index = i;
        ele.innerHTML = list[i].classify;
        addClickListener(ele, function(tar) {
            displayPage(1);
            initTaskList(tar);
        });
        classifyList.appendChild(ele);
    }
}

function addClickListener(node, fun) {
    var flag = false;
    var startHandler = function(evt) {
        flag = true;
    };
    var endHandler = function(evt) {
        if(flag) {
            fun(this);
        }
        flag = false;
    }

    node.addEventListener("touchstart", startHandler, false);
    node.addEventListener("touchend", endHandler, false);   
}

function displayPage(option) {
    for(var i = 0;i < main.length;i ++) {
        main[i].style.display = "none";
    }
    main[option].style.display = "block";
}

function initTaskList(node) {
    var list = data[node.index],
        taskList = document.getElementsByClassName("taskList")[0],
        title = document.getElementsByClassName("title")[1],
        returnBtn = document.getElementsByClassName("main")[1].getElementsByClassName("returnBtn")[0];
    clearChild(taskList); 
    title.innerHTML = node.innerHTML;

    addClickListener(returnBtn, function() {
        displayPage(0);
    });

    for(var i = 0;i < list.length;i ++) {
        var ele = document.createElement("li");
        ele.classList.add("ele");
        ele.obj = list[i];
        ele.parent = node;
        ele.innerHTML = list[i].task;
        ele.style.lineHeight = documentHeight * 0.1 + "px";
        addClickListener(ele, function(tar) {
            displayPage(2);
            initTask(tar);
        });
        taskList.appendChild(ele);
    }
}

function initTask(node) {
    var obj = node.obj,
        title = document.getElementsByClassName("title")[2],
        taskTitle = document.getElementsByClassName("taskTitle")[0],
        taskDate = document.getElementsByClassName("taskDate")[0],
        taskContent = document.getElementsByClassName("taskContent")[0],
        returnBtn = document.getElementsByClassName("main")[2].getElementsByClassName("returnBtn")[0];

    addClickListener(returnBtn, function() {
        displayPage(1);
        initTaskList(node.parent);
    });

    taskTitle.innerHTML = obj.task;
    taskDate.innerHTML = obj.date;
    taskContent.innerHTML = obj.content;
}

function clearChild(node) {
    while(node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function initCount() {
	var titleHeight = documentHeight * 0.1,	
		titleContainer = document.getElementsByClassName("title-container");
	for(var i = 0;i < titleContainer.length;i ++) {
		titleContainer[i].style.height = titleHeight + "px";
		titleContainer[i].getElementsByClassName("title")[0].style.lineHeight = titleHeight + "px";
		var eles = main[i].getElementsByClassName("ele");
		for(var j = 0;j < eles.length;j ++) {
			eles[j].style.lineHeight = titleHeight + "px";
		}
	}
}


function getData() {
    return [[{
        classify : "默认分类",    
        task : "task1",
        date : "2015-5-20",
        content : "点击 “分类列表”后，可以添加分类，点击分类或子分类后，可以添加子分类"
    },{
        classify : "默认分类",
        task : "task2",
        date : "2015-5-20",
        content : "无法在 所有任务中 删除"
    },{
        classify : "默认分类",
        task : "task3",
        date : "2015-5-23",
        content : "balabalabala"
    }],[{
        classify : "社团活动",
        task : "task5",
        date : "2015-5-12",
        content : "打游戏"
    }],[{
        classify : "baidu-ife",
        task : "task4",
        date : "2015-5-10",
        sub : "to-do 1",
        completed : true,
        content : "学习"
    },{
        classify : "baidu-",
        task : "task5",
        date : "2015-5-13",
        sub : "to-do 2",
        completed : false,
        content : "学习"
    },{
        classify : "baidu-",
        task : "task6",
        date : "2015-5-10",
        sub : "to-do 7",
        completed : false,
        content : "打游戏"
    }]];
}