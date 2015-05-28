angular.module('todoApp.services', [])
    .factory('StorageService', [function () {

        function getCategoryArray() {
            var categoryArray = localStorage.getItem("categoryArray");
            if (!categoryArray) {
                categoryArray = [];
                localStorage.setItem('categoryArray', JSON.stringify(categoryArray));
            } else {
                categoryArray = JSON.parse(categoryArray);
            }
            return categoryArray;
        }

        function getTaskArray() {
            var taskArray = localStorage.getItem("taskArray");
            if (!taskArray) {
                taskArray = [];
                localStorage.setItem('taskArray', JSON.stringify(taskArray));
            } else {
                taskArray = JSON.parse(taskArray);
            }
            return taskArray;
        }

        return {
            listCategories: getCategoryArray,

            listTasks: getTaskArray,

            getCategoryById: function(id) {

            },

            getTaskById: function(id) {

            },

            addNewTask: function(category, task) {

            },

            addNewCategory: function(category) {
                var categoryArray = getCategoryArray();
                categoryArray.push(category);
                localStorage.setItem(category.id, JSON.stringify(category));
                localStorage.setItem('categoryArray', JSON.stringify(categoryArray));
            }
        };


        //var categories = [
        //    {name: 'Default', sub: ['task1', 'task2']},
        //    {name: 'Baidu-IFE', sub: ['task11', 'task21', 'task31']},
        //    {name: 'Memo', sub: []}
        //];
        //
        //return {
        //    loadCategories: function () {
        //        return $q.when(categories);
        //    },
        //
        //    list: function() {
        //        return categories;
        //    },
        //
        //    add: function(item) {
        //        categories.push(item);
        //    }
        //};
    }]);