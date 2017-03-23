angular.module('happyGoMarry')
.controller('dashboardCtrl', function($scope, coupleSrv, $stateParams){

    coupleSrv.getCouple($stateParams.url).then(function(response){
        $scope.couple = response[0];
        console.log('couple:', $scope.couple);
    })
    coupleSrv.getPayments().then(function(response){
        $scope.payments = response.data;
        console.log($scope.payments);
    })
    coupleSrv.getDonations().then(function(response){
        $scope.donations = response.data[0];
        console.log($scope.donations);
    })
    coupleSrv.getAddresses().then(function(response){
        $scope.addresses = response.data;
        console.log($scope.addresses);
    })
    coupleSrv.getRsvps().then(function(response){
        $scope.guests = response.data;
        console.log($scope.guests);
    })
    setTimeout(function(){
        $scope.userUpdates = {
        firstName: $scope.couple.firstname,
        partnerFirstName: $scope.couple.partnerfirstname,
        photoUrl: $scope.couple.photourl,
        story: $scope.couple.story,
        hour: $scope.couple.hour,
        place: $scope.couple.place,
        userId: 1 //this will depend on who is logged in
        }
    }, 100) 
    $scope.saveUpdatedCouple = function(userUpdates) {
        coupleSrv.saveUpdatedCouple(userUpdates).success(function() { 
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
        console.log('userupdates', $scope.userUpdates)
        console.log('updatedCouple', $scope.couple)
    }


    // setInterval(function() {
    //     console.log($scope.userUpdates.date)
    // }, 2000)
})