// Name        : routes.js
// Author(s)   : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/16/2014
//
// Description:
//   A helper module to keep adding routes from affecting the main module.

/////////////
// Imports //
var home     = require('./routes/home.js'),
    login    = require('./routes/login.js'),
    userpage = require('./routes/userpage.js'),
    notfound = require('./routes/notfound.js');

//////////
// Code //

// Registering every single route.
function registerAll(app) {
    app.get('/'          , home.get    ); // The homepage.
    app.get('/login/'    , login.get   ); // The login page.
    app.get('/user/:name', userpage.get); // A user page.
    app.all('*'          , notfound.all); // Serving a 404 page.
}

/////////////
// Exports //
module.exports.registerAll = registerAll;
