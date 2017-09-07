angular.module('happyGoMarry')
.controller('signupCtrl', function($scope, coupleSrv, wepaySrv, $rootScope, $state, $http){

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

    var wepayData = {
        ip: null,
        agent: window.navigator.userAgent
    };

    var json = 'https://api.ipify.org?format=json';
    $http.get(json)
    .then(function(result) {
        wepayData.ip = result.data.ip;
        console.log(wepayData)
    }, function(e) {
        alert("error");
    });
    $scope.saveNewCouple = function(newCouple) {
        coupleSrv.saveNewCouple(newCouple).success(function() { 
            wepaySrv.createWepayAccount(wepayData)
            .then(function(response){
                console.log("Did it create wepay account? ", response)
                if(response.data == "true"){
                    $state.go('couple', {url: $scope.newCouple.url});
                    swal(
                        'Congratulations!',
                        'To edit your page, click on your name in the menu.',
                        'success'
                    ); 
                }
            })
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