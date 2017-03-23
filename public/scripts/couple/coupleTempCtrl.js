angular.module('happyGoMarry')
.controller('coupleTempCtrl', function($scope, coupleSrv, $stateParams, $rootScope){

    coupleSrv.getCouple($stateParams.url).then(function(response){
        $scope.couple = response[0];
        $scope.newAddress = {
            // userId: $scope.couple.userid, 
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            email: ''
        };
        $scope.newRsvp = {
            // userId: $scope.couple.userid, 
            firstName: '',
            lastName: '',
            email: '',
            numberInParty: 1
        }
        console.log('couple/;dlkf:', $scope.couple);
    })
    coupleSrv.getPayments().then(function(response){
        $scope.payments = response.data;
        console.log('payments: ', $scope.payments);
    })
    coupleSrv.getDonations().then(function(response){
        $scope.donations = response.data[0];
        console.log('donations:', $scope.donations);
    });


    $scope.saveNewAddress = function(newAddress) {
        coupleSrv.saveNewAddress(newAddress).success(function() { 
            swal(
                'Thanks!',
                'Your address was sent successfully.',
                'success'
            ); 
        }).error(function(){
            swal(
                'Oops...',
                'Something went wrong!',
                'error'
            );
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
            swal(
                'Oops...',
                'Something went wrong!',
                'error'
            );
        });   
    }
});