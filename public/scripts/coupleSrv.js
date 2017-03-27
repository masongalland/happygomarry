angular.module('happyGoMarry').service('coupleSrv', function($http){
    
    var baseUrl = '/api/';

    this.couple;
    this.url;

    this.getCouple = function(url) {
        return $http.get(baseUrl + 'couple/' + url).then(function(response){
            return response.data;
        })
    };
    this.getDemoCouple = function(){
        return $http.get(baseUrl + 'demo').then(function(response){
            return response.data[0];
        })
    }
    this.getUser = function() {
        return $http.get('/auth/me').then(function(response){
            return response.data;
        })
    };
    this.getPayments = function() {
        return $http.get(baseUrl + 'payments')
    };
    this.getDonations = function() {
        return $http.get(baseUrl + 'donations')      
    }
    this.getAddresses = function(userid) {
        return $http.get(baseUrl + 'addresses/' + userid) //will need to change the paramater to be based on who is logged in
    }
    this.getRsvps = function(userid) {
        return $http.get(baseUrl + 'rsvp/' + userid) //will need to change the paramater to be based on who is logged in
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
    this.saveNewCouple = function(newCouple) {
        return $http({ method: 'PUT', url: baseUrl + 'new-couple', data: newCouple})
    }
})