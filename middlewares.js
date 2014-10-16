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

// Registering every single middleware.
function registerAll(app) {
    app.use(favicon.middleware);
    app.use(recovery.middleware);
    app.use('/static/', express.static(__dirname + '/static/'));
    app.use(logger.middleware);
}

/////////////
// Exports //
module.exports.registerAll = registerAll;
