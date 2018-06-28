require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var session = require('express-session'),
	passport = require('passport'),
	Auth0Strategy = require('passport-auth0');
var port = 3005;

var app = module.exports = express();
app.use(bodyParser.json());
app.use(session({
	resave: true, //Without this you get a constant warning about default values
	saveUninitialized: true, //Without this you get a constant warning about default values
	secret: process.env.SESSION_SECRET
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));


var connectionString = process.env.CONNECTION_STRING;
massive(connectionString)
  .then(db => {
    app.set('db', db);
  })
  .catch(err => console.log(err))

passport.use(new Auth0Strategy({
		domain: process.env.DOMAIN,
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		callbackURL: '/auth/callback'
	},
	function (accessToken, refreshToken, extraParams, profile, done) {
		const db = app.get('db');
		//Find user in database
		db.getUserByAuthId([profile.id]).then(user => {
			user = user[0];
			if (!user) { //if there isn't one, we'll create one!
				console.log('CREATING USER');
				db.createUserByAuth([profile._json.given_name, profile.id, profile._json.family_name, profile._json.email]).then(user => {

					return done(null, user[0]); // GOES TO SERIALIZE USER
				})
			} else { //when we find the user, return it
				user.weddingDate = true;
				return done(null, user);
			}
		})
	}
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function (userA, done) {
	var userB = userA;
	//Things you might do here :
	//Serialize just the id, get other information to add to session,
	done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function (user, done) {
	//Things you might do here :
	// Query the database with the user id, get other information to put on req.user
	done(null, user); //PUTS 'USER' ON REQ.USER
});


var couplesCtrl = require('./serverCtrls/couplesCtrl.js');

//auth0 endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback',
	passport.authenticate('auth0'),
	function (req, res) {
		console.log("this is the req.user: ", req.user)
		if (!req.user.weddingDate) {
			res.redirect('/#/signup');
		} else {
			res.redirect('/#/dashboard')
		}
	})
app.get('/auth/me', function (req, res) {
	if (!req.user) return res.status(200).send('null');

	//THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
	var db = app.get('db');

	db.getCurrentCouple([req.user.auth0id]).then(resp => {
		 res.status(200).send(resp[0]);
  })
  .catch(err => console.log(err))
})
app.get('/auth/logout', function (req, res) {
	req.logout();
	res.redirect('/#');
})

//regular endpoints
app.get('./api/current-couple/:auth0id', couplesCtrl.GetCurrentCouple);
app.get('/api/couple/:url', couplesCtrl.GetCouple);
app.get('/api/demo', couplesCtrl.GetDemoCouple);
app.get('/api/payments/:userId', couplesCtrl.GetPayments);
app.get('/api/donations/:userId', couplesCtrl.GetTotalDonations);
app.get('/api/addresses/:userId', couplesCtrl.getAddresses);
app.get('/api/rsvp/:userId', couplesCtrl.getRsvps);
app.post('/api/address', couplesCtrl.postNewAddress);
app.post('/api/rsvp', couplesCtrl.postNewRsvp);
app.post('/api/new-gift', couplesCtrl.saveNewGift);
app.put('/api/couple', couplesCtrl.updateCouple);
app.put('/api/new-couple', couplesCtrl.saveNewCouple);

///wepay endpoints

var wepayCtrl = require('./serverCtrls/wePayCtrl.js');

app.post('/api/wepay/create-account', wepayCtrl.createAccount);
app.post('/api/wepay/create-checkout', wepayCtrl.createCheckout);
app.get('/api/wepay/checkouts/:id', wepayCtrl.getCheckouts);


app.listen(port, function () {
	console.log('listening on port ', port)
});
