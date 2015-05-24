angular.module('todoApp.controllers', [])
    .controller('TodoCtrl', ['StorageService', function(StorageService) {
        var self = this;

        self.categories = [];

        self.activeMenu = function() {
            $('.collapsible').collapsible();
        };

        StorageService.loadCategories()
            .then( function (categories) {
                self.categories = categories;
            });



    }]);