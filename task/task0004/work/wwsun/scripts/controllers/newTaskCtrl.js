angular.module("todoApp.controllers")
    .controller('NewTaskCtrl', ['StorageService','$state', function(StorageService, $state) {

        var self = this;

        self.categories = StorageService.listCategories();

        self.selectCategoryId = self.categories[0].id;

        self.add = function() {
            StorageService.addNewTask(self.selectCategoryId, self.newTask);
            $state.go('item'); // go to home view

            // todo: display the created todo item right now
        };

        // active the material date picker control
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });

    }]);