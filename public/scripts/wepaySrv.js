angular.module('happyGoMarry').service('wepaySrv', function($http){
    var baseUrl = '/api/wepay/';

    this.createWepayAccount = function(userIp, userAgent) {
        return $http({ method: 'POST', url: `${baseUrl}create-account?ip=${userIp}[agent]=${userAgent}`}).then(console.log('created wepay account'))
    }
    this.createCheckout = function(data) {
        return $http({ method: 'POST', url: `${baseUrl}create-checkout`, data: data})
    }
    this.getCheckouts = function(userId){
        return $http({method: 'GET', url: `${baseUrl}checkouts/${userId}`})
        
    }



})