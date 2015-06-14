/*
* taskInfoView.js
 */

define(function (require, exports, module) {
    var _=require("../lib/mvc");
    var TaskDetailView=require("./taskDetailView"),
        TaskEditView=require("./taskEditView"),
        Task=require("../model/taskModel").Model_Task;
    /**
     * 任务信息视图，包含任务详细和编辑视图
     * @type {TaskInfoView}
     */
    var TaskInfoView = _.View.extend({
        model:Task,
        initialize:function () {
            var that=this;

            this.detailView = new TaskDetailView($("#taskDetail"),{
                elements:{
                    headerDom:this.$(".header"),
                    contentDom:this.$(".content"),
                    timeDom:this.$(".time"),
                    operateBtnDom:this.$(".operates")
                },
                events:{
                    "click #completeTask":"completeTaskHandler",
                    "click #editTask":"editTaskHandler"
                },
                handlers:{
                    completeTaskHandler:function (e) {
                        if(!window.confirm("确定完成任务了吗？")) 
                            return false;

                        that.updateTask({
                            status:1
                        });

                        this.hideOperateBtns();
                    },
                    editTaskHandler:function (e) {
                        that.showEdit();
                    }
                }
            });

            this.editView = new TaskEditView($("#taskEdit"),{
                elements:{
                    headerDom:this.$("#inputHeader"),
                    contentDom:this.$("#inputContent"),
                    timeDom:this.$("#inputTime")
                },
                events:{
                    "click #sure":"sureHandler",
                    "click #cancel":"cancelHandler",
                    "change input":"valueHasChangeHandler",
                    "change textarea":"valueHasChangeHandler"
                },
                handlers:{
                    sureHandler:function (e) {
                        this.hasEditedUnSave=!1;

                        var elements=this.elements,
                            nHeader=elements.headerDom.value,
                            nContent=elements.contentDom.value,
                            nTime=elements.timeDom.value;

                        if(nHeader===""||nContent===""){
                            Tip.show("内容和标题不能为空");
                            return;
                        }

                        if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(nTime)){
                            Tip.show("日期格式不对");
                            return;
                        }

                        var attrs = {
                            header:nHeader,
                            content:nContent,
                            time:nTime
                        };

                        that.updateTask(attrs);
                    },
                    cancelHandler:function (e) {
                        if(this.hasChanged()){
                            if(!window.confirm("有未保存的内容，确认关闭？")) 
                                return false;
                        }
                        that.showDetail();
                    },
                    valueHasChangeHandler:function (e) {
                        this.hasEditedUnSave=!0;
                    }
                }
            });

            this.curTask = new Task();
            this.curContentView="detail";//detail或者edit
            this.curTaskIsNew = !1;
        },
        showEdit:function () {
            var attrs={
                header:this.curTask.get("header"),
                time:this.curTask.get("time"),
                content:this.curTask.get("content")
            };
            this.editView.show(attrs);
            this.curContentView="edit";

            return true;
        },
        showDetail:function () {
            var attrs={
                header:this.curTask.get("header"),
                time:this.curTask.get("time"),
                content:this.curTask.get("content"),
                status:this.curTask.get("status")
            };
            this.editView.hide();
            this.detailView.refresh(attrs);
            this.curContentView="detail";

            return true;
        },
        hasChanged:function () {
            return this.editView.hasChanged();  
        },
        updateTask:function (attrs) {
            if(this.isCreatingTask){
                // 因为要访问taskList集合，要添加到集合中去，但是在View里又访问不到，这种方式对不对？？
                this.trigger("addNewTask", {
                    attrs:attrs,
                    success:function (nTask) {
                        this.curTask=nTask;
                    }
                });
                
                this.isCreatingTask=false;
            }else{
                this.curTask.set(attrs);
                this.trigger("updateCurTask",{
                    theTask:this.curTask
                });
            }
        },
        willAddTask:function () {
            if(this.curContentView==="edit"){
                if(this.hasChanged()){
                    if(!window.confirm("有未保存的内容，确认关闭？")) 
                        return false;
                }
                // var oldTask=this.curTask.clone();
                this.editView.clear();
            }else{
                this.editView.show();
            }

            this.curContentView="edit";
            // this.curTask=null;
            this.isCreatingTask=true;
        },
        selectTaskItem:function (activeTask) {
            if(this.curContentView==="detail"){
                this.curTask=activeTask;
                this.showDetail();
                return true;
            }else if(this.curContentView==="edit"){
                if(this.hasChanged()){
                    if(!window.confirm("有未保存的内容，确认关闭？")) 
                        return false;
                }
                this.curTask=activeTask;
                this.showDetail();
                return true;
            }
        }
    });
    
    module.exports=TaskInfoView;
})