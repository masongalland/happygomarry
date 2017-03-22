angular.module('happyGoMarry')
.controller('signupCtrl', function($scope, coupleSrv){
    $scope.newCouple = {
        firstname: 'Mason', //this will be provided by auth0 
    }
    $scope.photoBackground = {
        "background-image": "url($scope.newCouple.photoUrl)"
    }
    // setInterval(function(){
    //     console.log($scope.newCouple)
    // }, 5000)
})