angular.module('todoApp.services', [])
    .factory('StorageService', ['$q', function ($q) {

        // todo: using localStorage to persist data

        var categories = [
            {name: 'Default', sub: ['task1', 'task2']},
            {name: 'Baidu-IFE', sub: ['task11', 'task21', 'task31']},
            {name: 'Memo', sub: []}
        ];

        return {
            loadCategories: function () {
                return $q.when(categories);
            },

            list: function() {
                return categories;
            },

            add: function(item) {
                categories.push(item);
            }
        };
    }]);