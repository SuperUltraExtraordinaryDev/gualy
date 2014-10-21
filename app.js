// Name        : app.js
// Author      : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/17/2014
//
// Description:
//   The main app file for the project. Sets everything up and starts the
//   server.

/////////////
// Imports //
var express      = require('express'),
    mongoose     = require('mongoose'),
    cookieParser = require('cookie-parser'),
    fs           = require('fs'),

    middlewares = require('./middlewares.js'),
    config      = require('./config.js'),
    routes      = require('./routes.js'),
    api         = require('./api.js');

//////////
// Code //
var app = express();

// Connecting to the Mongo database.
mongoose.connect(config.getMongoURI());

// Setting up Jade for the rendering engine.
app.engine('.jade', require('jade').renderFile);

// Registering the middlewares, routes, and api.
app.use(middlewares);
app.use('/api/', api);
app.use(routes);

// Starting the server.
app.listen(config.getPort());
console.log('Started server on 0.0.0.0:' + config.getPort());
