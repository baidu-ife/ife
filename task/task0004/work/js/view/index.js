/*
 * index.js
 */

define(function(require, exports, module) {
    var CategoryItemView = require("./categoryItem");
    var mainTmpl = ['<header class="hd">',
        '                        所有任务 (<span class="all-task-num num">0</span>)',
        '                    </header>',
        '                    <section class="bd">',
        '                        <h4 class="title">分类列表</h4>',
        '                        <ul class="categorys">',
        '                            ',
        '                        </ul>',
        '                    </section>',
        '                    <footer class="ft">',
        '                        <a class="btn add-category">',
        '                            <i class="icon icon-add"></i>',
        '                            新增分类',
        '                        </a>',
        '                    </footer>'
    ].join("");

    var _events = {};
    // @ques: 换成touchend事件时，因为会弹出系统弹窗阻塞进程，导致会发生两次touchend事件，这是为什么？填了内容点击“好”又不会啊
    _events[touchEve.startEvent + " .add-category"] = "toastInputPopup";

    var Index = Backbone.MView.extend({
        tagName: "div",
        id: "categoryList",
        className: "category-list",
        events: _events,

        template: _.template(mainTmpl),
        initialize: function() {
            this.order = 1;
            this.listenTo(Global_CategoryList, "add", this.addCategory);
            this.listenTo(Global_TaskList, "all", this.updateTaskNum);
        },
        // 注意：必须render才能fetch，因为他的字元素没有生成
        render: function() {
            var htm = this.template();
            this.$el.html(htm);

            this.categorysEl = this.$(".categorys");
            this.allTaskNumEl = this.$(".all-task-num");
            this.updateTaskNum();

            /*
             * 不依靠集合的fetch引发的add事件去添加一项是因为：
             * 1. 如果集合已经fetch过了，再去fetch一次，已经存在的model不会触发add事件
             * 2. render函数会经常调用，但用不着每次也去fetch一遍，因为绑定了集合的其他事件，如add事件，会自动执行相应的操作
             */
            this.addAll();

            return this;
        },
        updateTaskNum: function(e) {
            this.allTaskNumEl.html(Global_TaskList.length);
        },
        addAll: function() {
            this.categorysEl.html("");
            Global_CategoryList.each(this.addCategory, this);
        },
        toastInputPopup: function(e) {
            var _name = window.prompt("添加分类");
            if (_name == "" || _name == null) return false;
            var attr = {
                name: _name
            };
            var nmodel = Global_CategoryList.addCategory(attr)[0];
        },
        addCategory: function(item) {
            var v = new CategoryItemView({
                model: item
            });
            this.categorysEl.append(v.render().$el);
        }
    });

    /*
     * @ques: 去掉initUI，生成视图实例的代码放在了外面，有什么好处呢
     * 降低耦合性?? index这个视图肯定就一个，不需要重用啊？
     */
    // Index.initUI = function() {
    //     // clearData();
    //     createData();
    //     if(!curView) {
    //         curView=new Index();
    //         curView.render();
    //     }
    //     AppManager.pageIn($("#container"), curView.$el, "right");

    //     // @ques: 什么时候fetch
    //     Global_TaskList.fetch();
    //     Global_CategoryList.fetch();
    // };

    module.exports = Index;

});