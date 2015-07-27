(function ($, Backbone, exports){
    var TodoModel=Backbone.RelationalModel.extend({
        defaults: function() {
            return {
                title: "empty todo...",
                done: false,
                time: new Date(),
                description: ""
            };
        }
    });
    var TodoCollection=Backbone.Collection.extend({
        model: TodoModel
    });
    var TaskModel=Backbone.RelationalModel.extend({
        defaults: {
            title: "untitled task"
        },
        relations: [{
            type: Backbone.HasMany,
            key: "todos",
            relatedModel: TodoModel,
            collectionType: TodoCollection,
            reverseRelation: {
                key: "task"
            }
        }]
    });
    var TaskCollection=Backbone.Collection.extend({
        model: TaskModel
    });
    var CategoryModel=Backbone.RelationalModel.extend({
        defaults: {
            title: "untitled category",
            fixed: false
        },
        relations: [{
            type: Backbone.HasMany,
            key: "tasks",
            relatedModel: TaskModel,
            collectionType: TaskCollection,
            reverseRelation: {
                key: "category"
            }
        }]
    });
    var CategoryCollection=Backbone.Collection.extend({
        model: CategoryModel
    });
    var categories=new CategoryCollection([
        {"title": "默认分类", fixed: true}
    ]);

    var TaskListView=Backbone.View.extend({
        el: "#task-list",
        events: {
            "click li.task": "selectTask"
        },
        render: function(){
            var tasks=null, fixed="";
            var categoryTaskList=this.$(".list");
            var taskCount=0;
            var listItem=null;
            categoryTaskList.html("");
            for(var i=0; i<categories.length; i++){
                if(categories.at(i).get("fixed")){
                    fixed=" fixed";
                }else{
                    fixed="";
                }
                tasks=categories.at(i).get("tasks");
                listItem=$(
                    "<li class=\"category"+fixed+"\" id=\""+categories.at(i).cid+"\">"+
                    categories.at(i).get("title")+
                    "<span class=\"num\">"+tasks.length+"</span>"+
                    "<span class=\"btn-remove\">×</span>"+
                    "</li>"
                );
                categoryTaskList.append(listItem);
                for(var j=0; j<tasks.length; j++){
                    listItem=$("<li class=\"task\" id=\""+categories.at(i).cid+"-"+tasks.at(j).cid+"\">"+
                    tasks.at(j).get("title")+
                    "<span class=\"btn-remove\">×</span>"+
                    "</li>");
                    if(this.curSelected===tasks.at(j)) {
                        listItem.addClass("selected");
                    }
                    categoryTaskList.append(listItem);
                }
                taskCount+=tasks.length;
            }
            this.$("div:first-child .num").html(taskCount);
        },
        initialize: function (){
            this.listenTo(categories, "all", this.render);
            categories.add({
                title: "category1",
                tasks: [
                    {title: "task1"}
                ]
            })
        },
        selectTask: function (e){
            var categorycid=$(e.target).attr("id").split("-")[0];
            var taskcid=$(e.target).attr("id").split("-")[1];
            console.log(categories.get(categorycid).get("tasks").get(taskcid));
        }
    });
    var DisplayView=Backbone.View.extend({
        el: "#main-container",
        initialize: function (){
            new TaskListView();
        },
        hide: function (){
            this.$el.hide();
        },
        show: function (){
            this.$el.show();
        }
    });
    var TaskCreatorView=Backbone.View.extend({
        el: "#task-creator",
        events: {
            "click #btn-create-category": "createCategory",
            "click .btn-ok": "ok",
            "click .btn-cancel": "cancel"
        },
        initialize: function (){
            this.listenTo(categories, "add", this.render);
        },
        hide: function (){
            this.$el.hide();
        },
        show: function (){
            this.$el.show();
            this.render();
        },
        render: function (){
            var $categoryList=$("#category-list");
            $categoryList.html("");
            for(var i=0; i<categories.length; i++){
                $categoryList.append(
                    "<option value=\""+categories.at(i).cid+"\">"+
                    categories.at(i).get("title")+"</option>"
                );
            }
        },
        createCategory: function (){
            var categoryTitle=prompt("请输入新分类名称:");
            if(categoryTitle){
                categories.add({
                    title: categoryTitle
                });
            }
        },
        ok: function (){
            var taskTitle=$("#task-title").val();
            console.log(taskTitle);
            var category=categories.get($("#category-list").val());
            if(category){
                category.get("tasks").add({title: taskTitle});
            }
            workSpace.navigate("", {
                trigger: true
            });
        },
        cancel: function (){
            workSpace.navigate("", {
                trigger: true
            });
        }
    });
    var WorkSpace=Backbone.Router.extend({
        routes: {
            '': function (){
                this.changeView(this.displayView);
            },
            "create-task": function (){
                this.changeView(this.taskCreatorView);
            }
        },
        "changeView": function (view){
            if(this.currentView){
                if(this.currentView===view){
                    return;
                }
                this.currentView.hide();
            }
            this.currentView=view;
            this.currentView.show();

        },
        initialize: function (){
            this.displayView=new DisplayView();
            this.taskCreatorView=new TaskCreatorView();
        }
    });
    var workSpace=new WorkSpace();
    Backbone.history.start();
})(jQuery, Backbone, window);
