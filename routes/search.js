// Name        : search.js
// Author(s)   : Cerek Hillen
// Date Created: 10/20/2014
// Date Changed: 10/20/2014
//
// Description:
//   This module serves the search page.

/////////////
// Imports //
var renderer = require('../renderer.js'),
    schema   = require('../schema.js');

//////////
// Code //

// Serving the search page.
function get(req, res) {
    if (req.query.user.length === 0)
        renderer.renderAndSend('search.jade', req, res, { hasQuery: false });
    else {
        schema.get.User.find({
            username: new RegExp(req.query.user)
        }).find(function (err, users) {
            if (err || users.length === 0) {
                var ejson = {
                    hasQuery: true,
                    query   : req.query.user,
                    hasUsers: false
                };

                renderer.renderAndSend('search.jade', req, res, ejson);
            } else {
                var gjson = {
                    hasQuery: true,
                    query   : req.query.user,
                    hasUsers: true,
                    users   : users
                };

                renderer.renderAndSend('search.jade', req, res, gjson);
            }
        });
    }
}

/////////////
// Exports //
module.exports.get = get;
