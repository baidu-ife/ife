/*
 * init.js
 */

define(function(require, exports, module) {

    var cateTmpl = [
        '    <a class="category-name" href="<% print(\'#category/\' + autoId) %>" data-autoid="<%- autoId%>"><%- name %>(<span class="num"><%- num %></span>)</a>',
        '    <% if(name != "默认分类"){ %>',
        '        <a class="del" data-autoid="<%- autoId%>">×</a>',
        '    <% } %>'
    ].join("");

    var _events = {};
    _events[touchEve.endEvent + " .del"] = "removeItem"; // 不要直接使用视图的remove，应该通过删除模型触发事件告诉模型对应的视图，然后视图在删除自己

    var CateItem = Backbone.View.extend({
        tagName: "li",
        className: "level",
        template: _.template(cateTmpl),
        // @ques: 这种事件是绑定在item上还是list上呢
        events: _events,

        initialize: function() {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);

            this.listenTo(Global_TaskList, "add", this.updateNum);
            this.listenTo(Global_TaskList, "remove", this.updateNum);
        },
        render: function() {
            var jsonModel = JSON.stringify(this.model);
            jsonModel = JSON.parse(jsonModel);
            var taskLen = Global_TaskList.getCountByCategoryId(jsonModel.autoId);
            jsonModel.num = taskLen;
            var htm = this.template(jsonModel);
            this.$el.html(htm);
            this.numEl = this.$(".num");

            this.handlerSub(jsonModel.subIds);
            return this;
        },
        updateNum: function(item) {
            if (item.get("categoryId") != this.model.get("autoId")) return;
            var num = Global_TaskList.getCountByCategoryId(this.model.get("autoId"));
            this.numEl.html(num);
        },
        handlerSub: function(subIds) {
            if (subIds.length < 1) return;
            this.$el.addClass("has-sub-category");
            var ul = $('<ul class="sub-category">');
            for (var i = 0; i < subIds.length; i++) {
                var _model = Global_CategoryList.where({
                    autoId: subIds[i]
                });
                var _view = new CateItem({
                    model: _model
                });
                ul.append(_view.$el);
            }
            this.$el.append(ul);
        },
        removeItem: function() {
            Global_TaskList.removeByCategoryId(this.model.get("autoId"));
            this.model.destroy();
        }
    });


    module.exports = CateItem;
});