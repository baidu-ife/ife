/*
 * init.js
 */

define(function(require, exports, module) {
    var CategoryItemView=require("./categoryItem");

    var curView;
    var mainTmpl = ['<header class="hd">',
        '                    所有任务 (<span class="all-task-num num">0</span>)',
        '                </header>',
        '                <section class="bd">',
        '                    <h4 class="title">分类列表</h4>',
        '                    <ul class="categorys">',
        '                        ',
        '                    </ul>',
        '                </section>',
        '                <footer class="ft">',
        '                    <a class="btn add-category">',
        '                        <i class="icon icon-add"></i>',
        '                        新增分类',
        '                    </a>',
        '                </footer>'
    ].join("");

    var _events={};
    _events[touchEve.endEvent+" .add-category"]="toastInputPopup";

    var Index = Backbone.View.extend({
        tagName: "div",
        id: "categoryList",
        className: "category-list",
        events: _events,

        template: _.template(mainTmpl),
        initialize: function() {
            this.listenTo(Global_CategoryList, "add", this.addCategory);
            this.listenTo(Global_TaskList, "all", this.updateTaskNum);
        },
        render: function() {
            var htm = this.template();
            this.$el.html(htm);
            
            this.categorysEl = this.$(".categorys");
            this.allTaskNumEl=this.$(".all-task-num");
            this.updateTaskNum();

            return this;
        },
        updateTaskNum: function (e) {
            this.allTaskNumEl.html(Global_TaskList.length);
        },
        toastInputPopup: function () {
            var _name=window.prompt("添加分类");
            if(_name == "" || _name == null) return;
            var attr={ name: _name };
            var nmodel=Global_CategoryList.addCategory(attr)[0];
        },
        addCategory: function(item) {
            var v=new CategoryItemView({ model: item});
            this.categorysEl.append(v.render().$el);
        },
        resetAllCategory: function() {
            this.categorysEl.html("");
            Global_CategoryList.each(this.addCategory, this);
        }
    }, { viewId: "index-view" });

    function createData () {
        if(localStorage["isNotFirstIn"] != null) return;
        localStorage["isNotFirstIn"]=1;

        setTimeout(function () {
            Global_CategoryList.addCategory([{ name: "默认分类" }, { name: "百度ife项目" }]);
            
            Global_TaskList.addTask([{
                header: "测试1",
                content: "测试1 content",
                status: 0,
                time: "2015-5-11",
                categoryId: 1
            }, {
                header: "测试2",
                content: "测试2 content",
                status: 1,
                time: "2015-5-12",
                categoryId: 1
            }]);
            
        });
    }

    function clearData () {
        localStorage.clear();
    }

    Index.initUI = function() {
        // clearData();
        createData();
        if(!curView) {
            curView=new Index();
            curView.render();
        }
        AppManager.pageIn($("#container"), curView.$el, "right");

        // @ques: 什么时候fetch
        Global_TaskList.fetch();
        Global_CategoryList.fetch();
    };

    Index.release = function() {
        curView && curView.remove();
    };

    Index.cache=function (pageOut) {
        if(pageOut === true) {
            AppManager.pageOut(curView.$el, "right", function () {
                curView && curView.$el.remove();
            });
        }else {
            curView && curView.$el.remove();
        }
    };

    module.exports = Index;
});