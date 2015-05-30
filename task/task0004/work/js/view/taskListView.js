/*
* taskListView.js
 */

define(function (require, exports, module) {
    var _=require("../lib/mvc"),
        Task=require("../model/taskModel").Model_Task;

    /**
     * 任务列表视图
     * @type {TaskListView}
     */
    var TaskListView = _.View.extend({
        model: Task,
        refresh: function() {
            var groups = this.groupByTime(),
                section,
                timeSortArr=[],
                fragmentContainer = document.createDocumentFragment();

            for (var time in groups) {
                if (groups.hasOwnProperty(time)) {
                    timeSortArr.push(time);
                }
            }

            timeSortArr.sort(function (bef,aft) {
                bef=bef.split('-'), aft=aft.split('-');
                var befDate=new Date(bef[0],bef[1],bef[2]),
                    aftDate=new Date(aft[0],aft[1],aft[2]);

                return (aftDate-befDate);
            });

            var time;
            for(var i=0; i<timeSortArr.length; i++){
                time=timeSortArr[i];
                section = this.createSectionDom(time, groups[time]);
                fragmentContainer.appendChild(section);
            }

            var tasksDom = this.$(".tasks");
            tasksDom.innerHTML = "";
            fragmentContainer.childNodes.length > 0 ? tasksDom.appendChild(fragmentContainer) : (tasksDom.innerHTML = '<p class="no-task-tip">还没有任务哦</p>');
        },
        addTaskDom:function (nTask) {
            this.allTaskArr.push(nTask);
            this.curFilterStatus !== "done" && this.curTaskArr.push(nTask);
            this.refresh();
        },
        updateTaskDom:function (uTask) {
            this.refresh();
        },
        createSectionDom: function(time, tasks) {
            var section = document.createElement("section");
            addClass(section, "time-node");
            section.innerHTML = '<p class="title">' + time + '</p>';
            section.innerHTML += this.createTaskItemDom(tasks);

            return section;
        },
        createTaskItemDom: function(tasks) {
            var res = "",
                item,
                className;
            for (var i = 0; i < tasks.length; i++) {
                item = tasks[i];
                className = item.get("status") == 1 ? "item done" : "item";
                res += '<a data-id="'+ item.get("id") +'" class="' + className + '">' + item.get("header") + '</a>';
            }
            return res;
        },
        groupByTime: function() {
            var curTaskArr;
            if (!(curTaskArr = this.curTaskArr)) return;

            var temp = {},
                taskItem,
                agroup;
            for (var i = 0; i < curTaskArr.length; i++) {
                taskItem = curTaskArr[i];
                temp[taskItem.get("time")] || (temp[taskItem.get("time")] = []);
                temp[taskItem.get("time")].push(taskItem);
            }

            return temp;
        },
        setCurTaskItemDom:function (taskItemDom) {
            this.curTaskItemDom && removeClass(this.curTaskItemDom, "z-active");
            addClass(taskItemDom, "z-active");
            this.curTaskItemDom = taskItemDom;
        },
        filterByStatus:function (type) {
            var filterRes=[];
            var temp;

            switch(type){
                case "all":
                    for(var i=0; i<this.allTaskArr.length; i++){
                        filterRes.push(this.allTaskArr[i]);
                    }
                    return filterRes;
                case "done":
                    temp=1;
                    break;
                case "undone":
                    temp=0;
                    break;
            }

            for(var i=0; i<this.allTaskArr.length; i++){
                if(this.allTaskArr[i].get("status")==temp){
                    filterRes.push(this.allTaskArr[i]);
                }
            }

            return filterRes;
        }
    });


    module.exports=TaskListView;
})