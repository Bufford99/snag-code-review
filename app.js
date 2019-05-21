const express = require('express');
const data = require(__dirname + '/applications.json'); // retrieve JSON data from file
const path = require('path');

// set up creation of server
var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// listen to port
app.listen(4000, function() {
    console.log('Listening to port 4000');
});