const express = require('express');
const data = require(__dirname + '/applications.json'); // retrieve JSON data from file
const path = require('path');

// set up creation of server
var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(4000);