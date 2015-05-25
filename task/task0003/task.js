/**
 * Created by Ooop on 2015/5/24.
 */
init();
//function task(title,time,category,flag,info) {
//    this.title = title;
//    this.time = time;
//    this.category = category;
//    this.flag = flag;
//    this.info = info;
//}
//var t = new task("task1","2015-05-24","百度IFE项目","实现任务三BlahBlahBlahBlahBlah");
//var tasklist = [["task1","2015-05-24","百度IFE项目",1,"实现任务三BlahBlahBlahBlahBlah"],
//    ["task2","2015-05-25","默认分类",1,"吃早饭BlahBlahBlahBlahBlah"],
//    ["task3","2015-05-26","毕业设计",1,"做毕业设计BlahBlahBlahBlahBlah"],
//    ["task4","2015-05-27","社团活动",1,"去广场参加活动BlahBlahBlahBlahBlah"],
//    ["task5","2015-05-28","家庭生活",1,"回家看看BlahBlahBlahBlahBlah"],
//    ["task6","2015-05-29","百度IFE项目",1,"实现任务四BlahBlahBlahBlahBlah"]
//    ];
//var taskObj = JSON.stringify(tasklist);
//var s = window.localStorage;
//s.setItem("task",taskObj);
//var t_num = tasklist.length;
//var ife_num = 0;
//var gra_num = 0;
//var club_num = 0;
//var fam_num = 0;
//var def_num = 0;
//var total = document.getElementById("total");
//var ife = document.getElementById("ife");
//var gra = document.getElementById("graduate");
//var club = document.getElementById("club");
//var fam = document.getElementById("family");
//var def = document.getElementById("default");
//for(var i=0;i<t_num;i++) {
//    switch (tasklist[i][2]) {
//        case "百度IFE项目":
//            ife_num++;
//            break;
//        case "毕业设计":
//            gra_num++;
//            break;
//        case "社团活动":
//            club_num++;
//            break;
//        case "家庭生活":
//            fam_num++;
//            break;
//        default :
//            def_num++;
//            break;
//    }
//}
//total.innerHTML = t_num;
//ife.innerHTML = ife_num;
//gra.innerHTML = gra_num;
//club.innerHTML = club_num;
//fam.innerHTML = fam_num;
//def.innerHTML = def_num;
//console.log(taskObj);

var taskData = [[{
    category : "默认分类",
    task : "task1",
    date : "2015-05-20",
    flag : false,
    content : "下楼吃早饭BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
},{
    category : "百度IFE项目",
    task : "task2",
    date : "2015-05-21",
    flag : true,
    content : "实现任务三BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
},{
    category : "毕业设计",
    task : "task3",
    date : "2015-05-22",
    flag : true,
    content : "完成毕业设计BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
}],[{
    category : "社团活动",
    task : "task4",
    date : "2015-05-23",
    flag : false,
    content : "去广场参加活动BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
}],[{
    category : "家庭生活",
    task : "task5",
    date : "2015-05-24",
    flag : true,
    content : "回家看看BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
},{
    category : "百度IFE项目",
    task : "task6",
    date : "2015-05-25",
    flag : false,
    content : "实现任务四BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
},{
    category : "默认分类",
    task : "task7",
    date : "2015-05-26",
    flag : false,
    content : "玩会暴雪游戏BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
}]];
localStorage.setItem("testData", JSON.stringify(testData));
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