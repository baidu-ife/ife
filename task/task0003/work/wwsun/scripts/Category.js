/**
 *
 * @param name is category name
 * @param parent is the parent category name
 * @param level 1 means root category, 2 means secondary category
 * @constructor
 */
function Category(name, parent, level) {
    this.name = name;
    this.parent = parent;
    this.level = level;
    this.subCategories = [];
    this.tasks = [];
}

Category.prototype = {
    constructor: Category,

    /**
     * add new sub category of current category
     * @param subCategory
     */
    addSubCategory: function(subCategory) {
        this.subCategories.push(subCategory);
    },

    /**
     * add new task of current category
     * @param task
     */
    addTasks: function(task) {
        this.tasks.push(task);
    }
};