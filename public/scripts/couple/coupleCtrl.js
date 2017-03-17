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
    })
})