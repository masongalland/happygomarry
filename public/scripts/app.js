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
                templateUrl: '/html/createPage/createPage.html',
                controller: '/scripts/createPage/createPageCtrl.js'
            })
            .state('couple', {
                url: '/couple',
                templateUrl: './html/couple/couple.html',
                // controller: './scripts/couple/coupleCtrl.js'
            });
    })