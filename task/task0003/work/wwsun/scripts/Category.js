/**
 *
 * @param name is category name
 * @param parent is the parent category name
 * @constructor
 */
function Category(name, parent) {
    this.id = Date.now(); // use the create time as the id
    this.name = name;
    this.parent = parent;
    this.subCategories = [];
    this.tasks = [];
}

Category.prototype = {
    constructor: Category,

    /**
     * add new sub category of current category
     * @param subCategory
     */
    addSubCategory: function(subCategoryId) {
        this.subCategories.push(subCategoryId);
    },

    /**
     * add new task of current category
     * @param task
     */
    addTask: function(task) {
        this.tasks.push(task);
    }
};