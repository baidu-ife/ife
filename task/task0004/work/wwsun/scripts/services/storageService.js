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

            addNewTask: function(categoryId, task) {
                //task.id = Date.now();
                var taskArray = getTaskArray();
                var categoryArray = getCategoryArray();

                // find category in category array

                var i,
                    n;

                for (i=0, n=categoryArray.length; i<n; i++) {
                    if(categoryArray[i].id === categoryId) {
                        categoryArray[i].tasks.push(task);
                        localStorage.setItem(categoryId, JSON.stringify(categoryArray[i])); // update category item
                    }
                }

                // update category in category array
                localStorage.setItem('categoryArray', JSON.stringify(categoryArray));

                // insert new task to task array
                taskArray.push(task);
                localStorage.setItem('taskArray', JSON.stringify(taskArray));

                // insert new task in localStorage
                localStorage.setItem(task.id, JSON.stringify(task));
            },

            addNewCategory: function(category) {
                var categoryArray = getCategoryArray();
                categoryArray.push(category);
                localStorage.setItem(category.id, JSON.stringify(category));
                localStorage.setItem('categoryArray', JSON.stringify(categoryArray));
            }
        };
    }]);