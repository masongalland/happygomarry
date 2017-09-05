angular.module('happyGoMarry')
.controller('dashboardCtrl', function($scope, coupleSrv, wepaySrv, uiGridConstants){

    setTimeout(function(){
        document.getElementsByClassName('dashDirective')[0].setAttribute('style', 'display: none;')
        document.getElementsByClassName('dashDirective')[1].setAttribute('style', 'display: none;')
        document.getElementsByClassName('dashDirective')[2].setAttribute('style', 'display: none;')
    }, 1500)



    coupleSrv.getUser()
    .then(function(response){
        $scope.couple = response;  
        // console.log('dashboard couple: ', $scope.couple)
        $scope.url = response.url;
        $scope.weddingDateArr = $scope.couple.weddingdate.slice(0, 10).split("-").map((e, i) => {
            if(e[0] == 0){
                e.slice(1)
            }
            return Number(e);
          })

        return coupleSrv.getPayments($scope.couple.userid)
    })
    .then(function(response){
        // $scope.gifts = response.data;
        // console.log('dash gifts: ', $scope.gifts);
        wepaySrv.getCheckouts($scope.couple.userid)
        .then(function(resp){
            console.log("checkouts in ctrl: ", resp.data)
            $scope.gifts = resp.data;
            $scope.giftOptions = {
                data: $scope.gifts,
                columnDefs: [
                    { field: 'donorFirstName', name: 'giftFN', displayName: "First Name", enableHiding: false, with: '*' },
                    { field: 'donorLastName', name: 'giftLN', displayName: "Last Name", with: '*'},
                    { field: 'date', name: 'dd', cellTooltip: true, displayName: "Date", width: '11%', cellFilter: "date"},
                    { field: 'message', name: 'message', cellTooltip: true, width: "33%"},
                    { field: 'amount', type: 'number', name: 'amount', cellTooltip: true, aggregationType: uiGridConstants.aggregationTypes.sum, cellFilter: "currency", footerCellFilter: 'currency', width: '*'}
                ]
            }
        })


        coupleSrv.getDonations().then(function(response){
            $scope.donations = response.data[0];
            // console.log("scope.donations", $scope.donations);
        })
        coupleSrv.getAddresses($scope.couple.userid).then(function(response){
            $scope.addresses = response.data;
            // console.log($scope.addresses);
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
            // console.log($scope.guests);
            $scope.rsvpOptions = {
                data: $scope.guests,
                columnDefs: [
                    { field: 'firstname', name: 'rsvpFN', displayName: "First Name", enableHiding: false },
                    { field: 'lastname', name: 'rsvpLN', displayName: "Last Name"},
                    { field: 'email', name: 'rsvpEmail', cellTooltip: true, displayName: "Email"},
                    { field: 'numberinparty', name: 'rsvpNum', cellTooltip: true, displayName: "# in Party", aggregationType: uiGridConstants.aggregationTypes.sum}
                ]
            }
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
        // console.log("userUpdates.weddingDate", $scope.userUpdates.weddingDate)
            
        
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