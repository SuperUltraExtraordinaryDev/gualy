// Name        : app.js
// Author      : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/16/2014
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
    routes      = require('./routes.js'),
    api         = require('./api.js');

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

// Making the app use the cookie parser.
app.use(cookieParser());

// Registering the middlewares and routes.
app.use(middlewares);
app.use(routes);

// Starting the server.
app.listen(3000);
console.log('Started server on 0.0.0.0:3000');
