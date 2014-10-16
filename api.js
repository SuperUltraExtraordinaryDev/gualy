// Name        : app.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/16/2014
//
// Description:
//   The main application file for the API sub-program.

/////////////
// Imports //
var express      = require('express'),
    bodyParser   = require('body-parser'),
    schema       = require('./schema.js');

//////////
// Code //
var app = express();

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
app.post('/push/login/', function (req, res) {
    if (hasAll(req.body, ['username', 'password'])) {
        schema.get.User.findOne({
            username: req.body.username,
            password: req.body.password
        }, function (err, user) {
            if (user == null) {
                res.json({
                    success: false,
                    message: 'Invalid username / password combo.'
                });
            } else {
                res.cookie('logged', user._id);
                res.json({
                    success: true,
                    message: 'Logged in!'
                });
            }
        });
    } else {
        res.json({
            success: false,
            message: 'It looks like you forgot a field!.'
        });
    }
});

// Registering the user with the application.
app.post('/push/register/', function (req, res) {
    if (hasAll(req.body, ['username', 'password', 'cpassword'])) {
        if (req.body.password !== req.body.cpassword) {
            res.json({
                success: false,
                message: 'Passwords no not match.'
            });
        } else {
            schema.get.User.findOne({
                username: req.body.username
            }, function (err, user) {
                if (user == null) {
                    new schema.get.User({
                        username: req.body.username,
                        password: req.body.password
                    }).save(function (err) {
                        if (err) {
                            res.json({
                                success: false,
                                message: 'An unknown error occurred.'
                            });
                        } else {
                            res.json({
                                success: true,
                                message: 'Registered!'
                            });
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'That name is already taken!'
                    });
                }
            });
        }
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
