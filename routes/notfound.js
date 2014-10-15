// Name        : notfound.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   Handling all pages that were requested but were not found.

//////////
// Code //

// Handling a 404 on any given page.
function all(req, res) {
    res.render('notfound.jade', function (err, html) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            res.status(404);
            res.send(html);
        }
    });
}

/////////////
// Exports //
module.exports.all = all;
