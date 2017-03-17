angular.module('happyGoMarry', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './html/home/home.html'
            })
            .state('howItWorks',{
                url: '/how-it-works',
                templateUrl: './html/howItWorks/howItWorks.html'
            })
            .state('createPage',{
                url: '/create-page',
                templateUrl: './html/createPage/createPage.html',
                controller: './scripts/createPage/createPageCtrl.js'
            })
            .state('demo', {
                url: '/demo',
                templateUrl: './html/couple/demo.html'
            })
            .state('testCouple', {
                url: '/test-couple',
                templateUrl: './html/couple/testCouple.html',
                controller: 'coupleCtrl'
            });
    })