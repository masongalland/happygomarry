var app = require('../main.js');
var axios = require('axios');

var baseUrl = 'https://stage.wepayapi.com/v2'
var wepay = require('wepay').WEPAY;

module.exports = {
    createAccount: function(req, res) {
        console.log("req.body: ", req.body)
        var wepay_settings = {
            'client_id'     : process.env.WEPAY_CLIENT_ID,
            'client_secret' : process.env.WEPAY_CLIENT_SECRET,
        }
        var wp = new wepay(wepay_settings);
        wp.use_staging()
        var user = req.user;
        var timeStamp = Math.round((new Date()).getTime() / 1000);
        wp.call('/user/register',
            {
                "client_id": wepay_settings.client_id,
                "client_secret": wepay_settings.client_secret,
                "email": user.email,
                "scope": "manage_accounts,collect_payments,view_user,preapprove_payments,send_money",
                "first_name": user.firstname,
                "last_name": user.lastname,
                "original_ip": req.body.ip,
                "original_device": req.body.agent,
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
                        var db = app.get('db');

                        console.log("account worked: ", account);

                        db.wepay.createAccount([user.userid, account.account_id, wepay_settings.access_token]).then(resp => {
                            console.log("added this record to wepay table: ", resp);
                            res.status(200).send("true")
                            wp.call('/user/send_confirmation', {}, function(response){
                                console.log("confirmation email sent: ", response)
                            })
                        })
                    }
                )
            }
        );
    },
    createCheckout: function(req, res){
        var db = app.get('db');

        console.log("hit the server")
        var wepay_settings = {
            'client_id'     : process.env.WEPAY_CLIENT_ID,
            'client_secret' : process.env.WEPAY_CLIENT_SECRET,
        }
        var accountId;
        db.wepay.getWepayAccount([req.body.userId]).then(resp => {
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
                    "hosted_checkout": {"mode": "iframe", "redirect_uri": `${process.env.WEPAY_REDIRECT_URI}${req.body.url}`}
                },
                function(response){
                    console.log(response)
                    res.send(response.hosted_checkout.checkout_uri)
                }
            )
        })

    },
    getCheckouts: function(req, res){
        var db = app.get('db');
        var wepay_settings = {
            'client_id'     : process.env.WEPAY_CLIENT_ID,
            'client_secret' : process.env.WEPAY_CLIENT_SECRET,
        }
        var accountId;
        db.wepay.getWepayAccount([req.params.id]).then(resp => {
            console.log("wepayAccount info :", resp)
            wepay_settings.access_token = resp[0].access_token;
            accountId = resp[0].account_id;

            var wp = new wepay(wepay_settings);
            wp.use_staging()

            wp.call('/checkout/find',
            {
                "account_id": accountId,
                "limit": 2000
            },
            function(response){
                let successful = response.filter((e, i) => {
                    if (e.state !== "expired" && e.state !== "failed"){
                        return e;
                    }
                })
                let arr = successful.map((e, i) => {
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
