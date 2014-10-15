// Name        : routes.js
// Author(s)   : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/14/2014
//
// Description:
//   A helper module to keep adding / removing routes from affecting the main
//   module.

/////////////
// Imports //
var home = require(__dirname + '/routes/home.js');

//////////
// Code //

// Registering every single route.
function registerRoutes(app) {
	// Home page
	app.get('/', require(__dirname + '/routes/home.js').get);
}

/////////////
// Exports //
module.exports.registerRoutes = registerRoutes;
