// load in your modules
var wepay = require('wepay').WEPAY;

// local variables
var wepay_settings = {
	'client_id'     : process.env.WEPAY_CLIENT_ID,
	'client_secret' : process.env.WEPAY_CLIENT_SECRET,
}


var wp = new wepay(wepay_settings);
wp.use_staging()


module.exports = {
    createAccount: function(req, res) {
        var user = req.user[0];
        var timeStamp = Math.round((new Date()).getTime() / 1000);
        wp.call('/user/register', 
                {
                    "client_id": wepay_settings.client_id,
                    "client_secret": wepay_settings.client_secret,
                    "email": req.user.email,
                    "scope": "manage_accounts,collect_payments,view_user,preapprove_payments,send_money",
                    "first_name": req.user.firstname,
                    "last_name": req.user.lastname,
                    "original_ip": "216.21.163.235",
                    "original_device": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
                    "tos_acceptance_time": timeStamp
                },
                function(response) {
                    console.log("it worked!", response.data)
                    wepay_settings.access_token = response.data.access_token;
                    let wp = new wepay(wepay_settings);
                    wp.use_staging()
                    wp.call('/account/create',
                        {
                            "name": `${user.name}'s HappyGoMarry Account`,
                            "description": "This is where you can access the gifts that have been sent to you through HappyGoMarry"
                        },
                        function(account){
                            console.log("account worked: ", account.data);
                            
                            db.wepay.createAccount([user.userid, account.id, wepay_settings.access_token], function(err, resp){
                                console.log("added this record to wepay table: ", resp);
                            });
                            wp.call('/user/send_confirmation', {}, function(response){
                                console.log("confirmation email sent: ", response.data)
                            })
                        }
                    )
                }
        );
    }
}