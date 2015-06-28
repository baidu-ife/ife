/*
 * header.js
 * header的渲染如果直接在主视图里完成，就方便多了，能跟随视图一起滑动
 */

define(function(require, exports, module) {
    var tmpl = ['<% if(isIndex) { %>',
        '            <span>GTD Tools</span><small>@by ych</small>',
        '        <% }else { %>',
        '            <a class="pull-left segue-view-btn back"><%- title %></a>',
        '        <% } %>'
    ].join("");

    var _events = {};
    _events[touchEve.endEvent + " .back"] = "back";

    var Header=Backbone.View.extend({
        el: $(".web-hd").get(0), // .get(0), 是util.js的问题
        events: _events,
        template: _.template(tmpl),

        initialize: function () {
            this.isIndex=true;
            this.title="返回";
        },
        render: function () {
            var data={};
            if(this.isIndex) {
                data={isIndex: true};
            }else{
                data={
                    isIndex: false,
                    title: this.title || "返回"
                };
            }

            var htm=this.template(data);
            this.isIndex ? this.$el.html(htm).show(220) : this.$el.html(htm);
            return this;
        },
        back: function () {
            history.back();
        },
        setOptions: function (isIndex, title) {
            this.isIndex=isIndex;
            title && (this.title=title);
            return this;
        }
    })

    module.exports = Header;

});