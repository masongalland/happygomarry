'use strict';

angular.module('happyGoMarry', ['ui.router', 'ngMaterial', 'ngMessages']).config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        templateUrl: './html/home/home.html'
    }).state('howItWorks', {
        url: '/how-it-works',
        templateUrl: './html/howItWorks/howItWorks.html'
    }).state('couple', {
        url: '/couple/:url',
        templateUrl: './html/couple/coupleTemplate.html',
        controller: 'coupleTempCtrl'
    }).state('demo', {
        url: '/demo',
        templateUrl: './html/couple/demo.html',
        controller: 'coupleCtrl'
    }).state('dashboard', {
        url: '/dashboard',
        templateUrl: './html/dashboard/dashboard.html',
        controller: 'dashboardCtrl'
    }).state('signup', {
        url: '/signup',
        templateUrl: './html/signup/signup.html',
        controller: 'signupCtrl'
    });

    var indigo = $mdThemingProvider.extendPalette('indigo', {
        '500': '1bc2b7'
    });
    $mdThemingProvider.definePalette('indigo', indigo);
});
"use strict";

angular.module("happyGoMarry").controller("mainCtrl", function ($scope, coupleSrv, $rootScope) {
    coupleSrv.getUser().then(function (response) {
        console.log('tried to get user and got', response == 'null');
        $rootScope.signedIn = response !== 'null' ? true : false;
        coupleSrv.couple = response;
        $scope.couple = coupleSrv.couple;
    });
    $scope.url = coupleSrv.url;
    console.log('mainctrl url: ', $scope.url);
});
"use strict";

angular.module("happyGoMarry").controller("homeCtrl", function ($scope, coupleSrv, $rootScope) {
    coupleSrv.getUser().then(function (response) {
        console.log('tried to get user and got', response == 'null');
        $rootScope.signedIn = response !== 'null' ? true : false;
        coupleSrv.couple = response;
        $scope.couple = coupleSrv.couple;
    });
    $scope.url = coupleSrv.url;
    console.log('mainctrl url: ', $scope.url);
});
'use strict';

angular.module('happyGoMarry').directive('animateDir', function () {
    return {
        restrict: 'AE',
        link: function link(scope, element, attributes) {
            $(document).ready(function () {
                $('.send-address').click(function () {
                    $('#send-address').css('display', 'block');
                });
                $('.send-rsvp').click(function () {
                    $('#send-rsvp').css('display', 'block');
                });
                $('.send-gift').click(function () {
                    $('#send-gift').css('display', 'block');
                });
                $('.cancel-btn, .submit-btn').click(function () {
                    $('#send-address, #send-rsvp, #send-gift').css('display', 'none');
                });
                $('.send-gift, #dash-gifts-btn').mouseenter(function () {
                    $('.gray-present').css('display', 'none');
                    $('.green-present').css('display', 'block');
                }).mouseleave(function () {
                    $('.gray-present').css('display', 'block');
                    $('.green-present').css('display', 'none');
                });
                $('.send-rsvp, #dash-rsvp-btn').mouseenter(function () {
                    $('.gray-check').css('display', 'none');
                    $('.green-check').css('display', 'block');
                }).mouseleave(function () {
                    $('.gray-check').css('display', 'block');
                    $('.green-check').css('display', 'none');
                });
                $('.send-address, #dash-addressses-btn').mouseenter(function () {
                    $('.gray-envelope').css('display', 'none');
                    $('.green-envelope').css('display', 'block');
                }).mouseleave(function () {
                    $('.gray-envelope').css('display', 'block');
                    $('.green-envelope').css('display', 'none');
                });
                $('#dash-edit-btn').mouseenter(function () {
                    $('.gray-edit').css('display', 'none');
                    $('.green-edit').css('display', 'block');
                }).mouseleave(function () {
                    $('.gray-edit').css('display', 'block');
                    $('.green-edit').css('display', 'none');
                });
                $('.HAM').click(function () {
                    $('#mobile-menu').addClass('animated fadeInDown');
                    $('#mobile-menu').css('display', 'flex');
                    $('#mobile-menu').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#mobile-menu').removeClass('animated fadeInDown');
                    });
                    $('.HAM').css('display', 'none');
                });
                $('.close-mobile, .mobile-menu-content a').click(function () {
                    $('#mobile-menu').addClass('animated fadeOutUp');
                    $('#mobile-menu').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#mobile-menu').removeClass('animated fadeOutUp');
                        $('#mobile-menu').css('display', 'none');
                    });
                    $('.HAM').css('display', 'flex');
                });
                $('#dash-edit-btn').click(function () {
                    $('edit-page').css('display', 'block');
                });
                $('.user-btn').mouseenter(function () {
                    $('.drop-down').css('display', 'flex');
                });
                $('.drop-down').mouseleave(function () {
                    $('.drop-down').css('display', 'none');
                });
            });
        }
    };
});
'use strict';

angular.module('happyGoMarry').service('coupleSrv', function ($http) {

    var baseUrl = '/api/';

    this.couple;
    this.url;

    this.getCouple = function (url) {
        return $http.get(baseUrl + 'couple/' + url).then(function (response) {
            return response.data;
        });
    };
    this.getDemoCouple = function () {
        return $http.get(baseUrl + 'demo').then(function (response) {
            return response.data[0];
        });
    };
    this.getUser = function () {
        return $http.get('/auth/me').then(function (response) {
            return response.data;
        });
    };
    this.getPayments = function (userid) {
        return $http.get(baseUrl + 'payments/' + userid);
    };
    this.getDonations = function (userid) {
        return $http.get(baseUrl + 'donations/' + userid);
    };
    this.getAddresses = function (userid) {
        return $http.get(baseUrl + 'addresses/' + userid); //will need to change the paramater to be based on who is logged in
    };
    this.getRsvps = function (userid) {
        return $http.get(baseUrl + 'rsvp/' + userid); //will need to change the paramater to be based on who is logged in
    };
    this.saveNewAddress = function (newAddress) {
        return $http({ method: 'POST', url: '/api/address', data: newAddress });
    };
    this.saveNewRsvp = function (newRsvp) {
        return $http({ method: 'POST', url: '/api/Rsvp', data: newRsvp });
    };
    this.saveUpdatedCouple = function (userUpdates) {
        return $http({ method: 'PUT', url: baseUrl + 'couple', data: userUpdates });
    };
    this.saveNewCouple = function (newCouple) {
        return $http({ method: 'PUT', url: baseUrl + 'new-couple', data: newCouple });
    };
    this.saveNewGift = function (newGift) {
        return $http({ method: 'POST', url: baseUrl + 'new-gift', data: newGift });
    };
});
'use strict';

angular.module('happyGoMarry').directive('navDir', function () {
    return {
        restrict: 'AE',
        templateUrl: './html/navDir.html',
        controller: 'homeCtrl'
    };
});
"use strict";
'use strict';

angular.module('happyGoMarry').controller('coupleCtrl', function ($scope, coupleSrv, $rootScope) {

    coupleSrv.getDemoCouple().then(function (response) {
        $scope.couple = response;
        console.log('demo: ', $scope.couple);
    });
    coupleSrv.getPayments().then(function (response) {
        $scope.payments = response.data;
        console.log($scope.payments);
    });
    coupleSrv.getDonations().then(function (response) {
        $scope.donations = response.data[0];
        console.log($scope.donations);
    });

    $scope.newAddress = {
        userId: 1, //this will be dependent on whose page they submit on
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        email: ''
    };
    $scope.newRsvp = {
        userId: 1, //this will be dependent on whose page they submit on
        firstName: '',
        lastName: '',
        email: '',
        numberInParty: 1
    };

    $scope.saveNewAddress = function (newAddress) {
        coupleSrv.saveNewAddress(newAddress).success(function () {
            swal('Thanks!', 'Your address was sent successfully.', 'success');
        }).error(function () {
            swal('Oops...', 'Something went wrong!', 'error');
        });
    };
    $scope.saveNewRsvp = function (newRsvp) {
        coupleSrv.saveNewRsvp(newRsvp).success(function () {
            swal('Thanks!', 'Your RSVP was sent successfully.', 'success');
        }).error(function () {
            swal('Oops...', 'Something went wrong!', 'error');
        });
    };

    // setInterval(function() {
    //     console.log($scope.newAddress)
    // }, 5000)
});
'use strict';

angular.module('happyGoMarry').controller('coupleTempCtrl', function ($scope, coupleSrv, $stateParams, $rootScope) {

    coupleSrv.getCouple($stateParams.url).then(function (response) {
        $scope.coupleInfo = response[0];
        $scope.newAddress = {
            userId: $scope.coupleInfo.userid,
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            email: ''
        };
        $scope.newRsvp = {
            userId: $scope.coupleInfo.userid,
            firstName: '',
            lastName: '',
            email: '',
            numberInParty: 1
        };
        $scope.newGift = {
            userId: $scope.coupleInfo.userid,
            firstName: '',
            lastName: '',
            amount: 0.00,
            date: new Date(),
            message: ''
        };
        console.log('couple/;dlkf:', $scope.coupleInfo);

        return coupleSrv.getPayments($scope.coupleInfo.userid);
    }).then(function (response) {
        $scope.payments = response.data;
        console.log('payments: ', $scope.payments);
        console.log('payments userid: ', $scope.coupleInfo.userid);

        return coupleSrv.getDonations($scope.coupleInfo.userid);
    }).then(function (response) {
        $scope.donations = response.data[0];
        console.log('donations:', $scope.donations);
    });

    $scope.saveNewAddress = function (newAddress) {
        coupleSrv.saveNewAddress(newAddress).success(function () {
            swal('Thanks!', 'Your address was sent successfully.', 'success');
        }).error(function () {
            swal('Oops...', 'Something went wrong!', 'error');
        });
    };
    $scope.saveNewRsvp = function (newRsvp) {
        coupleSrv.saveNewRsvp(newRsvp).success(function () {
            swal('Thanks!', 'Your RSVP was sent successfully.', 'success');
        }).error(function () {
            swal('Oops...', 'Something went wrong!', 'error');
        });
    };
    $scope.saveNewGift = function (newGift) {
        coupleSrv.saveNewGift(newGift);
        swal('Thanks!', 'Your Gift was sent successfully.', 'success');
        // }).error(function(){
        //     swal(
        //         'Oops...',
        //         'Something went wrong!',
        //         'error'
        //     );
        // });   
    };
});
'use strict';

angular.module('happyGoMarry').directive('rsvpForm', function () {
    return {
        restrict: 'AE',
        templateUrl: './html/couple/rsvpForm.html'
    };
});
'use strict';

angular.module('happyGoMarry').directive('sendAddress', function () {
    return {
        restrict: 'AE',
        templateUrl: './html/couple/sendAddressTemplate.html'
    };
});
'use strict';

angular.module('happyGoMarry').directive('sendGift', function () {
    return {
        restrict: 'AE',
        templateUrl: './html/couple/sendGift.html'
    };
});
'use strict';

angular.module('happyGoMarry').directive('addressesPage', function () {
    return {
        restrict: 'AE',
        templateUrl: './html/dashboard/addresses.html'
    };
});
'use strict';

angular.module('happyGoMarry').directive('dashControls', function () {
    return {
        restrict: 'AE',
        link: function link(scope, element, attributes) {
            $(document).ready(function () {
                $('#dash-addressses-btn').click(function () {
                    $('edit-page, rsvp-page').css('display', 'none');
                    $('addresses-page').css('display', 'block');
                });
                $('#dash-rsvp-btn').click(function () {
                    $('edit-page, addresses-page').css('display', 'none');
                    $('rsvp-page').css('display', 'block');
                });
                $('#dash-edit-btn').click(function () {
                    $('addresses-page, rsvp-page').css('display', 'none');
                    $('edit-page').css('display', 'block');
                });
                $('#dash-gifts-btn').click(function () {
                    $('addresses-page, rsvp-page, edit-page').css('display', 'none');
                    $('gifts-page').css('display', 'block');
                });

                $('#addresses-table').DataTable({
                    columnDefs: [{
                        targets: [0, 1, 2],
                        className: 'mdl-data-table__cell--non-numeric'
                    }]
                });
                $('#rsvp-table').DataTable({
                    columnDefs: [{
                        targets: [0, 1, 2],
                        className: 'mdl-data-table__cell--non-numeric'
                    }]
                });
            });
        }
    };
});
'use strict';

angular.module('happyGoMarry').controller('dashboardCtrl', function ($scope, coupleSrv) {

    coupleSrv.getUser().then(function (response) {
        $scope.couple = response;
        console.log('dash couple: ', $scope.couple);

        return coupleSrv.getPayments($scope.couple.userid);
    }).then(function (response) {
        $scope.gifts = response.data;
        console.log('dash gifts: ', $scope.gifts);
    });

    coupleSrv.getDonations().then(function (response) {
        $scope.donations = response.data[0];
        console.log($scope.donations);
    });
    coupleSrv.getAddresses($scope.couple.userid).then(function (response) {
        $scope.addresses = response.data;
        console.log($scope.addresses);
    });
    coupleSrv.getRsvps($scope.couple.userid).then(function (response) {
        $scope.guests = response.data;
        console.log($scope.guests);
    });
    setTimeout(function () {
        $scope.userUpdates = {
            firstName: $scope.couple.firstname,
            partnerFirstName: $scope.couple.partnerfirstname,
            photoUrl: $scope.couple.photourl,
            story: $scope.couple.story,
            hour: $scope.couple.hour,
            place: $scope.couple.place,
            userId: $scope.couple.userid,
            weddingDate: $scope.couple.weddingDate
        };
    }, 100);
    $scope.saveUpdatedCouple = function (userUpdates) {
        coupleSrv.saveUpdatedCouple(userUpdates).success(function () {
            swal('Thanks!', 'Your page has been updated', 'success');
        }).error(function () {
            swal('Oops...', 'Something went wrong!', 'error');
        });
        console.log('userupdates', $scope.userUpdates);
        console.log('updatedCouple', $scope.couple);
    };

    // setInterval(function() {
    //     console.log($scope.userUpdates.date)
    // }, 2000)
});
'use strict';

angular.module('happyGoMarry').directive('editPage', function () {
    return {
        restrict: 'AE',
        templateUrl: './html/dashboard/editPage.html'
    };
});
'use strict';

angular.module('happyGoMarry').directive('giftsPage', function () {
    return {
        restrict: 'AE',
        templateUrl: './html/dashboard/gifts.html'
    };
});
'use strict';

angular.module('happyGoMarry').directive('rsvpPage', function () {
    return {
        restrict: 'AE',
        templateUrl: './html/dashboard/rsvp.html'
    };
});
'use strict';

angular.module('happyGoMarry').directive('signupControls', function () {
    return {
        restrict: 'AE',
        link: function link(scope, element, attributes) {
            $(document).ready(function () {
                $('#welcome-btn').click(function () {

                    $('#welcome-message').addClass('animated fadeOutLeft');
                    $('#welcome-message').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#welcome-message').removeClass('animated fadeOutLeft');
                    });
                    $('#question1').addClass('animated slideInRight');
                    $('#question1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question1').removeClass('animated slideInRight');
                    });
                    setTimeout(function () {
                        $('#welcome-message').css('display', 'none');
                        $('#question1').css('display', 'block');
                    }, 500);
                });
                $('#name-next-btn').click(function () {

                    $('#question1').addClass('animated fadeOutLeft');
                    $('#question1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question1').removeClass('animated fadeOutLeft');
                    });
                    $('#question2').addClass('animated slideInRight');
                    $('#question2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question2').removeClass('animated slideInRight');
                    });

                    setTimeout(function () {
                        $('#question1').css('display', 'none');
                        $('#question2').css('display', 'block');
                    }, 500);
                });
                ////////back button//////////
                $('#details-back-btn').click(function () {

                    $('#question2').addClass('animated fadeOutRight');
                    $('#question2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question2').removeClass('animated fadeOutRight');
                    });
                    $('#question1').addClass('animated slideInLeft');
                    $('#question1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question1').removeClass('animated slideInLeft');
                    });

                    setTimeout(function () {
                        $('#question2').css('display', 'none');
                        $('#question1').css('display', 'block');
                    }, 500);
                });
                ////////back button//////////


                $('#details-next-btn').click(function () {

                    $('#question2').addClass('animated fadeOutLeft');
                    $('#question2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question2').removeClass('animated fadeOutLeft');
                    });
                    $('#question3').addClass('animated slideInRight');
                    $('#question3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question3').removeClass('animated slideInRight');
                    });

                    setTimeout(function () {
                        $('#question2').css('display', 'none');
                        $('#question3').css('display', 'block');
                    }, 500);
                });
                ////////back button//////////                
                $('#photo-back-btn').click(function () {

                    $('#question3').addClass('animated fadeOutRight');
                    $('#question3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question3').removeClass('animated fadeOutRight');
                    });
                    $('#question2').addClass('animated slideInLeft');
                    $('#question2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question2').removeClass('animated slideInLeft');
                    });

                    setTimeout(function () {
                        $('#question3').css('display', 'none');
                        $('#question2').css('display', 'block');
                    }, 500);
                });
                ////////back button//////////                
                $('#photo-next-btn').click(function () {

                    $('#question3').addClass('animated fadeOutLeft');
                    $('#question3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question3').removeClass('animated fadeOutLeft');
                    });
                    $('#question4').addClass('animated slideInRight');
                    $('#question4').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question4').removeClass('animated slideInRight');
                    });

                    setTimeout(function () {
                        $('#question3').css('display', 'none');
                        $('#question4').css('display', 'block');
                    }, 500);
                });
                ////////back button//////////                                
                $('#story-back-btn').click(function () {

                    $('#question4').addClass('animated fadeOutRight');
                    $('#question4').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question4').removeClass('animated fadeOutRight');
                    });
                    $('#question3').addClass('animated slideInLeft');
                    $('#question3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question3').removeClass('animated slideInLeft');
                    });

                    setTimeout(function () {
                        $('#question4').css('display', 'none');
                        $('#question3').css('display', 'block');
                    }, 500);
                });
                ////////back button//////////                                
                $('#story-next-btn').click(function () {

                    $('#question4').addClass('animated fadeOutLeft');
                    $('#question4').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question4').removeClass('animated fadeOutLeft');
                    });
                    $('#verify-url').addClass('animated slideInRight');
                    $('#verify-url').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#verify-url').removeClass('animated slideInRight');
                    });

                    setTimeout(function () {
                        $('#question4').css('display', 'none');
                        $('#verify-url').css('display', 'block');
                    }, 500);
                });
                $('#url-back-btn').click(function () {

                    $('#verify-url').addClass('animated fadeOutRight');
                    $('#verify-url').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#verify-url').removeClass('animated fadeOutRight');
                    });
                    $('#question4').addClass('animated slideInLeft');
                    $('#question4').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#question4').removeClass('animated slideInLeft');
                    });

                    setTimeout(function () {
                        $('#verify-url').css('display', 'none');
                        $('#question4').css('display', 'block');
                    }, 500);
                });
            });
        }
    };
});
'use strict';

angular.module('happyGoMarry').controller('signupCtrl', function ($scope, coupleSrv, $rootScope, $state) {

    coupleSrv.getUser().then(function (response) {
        console.log('tried to get user and got', response == 'null');
        $rootScope.signedIn = response !== 'null' ? true : false;
        coupleSrv.couple = response;
        $scope.couple = coupleSrv.couple;
        console.log('couple: ', $scope.couple);

        $scope.newCouple = {
            userId: $scope.couple.userid

        };
    });
    $scope.addUrl = function () {
        $scope.newCouple.url = $scope.couple.firstname.toLowerCase() + '-plus-' + $scope.newCouple.partnerFirstName.toLowerCase();
        coupleSrv.url = $scope.newCouple.url;
        console.log($scope.newCouple.url);
        console.log('srv url: ', coupleSrv.url);
    };

    $scope.photoBackground = {
        "background-image": "url($scope.newCouple.photoUrl)"
    };

    $scope.saveNewCouple = function (newCouple) {
        coupleSrv.saveNewCouple(newCouple).success(function () {
            $state.go('couple', { url: $scope.newCouple.url });
            swal('Congratulations!', 'To edit your page, click on your name in the menu.', 'success');
        }).error(function () {
            swal('Oops...', 'Something went wrong!', 'error');
        });
        console.log('newCouple', $scope.newCouple);
        console.log('updatedCouple', $scope.couple);
    };

    // setInterval(function(){
    //     console.log($scope.newCouple)
    // }, 5000)
});