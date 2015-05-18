/**
 * Created by xieyicheng on 2015/5/2.
 */
var typeList;
var taskList;
var golbal;
var iniiData = {
    golbal:{
        firstType_id:0,
        secondType:null,
        status:1,
        baseTaskId:5,
        baseTypeId:2,
        currentTaskId:null,
        taskNum:7
    },
    typeList:[
    {
        id:0,
        name:"默认分类",
        size:4,
        taskList:[
          {
              secondType:"默认任务",
              todoSize:4
          }
        ]
    },
    {
        id:1,
        name:"毕业设计",
        size:3,
        taskList:[
            {
                secondType:"task2",
                todoSize:1
            },
            {
                secondType:"task1",
                todoSize:2
            }
        ]

    }
     ],
     taskList: [
    {
        id:0,
        date:"2015-04-25",
        firstType_id:1,
        secondType:"task1",
        status:1,
        title:"task1",
        content:"这里是内容"
    },
    {
        id:1,
        date:"2015-04-05",
        firstType_id:1,
        secondType:"task1",
        status:1,
        title:"task2",
        content:"这里是内容"
    },
    {
        id:2,
        date:"2015-04-15",
        firstType_id:1,
        secondType:"task2",
        status:1,
        title:"task3",
        content:"这里是内容"
    },
    {
        id:3,
        date:"2015-04-27",
        firstType_id:0,
        secondType:null,
        status:1,
        title:"task4",
        content:"这里是内容"
    },
    {
        id:4,
        date:"2015-04-15",
        firstType_id:0,
        secondType:null,
        status:1,
        title:"task5",
        content:"这里是内容"
    },
    {
        id:5,
        date:"2015-04-15",
        firstType_id:0,
        secondType:null,
        status:1,
        title:"task6",
        content:"这里是内容"
    },
    {
        id:6,
        date:"2015-04-15",
        firstType_id:0,
        secondType:null,
        status:0,
        title:"task7",
        content:"这里是内容"
    }
]};

if(store.getItem("xyc-cn-data")=="data"){
    taskList = store.getItem("taskList");
    typeList = store.getItem("typeList");
    golbal = store.getItem("golbal");
    golbal.editing = false;//判断是否在编辑
    golbal.secondType = null;
}
else{
    taskList = iniiData.taskList;
    typeList = iniiData.typeList;
    golbal = iniiData.golbal;
    store.setItem("xyc-cn-data","data");
    store.setItem("taskList",taskList);
    store.setItem("typeList",typeList);
    store.setItem("golbal",golbal);
    golbal.editing = false;
    golbal.secondType = null;

}
taskList.sort(function(first,second){ return first.date>second.date});