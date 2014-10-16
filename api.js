// Name        : app.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   The main application file for the API sub-program.

/////////////
// Imports //
var express    = require('express'),
    bodyParser = require('body-parser');

//////////
// Code //
var app = express();

// Making the API availible for CORS.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTION')
        res.status(200).end();
    else
        next();
});

// Making the API parse POST requests.
app.use(bodyParser.json());

// Checking that the request has all parameters you want.
function hasAll(from, names) {
    for (var i = 0; i < names.length; i++) {
        if (from[names[i]] === undefined)
            return false;
    }
    return true;
}

// Logging the user into the application.
app.post('/login/', function (req, res) {
    if (hasAll(req.body, ['username', 'password'])) {
        res.json({
            success: false,
            message: 'Unimplemented.'
        });
    } else {
        res.json({
            success: false,
            message: 'It looks like you forgot a field!.'
        });
    }
});

// Registering the user with the application.
app.post('/register/', function (req, res) {
    if (hasAll(req.body, ['username', 'password', 'cpassword'])) {
        res.json({
            success: false,
            message: 'Unimplemented.'
        });
    } else {
        res.json({
            success: false,
            message: 'It looks like you forgot a field!.'
        });
    }
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
