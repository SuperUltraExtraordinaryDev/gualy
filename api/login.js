// Name        : login.js
// Author(s)   : Cerek Hillen
// Date Created: 10/19/2014
// Date Changed: 10/19/2014
//
// Description:
//   This module provides the API deal with logging the user in.

/////////////
// Imports //
var schema = require('../schema.js'),
    common = require('./common.js');

//////////
// Code //

// Logging the user into the application.
function post(req, res) {
    if (req.cookies.logged !== undefined) {
        res.json({
            success: false,
            message: 'You are already logged in.'
        });
    }
    else {
        if (common.hasAll(req.body, ['username', 'password'])) {
            schema.get.User.findOne({
                username: req.body.username,
                password: common.hashString(req.body.password)
            }, function (err, user) {
                if (user === null) {
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
}


/////////////
// Exports //
module.exports.post = post;
