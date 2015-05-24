angular.module('todoApp.controllers', [])
    .controller('MainCtrl', ['$mdSidenav', '$mdBottomSheet', '$q', function ($mdSidenav, $mdBottomSheet, $q) {
        var self = this;

        self.toggleList = toggleMenuList;

        function toggleMenuList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            })
        }
    }]);