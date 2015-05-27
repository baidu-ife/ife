angular.module("todoApp.controllers")
    .controller('NewCategoryCtrl', ['StorageService', function(StorageService) {

        var self = this;

        self.newCategoryName = null;

        self.add = function() {
            
            StorageService.add({
                name: self.newCategoryName,
                sub: []
            });

        };

    }]);