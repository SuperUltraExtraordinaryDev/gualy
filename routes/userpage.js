// Name        : userpage.js
// Author(s)   : Cerek Hillen
// Date Created: 10/16/2014
// Date Changed: 10/16/2014
//
// Description:
//   The route definition for a given person's user page.

/////////////
// Imports //
var renderer = require('../renderer.js')
    schema   = require('../schema.js');

//////////
// Code //

// Getting the user page.
function get(req, res) {
    var externData = {};

    externData.name = req.params.name;

    schema.get.User.findOne({
        username: req.params.name
    }).exec(function (err, user) {
        if (err || user === null) {
            externData.userSuccess = false;
            renderer.renderAndSend('userpage.jade', req, res, externData);
        } else {
            externData.userSuccess = true;
            schema.get.Goal.find({
                userId  : user._id,
                isPublic: true
            }).sort({
                subId: 'descending'
            }).exec(function (err, goals) {
                if (err || goals.length == 0)
                    externData.goalsSuccess = false;
                 else {
                    externData.goalsSuccess = true;
                    externData.goals = goals;
                }

                renderer.renderAndSend('userpage.jade', req, res, externData);
            });
        }
    });
}

/////////////
// Exports //
module.exports.get = get;
