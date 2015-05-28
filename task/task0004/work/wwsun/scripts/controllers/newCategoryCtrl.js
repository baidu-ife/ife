angular.module("todoApp.controllers")
    .controller('NewCategoryCtrl', ['StorageService','$state', function(StorageService, $state) {

        var self = this;

        self.newCategory = null;

        self.add = function() {
            
            StorageService.addNewCategory({
                id: Date.now(),
                name: self.newCategory.name,
                tasks: []
            });

            $state.go('home'); // go to home view

        };

    }]);