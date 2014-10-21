// Name        : newgoal.js
// Author(s)   : Cerek Hillen
// Date Created: 10/19/2014
// Date Changed: 10/19/2014
//
// Description:
//   This API endpoint deals with the creation of new goals for a user.

/////////////
// Imports //
var schema = require('../schema.js'),
    common = require('./common.js');

//////////
// Code //

// Adding a new goal to a user's list.
function post(req, res) {
    if (common.hasAll(req.body, ['goal', 'userId'])) {
        schema.get.User.findOne({
            _id: req.body.userId
        }).exec(function (err, user) {
            if (err || user === null) {
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
                    } else if (goals.length === 0) {
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
}

/////////////
// Exports //
module.exports.post = post;
