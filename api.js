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
    cookieParser = require('cookie-parser'),
    sha512       = require('crypto-js/sha512'),
    schema       = require('./schema.js');

//////////
// Code //
var app = express();

// Making the API parse POST requests.
app.use(bodyParser.json());

// Making the API parse cookies.
app.use(cookieParser());

// Hashing a given string (into a base64 string)
function hashString(string) { return sha512(string).toString(); }

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
    if (req.cookies.logged != undefined) {
        res.json({
            success: false,
            message: 'You are already logged in.'
        });
    }
    else {
        if (hasAll(req.body, ['username', 'password'])) {
            schema.get.User.findOne({
                username: req.body.username,
                password: hashString(req.body.password)
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
                message: 'It looks like you forgot a field!'
            });
        }
    }
});

// Registering the user with the application.
app.post('/push/register/', function (req, res) {
    if (req.cookies.logged != undefined) {
        res.json({
            success: false,
            message: 'You are already logged in.'
        });
    }
    else {
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
                            password: hashString(req.body.password)
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
                message: 'It looks like you forgot a field!'
            });
        }
    }
});

// Adding a new goal to a user's list.
app.post('/push/goal/', function (req, res) {
    if (hasAll(req.body, ['goal', 'userId'])) {
        schema.get.User.findOne({
            _id: req.body.userId
        }).exec(function (err, user) {
            if (err || user == null) {
                res.json({
                    success: false,
                    message: 'Could not find user.'
                });
            } else {
                schema.get.Goal.find({
                    userId: req.body.userId
                }).sort({
                    subId: 'descending'
                }).exec(function (err, goals) {
                    var id;

                    if (err) {
                        res.json({
                            success: false,
                            message: 'Could not find user goals.'
                        });
                    } else if (goals.length == 0) {
                        id = 0;
                    } else {
                        id = goals[0].subId + 1;
                    }

                    new schema.get.Goal({
                        value        : req.body.goal,
                        userId       : req.body.userId,
                        isPublic     : true,
                        subId        : id,
                        made         : Date.now(),
                        completed    : false,
                        dateCompleted: Date.now()
                    }).save(function (err) {
                        if (err) {
                            res.json({
                                success: false,
                                message: 'Could not insert goal.'
                            });
                        } else {
                            res.json({
                                success: true,
                                message: 'New goal saved!'
                            });
                        }
                    });
                });
            }
        });
    } else {
        res.json({
            success: false,
            message: 'It looks like you forgot a field!'
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
