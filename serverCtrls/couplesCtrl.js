var app = require('../server.js');
var db = app.get('db');

module.exports = {
    GetCouple: function(req, res) {
        db.getCouple(function(err, resp){
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
    }
}