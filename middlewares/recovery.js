// Name        : recovery.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   Implementing a middleware to recover after an error is thrown elsewhere in
//   the application.

//////////
// Code //

// The middleware itself.
function middleware(req, res, next) {
	try {
		next();
	} catch (err) {
		res.render('recovery.jade', { error: err }, function (err, html) {
			if (err) {
				console.log(err);
				res.status(err.status).end();
			} else {
				res.status(200);
				res.type('html');
				res.send(html);
			}
		});
	}
}

/////////////
// Exports //
module.exports.middleware = middleware;
