var app=(function (){
    "use strict";
    var app={};
    var categoryMultiLevelList=null;
    var toDoMultiLevelList=null;
    var myWinCreatingTask=null;
    var toDoList=null;
    var multiLevelList=function (element){
        var multiLevelList={};
        var listeners={};
        function getLevel(element){
            var m=element.className.match(/item-(\d+)/i);
            if(m!==null){
                return parseInt(m[1]);
            }else{
                throw new Error("cannot obtain the level of this element");
            }
        }

        function prevLiElement(li){
            var prev=li;
            while(true){
                prev=prev.previousSibling;
                if(prev===null||prev.tagName==="LI"){
                    break;
                }
            }
            return prev;
        }
        function decreaseCount(li, num){
            multiLevelList.setCount(li, multiLevelList.getCount(li)-num);
        }
        function getCount(li){
            var numLabel=$(".num", li);
            if(numLabel!==null){
                return parseInt(numLabel.innerHTML);
            }else{
                return 1;
            }
        }
        function nextLiElement(li){
            var next=li.nextSibling;
            while(true){
                if(next===null||next.tagName==="LI"){
                    break;
                }
                next=next.nextSibling;
            }
            return next;
        }
        function getParentItem(item){
            var prev=item;
            while(true){
                prev=prevLiElement(prev);
                if(prev===null) return null;
                if(getLevel(prev)<getLevel(item)){
                    return prev;
                }
            }
        }
        //定位一个列表项在多级列表中的位置，返回数组。
        function positionItem(item){
            var i, r=[], level=0;
            var items=element.getElementsByTagName('li');
            for(i=0; i<items.length; i++){
                level=getLevel(items[i]);
                if(level===r.length){
                    r.push(0);
                }else if(level===r.length-1){
                    r[level]++;
                }else{
                    r[level]++;
                    r=r.slice(0, level+1);
                }
                if(items[i]===item){
                    return r;
                }
            }
            throw new Error("cannot find this item in this list");
        }
        function createItem(text, level, fixed){
            var li=document.createElement("li");
            li.innerHTML=text+"<span class=\"num\">0</span><span class=\"btn-remove\">×</span>";
            addClass(li, "item-"+level);
            if(fixed){
                addClass(li, "fixed");
            }
            return li;
        }
        $.delegate(element, "li", "click", function (e){
            var i;
            var positionOfItem=positionItem(this);
            var selected=false, oldSelectedItem=null;
            if("click" in listeners){
                for(i=0; i<listeners["click"].length; i++){
                    if(listeners["click"][i]){
                        if(listeners["click"][i](positionOfItem, getData(this, "id"))){
                            selected=true;
                        }
                    }
                }
            }
            if(selected){
                oldSelectedItem=$(".selected", element);
                if(oldSelectedItem){
                    removeClass(oldSelectedItem, "selected");
                }
                addClass(this, "selected");
            }
        });

        $.delegate(element, ".btn-remove", "click", function (){
            var i=0;
            var positionOfItem=positionItem(this.parentNode);
            if("remove" in listeners){
                for(i=0; i<listeners["remove"].length; i++){
                    if(listeners["remove"][i]){
                        if(listeners["remove"][i](getData(this.parentNode, "id"))){
                            return;
                        }
                    }
                }
            }
            multiLevelList.removeItem(this.parentNode);
        });
        /**
         * 对事件添加监听器。
         * @param event 事件名称。目前取值: click, remove.
         * @param fn 事件发生的回调函数。
         *           对于click事件来说，返回true表示需要选中这一项。返回false表示不会选中。
         *           对于remove事件来说，返回true表示删除，返回false表示取消删除。
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

        multiLevelList.removeItem=function (item){
            var next=null, cur=nextLiElement(item);
            var pa=item;
            while(cur!==null){
                if(getLevel(cur)<=getLevel(item)){
                    break;
                }
                next=nextLiElement(cur);
                element.removeChild(cur);
                cur=next;
            }
            while(true){
                pa=getParentItem(pa);
                if(pa){
                    decreaseCount(pa, getCount(item));
                }else{
                    break;
                }
            }

            element.removeChild(item);
        };
        multiLevelList.getChildrenList=function (root){
            var children=[];
            var subLevel=root?getLevel(root)+1:0;
            var next=root?nextLiElement(root):$(".item-0", element);
            while(next){
                if(getLevel(next)===subLevel){
                    children.push(next);
                }else if(getLevel(next)<subLevel){
                    break;
                }
                next=nextLiElement(next);
            }
            return children;
        };
        /**
         * 设置item列表项右侧的数字的值。
         * @param item
         * @param num
         */
        multiLevelList.setCount=function (item, num){
            var numLabel=$(".num", item);
            if(numLabel){
                numLabel.innerHTML=num;
            }
        };
        /**
         * 获取item列表项右侧的数字的值。
         * @param item
         * @returns
         */
        multiLevelList.getCount=function (item){
            var numLabel=$(".num", item);
            if(numLabel){
                return parseInt(numLabel.innerHTML);
            }else{
                throw new Error("cannot find count label");
            }
        };
        /**
         * 像列表中添加新项目。
         * @param text 新项目的文本内容。
         * @param parent 要添加到的父元素, parent===null表示添加到根元素。
         * @param fixed 是否不可删除。
         * @returns 返回新添加的项目。
         */
        multiLevelList.addItem=function (text, parent, fixed, id){
            var children=[], refNode=null;
            var item=createItem(text, parent?getLevel(parent)+1:0, fixed);
            setData(item, "id", id);
            if(parent===null){
                element.appendChild(item);
            }else{
                children=multiLevelList.getChildrenList(parent);
                if(children.length===0){
                    refNode=nextLiElement(parent);
                }else{
                    refNode=nextLiElement(children[children.length-1]);
                }
                if(refNode===null){
                    element.appendChild(item);
                }else{
                    element.insertBefore(item, refNode);
                }
            }
            return item;
        };

        return multiLevelList;
    };
    var dataProvider=(function (){
        var dataProvider={};
        var root=[];
        function Category(name, fixed){
            this.name=name;
            this.fixed=fixed?true:false;
            this.tasks=[];
            this.id=guid();
        }
        Category.prototype.addTask=function (name){
            var task=new Task(name);
            this.tasks.push(task);
            return task;
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
        function Task(name){
            this.name=name;
            this.toDoList=[];
            this.id=guid();
        }

        /**
         * 向任务添加TODO事项。
         * @param name 事项名称。
         * @param date 时间。
         * @param state 状态(未完成, 已完成).
         * @returns 返回新添加的TODO对象。
         */
        Task.prototype.addToDo=function (name, date, state){
            var toDo=new ToDo(name, date, state);
            this.toDoList.push(toDo);
            return toDo;
        };
        Task.prototype.getToDoCount=function (){
            return this.toDoList.length;
        };
        function ToDo(name, date, state){
            this.name=name;
            this.date=new Date(date);
            this.state=state;
            this.id=guid();
        }
        ToDo.prototype.getFormattedDate=function (){
            return this.date.getFullYear()+"-"+
                this.date.getMonth()+"-"+
                this.date.getDate();
        };
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
                    task=category[taskIndex];
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
        dataProvider.DONE=0;
        dataProvider.UNDONE=1;
        dataProvider.getToDoCount=function (){
            var i, sum=0;
            for(i=0; i<root.length; i++){
                sum+=root[i].getToDoCount();
            }
            return sum;
        };
        dataProvider.getCategories=function (){
            return root;
        };

        dataProvider.clear=function (){
            //delete localStorage['data'];
        };

        dataProvider.addCategory=function (name, fixed){
            var category=new Category(name, fixed);
            root.push(category);
            return category;
        };
        dataProvider.addTask=function (name, categoryIndex){
            return root[categoryIndex].addTask(name);
        };
        dataProvider.addToDo=function (name, date, state, taskId){
            return getObjById(taskId).addToDo(name, date, state);
        };
        dataProvider.init=function (){
            var data=localStorage["data"]?JSON.parse(localStorage["data"]):null, categoryIndex,
                taskIndex, toDoIndex;
            if(!data||data.length===0){
                root=[];
                dataProvider.addCategory("默认分类", true);
            }else{
                each(data, function (index, categoty){
                    var categoryObj=dataProvider.addCategory(categoty.name, categoty.fixed);
                    each(categoty.tasks, function (index, task){
                        var taskObj=categoryObj.addTask(task.name);
                        each(task.toDoList, function (index, todo){
                            taskObj.addToDo(todo.name, todo.date, todo.state);
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
        dataProvider.getToDoList=function (taskId){
            var task=getObjById(taskId);
            if(task instanceof Task){
                return task.toDoList;
            }else{
                throw new Error("taskId("+taskId+") is not a id of task.");
            }
        };
        dataProvider.save=function (){
            localStorage["data"]=JSON.stringify(root);
        };
        return dataProvider;
    }());
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
            if(taskName!==""){
                addNewTask(taskName, categoriesList.selectedIndex);
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
                addNewCategory(category);
                addOptionToCategoriesList(dataProvider.getCategories().length-1,
                    category);
            }
        });
        this.init=function (){
            var categories=dataProvider.getCategories(), i;
            for(i=0; i<categories.length; i++){
                addOptionToCategoriesList(i, categories[i].name);
            }
        };
        this.unInit=function (){
            categoriesList.innerHTML="";
        };
    }
    extend(CreatingTaskPopupWin, PopupWin);
    function EditableLabel(element, input){
        input=input||document.createElement("input");
        input.type="text";
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
    function addNewCategory(name){
        var id=dataProvider.addCategory(name).id;
        categoryMultiLevelList.addItem(name, null, false, id);
    }
    function addNewTask(name, categoryIndex){
        var id=dataProvider.addTask(name, categoryIndex).id;
        categoryMultiLevelList.addItem(name, categoryMultiLevelList.
            getChildrenList()[categoryIndex], false, id);
    }
    function addNewToDo(name, date, taskId){
        var toDo=dataProvider.addToDo(name, new Date(), taskId);

    }
    function initCategoryList(){
        var categories=dataProvider.getCategories(), i,
            categoryListItem=null, j, taskListItem;
        for(i=0; i<categories.length; i++){
            categoryListItem=categoryMultiLevelList.addItem(categories[i].name,
                null, categories[i].fixed, categories[i].id);
            categoryMultiLevelList.setCount(categoryListItem, categories[i].getToDoCount());
            for(j=0; j<categories[i].tasks.length; j++){
                taskListItem=categoryMultiLevelList.addItem(categories[i].tasks[j].name,
                    categoryListItem, false, categories[i].tasks[j].id);
                categoryMultiLevelList.setCount(taskListItem, categories[i].tasks[j].getToDoCount());
            }
        }
    }
    app.init=function (){
        dataProvider.init();
        var todoName=new EditableLabel($(".todo-name"));
        var todoContent=new EditableLabel($(".todo-content"),
            document.createElement("textarea"));
        var todoDate=new EditableDateLabel($(".todo-date .date"));
        var isEditing=false;
        toDoMultiLevelList=multiLevelList($(".todo-list"));
        categoryMultiLevelList=multiLevelList($(".category-list"));
        $(".category-container .title .num").innerHTML=dataProvider.getToDoCount();
        initCategoryList();
        categoryMultiLevelList.addListener("remove", function (id){
            $(".category-container .title .num").innerHTML=dataProvider.getToDoCount();
            dataProvider.remove(id);
        });
        categoryMultiLevelList.addListener("click", function (posOfItem, id){
            toDoMultiLevelList.addItem("abc", null, true, "123");
            //只有二级菜单才可以选中。
            return posOfItem.length===2;
        });

        toDoList=multiLevelList($(".todo-list"));
        myWinCreatingTask=new CreatingTaskPopupWin($("#win-create-task"));
        $.click($(".category-container .btn-create"), function (){
            myWinCreatingTask.show();
        });
        $.click($(".todo-edit"), function (){
            if(!isEditing){
                todoName.edit();
                todoContent.edit();
                todoDate.edit();
                isEditing=true;
            }
        });
        $.click($(".todo-done"), function (){
            if(isEditing){
                if(todoName.val()===""){
                    alert("事项名称不能为空。");
                    return;
                }
                todoName.show();
                todoContent.show();
                todoDate.show();
            }
            isEditing=false;
        });
        $.on(window, "resize", function (e){
            console.log($(".main-container").clientHeight-150);
            $(".todo-content").style.height=$(".main-container").clientHeight-150+"px";
        });
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
