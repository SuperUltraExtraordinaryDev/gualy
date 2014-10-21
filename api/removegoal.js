// Name        : removegoal.js
// Author(s)   : Cerek Hillen
// Date Created: 10/20/2014
// Date Changed: 10/20/2014
//
// Description:
//   The API endpoint for removing a user's goal.

/////////////
// Imports //
var schema = require('../schema.js'),
    common = require('./common.js')

//////////
// Code //

// The POST function.
function post(req, res) {
    if (req.cookies.logged === undefined) {
        res.json({
            success: false,
            message: 'Must be logged in to delete one of your goals.'
        });
    } else {
        if (common.hasAll(req.body, ['gid'])) {
            schema.get.Goal.remove({
                _id: req.body.gid
            }).exec(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        message: 'There was an error in deleting your goal.'
                    });
                } else {
                    res.json({
                        success: true,
                        message: 'Goal deleted.'
                    });
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
