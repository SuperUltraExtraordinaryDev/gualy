// Name        : notfound.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   Handling all pages that were requested but were not found.

/////////////
// Imports //
var renderer = require('../renderer.js');

//////////
// Code //

// Handling a 404 on any given page.
function all(req, res) {
    renderer.renderAndSend('notfound.jade', req, res, {});
}

/////////////
// Exports //
module.exports.all = all;
