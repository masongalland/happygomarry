var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./public'));

var port = 8080;
var connectionString = "postgres://postgres:@localhost/HappyGoMarry";
var db = massive.connectSync({connectionString : connectionString});

app.set('db', db);
db.schema(function(err){
    if (err) return console.log('schema.sql', err);        
    else console.log("User Table Init");
});
var couplesCtrl = require('./serverCtrls/couplesCtrl.js');
// var wePayCtrl = require('./serverCtrls/wePayCtrl.js');

app.get('/api/couple', couplesCtrl.GetCouple);
app.get('/api/payments', couplesCtrl.GetPayments);
app.get('/api/donations', couplesCtrl.GetTotalDonations);
app.get('/api/addresses/:userId', couplesCtrl.getAddresses);
app.get('/api/rsvp/:userId', couplesCtrl.getRsvps);
app.post('/api/address', couplesCtrl.postNewAddress);
app.post('/api/rsvp', couplesCtrl.postNewRsvp);
app.put('/api/couple', couplesCtrl.updateCouple);




app.listen(port, function(){
    console.log('listening on port ', port)
});
