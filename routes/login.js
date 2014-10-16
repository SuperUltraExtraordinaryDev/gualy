// Name        : login.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   A route to serve the login page.

//////////
// Code //

// Getting the login page.
function get(req, res) {
    res.render('login.jade', function (err, html) {
        if (err)
            throw err;
        res.status(200);
        res.type('html');
        res.send(html);
    });
}

/////////////
// Exports //
module.exports.get = get;
