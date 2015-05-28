angular.module('todoApp.controllers', [])
    .controller('TodoCtrl', ['StorageService', function(StorageService) {
        var self = this;

        self.activeMenu = function() {
            $('.collapsible').collapsible();
        };

        self.categories = StorageService.listCategories();

    }]);