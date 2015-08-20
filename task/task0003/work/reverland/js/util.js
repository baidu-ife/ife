// BUG
// 1. 最左边选中状态不对 Done
// 2. 中间刷新不完全 Done
// 3. 中间选中状态没有设计
var $ = function() {
    return document.querySelector(arguments[0])
}
// 特性支持
if (!window.localStorage) {
    alert("您的浏览器不支持localStorage");
}

// 模块存储全局信息
// var $TODO$ = {
//     var curCate;
//     var curSubCate;
//     var status;
//     var curTodo;
// }


function init() {
    // 刷新最左边Cate栏
    var total = 0;
    var cateNum;
    $(".cate-list").innerHTML = "<h2>分类列表</h2>";
    var cates = JSON.parse(localStorage.$TODO$);
    var status = JSON.parse(localStorage.status);
    for (var cate in cates) {
        cateNum = calcCate(cates[cate])
        total += cateNum;
        var liCate = document.createElement("li");
        liCate.innerHTML = "<span>" + cate + "</span>(<span>" + cateNum + "</span>)<span class=\"cate-del-icon\">&#x2715;</span>"
        var ulSubCate = document.createElement("ul");
        for (var subCate in cates[cate]) {
            var liSubCate = document.createElement("li");
            if (status.curCate === cate && status.curSubCate === subCate) {
                liSubCate.className = "cate-list-toggle"
            }
            liSubCate.innerHTML = subCate + "(<span>" + calcSub(cates[cate][subCate]) + "</span>)<span class=\"cate-del-icon\">&#x2715;</span>"
            ulSubCate.appendChild(liSubCate)
        }
        liCate.appendChild(ulSubCate);
        $(".cate-list").appendChild(liCate)
    }
    //更新总计数
    $(".cate-sum > p > span").textContent = total;
    //-----------------
    //刷新中间状态栏
    var todos = filterStatus(status.curStatus);
    var dates = []
    for (var i in todos) {
        //注意要去重
        if (dates.indexOf(todos[i]["date"]) == -1){
            dates.push(todos[i]["date"])
        }
    }
    dates = dates.sort();
    var taskList = $(".task-list > ul");
    taskList.innerHTML = ""
    for (var i in dates) {
        // DOM树操作
        // 插入日期
        // 插入task title
        // 呵呵呵
        var todoByDates = filterDate(dates[i])
        var dateLi = document.createElement("li");
        var dateP = document.createElement("p");
        dateP.textContent = dates[i]
        dateP.className = "task-list-date"
        dateLi.appendChild(dateP)
        // 为什么非最后一个的del icon消失了
        // appendChild时node只有一个，append到新地方后老地方的node就消失了
        // node还有这种坑= =
        var todoUl = document.createElement("ul")
        for (var ind in todoByDates) {
            var todoLi = document.createElement("li")
            todoLi.textContent = todoByDates[ind]["title"]
            todoLi.className = "task-list-item"
            // 完成的是绿色的
            if (todoByDates[ind]["status"] === "finished") {
                todoLi.classList.add("task-list-finished")
            }
            todoLi.innerHTML += "<span class=\"task-del-icon\">✕</span>"
            todoUl.appendChild(todoLi)
            dateLi.appendChild(todoUl)
        }
        taskList.appendChild(dateLi);
    }
    // 刷新最右边todo栏
    var curTodo = filterDate(status.curDate)[status.curInd]
    if (!curTodo) {
        return;
    }
    $(".todo-title > h2").innerHTML = curTodo.title
    $(".todo-date-data").value = curTodo.date
    $(".todo-content-data").innerHTML = curTodo.content
}

function calcSub(subCate) {
    return subCate.length;
}

function calcCate(cate) {
    var n = 0;
    for (var i in cate) {
        n += calcSub(cate[i]);
    }
    return n;
}

function filterStatus(status) {
    var statusData = JSON.parse(localStorage.status);
    var cate = statusData.curCate;
    var subCate = statusData.curSubCate;
    var data = JSON.parse(localStorage.$TODO$)[cate][subCate];
    if (status == "all") {
        return data;
    }
    return data.filter(function(e, i, a){
        return e["status"] === status;
    });
}

function filterDate(date) {
    var statusData = JSON.parse(localStorage.status);
    var data = filterStatus(statusData.curStatus)
    if (!data) {
        return [];
    }
    return data.filter(function(e, i, a) {
        return e["date"] === date;
    })
}

function addCate(cate, subCate) {
    //添加到localStorage
    var data = JSON.parse(localStorage.$TODO$)
    var status = JSON.parse(localStorage.status);
    if (cate in data) {
        alert(cate + "已经在分类列表中了")
    }
    data[cate] = {
    }
    data[cate][subCate] = [],
    localStorage.$TODO$ = JSON.stringify(data)
    // 刷新状态
    // FIXME
    status.curCate = cate
    status.curSubCate = subCate
    status.curDate = undefined
    status.curInd = undefined
    localStorage.status = JSON.stringify(status)
    //刷新页面反馈
    init()
}

function addTask(title, date) {
    var data = JSON.parse(localStorage.$TODO$)
    var status = JSON.parse(localStorage.status);
    var date = date || (new Date()).toISOString().split("T")[0];
    var newTodo = {
        "title": title,
        "date": date,
        "content": "这里填写内容",
        "status": "unfinished"
    }
    // 刷新状态
    // FIXME
    data[status.curCate][status.curSubCate].push(newTodo)
    status.curDate = date;
    status.curInd = 0;
    localStorage.$TODO$ = JSON.stringify(data)
    localStorage.status = JSON.stringify(status)
    init()
}

// --------------------------------------------------------------
// 测试
// 数据结构设计
var testData = {
    "百度IFE项目":
        {
        "task1": [
            {
                title: "todo-1",
                date: "2015-04-30",
                content: "完成task3的编码",
                status: "finished"
            },
            {
                title: "todo-2",
                date: "2015-05-10",
                content: "完成task4的编码",
                status: "unfinished"
            },
        ],
        "task2": [
            {
                title: "todo-3",
                date: "2015-04-30",
                content: "完成task3的编码",
                status: "finished"
            },
            {
                title: "todo-4",
                date: "2015-05-10",
                content: "完成task4的编码",
                status: "unfinished"
            },
            {
                title: "todo-5",
                date: "2015-05-10",
                content: "我有好多话要说啊，人生怎么这么艰难啊",
                status: "finished"
            },
            {
                title: "todo-6",
                date: "2015-06-10",
                content: "完成task6的编码",
                status: "finished"
            },
        ]
    },
    "毕业设计": {
        "task1": [
            {
                title: "todo-1",
                date: "2015-04-30",
                content: "完成task3的编码",
                status: "finished"
            },
            {
                title: "todo-2",
                date: "2015-05-10",
                content: "完成task4的编码",
                status: "unfinished"
            },
        ],
        "task2": [
            {
                title: "todo-3",
                date: "2015-04-30",
                content: "完成task3的编码",
                status: "finished"
            },
            {
                title: "todo-4",
                date: "2015-05-10",
                content: "完成task4的编码",
                status: "unfinished"
            },
            {
                title: "todo-5",
                date: "2015-05-10",
                content: "完成task8的编码",
                status: "finished"
            },
        ]
    },
    "默认分类": {

    },
}

var testStatus = {
    curCate: "百度IFE项目",
    curSubCate: "task2",
    curStatus: "all",
    curDate: "2015-05-10",
    curInd: 1,
}
// helper function
function assert(cond, desp) {
    if (cond) {
        console.log(desp + " passed");
        return true;
    } else {
        throw new Error(desp + " assertion error");
    }
}
// test
localStorage.$TODO$ = JSON.stringify(testData);
localStorage.status = JSON.stringify(testStatus);
assert(calcSub(testData["百度IFE项目"]["task1"]) === 2, "calcSub");
assert(calcCate(testData["百度IFE项目"]) === 6, "calcCate");
// 对象不能判断相等
assert(filterStatus("finished")||filterStatus("finished")[0]["title"] === "todo-3", "filterStatus")
assert(filterDate("2015-05-10")||filterDate("2015-05-10")[1]["title"] === "todo-5", "filterDate")
init();

