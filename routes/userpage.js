// Name        : userpage.js
// Author(s)   : Cerek Hillen
// Date Created: 10/16/2014
// Date Changed: 10/16/2014
//
// Description:
//   The route definition for a given person's user page.

/////////////
// Imports //
var renderer = require('../renderer.js');

//////////
// Code //

// Getting the user page.
function get(req, res) {
    renderer.renderAndSend('userpage.jade', req, res, {});
}

/////////////
// Exports //
module.exports.get = get;
