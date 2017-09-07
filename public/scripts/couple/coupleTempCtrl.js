angular.module('happyGoMarry')
.controller('coupleTempCtrl', function($scope, coupleSrv, wepaySrv, $stateParams, $rootScope, $sce){
    $scope.checkout_uri;
    
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
            message: '',
            url: $scope.coupleInfo.url
        }
        console.log('couple/;dlkf:', $scope.coupleInfo);
        wepaySrv.getCheckouts($scope.coupleInfo.userid)
        .then(function(results){
            $scope.payments = results.data
            console.log($scope.payments)
            setTimeout(function(){
                var myDiv = document.getElementById('recent-gifts').scrollTop = 0;
            }, 500)
        })
    })
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
        // coupleSrv.saveNewGift(newGift);
        wepaySrv.createCheckout(newGift)
        .then(function(response){
            console.log(response.data)
            $scope.checkout_uri = $sce.trustAsResourceUrl(response.data);
        }); 
        // swal(
        //     'Thanks!',
        //     'Your Gift was sent successfully.',
        //     'success'
        // ); 
        // }).error(function(){
        //     swal(
        //         'Oops...',
        //         'Something went wrong!',
        //         'error'
        //     );
        // });   
    }
});