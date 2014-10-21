// Name        : app.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/21/2014
//
// Description:
//   The main application file for the API sub-program.

/////////////
// Imports //
var express    = require('express'),
    login      = require('./api/login.js'),
    register   = require('./api/register.js'),
    newgoal    = require('./api/newgoal.js'),
    finishgoal = require('./api/finishgoal.js'),
    editgoal   = require('./api/editgoal.js'),
    removegoal = require('./api/removegoal.js');

//////////
// Code //

// Creating the sub-app
var app = express();

// Registering the API endpoints.
app.post('/push/login/', login.post);
app.post('/push/register/', register.post);
app.post('/push/goal/', newgoal.post);
app.post('/push/goal/finish/', finishgoal.post);
app.post('/push/goal/edit/', editgoal.post);
app.post('/push/goal/remove/', removegoal.post);

// Providing a JSON version of a 404.
app.all('*', function (req, res) {
    res.json({
        success: false,
        message: 'Requested page does not exist.'
    });
});

/////////////
// Exports //
module.exports = app;
