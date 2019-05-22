const express = require('express');
var data = require(__dirname + '/applications.json'); // retrieve JSON data from file

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
    var names = getNames(obj, query.sort, query.filter);

    // render view as ejs
    res.render('index', { persons: names });
});

// request to view application info of an applicant
app.get('/applicant/:id', function (req, res) {

    // applicant id
    var id = req.params.id;

    res.render('applicant', { applicant: obj[id] });
});

// request to view favourited/bookmarked applicants
app.get('/favourites', function (req, res) {

    // retrieve favourited applicants from favourites.json file
    data = require(__dirname + '/favourites.json');

    // convert to JS object
    obj = JSON.parse(JSON.stringify(data));

    // retrieve applicant names
    var names = getFavourites(obj);

    // render view as ejs
    res.render('favourites', { persons: names });
});

// listen to port
app.listen(4000, function () {
    console.log('Listening to port 4000');
});


/**
 * Retrieve each applicants name from JS object
 * @param {Object} obj - JS object whose data was parsed from JSON file
 * @param {string} sortBy - sort option for arranging the order of applicants
 * @param {string} filterBy - filter option for retrieving specific applicants
 * @return {string[]} - String array of applicant names 
 */
function getNames(obj, sortBy, filterBy) {

    sortApplicants(obj, sortBy);

    // create empty array
    var names = [];

    // number of keys (applicants)
    var keyLength = Object.keys(obj).length;

    // add each applicant name to array
    for (let i = 0; i < keyLength; i++) {
        names.push(obj[i].name);
    }

    return names;
}

/**
 * Sorts the applicants based on the selected sort option
 * @param {Object} obj - JS object whose data was parsed from JSON file
 * @param {string} sortBy - sort option for arranging the order of applicants
 */
function sortApplicants(obj, sortBy) {

    // sort by last name (order: alphabetical)
    if (sortBy === 'name') {
        obj.sort(function (a, b) {
            var aLastName = a.name.substring(a.name.indexOf(' ') + 1);
            var bLastName = b.name.substring(b.name.indexOf(' ') + 1);

            if (aLastName < bLastName) {
                return -1;
            }
            else if (aLastName > bLastName) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }

    // sort by date of application (order: earliest to latest)
    else if (sortBy === 'date-applied') {
        obj.sort(function (a, b) {
            var aDate = new Date(a.applied);
            var bDate = new Date(b.applied);

            if (aDate.getTime() < bDate.getTime()) {
                return -1;
            }
            else if (aDate.getTime() > bDate.getTime()) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }

    // sort by experience in years (order: descending)
    else if (sortBy === 'experience') {
        obj.sort(function (a, b) {
            var aExperience = a.experience;
            var bExperience = b.experience;

            if (aExperience < bExperience) {
                return -1;
            }
            else if (aExperience > bExperience) {
                return 1;
            }
            else {
                return 0;
            }
        });

        // make it descending order
        obj.reverse();
    }

}

function getFavourites(obj) {

    return getNames(obj, undefined, undefined);
}