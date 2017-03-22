angular.module('happyGoMarry')
.directive('signupControls', function(){
    return {
        restrict: 'AE',
        link: function(scope, element, attributes) {
            $(document).ready(function () {
                $('#welcome-btn').click(function(){
                    $('#welcome-message').css('display', 'none')
                    $('#question1').css('display', 'block')
                })
                $('#name-next-btn').click(function(){
                    $('#question1').css('display', 'none')
                    $('#question2').css('display', 'block')
                })
                $('#details-back-btn').click(function(){
                    $('#question2').css('display', 'none')
                    $('#question1').css('display', 'block')
                })
                $('#details-next-btn').click(function(){
                    $('#question2').css('display', 'none')
                    $('#question3').css('display', 'block')
                })
                $('#photo-back-btn').click(function(){
                    $('#question3').css('display', 'none')
                    $('#question2').css('display', 'block')
                })
                $('#photo-next-btn').click(function(){
                    $('#question3').css('display', 'none')
                    $('#question4').css('display', 'block')
                })
                $('#story-back-btn').click(function(){
                    $('#question4').css('display', 'none')
                    $('#question3').css('display', 'block')
                })
                $('#story-next-btn').click(function(){
                    $('#question4').css('display', 'none')
                    $('#verify-url').css('display', 'block')
                })
                $('#url-back-btn').click(function(){
                    $('#verify-url').css('display', 'none')
                    $('#question4').css('display', 'block')
                })

                
            });

        }
    }
});