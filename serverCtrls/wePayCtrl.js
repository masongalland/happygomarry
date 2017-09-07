var app = require('../main.js');
var db = app.get('db');
var axios = require('axios');

var baseUrl = 'https://stage.wepayapi.com/v2'
var wepay = require('wepay').WEPAY;

module.exports = {
    createAccount: function(req, res) {
        var wepay_settings = {
            'client_id'     : process.env.WEPAY_CLIENT_ID,
            'client_secret' : process.env.WEPAY_CLIENT_SECRET,
        }
        var wp = new wepay(wepay_settings);
        wp.use_staging()
        var user = req.user[0];
        var timeStamp = Math.round((new Date()).getTime() / 1000);
        wp.call('/user/register', 
            {
                "client_id": wepay_settings.client_id,
                "client_secret": wepay_settings.client_secret,
                "email": user.email,
                "scope": "manage_accounts,collect_payments,view_user,preapprove_payments,send_money",
                "first_name": user.firstname,
                "last_name": user.lastname,
                "original_ip": req.query.ip,
                "original_device": req.query.agent,
                "tos_acceptance_time": timeStamp
            },
            function(response) {
                console.log("it worked!", response)
                wepay_settings.access_token = response.access_token;
                let wp = new wepay(wepay_settings);
                wp.use_staging()
                wp.call('/account/create',
                    {
                        "name": `${user.firstname}'s HappyGoMarry Account`,
                        "description": "This is where you can access the gifts that have been sent to you through HappyGoMarry"
                    },
                    function(account){
                        console.log("account worked: ", account);
                        
                        db.wepay.createAccount([user.userid, account.id, wepay_settings.access_token], function(err, resp){
                            console.log("added this record to wepay table: ", resp);
                        });
                        wp.call('/user/send_confirmation', {}, function(response){
                            console.log("confirmation email sent: ", response)
                        })
                    }
                )
            }
        );
    },
    createCheckout: function(req, res){
        console.log("hit the server")
        var wepay_settings = {
            'client_id'     : process.env.WEPAY_CLIENT_ID,
            'client_secret' : process.env.WEPAY_CLIENT_SECRET,
        }
        var accountId;
        db.wepay.getWepayAccount([req.body.userId], function(err, resp){
            console.log("wepayAccount info :", resp)
            wepay_settings.access_token = resp[0].access_token;
            accountId = resp[0].account_id;


            var wp = new wepay(wepay_settings);
            wp.use_staging()
    
            var fee = req.body.amount * 0.05;
    
            wp.call('/checkout/create', 
                {
                    "account_id": accountId,
                    "amount": req.body.amount,
                    "short_description": `Gift from ${req.body.firstName}`,
                    "long_description": req.body.message,
                    "type": "personal",
                    "currency": "USD",
                    "fee": {"app_fee": fee, "fee_payer": "payee"},
                    "hosted_checkout": {"mode": "iframe", "redirect_uri": `http://localhost:8081/#/couple/${req.body.url}`}
                },
                function(response){
                    console.log(response)
                    res.send(response.hosted_checkout.checkout_uri)
                }
            )
        })
      
    },
    getCheckouts: function(req, res){
        var wepay_settings = {
            'client_id'     : process.env.WEPAY_CLIENT_ID,
            'client_secret' : process.env.WEPAY_CLIENT_SECRET,
        }
        var accountId;
        db.wepay.getWepayAccount([req.params.id], function(err, resp){
            console.log("wepayAccount info :", resp)
            wepay_settings.access_token = resp[0].access_token;
            accountId = resp[0].account_id;

            var wp = new wepay(wepay_settings);
            wp.use_staging()

            wp.call('/checkout/find', 
            {
                "account_id": accountId,
                "limit": 200,
                "state": "released"
            },
            function(response){
                let arr = response.map((e, i) => {
                    return {
                      "donorFirstName": e.payer.name.split(' ')[0],
                      "donorLastName": e.payer.name.split(' ')[1],
                      "amount": e.amount,
                      "date": new Date(e.create_time * 1000),
                      "message": e.long_description
                    }
                  })
                res.send(arr)
            }
            )
        })
    }
}
