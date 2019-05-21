const express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.send('Test');
});

app.listen(4000);