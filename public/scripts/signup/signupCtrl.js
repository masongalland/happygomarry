angular.module('happyGoMarry')
.controller('signupCtrl', function($scope, coupleSrv, $rootScope){

    coupleSrv.getUser()
    .then(function(response){
        console.log('tried to get user and got', response == 'null')
        $rootScope.signedIn = response !== 'null' ? true : false;
        coupleSrv.couple = response;
        $scope.couple = coupleSrv.couple;  
        console.log('couple: ', $scope.couple)
        
        $scope.newCouple = {
            userId: $scope.couple.userid,
            
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

    $scope.saveNewCouple = function(newCouple) {
        coupleSrv.saveNewCouple(newCouple).success(function() { 
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