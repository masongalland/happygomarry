angular.module('happyGoMarry').service('wepaySrv', function($http){
    var baseUrl = '/api/';

    this.createWepayAccount = function() {
        return $http({ method: 'POST', url: '/api/wepay/create-account'}).then(console.log('created wepay account'))
    }



})