angular.module('todoApp.controllers')
    .controller('ItemCtrl', [function () {
        var self = this;

        self.task = null;

        self.dataInit = function() {
            var taskId = localStorage.getItem("currentItem");
            var taskDetail = localStorage.getItem(taskId);
            self.task = JSON.parse(taskDetail);
        };

        self.dataInit();
    }]);