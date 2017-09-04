angular.module('happyGoMarry')
.controller('coupleTempCtrl', function($scope, coupleSrv, wepaySrv, $stateParams, $rootScope){
  
    coupleSrv.getCouple($stateParams.url)
    .then(function(response){
        $scope.coupleInfo = response[0];
        console.log("coupleinfo: ", $scope.coupleInfo)
        $scope.newAddress = {
            userId: $scope.coupleInfo.userid, 
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            email: ''
        };
        $scope.newRsvp = {
            userId: $scope.coupleInfo.userid, 
            firstName: '',
            lastName: '',
            email: '',
            numberInParty: 1
        };
        $scope.newGift = {
            userId: $scope.coupleInfo.userid,
            firstName: '',
            lastName: '',
            amount: 0.00,
            date: new Date(),
            message: ''
        }
        console.log('couple/;dlkf:', $scope.coupleInfo);

        return coupleSrv.getPayments($scope.coupleInfo.userid)
    })
    .then(function(response){
        $scope.payments = response.data;
        console.log('payments: ', $scope.payments);
        console.log('payments userid: ', $scope.coupleInfo.userid)

        return     coupleSrv.getDonations($scope.coupleInfo.userid)
    })
    .then(function(response){
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
    $scope.saveNewGift = function(newGift) {
        coupleSrv.saveNewGift(newGift);
        wepaySrv.createCheckout(newGift); 
        swal(
            'Thanks!',
            'Your Gift was sent successfully.',
            'success'
        ); 
        // }).error(function(){
        //     swal(
        //         'Oops...',
        //         'Something went wrong!',
        //         'error'
        //     );
        // });   
    }
});