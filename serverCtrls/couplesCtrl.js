var app = require('../main.js');
var db = app.get('db');

module.exports = {
    GetDemoCouple: function(req, res) {
        console.log('got demo')
        db.getDemoCouple(function(err, resp){
            res.send(resp)
        })
    },
    GetCouple: function(req, res) {
        db.getCouple([req.params.url], function(err, resp){
            res.send(resp);
        })
    },
    GetCurrentCouple: function(req, res) {
        db.getCurrentCouple([req.params.auth0id], function(err, resp){
            res.send(resp);
        })
    },
    GetPayments: function(req, res) {
        db.getPayments([req.params.userId], function(err, resp){
            res.send(resp);
        })
    },
    GetTotalDonations: function(req, res) {
        db.getTotalDonations(req.params.userId, function(err, resp){
            res.send(resp);
        })
    },
    postNewAddress: function(req, res) {
        let params = [req.body.userId, req.body.firstName, req.body.lastName, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.email]

        db.postNewAddress(params, function(err, resp){
            console.log('sent address')
            res.send('Sent new address.');
        })
    },
    postNewRsvp: function(req, res) {
        let params = [req.body.userId, req.body.firstName, req.body.lastName, req.body.email, req.body.numberInParty]

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
    saveNewCouple: function(req, res) {
        let params = [req.body.partnerFirstName, req.body.partnerLastName, req.body.weddingDate, req.body.hour, req.body.place, req.body.photoUrl, req.body.story, req.body.userId, req.body.url]

        db.saveNewCouple(params, function(err, product){
            console.log('saved couple')
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
    },
    saveNewGift: function(req, res) {
        let params = [req.body.userId, req.body.firstName, req.body.lastName, req.body.amount, req.body.date, req.body.message]

        db.saveNewGift(params, function(err, resp){
            console.log('saved new gift')
        })
    }
}