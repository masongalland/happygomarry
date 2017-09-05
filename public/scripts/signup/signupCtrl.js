angular.module('happyGoMarry')
.controller('signupCtrl', function($scope, coupleSrv, wepaySrv, $rootScope, $state){

    coupleSrv.getUser()
    .then(function(response){
        $scope.couple = response;
        console.log(response)
        
        $scope.newCouple = {
            userId: $scope.couple.userid,
            weddingDate: new Date()
            
        } 
    })
    $scope.addUrl = function(){
        $scope.newCouple.url = $scope.couple.firstname.toLowerCase() + '-plus-' + $scope.newCouple.partnerFirstName.toLowerCase();
        coupleSrv.url = $scope.newCouple.url
        console.log($scope.newCouple.url)
        console.log('srv url: ', coupleSrv.url)
    }
    
    $scope.photoBackground = {
        "background-image": "url($scope.newCouple.photoUrl)"
    }

    var json = 'https://api.ipify.org?format=json';
    var userIp;
    var userAgent = window.navigator.userAgent
    $http.get(json)
    .then(function(result) {
        console.log("user ip: ", result.data.ip)
        userIp = result.data.ip;
    }, function(e) {
        alert("error");
    });

    $scope.saveNewCouple = function(newCouple) {
        coupleSrv.saveNewCouple(newCouple).success(function() { 
            wepaySrv.createWepayAccount(userIp, userAgent)
            $state.go('couple', {url: $scope.newCouple.url});
            swal(
                'Congratulations!',
                'To edit your page, click on your name in the menu.',
                'success'
            ); 
        }).error(function(){
            swal(
                'Oops...',
                'Something went wrong!',
                'error'
            );
        });   
        console.log('newCouple', $scope.newCouple)
        console.log('updatedCouple', $scope.couple)
    }


    // setInterval(function(){
    //     console.log($scope.newCouple)
    // }, 5000)
})