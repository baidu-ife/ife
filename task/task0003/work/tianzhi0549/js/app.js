/**
 * 因为不熟悉网页APP的设计模式，所以代码写的太乱了。
 * 在这里说一下程序的大致思路，希望能让老师review起来方便一些:-). 老师辛苦了！
 *
 * 首先是一个名叫app的单例。这个APP的所有代码都写在这个函数里。
 * app有两个公开方法分别是init和destroy.
 * init在onload事件中调用，主要做按钮事件绑定，初始化子控件，初始化数据这样的工作。
 * destroy在onunload中调用，只做了一件事就是保存数据。
 *
 * 然后是另外一个单例, dataProvider, 就是存储数据，提供数据的对象。
 * dataProvider里面有一个root变量。保存分类，任务，事项这些数据，概览如下。
 * root=[category1, category2...]
 * category={
 *  id: 是一个guid生成的字符串。
 *  name: 分类的名称。
 *  tasks: [task1, task2...] 分类下面的任务。
 *  fixed: true/false 表示分类是否可删除。
 * }
 * task={
 *  id: 同category.
 *  name: 同category.
 *  todoList: [toDo1, toDo2...] 任务下面的toDo事项。
 * }
 * toDo={
 *  id: 同上。
 *  name: 同上。
 *  date: 日期对象，事项进行时间。
 *  state: ToDo.DONE/ToDo.UNDONE 事项完成状态。
 * }
 *
 * 然后是很重要的sync函数。
 * 这个函数负责渲染界面(请允许我用这个词).
 * 就是根据dataProvider中的数据，修改界面上的显示。
 * 每次修改之后，都要调用这个函数来同步界面。
 *
 * 还有就是多级列表包装器: multiLevelList.
 * 这个函数负责把一个dom元素包装秤一个多级列表对象返回。
 *
 * 还有关于名称为xxx2Item的函数。
 * 因为前面的multiLevelList需要传入特定格式的数据然后用来显示。
 * 这些函数就是把category, task, toDo对象转换成那个特定数据格式的函数。
 *
 * 大概就是这些了，如果老师觉得那里还有问题，请随时联系我。
 * TEL: 18328581949.
 * QQ: 623774708.
 * EMAIL: tianzhi0549@163.com.
 * 谢谢老师:-)!
 */

var app=(function (){
    "use strict";
    var app={};
    var categoryMultiLevelList=null;
    var toDoMultiLevelList=null;
    var myWinCreatingTask=null;
    var toDoList=null;
    var isEditing=false;
    var multiLevelList=function (element){
        var multiLevelList={};
        var listeners={};
        /*
         * 设定数据。
         * 数据格式：
         *  item={
         *      id: string
         *      text: string,
         *      num: number,
         *      children: [item, item...],
         *      cls: string
         *  }
         *  data=[item, item...]
        */
        multiLevelList.setData=function (data){
            var html="", i;
            if(data.length===0){
                data.push({
                    text: "这里还什么都没有",
                    "id": "noid",
                    cls: "fixed nothing"
                });
            }
            for(i=0; i<data.length; i++){
                html+=getItemHtml(data[i], 0);
            }
            element.innerHTML=html;
        };
        function getItemHtml(item, level){
            var r="", cls="";
            var i;
            item.num=item.num||0;
            r='<li data-id="'+item.id+'" class="item-'+level+' '+item.cls+'">'+item.text+'<span class="num">'+item.num+
                '</span><span class="btn-remove">×</span></li>';
            if(item.children){
                for(i=0; i<item.children.length; i++){
                    r+=getItemHtml(item.children[i], level+1);
                }
            }
            return r;
        }
        $.delegate(element, "li", "click", function (e){
            var i;
            if("click" in listeners){
                for(i=0; i<listeners["click"].length; i++){
                    if(listeners["click"][i]){
                        if(listeners["click"][i](getData(this, "id"))){
                            return;
                        }
                    }
                }
            }
        });

        $.delegate(element, ".btn-remove", "click", function (){
            var i=0;
            if("remove" in listeners){
                for(i=0; i<listeners["remove"].length; i++){
                    if(listeners["remove"][i]){
                        if(listeners["remove"][i](getData(this.parentNode, "id"))){
                            return;
                        }
                    }
                }
            }
        });
        /**
         * 对事件添加监听器。
         * @param event 事件名称。目前取值: click, remove.
         * @param fn 事件发生的回调函数。
         */
        multiLevelList.addListener=function (event, fn){
            if(!(event in listeners)){
                listeners[event]=[];
            }
            listeners[event].push(fn);
        };
        multiLevelList.removeListener=function (event, fn){
            var i=0;
            if(event in listeners){
                for(i=0; i<listeners[event].length; i++){
                    if(listeners[event][i]===fn){
                        listeners[event][i]=null;
                    }
                }
            }
        };
        return multiLevelList;
    };
    var dataProvider=(function (){
        var dataProvider={};
        var root=[];
        /**
         * 根据id获取对应的分类/目录/事项对象。
         * @param id
         */
        function getObjById(id){
            var categoryIndex, taskIndex, toDoIndex;
            var category, task, toDo;
            for(categoryIndex=0; categoryIndex<root.length; categoryIndex++){
                category=root[categoryIndex];
                if(category.id===id){
                    return category;
                }
                for(taskIndex=0; taskIndex<category.tasks.length; taskIndex++){
                    task=category.tasks[taskIndex];
                    if(task.id===id){
                        return task;
                    }
                    for(toDoIndex=0; toDoIndex<task.toDoList.length; toDoIndex++) {
                        toDo=task.toDoList[toDoIndex];
                        if(toDo.id===id){
                            return toDo;
                        }
                    }
                }
            }
        }

        dataProvider.DISPLAY_ALL_TODO=0;
        dataProvider.DISPLAY_UNDONE_TODO=1,
        dataProvider.DISPLAY_DONE_TODO=2;
        dataProvider.curSelectedTaskId="";
        dataProvider.curSelectedToDoId="";
        dataProvider.displayToDoState=dataProvider.DISPLAY_ALL_TODO;
        dataProvider.getToDoCount=function (){
            var i, sum=0;
            for(i=0; i<root.length; i++){
                sum+=root[i].getToDoCount();
            }
            return sum;
        };
        dataProvider.modifyToDo=function (toDoId, name, date, content){
            var toDo=getObjById(toDoId);
            if(toDo){
                toDo.name=name;
                toDo.date=new Date(date);
                toDo.content=content;
            }else{
                throw new Error("cannot this item(\""+toDoId+"\").");
            }
        };
        dataProvider.getCategories=function (){
            return root;
        };
        dataProvider.getToDo=function (toDoId){
            return getObjById(toDoId);
        };
        dataProvider.addCategory=function (category){
            root.push(category);
            return category;
        };
        dataProvider.addTask=function (task, categoryId){
            getObjById(categoryId).addTask(task);
            return task;
        };
        dataProvider.addToDo=function (toDo, taskId){
            getObjById(taskId).addToDo(toDo);
            return toDo;
        };
        dataProvider.init=function (){
            var data=localStorage["data"]?JSON.parse(localStorage["data"]):{}, categoryIndex,
                taskIndex, toDoIndex;
            var root=data["root"]||[];
            dataProvider.curSelectedTaskId=data["taskId"]||"";
            dataProvider.curSelectedToDoId=data["toDoId"]||"";
            if(!root||root.length===0){
                dataProvider.addCategory(new Category("默认分类", true));
            }else{
                each(root, function (index, categoty){
                    var categoryObj=dataProvider.addCategory(new
                            Category(categoty.name, categoty.fixed, categoty.id));
                    each(categoty.tasks, function (index, task){
                        var taskObj=categoryObj.addTask(new Task(task.name, task.id));
                        each(task.toDoList, function (index, todo){
                            taskObj.addToDo(new ToDo(todo.name, todo.date, todo.state, todo.id));
                        });
                    });
                });
            }
        };
        dataProvider.remove=function (id){
            each(root, function (index, categoty){
                if(categoty.id===id){
                    root.splice(index, 1);
                    return true;
                }
                return each(categoty.tasks, function (index, task){
                    if(task.id===id){
                        categoty.tasks.splice(index, 1);
                        return true;
                    }
                    return each(task.toDoList, function (index, todo){
                        if(todo.id===id){
                            task.toDoList.splice(index, 1);
                            return true;
                        }
                    });
                });
            });
        };
        dataProvider.getToDoList=function (taskId, state){
            var task=getObjById(taskId), i, todoList=[];
            if(task instanceof Task){
                if(state===dataProvider.DISPLAY_ALL_TODO){
                    return task.toDoList;
                }else{
                    if(state===dataProvider.DISPLAY_DONE_TODO){
                        for(i=0; i<task.toDoList.length; i++){
                            if(task.toDoList[i].state===ToDo.DONE){
                                todoList.push(task.toDoList[i]);
                            }
                        }
                    }else{
                        for(i=0; i<task.toDoList.length; i++){
                            if(task.toDoList[i].state===ToDo.UNDONE){
                                todoList.push(task.toDoList[i]);
                            }
                        }
                    }
                    return todoList;
                }
            }else{
                throw new Error("taskId("+taskId+") is not a id of task.");
            }
        };
        dataProvider.save=function (){
            var data={};
            data["root"]=root;
            data["taskId"]=dataProvider.curSelectedTaskId;
            data["toDoId"]=dataProvider.curSelectedToDoId;
            localStorage["data"]=JSON.stringify(data);
        };
        return dataProvider;
    }());
    function Category(name, fixed, id){
        this.name=name;
        this.fixed=fixed?true:false;
        this.tasks=[];
        this.id=id||guid();
    }
    Category.prototype.addTask=function (task){
        this.tasks.push(task);
        return task;
    };
    Category.prototype.getTasks=function (){
        return this.tasks;
    };
    /**
     * 获取本类下的TODO事项个数。
     * @returns {number}
     */
    Category.prototype.getToDoCount=function (){
        var i, sum=0;
        for(i=0; i<this.tasks.length; i++){
            sum+=this.tasks[i].getToDoCount();
        }
        return sum;
    };
    function Task(name, id){
        this.name=name;
        this.toDoList=[];
        this.id=id||guid();
    }
    Task.prototype.addToDo=function (toDo){
        this.toDoList.push(toDo);
    };
    Task.prototype.getToDoCount=function (){
        return this.toDoList.length;
    };
    function ToDo(name, date, state, id, content){
        this.name=name;
        this.date=new Date(date);
        this.state=state;
        this.id=id||guid();
        this.content=content||"";
    }
    ToDo.prototype.getFormattedDate=function (){
        return this.date.getFullYear()+"-"+
            (this.date.getMonth()+1)+"-"+
            this.date.getDate();
    };
    ToDo.prototype.getFormattedTime=function (){
        return this.getFormattedDate()+" "+
            this.date.getHours()+":"+this.date.getMinutes();
    };
    ToDo.DONE=0;
    ToDo.UNDONE=1;
    function PopupWin(element){
        this.show=function (){
            if(this.init){
                this.init();
            }
            setCSS(element, "display", "block");
        };
        this.hide=function (){
            if(this.unInit){
                this.unInit();
            }
            setCSS(element, "display", "none");
        };
    }
    function CreatingTaskPopupWin(element){
        var self=this;
        PopupWin.call(this, element);
        var categoriesList=$("select", element);
        function addOptionToCategoriesList(value, text){
            var option=document.createElement("option");
            option.value=value;
            option.innerHTML=text;
            categoriesList.appendChild(option);
        }
        $.click($(".cancel", element), function (){
            self.hide();
        });
        var addTask=function (){
            var taskName=$(".task-name", element).value;
            var categoryId=categoriesList.options[categoriesList.selectedIndex].value;
            if(taskName!==""){
                switchDisplay(dataProvider.addTask(new Task(taskName), categoryId).id, "");
                self.hide();
            }else{
                alert("请输入任务名称。");
            }
        };
        $.click($(".ok", element), addTask);
        $.enter($(".task-name", element), addTask);
        $.click($("#create-category", element), function (){
            var category=prompt("请输入新分类名称", "");
            if(category!==null&&category!==""){
                var id=dataProvider.addCategory(new Category(category, false)).id;
                addOptionToCategoriesList(id, category);
                sync();
            }
        });
        this.init=function (){
            var categories=dataProvider.getCategories(), i;
            for(i=0; i<categories.length; i++){
                addOptionToCategoriesList(categories[i].id, categories[i].name);
            }
        };
        this.unInit=function (){
            categoriesList.innerHTML="";
        };
    }
    extend(CreatingTaskPopupWin, PopupWin);
    /**
     * 包装一个元素为可编辑的label. 就是调用edit方法可以出现一个文本区域让用户编辑。
     * @param element 要包装的元素。
     * @param input 调用edit之后显示的文本框对象。
     * @constructor
     */
    function EditableLabel(element, input){
        input=input||function (){
            var input=document.createElement("input");
            input.setAttribute("type", "text");
            return input;
        };
        this.edit=function (){
            input.value=element.innerHTML;
            element.innerHTML="";
            element.appendChild(input);
        };
        this.show=function (){
            element.innerHTML=input.value;
        };
        this.val=function (){
            return input.value;
        };
    }
    function EditableDateLabel(element){
        var year=document.createElement("select");
        var month=document.createElement("select");
        var day=document.createElement("select");
        var hour=document.createElement("select");
        var minute=document.createElement("select");
        var option=null;
        function addOption(rootElement, suffix, start, stop){
            var i;
            for(i=start; i<=stop; i++){
                option=document.createElement("option");
                if(i===start){
                    option.selected=true;
                }
                option.innerHTML=i+suffix;
                option.value=i;
                rootElement.appendChild(option);
            }
        }
        function isLeapYear(year){
            return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        }
        function getSelectedVal(element){
            return element.options[element.selectedIndex].value;
        }
        function fillDay(){
            var yearVal=parseInt(getSelectedVal(year));
            var monthVal=parseInt(getSelectedVal(month));
            day.innerHTML="";
            if(monthVal===2){
                if(isLeapYear(yearVal)){
                    addOption(day, "日", 1, 29);
                }else{
                    addOption(day, "日", 1, 28);
                }
            }else{
                if(monthVal===1||monthVal===3||
                        monthVal===5||monthVal===7||
                        monthVal===8||monthVal===10||
                        monthVal===12){
                    addOption(day, "日", 1, 31);
                }else{
                    addOption(day, "日", 1, 30);
                }
            }
        }
        function selectByVal(element, val){
            var options=element.getElementsByTagName("option");
            each(options, function (index, item){
                if(item.selected){
                    item.selected=false;
                }
                if(item.value===val){
                    item.selected=true;
                }
            });
        }
        function getVal(){
            return getSelectedVal(year)+"-"+getSelectedVal(month)+"-"+
            getSelectedVal(day)+" "+getSelectedVal(hour)+":"+getSelectedVal(minute);
        }
        //添加年
        addOption(year, "年", 2015, 2015+50);
        //添加月
        addOption(month, "月", 1, 12);
        addOption(hour, "时", 0, 23);
        addOption(minute, "分", 0, 59);
        fillDay();
        $.on(year, "change", fillDay);
        $.on(month, "change", fillDay);
        this.edit=function (){
            var yearVal=element.innerHTML.split(" ")[0].split("-")[0];
            var monthVal=element.innerHTML.split(" ")[0].split("-")[1];
            var dayVal=element.innerHTML.split(" ")[0].split("-")[2];
            var hourVal=element.innerHTML.split(" ")[1].split(":")[0];
            var minuteVal=element.innerHTML.split(" ")[1].split(":")[1];
            element.innerHTML="";
            selectByVal(year, yearVal);
            selectByVal(month, monthVal);
            selectByVal(day, dayVal);
            selectByVal(hour, hourVal);
            selectByVal(minute, minuteVal);
            element.appendChild(year);
            element.appendChild(month);
            element.appendChild(day);
            element.appendChild(hour);
            element.appendChild(minute);
        };
        this.show=function (){
            element.innerHTML=getVal();
        };
        this.val=function (){
            return getVal();
        };
    }
    function sync(){
        function category2Item(category){
            var taskItems=[];
            var i, cls="";
            for(i=0; i<category.tasks.length; i++){
                taskItems.push(task2Item(category.tasks[i]));
            }
            if(category.fixed){
                cls="fixed";
            }
            return {
                "id": category.id,
                text: category.name,
                num: category.getToDoCount(),
                children: taskItems,
                "cls": cls
            };
        }
        function task2Item(task){
            var cls="";
            if(task.id==dataProvider.curSelectedTaskId){
                cls="selected";
            }
            return {
                "id": task.id,
                text: task.name,
                num: task.getToDoCount(),
                "cls": cls
            };
        }
        function toDo2Item(toDo){
            var cls=(toDo.state===ToDo.DONE?"done ":"");
            cls+=(toDo.id===dataProvider.curSelectedToDoId?"selected":"");
            return {
                "id": toDo.id,
                text: toDo.name,
                "cls": cls
            };
        }
        function date2Item(dateStr){
            return {
                "id": "noid",
                text: dateStr,
                cls: "fixed"
            };
        }

        /**
         * 转换toDo列表为以日期为键的map.
         * @param toDoList
         * @returns {{}}
         */
        function toDoList2DateMap(toDoList){
            var toDoDateMap={}, formattedDate="", i;
            //转换为日期map.
            for(i=0; i<toDoList.length; i++){
                formattedDate=toDoList[i].getFormattedDate();
                if(!(formattedDate in toDoDateMap)){
                    toDoDateMap[formattedDate]=[toDoList[i]];
                }else{
                    toDoDateMap[formattedDate].push(toDoList[i]);
                }
            }
            return toDoDateMap;
        }
        //同步分类列表
        var categoriesListData=[];
        var categories=dataProvider.getCategories();
        var i, tasks=null;
        for(i=0; i<categories.length; i++){
            categoriesListData.push(category2Item(categories[i]));
        }
        categoryMultiLevelList.setData(categoriesListData);
        //同步事项列表
        if(dataProvider.curSelectedTaskId){
            var toDoListData=[];
            var map=toDoList2DateMap(dataProvider.
                getToDoList(dataProvider.curSelectedTaskId,
                dataProvider.displayToDoState));
            var dateStr="", dateItem=null;
            for(dateStr in map){
                if(map.hasOwnProperty(dateStr)){
                    dateItem=date2Item(dateStr);
                    dateItem.children=[];
                    for(i=0; i<map[dateStr].length; i++){
                        dateItem.children.push(toDo2Item(map[dateStr][i]));
                    }
                    toDoListData.push(dateItem);
                }
            }
            toDoMultiLevelList.setData(toDoListData);
        }else{
            toDoMultiLevelList.setData([]);
        }
        //修改任务总数显示
        $(".category-container .title .num").innerHTML=dataProvider.getToDoCount();
        //同步事项的显示内容
        if(dataProvider.curSelectedToDoId!==""){
            var curSelectedToDo=dataProvider.getToDo(dataProvider.curSelectedToDoId);
            $(".todo-name").innerHTML=curSelectedToDo.name;
            $(".todo-date .date").innerHTML=curSelectedToDo.getFormattedTime();
            $(".todo-content").innerHTML=curSelectedToDo.content;
            if(curSelectedToDo.state===ToDo.DONE){
                $(".todo-done").innerHTML="待办";
            }else{
                $(".todo-done").innerHTML="完成";
            }
        }else{
            $(".todo-name").innerHTML="";
            $(".todo-date .date").innerHTML="";
            $(".todo-content").innerHTML="";
            $(".todo-done").innerHMLT="完成";
        }
    }

    /**
     * 切换当前选中为给定的task与toDo.
     * @param taskId
     * @param toDoId
     */
    function switchDisplay(taskId, toDoId){
        if(isEditing){
            alert("请先保存正在编辑的内容。");
            return;
        }
        dataProvider.curSelectedTaskId=taskId;
        dataProvider.curSelectedToDoId=toDoId;
        sync();
    }

    /**
     * 转换为什么都没有选中的状态。
     */
    function selectNothing(){
        switchDisplay("", "");
    }
    /***/
    app.init=function (){
        dataProvider.init();
        var todoName=new EditableLabel($(".todo-name"));
        var todoContent=new EditableLabel($(".todo-content"),
            document.createElement("textarea"));
        var todoDate=new EditableDateLabel($(".todo-date .date"));
        function fitContentArea(){
            $(".todo-content").style.height=$(".main-container").clientHeight-150+"px";
        }
        toDoMultiLevelList=multiLevelList($(".todo-list"));
        categoryMultiLevelList=multiLevelList($(".category-list"));
        myWinCreatingTask=new CreatingTaskPopupWin($("#win-create-task"));
        sync();
        categoryMultiLevelList.addListener("click", function (id){
            switchDisplay(id, "");
        });
        categoryMultiLevelList.addListener("remove", function (id){
            dataProvider.remove(id);
            if(dataProvider.curSelectedTaskId===id){
                selectNothing();
            }
            sync();
        });
        toDoMultiLevelList.addListener("click", function (id){
            switchDisplay(dataProvider.curSelectedTaskId, id);
        });
        toDoMultiLevelList.addListener("remove", function (id){
            dataProvider.remove(id);
            if(dataProvider.curSelectedToDoId===id){
                switchDisplay(dataProvider.curSelectedTaskId, "");
            }
            sync();
        });
        $.click($(".category-container .btn-create"), function (){
            myWinCreatingTask.show();
        });
        //新建TODO事项
        $.click($(".task-container .btn-create"), function (){
            if(dataProvider.curSelectedTaskId){
                switchDisplay(dataProvider.curSelectedTaskId,
                    dataProvider.addToDo(new ToDo("ToDo", new Date(),
                    ToDo.UNDONE), dataProvider.curSelectedTaskId).id);
            }else{
                alert("请选中一个任务。");
            }
        });
        $.click($(".todo-edit"), function (){
            if(dataProvider.curSelectedToDoId){
                if(!isEditing){
                    this.innerHTML="保存";
                    todoName.edit();
                    todoContent.edit();
                    todoDate.edit();
                    isEditing=true;
                }else{
                    if(todoName.val()===""){
                        alert("事项名称不能为空。");
                        return;
                    }
                    this.innerHTML="编辑";
                    todoName.show();
                    todoContent.show();
                    todoDate.show();
                    dataProvider.modifyToDo(dataProvider.curSelectedToDoId, todoName.val(),
                        todoDate.val(), todoContent.val());
                    sync();
                    isEditing=false;
                }
            }
        });
        $.click($(".todo-done"), function (){
            var selectedToDo=null;
            if(isEditing){
                alert("请先保存正在编辑的内容。");
                return;
            }
            if(dataProvider.curSelectedToDoId!==""){
                selectedToDo=dataProvider.getToDo(dataProvider.curSelectedToDoId);
                if(selectedToDo.state===ToDo.UNDONE){
                    selectedToDo.state=ToDo.DONE;
                }else{
                    selectedToDo.state=ToDo.UNDONE;
                }
            }
            sync();
        });
        $.click($("#btn-all"), function (){
            dataProvider.displayToDoState=dataProvider.DISPLAY_ALL_TODO;
            removeClass($(".filter .selected"), "selected");
            addClass(this, "selected");
            sync();
        });
        $.click($("#btn-done"), function (){
            dataProvider.displayToDoState=dataProvider.DISPLAY_DONE_TODO;
            removeClass($(".filter .selected"), "selected");
            addClass(this, "selected");
            sync();
        });
        $.click($("#btn-undone"), function (){
            dataProvider.displayToDoState=dataProvider.DISPLAY_UNDONE_TODO;
            removeClass($(".filter .selected"), "selected");
            addClass(this, "selected");
            sync();
        });
        $.on(window, "resize", fitContentArea);
        fitContentArea();
    };
    app.destroy=function (){
        dataProvider.save();
    };
    return app;
}());
window.onload=function (){
    app.init();
};
window.onunload=function (){
    app.destroy();
};


