// Name        : app.js
// Author      : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/14/2014
//
// Description:
//   The main app file for the project. Sets everything up and starts the
//   server.

/////////////
// Imports //
var express = require('express'),
    routes  = require(__dirname + '/routes.js');

//////////
// Code //
var app = express();

// Setting up Jade for the rendering engine.
app.engine('.jade', require('jade').renderFile);

// Serving static files.
app.use('/static/', express.static(__dirname + '/static/'));

// Registering all of the apps.
routes.registerRoutes(app);

// Starting the server.
app.listen(3000);
console.log('Started server on 0.0.0.0:3000');
