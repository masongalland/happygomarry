angular.module('happyGoMarry')
.directive('dashControls', function(){
    return {
        restrict: 'AE',
        link: function(scope, element, attributes) {
            $(document).ready(function () {
                $('#dash-addressses-btn').click(function(){
                    $('edit-page, rsvp-page').css('display', 'none');
                    $('addresses-page').css('display', 'block');
                })
                $('#dash-rsvp-btn').click(function(){
                    $('edit-page, addresses-page').css('display', 'none');
                    $('rsvp-page').css('display', 'block');
                })
                $('#dash-edit-btn').click(function(){
                    $('addresses-page, rsvp-page').css('display', 'none');
                    $('edit-page').css('display', 'block');
                })

                $('#addresses-table').DataTable( {
                    columnDefs: [
                        {
                            targets: [ 0, 1, 2 ],
                            className: 'mdl-data-table__cell--non-numeric'
                        }
                    ]
                } );
                $('#rsvp-table').DataTable( {
                    columnDefs: [
                        {
                            targets: [ 0, 1, 2 ],
                            className: 'mdl-data-table__cell--non-numeric'
                        }
                    ]
                } );

                
            });

        }
    }
});