/*
* taskDetailView.js
 */

define(function (require, exports, module) {
    var _=require("../lib/mvc"),
        Task=require("../model/taskModel").Model_Task;

    /**
     * 任务详细视图
     * @type {TaskDetailView}
     */
    var TaskDetailView = _.View.extend({
        model:Task,
        refresh:function (data) {
            var elements=this.elements;

            elements.headerDom.innerHTML=data.header;
            elements.timeDom.innerHTML=data.time;
            elements.contentDom.innerHTML=data.content;

            if(data.status==1){
                this.hideOperateBtns();
            }else{
                this.showOperateBtns();
            }
        },
        hideOperateBtns:function () {
            addClass(this.elements.operateBtnDom,"z-hide");
        },
        showOperateBtns:function () {
            removeClass(this.elements.operateBtnDom,"z-hide");
        }
    });
    
    module.exports=TaskDetailView;
})