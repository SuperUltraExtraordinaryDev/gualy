// Name        : routes.js
// Author(s)   : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/17/2014
//
// Description:
//   A helper module to keep adding routes from affecting the main module.

/////////////
// Imports //
var express  = require('express'),
    home     = require('./routes/home.js'),
    login    = require('./routes/login.js'),
    logout   = require('./routes/logout.js'),
    search   = require('./routes/search.js'),
    userpage = require('./routes/userpage.js'),
    manage   = require('./routes/manage.js'),
    notfound = require('./routes/notfound.js');

//////////
// Code //

// Creating the sub-app.
app = express();

// Registering all of the routes.
app.get('/'          , home.get    ); // The homepage.
app.get('/login/'    , login.get   ); // The login page.
app.get('/logout/'   , logout.get  ); // The logout redirect.
app.get('/search/'   , search.get  ); // The search page.
app.get('/user/:name', userpage.get); // A user page.
app.get('/manage/'   , manage.get  ); // The manage page.
app.all('*'          , notfound.all); // Serving a 404 page.

/////////////
// Exports //
module.exports = app;
