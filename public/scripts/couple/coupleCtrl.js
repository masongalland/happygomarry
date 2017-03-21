angular.module('happyGoMarry')
.controller('coupleCtrl', function($scope, coupleSrv){
    coupleSrv.getCouple().then(function(response){
        $scope.couple = response.data[0];
        console.log($scope.couple);
    })
    coupleSrv.getPayments().then(function(response){
        $scope.payments = response.data;
        console.log($scope.payments);
    })
    coupleSrv.getDonations().then(function(response){
        $scope.donations = response.data[0];
        console.log($scope.donations);
    });

    $scope.newAddress = {
        userId: 1, //this will be dependent on whose page they submit on
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        email: ''
    };
    $scope.newRsvp = {
        userId: 1, //this will be dependent on whose page they submit on
        firstName: '',
        lastName: '',
        email: '',
        numberInParty: 1
    }

    $scope.saveNewAddress = function(newAddress) {
        coupleSrv.saveNewAddress(newAddress).success(function() { 
            swal(
                'Thanks!',
                'Your address was sent successfully.',
                'success'
            ); 
        }).error(function(){
            alert('something went wrong!');
        });   
    }
    $scope.saveNewRsvp = function(newRsvp) {
        coupleSrv.saveNewRsvp(newRsvp).success(function() { 
            swal(
                'Thanks!',
                'Your RSVP was sent successfully.',
                'success'
            ); 
        }).error(function(){
            alert('something went wrong!');
        });   
    }

    // setInterval(function() {
    //     console.log($scope.newAddress)
    // }, 5000)
})