// Name        : app.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   The main application file for the API sub-program.

/////////////
// Imports //
var express = require('express');

//////////
// Code //
var app = express();

// Logging the user into the application.
app.post('/login/', function (req, res) {
    res.json({
        success: false,
        message: 'Unimplemented.'
    });
});

// Registering the user with the application.
app.post('/register/', function (req, res) {
    res.json({
        success: false,
        message: 'Unimplemented.'
    });
});

// Providing a JSON version of a 404.
app.use(function (req, res, next) {
    res.json({
        isError: true,
        code   : 404,
        message: 'Requested page does not exist.'
    });
});

/////////////
// Exports //
module.exports.app = app;
