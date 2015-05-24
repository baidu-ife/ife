angular.module('appIcons', [])
    .config(function($mdThemingProvider, $mdIconProvider) {
        $mdIconProvider
            .icon('menu', 'assets/svg/menu.svg', 24);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
    });