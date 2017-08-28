angular.module('happyGoMarry')
.controller('dashboardCtrl', function($scope, coupleSrv){
    coupleSrv.getUser()
    .then(function(response){
        $scope.couple = response;  
        console.log('dashboard couple: ', $scope.couple)
        $scope.url = response.url;

        return coupleSrv.getPayments($scope.couple.userid)
    })
    .then(function(response){
        $scope.gifts = response.data;
        console.log('dash gifts: ', $scope.gifts);
        console.log('scope.couple: ', $scope.couple);

        coupleSrv.getDonations().then(function(response){
            $scope.donations = response.data[0];
            console.log($scope.donations);
        })
        coupleSrv.getAddresses($scope.couple.userid).then(function(response){
            $scope.addresses = response.data;
            console.log($scope.addresses);
        })
        coupleSrv.getRsvps($scope.couple.userid).then(function(response){
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
            userId: $scope.couple.userid,
            weddingDate: $scope.couple.weddingDate
            }
        }, 100) 
        $scope.saveUpdatedCouple = function(userUpdates) {
            coupleSrv.saveUpdatedCouple(userUpdates).success(function() { 
                swal(
                    'Thanks!',
                    'Your page has been updated',
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
    })



    // setInterval(function() {
    //     console.log($scope.userUpdates.date)
    // }, 2000)
})