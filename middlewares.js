// Name        : routes.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   A helper module to keep track of adding middlewares without bogging down
//   the main module.

/////////////
// Imports //
var express  = require('express'),
    recovery = require('./middlewares/recovery.js'),
    logger   = require('./middlewares/logger.js')
    favicon  = require('./middlewares/favicon.js');

//////////
// Code //

// Creating the sub-app.
var app = express();

// Registering all of the middlewares.
app.use(favicon.middleware);                                 // Redirecting the favicon to the correct location.
app.use(recovery.middleware);                                // Recovering from a crash in the app.
app.use('/static/', express.static(__dirname + '/static/')); // Serving files from the static directory.
app.use(logger.middleware);                                  // Logging all of the requests.

/////////////
// Exports //
module.exports = app;
