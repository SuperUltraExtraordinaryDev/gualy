// Name        : app.js
// Author      : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/15/2014
//
// Description:
//   The main app file for the project. Sets everything up and starts the
//   server.

/////////////
// Imports //
var express     = require('express'),
	middlewares = require(__dirname + '/middlewares.js');
    routes      = require(__dirname + '/routes.js');

//////////
// Code //
var app = express();

// Setting up Jade for the rendering engine.
app.engine('.jade', require('jade').renderFile);

// Registering the middlewares and routes.
middlewares.registerAll(app);
routes.registerAll(app);

// Starting the server.
app.listen(3000);
console.log('Started server on 0.0.0.0:3000');
