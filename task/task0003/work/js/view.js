/**
 * 视图
 */


// 全局变量－能直接在视图里引用吗？这样的话每个视图实例都要共享这两个变量啊！！
 // var categoryList = new CategoryList(); // 所有分类
 // var taskList = new TaskList(); // 所有任务


/**
 * 类别列表视图
 * @View {CategoryListView}
 */
var CategoryListView = View.extend({
    model: Category,
    /**
     * 添加dom结构，不添加到集合中，为完成
     * @param {string} name 分类名称
     * @param {int} parId 分类父级ID
     */
    addCategoryItem: function(name, parId) {
        var categoryList=this.categoryList;
        var nCateItem = categoryList.addCategoryItem(name, parId);
        var parCateDom;

        var nli=this.createElement(nCateItem);

        if(parId==-1){
            this.$(".categorys").appendChild(nli);
        }else if(parCateDom=this.curCategoryItemDom){
            addClass(parCateDom,"has-sub-category");
            addClass(parCateDom,"z-open");
            var ul;
            parCateDom.lastChild.tagName.toLowerCase() == "ul" ? (ul=parCateDom.lastChild) : (ul=document.createElement("ul"), addClass(ul,"sub-category"));
            ul.appendChild(nli);
            parCateDom.appendChild(ul);
        }

        categoryList.save(categoryList.localStorageName);        
    },
    removeCategoryItem:function (cateId, isDelSubCate,cateItemDom) {
        var categoryList=this.categoryList;
        var taskList=this.taskList;

        categoryList.removeCategoryItem(cateId, isDelSubCate);
        taskList.removeTaskByCategoryId(cateId);

        taskList.save(taskList.localStorageName);
        categoryList.save(categoryList.localStorageName);

        if(cateItemDom===this.curCategoryItemDom){
            var nextDom = getNextSiblingElement(cateItemDom);
            if(!nextDom) {
                nextDom=cateItemDom.parentNode.firstChild;
            }
            if(nextDom===cateItemDom){
                nextDom=cateItemDom.parentNode;
            }

            this.selectCategoryItemHandler({
                target:nextDom
            });
        }

        var parDom=cateItemDom.parentNode;
        if(hasClass(parDom, "sub-category") && parDom.childNodes.length <= 1){
            var parDom2=parDom.parentNode;
            parDom2.removeChild(parDom);
        }else{
            parDom.removeChild(cateItemDom);
        }
    },
    createElement: function(cateItem) {
        var li = document.createElement("li");
        var id=cateItem.get("id");
        li.setAttribute("data-id",id);
        addClass(li, "level");
        li.innerHTML = '<a class="category-name" data-id="' + id + '">' + cateItem.get("name") + '(<span class="num">' + this.getTaskCountOfCategoryId(id) + '</span>)</a>';
        (cateItem.id != 0) && (li.innerHTML += '<a class="del" data-id="' + id + '">&times;</a>');

        return li;
    },
    getTaskCountOfCategoryId:function (id) {
        var taskList=this.taskList;
        var num=taskList.getCountOfCategoryId(id);
        return num;
    },
    addCategorys: function(records) {
        var parIdGroup = {},
            fragmentContainer = document.createDocumentFragment();
        for (var i in records) {
            if (records.hasOwnProperty(i)) {
                var cateItem = records[i],
                    parId = cateItem.get("parId");
                parIdGroup[parId] || (parIdGroup[parId] = []);
                var li = this.createElement(cateItem);
                parIdGroup[parId].push({
                    dom: li,
                    category: cateItem
                });
                cateItem.dom = li;
            }
        }
        for (var i in parIdGroup) {
            if (parIdGroup.hasOwnProperty(i)) {
                var arr = parIdGroup[i];
                if (i == -1) {
                    for (var j = 0; j < arr.length; j++) {
                        addClass(arr[j].dom, "level-1");
                        fragmentContainer.appendChild(arr[j].dom);
                    }
                } else {
                    var ul = document.createElement("ul");
                    addClass(ul, "sub-category");
                    for (var j = 0; j < arr.length; j++) {
                        ul.appendChild(arr[j].dom);
                    }
                    var parLi = records[i].dom;
                    addClass(parLi, "has-sub-category");
                    parLi.appendChild(ul);
                }
            }

        }

        fragmentContainer && this.$(".categorys").appendChild(fragmentContainer);
    },
    setCurCategoryItemDom: function(cateItemDom) {
        this.curCategoryItemDom && removeClass(this.curCategoryItemDom, "z-active");
        addClass(cateItemDom, "z-active");
        if (hasClass(cateItemDom, "has-sub-category")) {
            toggleClass(cateItemDom, "z-open");
        }
        this.curCategoryItemDom = cateItemDom;
    },
    addNewTaskToUpdateNum:function () {
        if(this.curCategoryItemDom){
            var numDom=getElementsByClassName(this.curCategoryItemDom, "num")[0];
            var num = parseInt(numDom.innerHTML);
            num++;
            numDom.innerHTML=num;
        }
    }
});


/**
 * 任务列表视图
 * @type {TaskListView}
 */
var TaskListView = View.extend({
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


/**
 * 任务详细视图
 * @type {TaskDetailView}
 */
var TaskDetailView = View.extend({
    model:Task,
    refresh:function (data) {
        var elements=this.elements;

        elements.headerDom.innerHTML=data.header;
        elements.timeDom.innerHTML=data.time;
        elements.contentDom.innerHTML=data.content;

        if(data.status==1){
            this.hideOperateBtns();
        }else{
            this.showOperateBtns();
        }
    },
    hideOperateBtns:function () {
        addClass(this.elements.operateBtnDom,"z-hide");
    },
    showOperateBtns:function () {
        removeClass(this.elements.operateBtnDom,"z-hide");
    }
});


/**
 * 任务编辑视图
 * @type {TaskEditView}
 */
var TaskEditView = View.extend({
    model:Task,
    initialize:function () {
        this.hasEditedUnSave=!1;//是否编辑过了
    },
    show:function (data) {
        var elements=this.elements;

        data || (data={
            header:"",
            time:"",
            content:""
        });

        elements.headerDom.value=data.header;
        elements.timeDom.value=data.time;
        elements.contentDom.value=data.content;

        addClass(this.root, "z-show");
    },
    hide:function () {
        this.clear();
        removeClass(this.root, "z-show");
    },
    hasChanged:function () {
        return this.hasEditedUnSave;
    },
    clear:function () {
        var elements=this.elements;

        elements.headerDom.value="";
        elements.timeDom.value="";
        elements.contentDom.value="";

        this.hasEditedUnSave=!1;//是否编辑过了
    }
});

/**
 * 任务信息视图，包含任务详细和编辑视图
 * @type {TaskInfoView}
 */
var TaskInfoView = View.extend({
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




