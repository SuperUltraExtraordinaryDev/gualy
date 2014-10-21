// Name        : editgoal.js
// Author(s)   : Cerek Hillen
// Date Created: 10/21/2014
// Date Changed: 10/21/2014
//
// Description:
//   The API endpoint for editing a goal.

/////////////
// Imports //
var schema = require('../schema.js'),
    common = require('./common.js');

//////////
// Code //

// The actual API endpoint.
function post(req, res) {
    if (req.cookies.logged === undefined) {
        res.json({
            success: false,
            message: 'Must be logged in to edit one of your goals.'
        });
    } else {
        if (common.hasAll(req.body, ['gid', 'newtext'])) {
            schema.get.Goal.findOne({
                _id: req.body.gid
            }).exec(function (err, goal) {
                if (err || goal === null) {
                    res.json({
                        success: false,
                        message: 'Couldn\'t find your goal!'
                    });
                } else if (goal.completed) {
                    res.json({
                        success: false,
                        message: 'You can\'t edit a goal you\'ve already finished!'
                    });
                } else if (req.cookies.logged == goal.userId) {
                    goal.value = req.body.newtext;

                    goal.save(function (err) {
                        if (err) {
                            res.json({
                                success: false,
                                message: 'There was an error editing your goal!'
                            });
                        } else {
                            res.json({
                                success: true,
                                message: 'Successfully edited your goal!'
                            });
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'You can\'t edit another person\'s goal!'
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: 'Missing some data!'
            });
        }
    }
}

/////////////
// Exports //
module.exports.post = post;
