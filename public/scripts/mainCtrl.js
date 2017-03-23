angular.module("happyGoMarry").controller("mainCtrl", function($scope, coupleSrv, $rootScope){
   coupleSrv.getUser()
    .then(function(response){
        console.log('tried to get user and got', response == 'null')
        $rootScope.signedIn = response !== 'null' ? true : false;
        coupleSrv.couple = response;
        $scope.couple = coupleSrv.couple;  
    })



});