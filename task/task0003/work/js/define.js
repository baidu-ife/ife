/**
 * 定义模型，集合，视图
 */


// Model
// ==================================================

/**
 * 类别模型
 * @Model {Category}
 *
 * @property {int} id 唯一ID
 * @property {string} name 分类名称
 * @property {int} taskCount 一个分类下的任务数量
 * @property {int} subId 下一级的分类ID
 * @property {init} parId 父级分类ID
 */
var Category = Model.extend({});


/**
 * 任务模型
 * @Model {Task}
 *
 * @property {int} id 唯一ID
 * @property {string} header 任务名称
 * @property {int} status 任务状态
 * @property {date} time 任务时间
 * @property {string} content 任务内容
 * @property {int} categoryId 属于的类别ID
 */
var Task = Model.extend({});



// 集合
// ==================================================

/**
 * 存储所有类别的集合,可以直接使用默认的集合
 * @List {CategoryList}
 */
var CategoryList = List.extend({
    model: Category,
    /**
     * 添加一个分类，ID自增
     * @param {string} name 分类名称
     * @param {init} parId 父级分类的ID
     */
    addCategoryItem: function(name, parId) {
        var constructor = this.model;
        var newCate = new constructor({
            id: this._getNextId(),
            name: name,
            number: 0,
            parId: parId
        });
        this.addItem(newCate);
        return newCate;
    },
    /**
     * 删除一个分类，如果该分类含有子类别，也全部删除
     * @param  {int}  categoryId   类别id
     * @param  {bool} isDelSubCate 是否删除子类别
     */
    removeCategoryItem: function(categoryId, isDelSubCate) {
        if(isDelSubCate){
            var records = this.records;
            for(var i in records){
                if(records.hasOwnProperty(i) && records[i].get("parId") == categoryId){
                    this.removeItem(i);
                }
            }

            this.removeItem(categoryId);
        }else{
            this.removeItem(categoryId);
        }
    },
    /**
     * 获得下一级分类
     * @param  {int} id 分类的ID
     * @return {Category|null}
     */
    getCategoryItem: function(id) {
        return this.find(id) || null;
    },
    /**
     * 计算一个分类的所有任务
     * @param  {int} id 分类的ID
     * @return {int}
     */
    calculateTaskNum: function(id) {

    }
});


/**
 * 存储所有任务的集合
 * @List {TaslList}
 */
var TaskList = List.extend({
    model:Task,
    addTask:function () {
        // body...
    }
});



// 视图
// ==================================================

/**
 * 类别列表视图
 * @View {CategoryListView}
 */
var CategoryListView = View.extend({
    model: Category,
    /**
     * 添加dom结构，不添加到集合中
     * @param {Category} cateItem 一个分类model
     */
    addCategoryItem: function(cateItem, context) {
        if (!(cateItem instanceof this.model)) {
            cateItem = new this.model(cateItem);
        }

        var li=this.createElement(cateItem);

        if(cateItem.get("parId") == -1){
            this.$(".categorys").appendChild(li);
        }else{

        }

        
    },
    createElement:function (cateItem) {
        var li = document.createElement("li");
        addClass(li, "level");
        li.innerHTML = '<a class="category-name" data-id="' + cateItem.get("id") + '">' + cateItem.get("name") + '(<span class="num">' + cateItem.get("number") + '</span>)</a>';
        (cateItem.id != 0) && (li.innerHTML += '<a class="del" data-id="' + cateItem.get("id") + '">&times;</a>');

        return li;
    },
    addCategorys:function (records) {
        var parIdGroup={},
            fragmentContainer=document.createDocumentFragment();
        for(var i in records){
            if(records.hasOwnProperty(i)){
                var cateItem=records[i],
                    parId=cateItem.get("parId");
                parIdGroup[parId] || (parIdGroup[parId]=[]);
                var li = this.createElement(cateItem);
                parIdGroup[parId].push({
                    dom:li,
                    category:cateItem
                });
                cateItem.dom = li;
            }
        }
        for(var i in parIdGroup){
            if(parIdGroup.hasOwnProperty(i)){
                var arr=parIdGroup[i];
                if(i == -1) {
                    for(var j=0; j<arr.length; j++){
                        addClass(arr[j].dom,"level-1");
                        fragmentContainer.appendChild(arr[j].dom);
                    }
                }else{
                    var ul = document.createElement("ul");
                    addClass(ul,"sub-category");
                    for(var j=0; j<arr.length; j++){
                        ul.appendChild(arr[j].dom);
                    }
                    var parLi=records[i].dom;
                    addClass(parLi,"has-sub-category");
                    parLi.appendChild(ul);
                }
            }
                
        }

        this.$(".categorys").appendChild(fragmentContainer);
    },
    setCurCategoryItem:function (cateItemDom) {
        this.curCategoryItemDom && removeClass(this.curCategoryItemDom,"z-active");
        addClass(cateItemDom, "z-active");
        if(hasClass(cateItemDom,"has-sub-category")){
            toggleClass(cateItemDom, "z-open");
        }
        this.curCategoryItemDom = cateItemDom;
    }
});


/**
 * 任务列表视图
 * @type {TaskListView}
 */
var TaskListView = View.extend({
    model:Task
});


