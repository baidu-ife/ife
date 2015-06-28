/*
* taskEditView.js
 */

define(function (require, exports, module) {
    var _=require("../lib/mvc"),
        Task=require("../model/taskModel").Model_Task;

    /**
     * 任务编辑视图
     * @type {TaskEditView}
     */
    var TaskEditView = _.View.extend({
        model:Task,
        initialize:function () {
            this.hasEditedUnSave=!1;//是否编辑过了
        },
        show:function (data) {
            var elements=this.elements;

            data || (data={
                header:"",
                time:"",
                content:""
            });

            elements.headerDom.value=data.header;
            elements.timeDom.value=data.time;
            elements.contentDom.value=data.content;

            addClass(this.root, "z-show");
        },
        hide:function () {
            this.clear();
            removeClass(this.root, "z-show");
        },
        hasChanged:function () {
            return this.hasEditedUnSave;
        },
        clear:function () {
            var elements=this.elements;

            elements.headerDom.value="";
            elements.timeDom.value="";
            elements.contentDom.value="";

            this.hasEditedUnSave=!1;//是否编辑过了
        }
    });
    
    module.exports=TaskEditView;
})