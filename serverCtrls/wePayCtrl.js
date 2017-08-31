var app = require('../main.js');
var db = app.get('db');

// load in your modules
var wepay = require('wepay').WEPAY;

// local variables
var wepay_settings = {
	'client_id'     : process.env.WEPAY_CLIENT_ID,
	'client_secret' : process.env.WEPAY_CLIENT_SECRET
	// 'api_version': 'API_VERSION'
}
wp.use_staging();


module.exports = {
    createAccount: function(req, res) {
        let wp = new wepay();
        wp.call('/user/register', 
                {
                    "client_id": wepay_settings.client_id,
                    "client_secret": wepay_settings.client_secret,
                    "email": req.user.email,
                    "scope": "manage_accounts,collect_payments,view_user,preapprove_payments,send_money",
                    "first_name": req.user.first_name,
                    "last_name": req.user.last_name
                })
    }
}