// Name        : manage.js
// Author(s)   : Cerek Hillen
// Date Created: 10/16/2014
// Date Changed: 10/16/2014
//
// Description:
//   This page serves the page for managing your goals.

/////////////
// Imports //
var renderer = require('../renderer.js');

//////////
// Code //

// Serving the manage page.
function get(req, res) {
    renderer.renderAndSend('manage.jade', req, res, {});
}

/////////////
// Exports //
module.exports.get = get;
