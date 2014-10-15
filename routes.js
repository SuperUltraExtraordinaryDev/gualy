// Name        : routes.js
// Author(s)   : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/15/2014
//
// Description:
//   A helper module to keep adding routes from affecting the main module.

/////////////
// Imports //
var home     = require(__dirname + '/routes/home.js'),
    notfound = require(__dirname + '/routes/notfound.js');

//////////
// Code //

// Registering every single route.
function registerAll(app) {
	app.get('/', home.get); // The homepage.
	app.all('*', notfound.all); // Serving a 404 page.
}

/////////////
// Exports //
module.exports.registerAll = registerAll;
