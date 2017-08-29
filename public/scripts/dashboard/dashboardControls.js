angular.module('happyGoMarry')
.directive('dashControls', function(){
    return {
        restrict: 'AE',
        link: function(scope, element, attributes) {
            $(document).ready(function () {
                $('#dash-addressses-btn').click(function(){
                    $('edit-page, rsvp-page, gifts-page').css('display', 'none');
                    $('addresses-page').css('display', 'block');
                })
                $('#dash-rsvp-btn').click(function(){
                    $('edit-page, addresses-page, gifts-page').css('display', 'none');
                    $('rsvp-page').css('display', 'block');
                })
                $('#dash-edit-btn').click(function(){
                    $('addresses-page, rsvp-page, gifts-page').css('display', 'none');
                    $('edit-page').css('display', 'block');
                })
                $('#dash-gifts-btn').click(function(){
                    $('addresses-page, rsvp-page, edit-page').css('display', 'none');
                    $('gifts-page').css('display', 'block')
                })              
            });
        }
    }
});