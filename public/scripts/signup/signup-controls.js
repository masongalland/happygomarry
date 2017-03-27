angular.module('happyGoMarry')
.directive('signupControls', function(){
    return {
        restrict: 'AE',
        link: function(scope, element, attributes) {
            $(document).ready(function () {
                $('#welcome-btn').click(function(){

                    $('#welcome-message').addClass('animated fadeOutLeft');
                    $('#welcome-message').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#welcome-message').removeClass('animated fadeOutLeft');
                    });
                    $('#question1').addClass('animated slideInRight');
                    $('#question1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question1').removeClass('animated slideInRight');
                    });
                    setTimeout(function(){
                        $('#welcome-message').css('display', 'none')
                        $('#question1').css('display', 'block')
                    }, 500)
                })
                $('#name-next-btn').click(function(){

                    $('#question1').addClass('animated fadeOutLeft');
                    $('#question1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question1').removeClass('animated fadeOutLeft');
                    });
                    $('#question2').addClass('animated slideInRight');
                    $('#question2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question2').removeClass('animated slideInRight');
                    });

                    setTimeout(function(){
                    $('#question1').css('display', 'none')
                    $('#question2').css('display', 'block')
                    }, 500)
                })
                ////////back button//////////
                $('#details-back-btn').click(function(){

                    $('#question2').addClass('animated fadeOutRight');
                    $('#question2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question2').removeClass('animated fadeOutRight');
                    });
                    $('#question1').addClass('animated slideInLeft');
                    $('#question1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question1').removeClass('animated slideInLeft');
                    });

                    setTimeout(function(){
                        $('#question2').css('display', 'none')
                        $('#question1').css('display', 'block')
                    }, 500)
                })
                ////////back button//////////


                $('#details-next-btn').click(function(){

                    $('#question2').addClass('animated fadeOutLeft');
                    $('#question2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question2').removeClass('animated fadeOutLeft');
                    });
                    $('#question3').addClass('animated slideInRight');
                    $('#question3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question3').removeClass('animated slideInRight');
                    });

                    setTimeout(function(){
                        $('#question2').css('display', 'none')
                        $('#question3').css('display', 'block')
                    },500)
                })
                ////////back button//////////                
                $('#photo-back-btn').click(function(){

                    $('#question3').addClass('animated fadeOutRight');
                    $('#question3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question3').removeClass('animated fadeOutRight');
                    });
                    $('#question2').addClass('animated slideInLeft');
                    $('#question2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question2').removeClass('animated slideInLeft');
                    });

                    setTimeout(function(){
                        $('#question3').css('display', 'none')
                        $('#question2').css('display', 'block')
                    }, 500)
                })
                ////////back button//////////                
                $('#photo-next-btn').click(function(){

                    $('#question3').addClass('animated fadeOutLeft');
                    $('#question3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question3').removeClass('animated fadeOutLeft');
                    });
                    $('#question4').addClass('animated slideInRight');
                    $('#question4').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question4').removeClass('animated slideInRight');
                    });

                    setTimeout(function(){
                    $('#question3').css('display', 'none')
                    $('#question4').css('display', 'block')
                    }, 500)
                })
                ////////back button//////////                                
                $('#story-back-btn').click(function(){

                    $('#question4').addClass('animated fadeOutRight');
                    $('#question4').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question4').removeClass('animated fadeOutRight');
                    });
                    $('#question3').addClass('animated slideInLeft');
                    $('#question3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question3').removeClass('animated slideInLeft');
                    });

                    setTimeout(function(){      
                        $('#question4').css('display', 'none')
                        $('#question3').css('display', 'block')
                    }, 500)
                })
                ////////back button//////////                                
                $('#story-next-btn').click(function(){

                    $('#question4').addClass('animated fadeOutLeft');
                    $('#question4').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question4').removeClass('animated fadeOutLeft');
                    });
                    $('#verify-url').addClass('animated slideInRight');
                    $('#verify-url').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#verify-url').removeClass('animated slideInRight');
                    });

                    setTimeout(function(){
                    $('#question4').css('display', 'none')
                    $('#verify-url').css('display', 'block')
                    },500)
                })
                $('#url-back-btn').click(function(){

                    $('#verify-url').addClass('animated fadeOutRight');
                    $('#verify-url').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#verify-url').removeClass('animated fadeOutRight');
                    });
                    $('#question4').addClass('animated slideInLeft');
                    $('#question4').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#question4').removeClass('animated slideInLeft');
                    });

                    setTimeout(function(){
                        $('#verify-url').css('display', 'none')
                        $('#question4').css('display', 'block')
                    }, 500)
                })

                
            });

        }
    }
});