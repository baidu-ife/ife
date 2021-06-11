/**
 *
 * @param title is the task name
 * @param category is the category that the task belong to
 * @param date is the due date that the task should be finished
 * @param content is the task content
 * @constructor
 */
function Task(title, category, date, content) {
    this.id = Date.now();
    this.title = title;
    this.category = category;
    this.date = date;
    this.content = content;
    this.status = false;  // unfinished by default, true means the task is completed
}

Task.prototype = {
    constructor: Task,

    /**
     * change task status
     */
    changeStatus: function() {

        if (this.status) {
            this.status = false;
        } else {
            this.status = true;
        }
    },

    /**
     * Update the task detail
     * @param title
     * @param date
     * @param content
     */
    updateTask: function(title, date, content) {
        this.title = title;
        this.date = date;
        this.content = content;
    }
};