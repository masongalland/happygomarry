var app = require('../main.js');

module.exports = {
    GetDemoCouple: function(req, res) {
        var db = app.get('db');

        db.getDemoCouple().then(resp => {
            res.status(200).send(resp)
        })
    },
    GetCouple: function(req, res) {
        var db = app.get('db');
        db.getCouple([req.params.url]).then(resp => {
            res.status(200).send(resp)
        })
        .catch(err => {
            console.log(err)
        })
    },
    GetCurrentCouple: function(req, res) {
        var db = app.get('db');
        db.getCurrentCouple([req.params.auth0id]).then(resp => {
            res.status(200).send(resp)
        })
    },
    GetPayments: function(req, res) {
        var db = app.get('db');
        db.getPayments([req.params.userId]).then(resp => {
            res.status(200).send(resp)
        })
    },
    GetTotalDonations: function(req, res) {
        var db = app.get('db');
        db.getTotalDonations([req.user.userid]).then(resp => {
            res.status(200).send(resp)
        })
    },
    postNewAddress: function(req, res) {
        var db = app.get('db');
        var params = [req.body.userId, req.body.firstName, req.body.lastName, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.email]

        db.postNewAddress(params).then(resp => {
            res.status(200).send("Sent new address")
        })
    },
    postNewRsvp: function(req, res) {
        var db = app.get('db');
        var params = [req.body.userId, req.body.firstName, req.body.lastName, req.body.email, req.body.numberInParty]

        db.postNewRsvp(params).then(resp => {
            res.status(200).send("Sent new RSVP")
        })
    },
    updateCouple: function(req, res) {
        var db = app.get('db');
        var params = [req.body.firstName, req.body.partnerFirstName,  req.body.photoUrl, req.body.story, req.body.hour, req.body.place, req.body.userId, req.body.weddingDate]

        db.updateCouple(params).then(resp => {
            res.status(200).send("Success")
        })
    },
    saveNewCouple: function(req, res) {
        var db = app.get('db');
        var params = [req.body.partnerFirstName, req.body.partnerLastName, req.body.weddingDate, req.body.hour, req.body.place, req.body.photoUrl, req.body.story, req.body.userId, req.body.url]

        db.saveNewCouple(params).then(resp => {
            res.status(200).send("Success")
        })
    },
    getAddresses: function(req, res) {
        var db = app.get('db');
        db.getAddresses([req.params.userId]).then(resp => {
            res.status(200).send(resp)
        })
    },
    getRsvps: function(req, res) {
        var db = app.get('db');
        db.getRsvps([req.params.userId]).then(resp => {
            res.status(200).send(resp)
        })
    },
    saveNewGift: function(req, res) {
        var db = app.get('db');
        var params = [req.body.userId, req.body.firstName, req.body.lastName, req.body.amount, req.body.date, req.body.message]

        db.saveNewGift(params).then(resp => {
            res.status(200).send("Saved new gift")
        })
    }
}