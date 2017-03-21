angular.module('happyGoMarry')
.controller('dashboardCtrl', function($scope, coupleSrv){
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
    })
    setTimeout(function(){
        $scope.userUpdates = {
        name: $scope.couple.firstname,
        partnername: $scope.couple.partnerfirstname,
        story: $scope.couple.story,
        time: $scope.couple.hour,
        place: $scope.couple.place,
        imageUrl: $scope.couple.photourl
        }
    }, 100) 
    // setInterval(function() {
    //     console.log($scope.userUpdates.date)
    // }, 2000)
})