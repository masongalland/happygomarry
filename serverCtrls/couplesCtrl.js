var app = require('../server.js');
var db = app.get('db');

module.exports = {
    GetCouple: function(req, res) {
        db.getCouple([req.params.url], function(err, resp){
            res.send(resp);
        })
    },
    GetPayments: function(req, res) {
        db.getPayments(function(err, resp){
            res.send(resp);
        })
    },
    GetTotalDonations: function(req, res) {
        db.getTotalDonations(function(err, resp){
            res.send(resp);
        })
    },
    postNewAddress: function(req, res) {
        var params = [req.body.userId, req.body.firstName, req.body.lastName, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.email]

        db.postNewAddress(params, function(err, resp){
            console.log('sent address')
            res.send('Sent new address.');
        })
    },
    postNewRsvp: function(req, res) {
        var params = [req.body.userId, req.body.firstName, req.body.lastName, req.body.email, req.body.numberInParty]

        db.postNewRsvp(params, function(err, resp){
            console.log('sent RSVP')
            res.send('Sent new RSVP.');
        })
    },
    updateCouple: function(req, res) {
        let params = [req.body.firstName, req.body.partnerFirstName,  req.body.photoUrl, req.body.story, req.body.hour, req.body.place, req.body.userId, req.body.weddingDate]

        db.updateCouple(params, function(err, product){
            console.log('updated couple')
            res.send('Success');
        })
    },
    getAddresses: function(req, res) {
        db.getAddresses([req.params.userId], function(err, resp){
            res.send(resp);
        })
    },
    getRsvps: function(req, res) {
        db.getRsvps([req.params.userId], function(err, resp){
            res.send(resp);
        })
    }
}