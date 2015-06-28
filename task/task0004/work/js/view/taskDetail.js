/*
 * taskDetail.js
 */

define(function(require, exports, module) {
    var tmpl = ['<header class="hd">',
        '                <h4 class="header"><%- header %></h4>',
        '                <% if(status == 0) { %>',
        '                    <div class="operates">',
        '                        <a href="javascript:void(0);" id="completeTask" class="icon icon-done btn btn-done"></a>',
        '                        <a href="javascript:void(0);" id="editTask" class="icon icon-edit btn btn-edit"></a>',
        '                    </div>',
        '                <% } %>',
        '            </header>',
        '            <div class="task-time">',
        '                任务时间：<span class="time"><%- time %></span>',
        '            </div>',
        '            <div class="bd">',
        '                <article class="content">',
        '                    <%- content %>',
        '                </article>',
        '            </div>'
    ].join("");

    var TaskDetailView = Backbone.View.extend({
        tagName: "div",
        id: "taskDetail",
        className: "detail-bd",
        template: _.template(tmpl),

        initialize: function() {
            this.listenTo(Global_TaskList, "change", this.render);
        },
        render: function() {
            var jsonModel = JSON.stringify(this.model);
            jsonModel = JSON.parse(jsonModel);
            var htm = this.template(jsonModel);
            this.$el.html(htm);
            return this;
        }
    });

    module.exports = TaskDetailView;

});