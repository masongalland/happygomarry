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
                $('.cancel-btn').click(function(){
                    $('#send-address, #send-rsvp').css('display', 'none');
                });
                $('.send-gift').mouseenter(function(){
                    $('#gray-present').css('display', 'none');
                    $('#green-present').css('display', 'block')
                }).mouseleave(function(){
                    $('#gray-present').css('display', 'block');
                    $('#green-present').css('display', 'none')
                });
                $('.send-rsvp').mouseenter(function(){
                    $('#gray-check').css('display', 'none');
                    $('#green-check').css('display', 'block')
                }).mouseleave(function(){
                    $('#gray-check').css('display', 'block');
                    $('#green-check').css('display', 'none')
                });
                $('.send-address').mouseenter(function(){
                    $('#gray-envelope').css('display', 'none');
                    $('#green-envelope').css('display', 'block')
                }).mouseleave(function(){
                    $('#gray-envelope').css('display', 'block');
                    $('#green-envelope').css('display', 'none')
                });
            });

        }
    }
});