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
    this.getAddresses = function() {
        return $http.get(baseUrl + 'addresses/1') //will need to change the paramater to be based on who is logged in
    }
    this.getRsvps = function() {
        return $http.get(baseUrl + 'rsvp/1') //will need to change the paramater to be based on who is logged in
    }
    this.saveNewAddress = function(newAddress) {
        return $http({ method: 'POST', url: '/api/address', data: newAddress})
    }
    this.saveNewRsvp = function(newRsvp) {
        return $http({ method: 'POST', url: '/api/Rsvp', data: newRsvp})
    }
    this.saveUpdatedCouple = function(userUpdates) {
        return $http({ method: 'PUT', url: baseUrl + 'couple', data: userUpdates})
    }
})