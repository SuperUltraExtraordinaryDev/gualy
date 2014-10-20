// Name        : common.js
// Author(s)   : Cerek Hillen
// Date Created: 10/19/2014
// Date Changed: 10/19/2014
//
// Description:
//   A set of common functions used within the API.

/////////////
// Imports //
var sha512 = require('crypto-js/sha512');

//////////
// Code //

// Hashing a given string (into a base64 string)
function hashString(string) { return sha512(string).toString(); }

// Checking that the request has all parameters you want.
function hasAll(from, names) {
    for (var i = 0; i < names.length; i++) {
        if (from[names[i]] === undefined)
            return false;
    }
    return true;
}

/////////////
// Exports //
module.exports.hashString = hashString;
module.exports.hasAll = hasAll;
