const express = require('express');
const data = require(__dirname + '/applications.json'); // retrieve JSON data from file

// convert JSON data to JS object
var obj = JSON.parse(JSON.stringify(data));


// set up creation of server
var app = express();

// use template engine
app.set('view engine', 'ejs');

// default request
app.get('/', function (req, res) {

    // retrieve query strings
    var query = req.query;

    // retrieve applicant names
    var names = getNames(obj);

    // render view as ejs
    res.render('index', {persons: names});
});

// request to view application info of an applicant
app.get('/applicant/:id', function (req, res) {
    
    // applicant id
    var id = req.params.id;

    res.render('applicant', {applicant: obj[id]});
});

// listen to port
app.listen(4000, function () {
    console.log('Listening to port 4000');
});


/**
 * Retrieve each applicants name from JS object
 * @param {..Object} obj - JS object whose data was parsed from JSON file
 * @return {string} - String array of applicant names 
 */
function getNames(obj) {

    // create empty array
    var names = [];

    // number of keys (applicants)
    var keyLength = Object.keys(obj).length;

    // add each applicant name to array
    for(let i = 0; i < keyLength; i++) {
        names.push(obj[i].name);
    }

    return names;
}