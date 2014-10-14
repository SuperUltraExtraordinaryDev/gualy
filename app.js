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
var express = require('express');

//////////
// Code //
var app = express();

app.get('/', function (req, res) {
	res.send('Hello world!');
});

app.listen(3000);
console.log('Started server on 0.0.0.0:3000');
