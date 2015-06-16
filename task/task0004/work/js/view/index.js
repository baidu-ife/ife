/*
 * init.js
 */

define(function(require, exports, module) {

    var mainTmpl = ['<header class="hd">',
        '                    所有任务 (<span id="allTaskNum" class="num"><%= allTaskNum%></span>)',
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

    var cateTmpl = ['<li data-autoid="<%= autoId %>" class="level level-<%= level %>">',
        '    <a class="category-name" data-autoid="<%= autoId%>"><%= name %>(<span class="num"><%= num %></span>)</a>',
        '    <a class="del" data-autoid="<%= autoId%>">×</a>',
        '</li>'
    ].join("");

    var CateItem = Backbone.View.extend({
        template: _.template(cateTmpl),
        events: {
            "tap .del": "remove"
        },

        initialize: function () {
            
        },
        render: function () {
            var htm=this.template(this.model);
            
        }
    });

    var Index = Backbone.View.extend({
        tagName: "div",
        id: "categoryList",
        className: "category-list",
        events: {
            "tap .category-name": "showTaskList",
            "tap .add-category": "addCategory"
        },

        template: _.template(tmpl),
        initialize: function() {
            this.listenTo(Global_CategoryList, "add", this.addCategory);
            this.listenTo(Global_CategoryList, "sync", this.resetAllCategory);

            this.render();
        },
        render: function() {
            var htm = this.template({
                allTaskNum: Global_CategoryList.length
            });
            this.$el.html(htm);
            this.categorysEl = this.$(".categorys");

            this.resetAllCategory();
        },
        showTaskList: function(e) {

        },
        addCategory: function(item) {

        },
        resetAllCategory: function() {
            Global_CategoryList.each(function(item) {
                this.addCategory();
            });
        }
    });

    Index.initUI = function() {

    };

    Index.release = function() {

    };

    module.exports = index;
});