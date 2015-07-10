init();
function getLocalData() {
    var testData = [[{
        classify : "默认分类",    
        task : "task1",
        date : "2015-5-20",
        sub : "新增分类",
        completed : false,
        content : "点击 “分类列表”后，可以添加分类，点击分类或子分类后，可以添加子分类"
    },{
        classify : "默认分类",
        task : "task2",
        date : "2015-5-20",
        sub : "删除",
        completed : true,
        content : "无法在 所有任务中 删除"
    },{
        classify : "默认分类",
        task : "task2",
        date : "2015-5-23",
        sub : "to-do 4",
        completed : true,
        content : "balabalabala"
    }],[{
        classify : "社团活动",
        task : "task3",
        date : "2015-5-12",
        sub : "to-do 9",
        completed : false,
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
    if(!localStorage.getItem("testData")) {
        localStorage.setItem("testData", JSON.stringify(testData));    
    }
    return JSON.parse(localStorage.getItem("testData"));
}

function getVar(temp) {
    var x;
    switch(temp) {
        case "data" : x = getLocalData();break;
        case "initFlag" : x = true;break;
        case "selectList" : {
            x = [];
            x.push($(".alltask"));
            x.push($(".classify-list-title"));
            x.push.apply(x, document.getElementsByClassName("classify-title"));
            x.push.apply(x, document.getElementsByClassName("classify-sub"));
            break;
        }
        case "subList" : {
            x = [];
            x = uniqArray($(".classify-list").getElementsByClassName("classify-sub"));
            break;
        }
        case "myTask" : {
            x = {};
            x.cTitle = $(".title");
            x.date = $(".date");
            x.cContent = $(".content");            
            break;
        }
        case "myBtn" : {
            x = {};
            x.btn1 = $(".btn");
            x.btn0 = document.getElementsByClassName("btn")[1];
            break;
        }
    }
    return function() {
        return x;
    }
}

// 初始化
function init() {
    var data = getVar("data")(),
        alltask = $(".alltask");
    var dLen = data.length;// 项目个数
    var num = document.getElementsByClassName("num");// 待完成个数组成的数组
    var classifyList = document.getElementsByClassName("classify-list")[0];   
    var classifyMenu = [];// 分类集合
    for(var i = 0;i < dLen;i++) {
        if(data[i][0]) {
            classifyMenu[i] = data[i][0].classify;    
        }        
    }

    addEvent($(".classify-list-title"), "click", selected);
    // 初始化分类列表
    for(var i = 0;i < dLen;i++) {
        var classifyEle = document.createElement("dd"),
            eleNum = 0,
            m = 0,
            taskMenu = [];// 列表内的task集合        

        // 初始化task
        for(var j = 0;j < data[i].length;j++) {
            taskMenu[j] = data[i][j].task;
        }
        taskMenu = uniqArray(taskMenu);// 项目下所有task

        classifyEle.className = "classify-ele";
        classifyEle.name = classifyMenu[i];
        classifyEle.index = i;
        classifyEle.num = eleNum;
        classifyList.appendChild(classifyEle);       
        initEle(classifyEle, taskMenu);
    }

    // 打开页面后，选中默认分类
    var classifyTitleList = document.getElementsByClassName("classify-title");
    for(var i = 0;i < classifyTitleList.length;i++) {
        if(classifyTitleList[i].name === "默认分类") {            
            classifyTitleList[i].click();
        }
    }

    // 初始化所有任务
    updateAlltask();

    addEvent(alltask, "click", selected);
    addEvent(alltask, "click", setDisplay);

    // 更新num
    updateNum();

    // 新增分类
    addEvent($(".addClassify"), "click", addClassify);

    // 任务列表的顶部选择栏
    initOptionList();
    
    // 任务列表的新增任务
    initAddTask();

    // 两个btn的初始化
    initBtn();
}

//////////////////////////////////////////////////////////////////////

// 更新alltask
function updateAlltask() {
    var alltask = $(".alltask"),
        subList = getVar("subList")(),
        taskList = alltask.parentNode;
    while(taskList.lastChild && taskList.lastChild.classList.contains("classify-sub")) {       
        taskList.removeChild(taskList.lastChild);
    }
    for(var i = 0;i < subList.length;i++) {
        addClassifySub(subList[i].name, alltask.parentNode);
    }
}


// 两个btn的初始化
function initBtn() {
    var myBtn = getVar("myBtn")(),
        myTask = getVar("myTask")(),
        data = getVar("data")(),
        mTitle = "",
        mDate = "",
        mContent = "",
        obj = {};
    addEvent(myBtn.btn0, "click", function(event) {
        if(myTask.cTitle.value) {
            if(this.title === "完成任务") {                                
                if(confirm("是否确认完成？")) {
                    obj.completed = true;
                    modifyData("edit", obj);
                    obj = {};                   
                }                                            
            }else if(this.title === "确认修改") {
                if(isDate(myTask.date.value)) {     
                    obj.completed = false;
                    obj.date = myTask.date.value;
                    obj["content"] = myTask.cContent.value;
                    modifyData("edit", obj);
                    obj = {};
                }else {
                    alert("请确保日期格式正确");
                }
            }else if(this.title === "确认新增") {
                var thisSub = $(".selected");
                if(!isDate(myTask.date.value)) {
                    alert("请确保日期格式正确");
                }else if(!thisSub.classList.contains("classify-sub")) {
                    alert("请选中一个子分类后，再确认新增");                    
                }else {
                    for(var i = 0;i < data.length;i++) {
                        for(var j = 0;j < data[i].length;j++) {                         
                            if(thisSub.parentNode.parentNode.name === data[i][j].classify && 
                                thisSub.name === data[i][j].task) {
                                obj = {
                                    classify : thisSub.parentNode.parentNode.name,
                                    task : thisSub.name,
                                    date : myTask.date.value,
                                    sub : myTask.cTitle.value,
                                    completed : false,
                                    content : myTask.cContent.value
                                };                                       
                                modifyData("add", obj);
                                obj = {};
                                return;
                            }
                        }
                    }
                }

            }
        }        
    });
    addEvent(myBtn.btn1, "click",function(event) {
        if(myTask.cTitle.value) {    
            if(this.title === "编辑任务") {
                switchPage("edit");                
                mTitle = myTask.cTitle.value;
                mDate = myTask.date.value;
                mContent = myTask.cContent.value;
            }else if(this.title === "取消修改" || this.title === "取消新增") {
                myTask.cTitle.value = mTitle;
                myTask.date.value = mDate;
                myTask.cContent.value = mContent;
                switchPage("default");
            }
        }
    });
}

// 修改数据并保存
function modifyData(option, obj) {
    var index = 0,
        data = getVar("data")(),
        todoList = document.getElementsByClassName("task-sub");

    switch(option) {
        case "remove" : {
            if(obj.task) {// 删除子分类               
                for(var i = 0;i < data.length;i++) {
                    for(var j = 0;j < data[i].length;j++) {    
                        if(obj.task === data[i][j].task) {
                            data[i].splice(j, 1);
                        }
                    }
                }
            }else {// 删除分类
                for(var i = 0;i < data.length;i++) {
                    for(var j = 0;j < data[i].length;j++) {    
                        if(obj.classify === data[i][j].classify) {
                            data[i].splice(j, 1);
                        }
                    }
                }
            }
            // 将二维数组length为0的项清除
            data = reviseArr(data);
            saveData(data);

            break;
        }            
        case "add" : {
            for(var i = 0;i < data.length;i++) {
                for(var j = 0;j < data[i].length;j++) {
                    if(data[i][j].classify == obj.classify && data[i][j].task == obj.task) {
                        data[i][data[i].length] = obj;
                        saveData(data);
                        initTaskList($(".selected"));               
                        updatePage(data[i][j]);
                        for(var m = 0;m < todoList.length;m++) {
                            if(todoList[m].name === obj.sub) {
                                todoList[m].click();
                            }
                        }
                        return;
                    }
                }
            }    
            break;
        }
        case "edit" : {
            for(var i = 0;i < data.length;i++) {
                for(var j = 0;j < data[i].length;j++) {
                    var thisTask = $(".subSelected");                                    
                    if(data[i][j].classify == thisTask.ele.classify && data[i][j].sub == thisTask.ele.sub) {

                        for(var m in obj) {
                            data[i][j][m] = obj[m];                    
                        }
                        saveData(data);
                        initTaskList(thisTask.father);               
                        index = thisTask.index;                   
                        updatePage(data[i][j]);

                        // 重新载入taskList后，使当前todo项被点击，获得"subSelected"class
                        todoList[index].click();
                        return;
                    }
                }
            }
            break;
        }
    }
}

// 点击后，更新显示的数据
function updatePage(temp) {
    var myBtn = getVar("myBtn")();
    if(temp.completed === true) {
        myBtn.btn0.style.display = "none";    
    }else {
        myBtn.btn0.style.display = "inline-block";    
    }                
    updateNum();
    switchPage("default");
}

// 初始化任务列表
function initTaskList(task) {
    var data = getVar("data")(),
        subList = getVar("subList")(),
        taskList = [],
        newList = [],
        dateList = [],
        list = $(".task-list"),
        num = 0;// 作为todoList的计数
    if(task.parentNode) {
        eleIndex = task.parentNode.parentNode.index;
    }

    // 清空列表
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // "所有"option被选中
    var optionList = document.getElementsByClassName("task-option");
    for(var i = 0;i < optionList.length;i++) {
            optionList[i].classList.remove("option-selected");
        }
    optionList[0].classList.add("option-selected");

    // 将包含task的对象，存入taskList
    for(var i = 0;i < data.length;i++) {
        for(var j = 0;j < data[i].length;j++) {
            if(task.name === data[i][j].task) {
                taskList.push(data[i][j]);
            }    
        }
        
    }

    // 将date存入dateList
    for(var i = 0;i < taskList.length;i++) {
        dateList.push(taskList[i].date);
    }

    // 为dateList按规则排序
    dateList = sortDate(uniqArray(dateList));

    // 填充task列表内容
    for(var i = 0;i < dateList.length;i++) {
        var taskEle = document.createElement("li");
        taskEle.className = "task-ele";
        list.appendChild(taskEle);

        var taskL = document.createElement("dl");
        taskEle.appendChild(taskL);

        // 为task项添加date项
        var taskDate = document.createElement("dt");
        taskDate.className = "task-date";
        taskDate.innerHTML = dateList[i];
        taskL.appendChild(taskDate);

        // 为task项添加todo项
        for(var j = 0;j < taskList.length;j++) {            
            if(taskList[j].date === dateList[i]) {
                var taskSub = document.createElement("dd");
                taskSub.className = "task-sub";      
                taskSub.innerHTML = taskList[j].sub;
                taskSub.name = taskList[j].sub;
                taskSub.index = num;
                newList[num] = taskList[j];
                num++;
                if(taskList[j].completed === true) {
                    taskSub.style.color = "green";
                }

                // 为todo项添加点击事件，点击后显示详情
                addEvent(taskSub, "click", function(event) {
                    switchPage("default");
                    this.ele = newList[this.index];
                    this.father = task;
                    var todoList = document.getElementsByClassName("task-sub");
                    for(var i = 0;i < todoList.length;i++) {                        
                        todoList[i].classList.remove("subSelected");
                    }
                    this.classList.add("subSelected");

                    // 显示内容
                    var myTask = getVar("myTask")();
                    var myBtn = getVar("myBtn")();
                    myTask.cTitle.value = newList[this.index].sub;
                    myTask.date.value = newList[this.index].date;
                    myTask.cContent.value = newList[this.index]["content"];                    

                    // 对于未完成任务，显示完成任务按钮
                    if(newList[this.index].completed === true) {
                        myBtn.btn0.style.display = "none";
                    }else {
                        myBtn.btn0.style.display = "inline-block";
                    }
                });
                taskL.appendChild(taskSub);
            }
        }
    }
}

// 清除节点下的所有元素
function clearNode(node, tagName) {
    var list = node.getElementsByTagName(tagName);
    for(var i = 0;i < list.length;i++) {
        node.removeChild(list[i]);
    } 
}


// 任务列表顶部选项
function initOptionList() {
    var optionList = document.getElementsByClassName("task-option"),
    all = optionList[0],
    unfinish = optionList[1],
    finish = optionList[2];
    addEvent(all, "click", optionEvent);
    addEvent(unfinish, "click", optionEvent);
    addEvent(finish, "click", optionEvent);

    function optionEvent(event) {
        var taskList = $(".task-list"),
            taskSubList = taskList.getElementsByClassName("task-sub"),
            len = taskSubList.length,
            dateList = taskList.getElementsByClassName("task-date"),
            dLen = dateList.length;
        for(var i = 0;i < optionList.length;i++) {
            optionList[i].classList.remove("option-selected");
        }
        this.classList.add("option-selected");

        if(taskList.firstChild) {
            switch(event.target) {
                case all : {
                    // 初始化
                    for(var i = 0;i < len;i++) {
                        taskSubList[i].style.display = "block";
                    }
                    for(var i = 0;i < dLen;i++) {
                        dateList[i].style.display = "block";
                    }
                    break;
                }
                case unfinish : {
                    // 初始化
                    for(var i = 0;i < dLen;i++) {
                        dateList[i].style.display = "block";
                    }

                    for(var i = 0;i < len;i++) {
                        if(taskSubList[i].style.color === "green") {
                            taskSubList[i].style.display = "none";

                            // 当该日期下没有需要显示的todo时，隐藏日期
                            var thisNode = taskSubList[i];                    
                            if(thisNode === thisNode.parentNode.lastChild) {
                                while(thisNode.style.display === "none" && thisNode.classList.contains("task-sub")) {
                                    if(thisNode.previousSibling === thisNode.parentNode.firstChild) {
                                        thisNode.previousSibling.style.display = "none";
                                    }
                                    thisNode = thisNode.previousSibling;
                                }    
                            }
                        }else {
                            taskSubList[i].style.display = "block";
                        }
                           
                   }
                   break;      
                }
                case finish : {
                    // 初始化
                    for(var i = 0;i < dLen;i++) {
                        dateList[i].style.display = "block";
                    }

                    for(var i = 0;i < len;i++) {
                        if(taskSubList[i].style.color === "green") {
                            taskSubList[i].style.display = "block";
                        }else {
                            taskSubList[i].style.display = "none";

                            // 当该日期下没有需要显示的todo时，隐藏日期
                            var thisNode = taskSubList[i];
                            if(thisNode === thisNode.parentNode.lastChild) {
                                while(thisNode.style.display === "none") {
                                    if(thisNode.previousSibling === thisNode.parentNode.firstChild) {
                                        thisNode.previousSibling.style.display = "none";
                                    }
                                    thisNode = thisNode.previousSibling;
                                }    
                            }
                        }
                   }
                   break;   
                }                
            }    
        }
        
    }
}

// 新增列表
function initAddTask() {
    var myTask = getVar("myTask")();
    var addTask = $(".addTask");   
    addEvent(addTask, "click", function(event) {
        if($(".selected").classList.contains("classify-sub")) {
            switchPage("add");    
        }        
    });
}

// 更新num
function updateNum() {

    var data = getVar("data")(),
        titleNum = document.getElementsByClassName("title-num"),
        subNum = document.getElementsByClassName("sub-num"),
        allNum = document.getElementsByClassName("all-num"),
        num = 0,
        thisNode;
        // task项的num
        for(var t = 0;t < subNum.length;t++) {
            for(var i = 0;i < data.length;i++) {
                for(var j = 0;j < data[i].length;j++) {
                    if(data[i][j].task === subNum[t].parentNode.name) {
                        if(data[i][j].completed === false) {
                            num++;
                        }
                    }
                }
            }                          
            subNum[t].innerHTML = num;
            num = 0;
        }
        // 分类项的num
        for(var i = 0;i < titleNum.length;i++) {
            thisNode = titleNum[i].parentNode.nextSibling;
            while(thisNode) {
                num += (thisNode.getElementsByClassName("sub-num")[0].innerHTML - 0);
                thisNode = thisNode.nextSibling;
            }
            titleNum[i].innerHTML = num;
            num = 0;
        }
}

// 功能切换
function switchPage(option) {
    var myBtn = getVar("myBtn")();    
    var myTask = getVar("myTask")();
    switch(option) {
        case "add" : {
            for(var i in myTask) {
                myTask[i].disabled = "";
                myTask[i].value = "";
                myTask[i].style.backgroundColor = "#fff";
                if(myTask[i].classList.contains("title")) {
                    myTask[i].focus();
                }
            }
            myBtn.btn1.src = "img/cancel.png";
            myBtn.btn1.title = "取消新增";
            myBtn.btn0.title = "确认新增";
            myBtn.btn0.style.display = "inline-block";
            break;
        }
        case "edit" : {
            for(var i in myTask) {                
                
                if(myTask[i].classList.contains("title")) {
                    myTask[i].disabled = "disabled";
                    myTask[i].style.backgroundColor = "";
                }else {
                    myTask[i].disabled = "";
                    myTask[i].style.backgroundColor = "#fff";
                }
            }
            myBtn.btn1.src = "img/cancel.png";
            myBtn.btn1.title = "取消修改";
            myBtn.btn0.title = "确认修改";
            myBtn.btn0.style.display = "inline-block";
            break;
        }
        case "default" : {
            for(var i in myTask) {
                myTask[i].disabled = "disabled";        
                myTask[i].style.backgroundColor = "";
            }
            myBtn.btn1.src = "img/write.png";
            myBtn.btn1.title = "编辑任务";
            myBtn.btn0.title = "完成任务";    
            break;
        }
    }
}


/////////////////////////////////////////////////////////////////////

// 初始化分类列表内的分类
function initEle(ele, taskMenu) {
    // 项目列表初始化
    var classify = document.createElement("dl");
    classify.name = ele.name;
    ele.appendChild(classify);
    // 列表头初始化
    addClassifyEle(ele, classify);

    // 初始化分类内元素
    for(var i = 0;i < taskMenu.length;i++) {
        addClassifySub(taskMenu[i], classify);
    }
}

//////////////////////////////////////////////////////////////////////////////////
// 将修改数据存入本地
function saveData(data) {
    localStorage.setItem("testData", JSON.stringify(data));
}

// 鼠标划过时，显示删除。
function removeEle(event) {
    this.lastChild.style.display = "inline-block";
}
// 鼠标划出，取消显示删除图标
function removeImg(event) {
    this.lastChild.style.display = "none";
}

// 点击后，隐藏/显示列表项
function setDisplay(event) {
    if(this.nextSibling) {
        if(this.nextSibling.style.display === "none") {
            var thisNode = this.nextSibling;
            while(thisNode) {
                thisNode.style.display = "block";
                thisNode.parentNode.displayFlag = true;
                thisNode = thisNode.nextSibling;
            }
        }else {
            var thisNode = this.nextSibling;
            while(thisNode) {
                thisNode.style.display = "none";
                thisNode.parentNode.displayFlag = false;
                thisNode = thisNode.nextSibling;
            }
        }
    }
}

// 点击后，选中该元素
function selected(event) {
    var selectList = getVar("selectList")();  
    if(selectList) {
        for(var i = 0;i < selectList.length;i++) {
            selectList[i].classList.remove("selected");
        }
        this.classList.add("selected");
        if(this.classList.contains("classify-sub")) {
            initTaskList(this);
        }
    }    
}

// 添加项目
function addClassifyEle(ele, parent) {
    var classifyTitle = document.createElement("dt");
    classifyTitle.className = "classify-title";
    addEvent(classifyTitle, "click", selected);
    classifyTitle.name = ele.name;
    parent.appendChild(classifyTitle);
    classifyTitle.innerHTML = "<img src='img/classify.png'> " + classifyTitle.name + 
        " (<span class='title-num'>" + 0 + "</span>)";

    // 列表头添加remove按钮
    if(ele.name !== "默认分类") {
        addRemoveImg(classifyTitle);
        addEvent(classifyTitle, "mouseover", removeEle);
        addEvent(classifyTitle, "mouseout", removeImg);    
    }
    
    // 点击列表头后，隐藏/显示内容
    addEvent(classifyTitle, "click", setDisplay);
    
    return classifyTitle;
}

// 添加子分类
function addClassifySub(taskMenu, parent) {
    var classifySub = document.createElement("dd");
    classifySub.className = "classify-sub";
    classifySub.name = taskMenu;
    classifySub.innerHTML = "<img src='img/task.png'> " + taskMenu + 
        " (<span class='sub-num'>" + 0 + "</span>)";// 待添加 未处理项的个数
    classifySub.style.display = "none";
    parent.appendChild(classifySub);
    
    // task元素添加remove按钮
    if(!parent.classList.contains("alltask-container")) {
        addRemoveImg(classifySub);
        addEvent(classifySub, "mouseover", removeEle);
        addEvent(classifySub, "mouseout", removeImg);
    }
    // task元素点击后被选中
    addEvent(classifySub, "click", selected);    
    return classifySub;
}

// 新增分类
function addClassify(event) {
    var name = prompt("输入分类名", ""),
        selectList = getVar("selectList")();
        classifyList = $(".classify-list");
    if(name) {
        for(var i = 0;i < selectList.length;i++) {
            if(selectList[i].classList.contains("selected")) {
                if(selectList[i].classList.contains("classify-title") || selectList[i].classList.contains("classify-sub")) {
                    var classifySub = addClassifySub(name, selectList[i].parentNode);
                    if(classifySub.parentNode.displayFlag) {
                        classifySub.style.display = "block";
                    }
                }else if(selectList[i].classList.contains("classify-list-title")) {
                    var classifyEle = document.createElement("dd");
                    classifyEle.className = "classify-ele";
                    classifyEle.name = name;
                    classifyEle.num = 0;// 待添加未完成数目
                    classifyList.appendChild(classifyEle);       
                    initEle(classifyEle, []);               
                }else {
                    alert("error");
                }
            }
        }
    }
}

// 添加删除按钮
function addRemoveImg(ele) {
    var removeImg = document.createElement("img"),
        data = getVar("data")(),
        obj = {};
    removeImg.src = "img/remove.png";
    removeImg.className = "remove-img";
    removeImg.style.display = "none";
    removeImg.style.position = "absolute";
    removeImg.style.right = "15px";
    removeImg.style.marginTop = "10px";
    ele.appendChild(removeImg);
    // 点击删除后，弹出确认浮层
    addEvent(removeImg, "click", function(){
        if(confirm("是否删除？")) {
            var classifyList = document.getElementsByClassName("classify-list")[0];
            if(this.parentNode.classList.contains("classify-title")) {
                var thisNode = this.parentNode.parentNode.parentNode;
                obj.classify = this.parentNode.name;
                modifyData("remove", obj);
                obj = {};

                classifyList.removeChild(thisNode);    
                updateAlltask();
                updateNum();
            }else if(this.parentNode.classList.contains("classify-sub")) {
                obj.classify = this.parentNode.parentNode.name;
                obj.task = this.parentNode.name;              
                modifyData("remove", obj);
                obj = {};

                this.parentNode.parentNode.removeChild(this.parentNode);                
                updateAlltask();
                updateNum();
            }else {
                alert("confirm error");
            }
        }
    });
}

// 按日期大小排序
function sortDate(arr) {
    var len = arr.length,
        i = 0,
        sum = 0,
        temp = "";    
    for(var i = 0;i < len - 1;i++) {
        for(var j = 0;j < len - i - 1;j++) {
            if(compare(arr[j], arr[j + 1])) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// 比较日期
function compare(a, b) {
    var aList = a.split("-"),
        bList = b.split("-"),
        len = aList.length;
    for(var i = 0;i < len;i++) {
        if(aList[i] - 0 > bList[i] - 0) {
            return true;
        }else if(aList[i] - 0 < bList[i] - 0) {
            return false;
        }
    }
}

// 判断日期格式是否正确
function isDate(date) {
    if(/^\d{4}-\d{1,2}-\d{1,2}$/.test(date)) {    
        return true;
    }else {
        return false;
    }
}

// 去除二维数组中length为0的项，并返回修改后的arr
function reviseArr(data) {
    var len = data.length,
        i = 0;
    for(i = len - 1;i > -1;i--) {
        if(data[i].length === 0) {
            data.splice(i, 1);
        }
    }
    return data;
}