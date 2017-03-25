angular.module('happyGoMarry').directive('navDir', function(){
    return {
        restrict: 'AE',
        templateUrl: './html/navDir.html',
        controller: 'homeCtrl'
    }
})