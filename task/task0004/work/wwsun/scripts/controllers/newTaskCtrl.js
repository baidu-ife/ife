angular.module("todoApp.controllers")
    .controller('NewTaskCtrl', ['StorageService','$state', function(StorageService, $state) {

        var self = this;

        self.categories = StorageService.listCategories();

        self.selectCategoryId = self.categories[0].id;

        self.add = function() {
            StorageService.addNewTask(self.selectCategoryId, self.newTask);
            $state.go('home'); // go to home view
        };

        // active the material date picker control
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });

    }]);