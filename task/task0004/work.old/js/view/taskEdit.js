/*
 * taskEdit.js
 */

define(function(require, exports, module) {
    var tmpl = ['<header class="hd">',
        '                <input type="text" name="" value="" placeholder="输入标题" class="input-header" id="inputHeader">',
        '                <div class="operates">',
        '                    <a href="javascript:void(0);" id="sure" class="btn btn-sure">确认</a>',
        '                    <a href="javascript:void(0);" id="cancel" class="btn btn-cancel">取消</a>',
        '                </div>',
        '            </header>',
        '            <div class="task-time">',
        '                任务时间：<input type="text" value="" placeholder="日期格式：2015-04-02" name="" class="input-time" id="inputTime">',
        '            </div>',
        '            <div class="bd">',
        '                <div class="content">',
        '                    <textarea name="" class="input-content" id="inputContent" cols="30" rows="10"></textarea>',
        '                </div>',
        '            </div>'
    ].join("");

    var TaskEditView = Backbone.View.extend({
        tagName: "div",
        id: "taskEdit",
        className: "edit-bd",
        template: _.template(tmpl),

        render: function() {
            var htm = this.template();
            this.$el.html(htm);
            this.headerEl = this.$(".input-header");
            this.timeEl = this.$('.input-time');
            this.contentEl = this.$('.input-content');
            return this;
        },
        setActive: function(type, data) {
            var setValue = function() {
                this.headerEl.val(data["header"]);
                this.timeEl.val(data["time"]);
                this.contentEl.val(data["content"]);
            };

            type ? (setValue.call(this), this.$el.addClass("z-show")) : this.$el.removeClass("z-show");
        },
        getValue: function() {
            var hd = this.headerEl.val() || "";
            var time = this.timeEl.val() || "";
            var content = this.contentEl.val() || "";
            return {
                header: hd,
                time: time,
                content: content
            };
        }
    });

    module.exports = TaskEditView;

});