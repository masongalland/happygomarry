angular.module('happyGoMarry').service('coupleSrv', function($http){

    var baseUrl = '/api/';

    this.getCouple = function() {
        return $http.get(baseUrl + 'couple')
    };
    this.getPayments = function() {
        return $http.get(baseUrl + 'payments')
    };
    this.getDonations = function() {
        return $http.get(baseUrl + 'donations')        
    }

})