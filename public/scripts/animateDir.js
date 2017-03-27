angular.module('happyGoMarry')
.directive('animateDir', function(){
    return {
        restrict: 'AE',
        link: function(scope, element, attributes) {
            $(document).ready(function () {
                $('.send-address').click(function(){
                    $('#send-address').css('display', 'block');
                })
                $('.send-rsvp').click(function(){
                    $('#send-rsvp').css('display', 'block');
                });
                $('.send-gift').click(function(){
                    $('#send-gift').css('display', 'block');
                });
                $('.cancel-btn, .submit-btn').click(function(){
                    $('#send-address, #send-rsvp, #send-gift').css('display', 'none');
                });
                $('.send-gift, #dash-gifts-btn').mouseenter(function(){
                    $('.gray-present').css('display', 'none');
                    $('.green-present').css('display', 'block')
                }).mouseleave(function(){
                    $('.gray-present').css('display', 'block');
                    $('.green-present').css('display', 'none')
                });
                $('.send-rsvp, #dash-rsvp-btn').mouseenter(function(){
                    $('.gray-check').css('display', 'none');
                    $('.green-check').css('display', 'block')
                }).mouseleave(function(){
                    $('.gray-check').css('display', 'block');
                    $('.green-check').css('display', 'none')
                });
                $('.send-address, #dash-addressses-btn').mouseenter(function(){
                    $('.gray-envelope').css('display', 'none');
                    $('.green-envelope').css('display', 'block')
                }).mouseleave(function(){
                    $('.gray-envelope').css('display', 'block');
                    $('.green-envelope').css('display', 'none')
                });
                $('#dash-edit-btn').mouseenter(function(){
                    $('.gray-edit').css('display', 'none');
                    $('.green-edit').css('display', 'block')
                }).mouseleave(function(){
                    $('.gray-edit').css('display', 'block');
                    $('.green-edit').css('display', 'none')
                });
                $('.HAM').click(function(){
                    $('#mobile-menu').addClass('animated fadeInDown');
                    $('#mobile-menu').css('display', 'flex');
                    $('#mobile-menu').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#mobile-menu').removeClass('animated fadeInDown');
                    })
                    $('.HAM').css('display', 'none');
                });
                $('.close-mobile, .mobile-menu-content a').click(function(){
                    $('#mobile-menu').addClass('animated fadeOutUp');
                    $('#mobile-menu').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#mobile-menu').removeClass('animated fadeOutUp');
                        $('#mobile-menu').css('display', 'none');
                    })
                    $('.HAM').css('display', 'flex');
                })
                $('#dash-edit-btn').click(function(){
                    $('edit-page').css('display', 'block')
                })
                $('.user-btn').mouseenter(function(){
                    $('.drop-down').css('display', 'flex')
                })
                $('.drop-down').mouseleave(function(){
                    $('.drop-down').css('display', 'none')
                })
            });

        }
    }
});