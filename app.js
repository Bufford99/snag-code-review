const express = require('express');
const data = require(__dirname + '/applications.json'); // retrieve JSON data from file

// set up creation of server
var app = express();

// use template engine
app.set('view engine', 'ejs');

// default request
app.get('/', function(req, res) {
    res.render('index');
});

// listen to port
app.listen(4000, function() {
    console.log('Listening to port 4000');
});