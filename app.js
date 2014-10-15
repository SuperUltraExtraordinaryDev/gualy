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
	mongoose    = require('mongoose'),
	fs          = require('fs'),

	middlewares = require(__dirname + '/middlewares.js'),
	schema      = require(__dirname + '/schema.js'),
	routes      = require(__dirname + '/routes.js'),
	api         = require(__dirname + '/api.js');

//////////
// Code //
var app = express();

// Setting up the Mongoose connection.
fs.readFile('connection.txt', 'utf8', function (err, data) {
	if (err)
		return console.log(err);
	mongoose.connect(data.trim());
});

// Setting up Jade for the rendering engine.
app.engine('.jade', require('jade').renderFile);

// Using the API app for the API section of the program.
app.use('/api', api.app);

// Registering the middlewares and routes.
middlewares.registerAll(app);
routes.registerAll(app);

// Starting the server.
app.listen(3000);
console.log('Started server on 0.0.0.0:3000');
