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
    }],[{
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
/*
function getData() {
    if(idata) {
        return function() {
            return idata;
        }
    }else {
        var idata = getLocalData();
        return function() {
            return idata;
        }
    }
}

function test() {
    var data = getData();
    data.pop();
console.log(data);
    
}
*/

var data = getLocalData();


// 初始化
function init() {
    var data = getLocalData();
    var dLen = data.length;// 项目个数
    
    var num = document.getElementsByClassName("num");;// 待完成个数组成的数组
    var classifyList = document.getElementsByClassName("classify-list")[0];   
    var classifyMenu = [];// 分类集合
    for(var i = 0;i < dLen;i++) {
        classifyMenu[i] = data[i][0].classify;
    }
console.log(classifyMenu);

    // 初始化分类列表
    for(var i = 0;i < dLen;i++) {
        var classifyEle = document.createElement("li"),
            eleNum = 0,
            m = 0,
            taskMenu = [];// 列表内的task集合        

        // 初始化task
        for(var j = 0;j < data[i].length;j++) {
            /*if(m == 0) {
                taskMenu[m] = {
                    task : "";
                    num : 0;
                };    
                taskMenu[m].task = data[i][j].task;
                if(data[i][j].completed == false) {
                    taskMenu[m].num++;
                    eleNum++;
                }
            }else if() {
            
            }*/
            taskMenu[j] = data[i][j].task;
        }
        taskMenu = uniqArray(taskMenu);// 项目下所有task
console.log("task:"+taskMenu);       
        
        classifyEle.className = "classify-ele";
        classifyEle.name = classifyMenu[i];
        /*
        for(var j = 0;j < dLen;j++) {

                taskObj.task = data[j].task;
                taskMenu.push(taskObj);
            }
        }
        for(var j = 0;j < taskMenu.length;j++) {
            
        }*/
        classifyEle.num = eleNum;
        classifyList.appendChild(classifyEle);       
        initEle(classifyEle, taskMenu);
    }
    // 新增分类
    addEvent($(".add"), "click", addClassifySub);
console.log("end");
    
}


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
            thisNode = thisNode.nextSibling;
        }
    }else {
        var thisNode = this.nextSibling;
        while(thisNode) {
            thisNode.style.display = "none";
            thisNode = thisNode.nextSibling;
        }
    }
}

// 点击后，选中该task
function selectTask(event) {
    var classifySubList = document.getElementsByClassName("classify-sub");
    for(var i = 0;i < classifySubList.length;i++) {
        classifySubList[i].classList.remove("sub-selected");
    }
    this.classList.add("sub-selected");
}

// 新增分类
function addClassifySub(event) {
    var taskName = prompt("输入分类名", ""),
        classifySubList = document.getElementsByClassName("classify-sub");
    for(var i = 0;i < classifySubList.length;i++) {
        if(classifySubList[i].classList.contains("sub-selected")) {
////////////////////////////////////////////////////////////////////            
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
            switch(this.parentNode.className) {
                case "classify-title" : {// 删除列表项
                    classifyList.removeChild(this.parentNode.parentNode.parentNode);
                    break;
                }
                case "classify-sub" : {// 删除task项
                   this.parentNode.parentNode.removeChild(this.parentNode);
                   break;
                }
                default : console.log("confirm error");
            }
        }
    });
}

// 初始化分类列表内的分类
function initEle(ele, taskMenu) {
    // 项目列表初始化
    var classify = document.createElement("ul");
    ele.appendChild(classify);
    // 列表头初始化
    var classifyTitle = document.createElement("div");
    classifyTitle.className = "classify-title";
    classify.appendChild(classifyTitle);
    classifyTitle.innerHTML = "<img src='img/classify.png'> " + ele.name + 
        " (<span class='num'>" + ele.num + "</span>)";

    // 列表头添加remove按钮
    addRemoveImg(classifyTitle);
    addEvent(classifyTitle, "mouseover", removeEle);
    addEvent(classifyTitle, "mouseout", removeImg);

    // 点击列表头后，隐藏/显示内容
    addEvent(classifyTitle, "click", setDisplay);

    // 初始化分类内元素
    for(var i = 0;i < taskMenu.length;i++) {
        var classifySub = document.createElement("li");
        classifySub.className = "classify-sub";
        classifySub.innerHTML = "<img src='img/task.png'> " + taskMenu[i] + 
            " (<span class='num'>" + 0 + "</span>)";// 待添加 未处理项的个数
        classify.appendChild(classifySub);
        
        // task元素添加remove按钮
        addRemoveImg(classifySub);
        addEvent(classifySub, "mouseover", removeEle);
        addEvent(classifySub, "mouseout", removeImg);
        // task元素点击后被选中
        addEvent(classifySub, "click", selectTask);
    }
}
