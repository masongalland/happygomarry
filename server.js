var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var port = 3000;
var connectionString = "postgres://jlowvkmh:9ijT9GVp7bWTgJcHecIEceU4I7-sdapG@echo.db.elephantsql.com:5432/jlowvkmh";
var db = massive.connectSync({connectionString : connectionString})

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

app.set('db', db);
var couplesCtrl = require('./couplesCtrl.js');
var wePayCtrl = require('./wePayCtrl.js');



app.get('/api/products', productsCtrl.GetAll);
app.get('/api/product/:productId', productsCtrl.GetOne);
app.put('/api/product/:productId', productsCtrl.Update);
app.post('/api/product', productsCtrl.Create);
app.delete('api/product/:productId', productsCtrl.Delete);

app.listen(port, function(){
    console.log('listening on port ', port)
});
