/*
 * taskItem.js
 */

define(function(require, exports, module) {

    var TaskListItem=Backbone.View.extend({
        tagName: "a",
        className: "item",

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);  
        },
        render: function () {
            var jsonModel=JSON.stringify(this.model);
            jsonModel=JSON.parse(jsonModel);

            if(jsonModel.status==1) this.$el.addClass("done");
            this.$el.html(jsonModel.header).attr("href", "#task/"+jsonModel.autoId);

            return this;
        }
    })

    module.exports = TaskListItem;

});