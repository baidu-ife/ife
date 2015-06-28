/*
* categoryListView.js
 */

define(function (require, exports, module) {
    var _=require("../lib/mvc"),
        Category=require("../model/categoryModel").Model_Category;

    /**
     * 类别列表视图
     * @View {CategoryListView}
     */
    var CategoryListView = _.View.extend({
        model: Category,
        /**
         * 添加dom结构，不添加到集合中，为完成
         * @param {string} name 分类名称
         * @param {int} parId 分类父级ID
         */
        addCategoryItem: function(name, parId) {
            var categoryList=this.categoryList;
            var nCateItem = categoryList.addCategoryItem(name, parId);
            var parCateDom;

            var nli=this.createElement(nCateItem);

            if(parId==-1){
                this.$(".categorys").appendChild(nli);
            }else if(parCateDom=this.curCategoryItemDom){
                addClass(parCateDom,"has-sub-category");
                addClass(parCateDom,"z-open");
                var ul;
                parCateDom.lastChild.tagName.toLowerCase() == "ul" ? (ul=parCateDom.lastChild) : (ul=document.createElement("ul"), addClass(ul,"sub-category"));
                ul.appendChild(nli);
                parCateDom.appendChild(ul);
            }

            categoryList.save(categoryList.localStorageName);        
        },
        removeCategoryItem:function (cateId, isDelSubCate,cateItemDom) {
            var categoryList=this.categoryList;
            var taskList=this.taskList;

            categoryList.removeCategoryItem(cateId, isDelSubCate);
            taskList.removeTaskByCategoryId(cateId);

            taskList.save(taskList.localStorageName);
            categoryList.save(categoryList.localStorageName);

            if(cateItemDom===this.curCategoryItemDom){
                var nextDom = getNextSiblingElement(cateItemDom);
                if(!nextDom) {
                    nextDom=cateItemDom.parentNode.firstChild;
                }
                if(nextDom===cateItemDom){
                    nextDom=cateItemDom.parentNode.parentNode;
                }

                if(window.os.phone !== 1){
                    this.selectCategoryItemHandler({
                        target:nextDom
                    });
                }
            }

            var parDom=cateItemDom.parentNode;
            if(hasClass(parDom, "sub-category") && parDom.childNodes.length <= 1){
                var parDom2=parDom.parentNode;
                parDom2.removeChild(parDom);
            }else{
                parDom.removeChild(cateItemDom);
            }

            this.$("#allTaskNum").innerHTML=taskList.getTaskCount();
        },
        createElement: function(cateItem) {
            var li = document.createElement("li");
            var id=cateItem.get("id");
            li.setAttribute("data-id",id);
            addClass(li, "level");
            li.innerHTML = '<a class="category-name" data-id="' + id + '">' + cateItem.get("name") + '(<span class="num">' + this.getTaskCountOfCategoryId(id) + '</span>)</a>';
            (cateItem.id != 0) && (li.innerHTML += '<a class="del" data-id="' + id + '">&times;</a>');

            return li;
        },
        getTaskCountOfCategoryId:function (id) {
            var taskList=this.taskList;
            var num=taskList.getCountOfCategoryId(id);
            return num;
        },
        addCategorys: function(records) {
            var parIdGroup = {},
                fragmentContainer = document.createDocumentFragment();
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    var cateItem = records[i],
                        parId = cateItem.get("parId");
                    parIdGroup[parId] || (parIdGroup[parId] = []);
                    var li = this.createElement(cateItem);
                    parIdGroup[parId].push({
                        dom: li,
                        category: cateItem
                    });
                    cateItem.dom = li;
                }
            }
            for (var i in parIdGroup) {
                if (parIdGroup.hasOwnProperty(i)) {
                    var arr = parIdGroup[i];
                    if (i == -1) {
                        for (var j = 0; j < arr.length; j++) {
                            addClass(arr[j].dom, "level-1");
                            fragmentContainer.appendChild(arr[j].dom);
                        }
                    } else {
                        var ul = document.createElement("ul");
                        addClass(ul, "sub-category");
                        for (var j = 0; j < arr.length; j++) {
                            ul.appendChild(arr[j].dom);
                        }
                        var parLi = records[i].dom;
                        addClass(parLi, "has-sub-category");
                        parLi.appendChild(ul);
                    }
                }

            }

            fragmentContainer && this.$(".categorys").appendChild(fragmentContainer);
        },
        setCurCategoryItemDom: function(cateItemDom) {
            this.curCategoryItemDom && removeClass(this.curCategoryItemDom, "z-active");
            addClass(cateItemDom, "z-active");
            if (hasClass(cateItemDom, "has-sub-category")) {
                toggleClass(cateItemDom, "z-open");
            }
            this.curCategoryItemDom = cateItemDom;
        },
        addNewTaskToUpdateNum:function () {
            var taskList=this.taskList;
            if(this.curCategoryItemDom){
                var numDom=getElementsByClassName(this.curCategoryItemDom, "num")[0];
                var num = parseInt(numDom.innerHTML);
                num++;
                numDom.innerHTML=num;

                this.$("#allTaskNum").innerHTML=taskList.getTaskCount();
            }
        }
    });

    module.exports=CategoryListView;
})