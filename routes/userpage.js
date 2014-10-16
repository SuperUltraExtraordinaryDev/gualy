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
    schema.get.User.findOne({
        username: req.params.name
    }, function (err, user) {
        var externData = {};

        externData.user = user;

        if (err || user == null) externData.success = false;
        else                     externData.success = true;

        renderer.renderAndSend('userpage.jade', req, res, externData);
    });
}

/////////////
// Exports //
module.exports.get = get;
