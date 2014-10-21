// Name        : register.js
// Author(s)   : Cerek Hillen
// Date Created: 10/19/2014
// Date Changed: 10/19/2014
//
// Description:
//

/////////////
// Imports //
var common = require('./common.js');

//////////
// Code //

// Registering the user with the application.
function post(req, res) {
    if (req.cookies.logged !== undefined) {
        res.json({
            success: false,
            message: 'You are already logged in.'
        });
    }
    else {
        if (common.hasAll(req.body, ['username', 'password', 'cpassword'])) {
            if (req.body.password !== req.body.cpassword) {
                res.json({
                    success: false,
                    message: 'Passwords no not match.'
                });
            } else {
                schema.get.User.findOne({
                    username: req.body.username
                }, function (err, user) {
                    if (user === null) {
                        new schema.get.User({
                            username: req.body.username,
                            password: common.hashString(req.body.password)
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
}

/////////////
// Exports //
module.exports.post = post;
