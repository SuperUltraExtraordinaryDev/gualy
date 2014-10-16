// Name        : logout.js
// Author(s)   : Cerek Hillen
// Date Created: 10/16/2014
// Date Changed: 10/16/2014
//
// Description:
//   This route handles logging out the player.

//////////
// Code //

// Serving the logout page.
function get(req, res) {
    res.clearCookie('logged');
    res.redirect('/');
}

/////////////
// Exports //
module.exports.get = get;
