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
                        if(listeners["click"][i](positionOfItem)){
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
                        if(listeners["remove"][i](positionOfItem, this.parentNode)){
                            return;
                        }
                    }
                }
            }
            multiLevelList.removeItem(this.parentNode);
        });
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
        multiLevelList.addItem=function (text, parent, fixed){
            var children=[], refNode=null;
            var item=createItem(text, parent?getLevel(parent)+1:0, fixed);
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
        /**
         * 删除本类别下的任务。
         * @param index 要删除的任务的索引。
         */
        Category.prototype.removeTask=function (index){
            this.tasks.splice(index, 1);
        }
        function Task(name){
            this.name=name;
            this.toDoList=[];
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
        }
        ToDo.prototype.getFormattedDate=function (){
            return this.date.getFullYear()+"-"+
                this.date.getMonth()+"-"+
                this.date.getDate();
        };
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
        dataProvider.addToDo=function (name, date, state, categoryIndex, taskIndex){
            return root[categoryIndex].tasks[taskIndex].addToDo(name, date, state);
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
        dataProvider.removeTask=function (categoryIndex, taskIndex){
            root[categoryIndex].removeTask(taskIndex);
        };

        dataProvider.removeCategory=function (index){
            root.splice(index, 1);
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
        //添加年
        addOption(year, "年", 2015, 2015+50);
        //添加月
        addOption(year, "月", 1, 12);
        $.on(year, "change", function (e){
            console.log(e);
        });
        this.edit=function (){

        };
    }
    function addNewCategory(name){
        dataProvider.addCategory(name);
        categoryMultiLevelList.addItem(name, null);
    }
    function addNewTask(name, categoryIndex){
        dataProvider.addTask(name, categoryIndex);
        categoryMultiLevelList.addItem(name, categoryMultiLevelList.getChildrenList()[categoryIndex]);
    }
    function addNewToDo(name, date, categoryIndex, taskIndex){

    }
    function initCategoryList(){
        var categories=dataProvider.getCategories(), i,
            categoryListItem=null, j, taskListItem;
        for(i=0; i<categories.length; i++){
            categoryListItem=categoryMultiLevelList.addItem(categories[i].name,
                null, categories[i].fixed);
            categoryMultiLevelList.setCount(categoryListItem, categories[i].getToDoCount());
            for(j=0; j<categories[i].tasks.length; j++){
                taskListItem=categoryMultiLevelList.addItem(categories[i].tasks[j].name,
                    categoryListItem);
                categoryMultiLevelList.setCount(taskListItem, categories[i].tasks[j].getToDoCount());
            }
        }
    }
    app.init=function (){
        dataProvider.init();
        var todoName=new EditableLabel($(".todo-name"));
        var todoContent=new EditableLabel($(".todo-content"),
            document.createElement("textarea"));
        var isEditing=false;
        toDoMultiLevelList=multiLevelList($(".todo-list"));
        categoryMultiLevelList=multiLevelList($(".category-list"));
        $(".category-container .title .num").innerHTML=dataProvider.getToDoCount();
        initCategoryList();
        categoryMultiLevelList.addListener("remove", function (posOfItem, item){
            $(".category-container .title .num").innerHTML-=$(".num", item).innerHTML;
            //删除任务
            if(posOfItem.length===2){
                dataProvider.removeTask(posOfItem[0], posOfItem[1]);
            }
            //删除分类
            if(posOfItem.length===1){
                dataProvider.removeCategory(posOfItem[0]);
            }
        });
        categoryMultiLevelList.addListener("click", function (posOfItem, item){
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
