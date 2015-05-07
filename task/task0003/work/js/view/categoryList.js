/**
 * categoryList.js
 */



// ============================================================
var categoryList = new CategoryList();
var taskList = new TaskList();


var taskListView = new TaskListView($("taskList"), {
    events:{
        
    }
});

var categoryListView = new CategoryListView($("#categoryList"), {
    id: 1,
    events: {
        "click .add-category": "addCategoryHandler",
        "click .del": "removeCategoryItemHandler",
        // "click .level": "selectCategoryItemHandler" //绑定在.level上，事件没冒泡？为什么？
        "click .category-name": "selectCategoryItemHandler",
        "click .bd":"removeCurCategoryIdHandler"
    },
    initialize:function () {
        this.curCategoryItemDom = null;
        this.curCategoryId = -1;
    },
    handlers: {
        addCategoryHandler: function(e) {
            var _name = window.prompt("请输入类别名称");
            if(!_name) return;
            var parId = this.curCategoryId || -1;
            
            var nCateItem = categoryList.addCategoryItem(_name, parId);
            categoryList.save("CategoryRecord");
            
        },
        removeCurCategoryIdHandler:function () {
            this.curCategoryId = -1;
            this.curCategoryItemDom && removeClass(this.curCategoryItemDom,"z-active");
        },
        selectCategoryItemHandler:function (e) {
            e=e||window.event;
            var tarDom = e.target||e.srcElement;
            var cateId = tarDom.getAttribute("data-id");

            this.curCategoryId = cateId;
            this.setCurCategoryItem(tarDom.parentNode);
            
        },
        removeCategoryItemHandler: function(e) {
            e=e||window.event;
            var tarDom = e.target||e.srcElement,
                isDel,
                isDelSubCate = !1;

            if(hasClass(tarDom.parentNode,"has-sub-category")){
                isDel = window.confirm("该分类含有子类别，确定删除吗");
                isDelSubCate = !0;
            }else{
                isDel = window.confirm("确定删除吗");
            }
            if(!isDel) return;
            
            var cateId = tarDom.getAttribute("data-id");
            if(cateId == null) return;

            categoryList.removeCategoryItem(cateId, isDelSubCate);
            categoryList.save("CategoryRecord");
        }
    }
});






// 填数据
$.on(window, "load", function(e) {
    categoryList.on("change", function(e) {
        categoryListView.$(".categorys").innerHTML = "";

        categoryListView.addCategorys(this.records);
    });


    if (localStorage["CategoryRecord"]) {
        categoryList.fetch("CategoryRecord");
    } else {
        categoryList.addCategoryItem("默认分类", -1);
        categoryList.addCategoryItem("百度ife项目", -1);
        categoryList.addCategoryItem("毕业设计", -1);
        categoryList.addCategoryItem("社团活动", -1);

        categoryList.save("CategoryRecord");
    }


})