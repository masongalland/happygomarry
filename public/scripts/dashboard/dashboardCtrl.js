angular.module('happyGoMarry')
.controller('dashboardCtrl', function($scope, coupleSrv){
    coupleSrv.getUser()
    .then(function(response){
        $scope.couple = response;  
        console.log('dashboard couple: ', $scope.couple)
        $scope.url = response.url;
        $scope.weddingDateArr = $scope.couple.weddingdate.slice(0, 10).split("-").map((e, i) => {
            if(e[0] == 0){
                e.slice(1)
            }
            return Number(e);
          })
          console.log("Array", $scope.weddingDateArr)

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
            $scope.gridOptions = {
                data: $scope.addresses,
                columnDefs: [
                    { field: 'firstname', displayName: "First Name", width: '13%', enableHiding: false },
                    { field: 'lastname', displayName: "Last Name", width: '13%'},
                    { field: 'street', width: '15%', cellTooltip: true},
                    { field: 'city', width: '13%'},
                    { field: 'state', width: '10%'},
                    { field: 'zip', width: '10%'},
                    { field: 'email', cellTooltip: true}
                ]
            }
        })
        coupleSrv.getRsvps($scope.couple.userid).then(function(response){
            $scope.guests = response.data;
            console.log($scope.guests);
        })

        
        
        $scope.userUpdates = {
        firstName: $scope.couple.firstname,
        partnerFirstName: $scope.couple.partnerfirstname,
        photoUrl: $scope.couple.photourl,
        story: $scope.couple.story,
        hour: $scope.couple.hour,
        place: $scope.couple.place,
        userId: $scope.couple.userid,
        weddingDate: new Date($scope.weddingDateArr[0], $scope.weddingDateArr[1] - 1, $scope.weddingDateArr[2])
        }
        console.log("userUpdates.weddingDate", $scope.userUpdates.weddingDate)
            
        
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