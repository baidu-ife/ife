/*
 * init.js
 */

define(function (require, exports, module) {

    // Global_CategoryList.create({
    //     name: "test category"
    // });

    var index=Backbone.View.extend({
        tagName: "div",
        id: "categoryList",
        className: "category-list",
        events: {
            "tap .category-name": "showTaskList"
        },

        initialize: function () {
            
        },
        showTaskList: function (e) {
            
        }        
    });
    
    index.initUI=function () {
        
    };

    index.release=function () {
        
    };

    module.exports=index;
});