// Name        : favicon.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   A middleware to change the /favicon.ico requests to one that would get
//   intercepted by the static middleware.

/////////////
// Imports //

//////////
// Code //

// The middleware itself.
function middleware(req, res, next) {
	if (req.url === '/favicon.ico')
		req.url = '/static/favicon.ico';
	next();
}

/////////////
// Exports //
module.exports.middleware = middleware;
