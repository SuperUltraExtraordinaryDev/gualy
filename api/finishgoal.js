// Name        : finishgoal.js
// Author(s)   : Cerek Hillen
// Date Created: 10/20/2014
// Date Changed: 10/21/2014
//
// Description:
//   This module provides the API endpoint to mark a goal as finished.

/////////////
// Imports //
var renderer = require('../renderer.js'),
    schema = require('../schema.js'),
    common = require('./common.js');

//////////
// Code //

// The actual POST endpoint.
function post(req, res) {
    if (req.cookies.logged === undefined) {
        res.json({
            success: false,
            message: 'Must be logged in to finish one of your goals.'
        });
    } else {
        if (common.hasAll(req.body, ['gid'])) {
            schema.get.Goal.findOne({
                _id: req.body.gid
            }).exec(function (err, goal) {
                if (err || goal === null) {
                    res.json({
                        success: false,
                        message: 'There was a problem getting your goal.'
                    });
                } else if (goal.completed) {
                    res.json({
                        success: false,
                        message: 'You can\'t complete an already-done goal!'
                    });
                } else {
                    if (req.cookies.logged == goal.userId) {
                        goal.completed     = true;
                        goal.dateCompleted = Date.now();

                        goal.save(function (err) {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: 'There was a problem in finishing your goal!'
                                });
                            } else {
                                renderer.render('render-goal.jade', req, res, { goal: goal }, function (err, html) {
                                    if (err) {
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            message: 'Could not render the new goal.'
                                        });
                                    } else {
                                        res.json({
                                            success: true,
                                            message: 'Your goal is now finished!',
                                            block  : html,
                                            gid    : goal._id
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'Cannot finish another person\'s goal!'
                        });
                    }
                }
            });
        } else {
            res.json({
                success: false,
                message: 'Missing some data.'
            });
        }
    }
}

/////////////
// Exports //
module.exports.post = post;
