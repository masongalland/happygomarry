var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var http = require('http');
const session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0');
require('dotenv').config();
      

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

//////////////Port setup///////
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

///////////////////
console.log("env connstring: ", process.env.CONNECTION_STRING)

var connectionString = process.env.CONNECTION_STRING;
var db = massive.connectSync({connectionString : connectionString});

app.set('db', db);
// db.schema(function(err){
//     if (err) return console.log('schema.sql', err);        
//     else console.log("User Table Init");
// });
passport.use(new Auth0Strategy({
   domain:       process.env.DOMAIN,
   clientID:     process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL:  '/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    //Find user in database
    db.getUserByAuthId([profile.id], function(err, user) {
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        db.createUserByAuth([profile._json.given_name, profile.id, profile._json.family_name], function(err, user) {
            if (err) {
                throw new Error(err)
            }
        //   console.log('USER CREATED', user);
        //   console.log('profile: ', profile)
          return done(err, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        // console.log('FOUND USER', user);
        user.weddingDate = true;
        return done(err, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  //Things you might do here :
   //Serialize just the id, get other information to add to session, 
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(user, done) {
  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, user); //PUTS 'USER' ON REQ.USER
});


var couplesCtrl = require('./serverCtrls/couplesCtrl.js');

//auth0 endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback',
  passport.authenticate('auth0'), function(req, res) {
      if (!req.user.weddingDate) {
        res.redirect('/#/signup');
      }else {
          res.redirect('/#/dashboard')
      }
})
app.get('/auth/me', function(req, res) {
  if (!req.user) return res.status(200).send('null');
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
    db.getCurrentCouple([req.user.auth0id], function(err, resp){
        if (err) return console.log(err)
        else res.send(resp[0]);
    })
})
app.get('/auth/logout', function(req, res) {
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


var server = http.createServer(app);

server.listen(port, function(){
    console.log('listening on port ', port)
});
