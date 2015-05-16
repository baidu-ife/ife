init();
function getLocalData() {
    var testData = [[{
        classify : "默认分类",    
        task : "task1",
        date : "2015-5-10",
        sub : "to-do 3",
        completed : true,
        content : "打游戏"
    },{
        classify : "默认分类",
        task : "task2",
        date : "2015-5-10",
        sub : "to-do 4",
        completed : true,
        content : "打游戏"
    },{
        classify : "默认分类",
        task : "task2",
        date : "2015-5-17",
        sub : "to-do 4",
        completed : true,
        content : "打游戏"
    }
    
    
    ],[{
        classify : "社团活动",
        task : "task3",
        date : "2015-5-12",
        sub : "to-do 9",
        completed : true,
        content : "打游戏"
    }],[{
        classify : "baidu-",
        task : "task4",
        date : "2015-5-10",
        sub : "to-do 1",
        completed : true,
        content : "打游戏"
    },{
        classify : "baidu-",
        task : "task5",
        date : "2015-5-13",
        sub : "to-do 2",
        completed : false,
        content : "打游戏"
    },{
        classify : "baidu-",
        task : "task6",
        date : "2015-5-10",
        sub : "to-do 7",
        completed : true,
        content : "打游戏"
    }]];
    localStorage.setItem("testData", JSON.stringify(testData));
    console.log(JSON.parse(localStorage.getItem("testData")));
    return JSON.parse(localStorage.getItem("testData"));
}

function getVar(temp) {
    var x;
    switch(temp) {
        case "data" : x = getLocalData();break;
        case "selectList" : {
            x = [];
            x.push($(".alltask"));
            x.push($(".classify-list-title"));
            x.push.apply(x, document.getElementsByClassName("classify-title"));
            x.push.apply(x, document.getElementsByClassName("classify-sub"));
            break;}
        case "subList" : {
            x = uniqArray($(".classify-list").getElementsByClassName("classify-sub"));
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
        classifyMenu[i] = data[i][0].classify;
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

    // 初始化所有任务
    var subList = getVar("subList")();

    for(var i = 0;i < subList.length;i++) {
        addClassifySub(subList[i].name, alltask.parentNode);
    }
    addEvent(alltask, "click", selected);
    addEvent(alltask, "click", setDisplay);

    // 新增分类
    addEvent($(".add"), "click", addClassify);
    
console.log("end");
    
}

//////////////////////////////////////////////////////////////////////


// 初始化任务列表
function initTaskList(task) {
    var data = getVar("data")(),
        taskList = [],
        dateList = [],
        list = $(".task-list"),
        eleIndex = task.parentNode.parentNode.index;
    // 将包含task的对象，存入taskList
console.log(task.name);
    for(var i = 0;i < data[eleIndex].length;i++) {
        if(task.name === data[eleIndex][i].task) {
            taskList.push(data[eleIndex][i]);
        }
    }
console.log(taskList);
    // 将date存入dateList
    for(var i = 0;i < taskList.length;i++) {
        /*var arr = taskList[i].date.split("-");
        var temp = arr[0];
        arr[0] = arr[arr.length - 1];
        arr[arr.length - 1] = temp;
        dateList.push(arr.join("\/"));*/
        dateList.push(taskList[i].date);
    }
    dateList = uniqArray(dateList);

    for(var i = 0;i < dateList.length;i++) {
        var taskEle = document.createElement("li");
        taskEle.className = "task-ele";
        list.appendChild(taskEle);

        var task = document.createElement("dl");
        taskEle.appendChild(task);

        var taskDate = document.createElement("dt");
        taskDate.className = "task-date";
        taskDate.innerHTML = dateList[i];

    }
}



/////////////////////////////////////////////////////////////////////

// 初始化分类列表内的分类
function initEle(ele, taskMenu) {
    // 项目列表初始化
    var classify = document.createElement("dl");
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
function saveData() {
    
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

// 点击后，选中该元素
function selected(event) {
    var selectList = getVar("selectList")();

    for(var i = 0;i < selectList.length;i++) {
        selectList[i].classList.remove("selected");
    }
    this.classList.add("selected");
    if(this.classList.contains("classify-sub")) {
        initTaskList(this);
    }
}

// 添加项目
function addClassifyEle(ele, parent) {
    var classifyTitle = document.createElement("dt");
    classifyTitle.className = "classify-title";
    addEvent(classifyTitle, "click", selected);
    parent.appendChild(classifyTitle);
    classifyTitle.innerHTML = "<img src='img/classify.png'> " + ele.name + 
        " (<span class='num'>" + ele.num + "</span>)";

    // 列表头添加remove按钮
    addRemoveImg(classifyTitle);
    addEvent(classifyTitle, "mouseover", removeEle);
    addEvent(classifyTitle, "mouseout", removeImg);

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
        " (<span class='num'>" + 0 + "</span>)";// 待添加 未处理项的个数
    classifySub.style.display = "none";
    parent.appendChild(classifySub);
    
    // task元素添加remove按钮
    addRemoveImg(classifySub);
    addEvent(classifySub, "mouseover", removeEle);
    addEvent(classifySub, "mouseout", removeImg);
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
    var removeImg = document.createElement("img");
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
                classifyList.removeChild(this.parentNode.parentNode.parentNode);
            }else if(this.parentNode.classList.contains("classify-sub")) {
                this.parentNode.parentNode.removeChild(this.parentNode);
            }else {
                console.log("confirm error");
            }
        }
    });
}


