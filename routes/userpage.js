// Name        : userpage.js
// Author(s)   : Cerek Hillen
// Date Created: 10/16/2014
// Date Changed: 10/16/2014
//
// Description:
//   The route definition for a given person's user page.

//////////
// Code //

// Getting the user page.
function get(req, res) {
    res.render('userpage.jade', function (err, html) {
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
