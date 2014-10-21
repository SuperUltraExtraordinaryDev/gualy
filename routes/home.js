// Name        : home.js
// Author(s)   : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/21/2014
//
// Description:
//   The route definitions for the homepage.

/////////////
// Imports //
var renderer = require('../renderer.js');

//////////
// Code //

// Getting the homepage.
function get(req, res) {
    if (req.cookies.logged === undefined)
        renderer.renderAndSend('home.jade', req, res, {});
    else
        renderer.renderAndSend('loggedhome.jade', req, res, {});
}

/////////////
// Exports //
module.exports.get = get;
