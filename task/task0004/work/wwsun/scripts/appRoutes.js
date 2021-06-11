angular.module('appRoutes', [])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'TodoCtrl as todoCtrl'
            })

            .state('item', {
                url: '/item',
                templateUrl: 'views/item.html',
                controller: 'ItemCtrl as itemCtrl'
            })

            .state('newItem', {
                url: '/new/item',
                templateUrl: 'views/newItem.html'
            })

            .state('newCategory', {
                url: '/new/category',
                templateUrl: 'views/newCategory.html',
                controller: 'NewCategoryCtrl as newCategoryCtrl'
            })

            .state('newTask', {
                url: '/new/task',
                templateUrl: 'views/newTask.html',
                controller: 'NewTaskCtrl as newTaskCtrl'
            });
    });