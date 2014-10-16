// Name        : home.js
// Author(s)   : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/16/2014
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
    renderer.renderAndSend('home.jade', req, res, {});
}

/////////////
// Exports //
module.exports.get = get;
