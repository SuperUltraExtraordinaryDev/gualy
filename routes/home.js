// Name        : home.js
// Author(s)   : Cerek Hillen
// Date Created: 10/14/2014
// Date Changed: 10/22/2014
//
// Description:
//   The route definitions for the homepage.

/////////////
// Imports //
var renderer = require('../renderer.js'),
    schema   = require('../schema.js');

//////////
// Code //

// Taking n random values from a list.
function takeRandom(array, n) {
    var ret = [];
    var rand;
    for (var i = 0; i < n; i++) {
        rand = Math.floor(Math.random() * array.length);
        ret.push(array[rand]);
        array.splice(rand, 1);
    }
    return ret;
}

// Getting the homepage.
function get(req, res) {
    if (req.cookies.logged === undefined) {
        schema.get.Quote.find().exec(function (err, quotes) {
            if (!err && quotes.length !== 0)
                quotes = takeRandom(quotes, 2);
            else
                quotes = [];

            renderer.renderAndSend('home.jade', req, res, { quotes: quotes });
        });
    }
    else
        renderer.renderAndSend('loggedhome.jade', req, res, {});
}

/////////////
// Exports //
module.exports.get = get;
