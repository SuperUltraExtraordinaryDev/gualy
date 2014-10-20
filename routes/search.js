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
    if (req.query.user.length == 0)
        renderer.renderAndSend('search.jade', req, res, { hasQuery: false });
    else
        renderer.renderAndSend('search.jade', req, res, { hasQuery: true });
}

/////////////
// Exports //
module.exports.get = get;
