angular.module('happyGoMarry', ['ui.router', 'ngMaterial', 'ngMessages'])
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider){
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
            .state('couple',{
                url: '/couple/:url',
                templateUrl: './html/couple/coupleTemplate.html',
                controller: 'coupleTempCtrl'
            })
            .state('demo', {
                url: '/demo',
                templateUrl: './html/couple/demo.html',
                controller: 'coupleCtrl'
            })
            .state('dashboard', {
                url: '/dashboard/:url',
                templateUrl: './html/dashboard/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: './html/signup/signup.html',
                controller: 'signupCtrl'
            })

        var indigo = $mdThemingProvider.extendPalette('indigo', {
            '500': '1bc2b7'
        });
        $mdThemingProvider.definePalette('indigo', indigo);
    })