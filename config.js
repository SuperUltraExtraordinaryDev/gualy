// Name        : config.js
// Author(s)   : Cerek Hillen
// Date Created: 10/21/2014
// Date Changed: 10/21/2014
//
// Description:
//   This module provides the ability to be sure that config variables will be
//   defined. Either as provided environment flags or the server defaults.

/////////////
// Imports //

//////////
// Code //

// Initializing the server port.
var port = process.env.PORT;
if (typeof port === 'undefined')
    port = '3000';

// Initializing the MongoDB URI.
var mongoURI = process.env.MONGO_URI;
if (mongoURI === undefined)
    mongoURI = 'mongodb://127.0.0.1:27017/gualy'

// Getting the server's port.
function getPort() { return port; }

// Getting the server's MongoDB URI.
function getMongoURI() { return mongoURI; }

/////////////
// Exports //
module.exports.getPort     = getPort;
module.exports.getMongoURI = getMongoURI;
