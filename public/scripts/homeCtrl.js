angular.module("happyGoMarry").controller("homeCtrl", function($scope, coupleSrv, $rootScope){
   coupleSrv.getUser()
    .then(function(response){
        console.log('tried to get user and got', response == 'null')
        $rootScope.signedIn = response !== 'null' ? true : false;
        coupleSrv.couple = response;
        $scope.loggedInUrl = response.url;
        $scope.couple = coupleSrv.couple;  
    });
    $scope.url = coupleSrv.url;
    console.log('mainctrl url: ', $scope.url);

});