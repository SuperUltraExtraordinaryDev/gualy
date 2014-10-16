// Name        : schema.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/16/2014
//
// Description:
//   This module provides the database connection and schema for the rest of the
//   program.

/////////////
// Imports //
var mongoose = require('mongoose');

//////////
// Code //

// The schema to be used with the database.
var schema = {
    User: mongoose.model('User', {
        username: String,
        password: String
    }),

    Goal: mongoose.model('Goal', {
        value        : String,
        userId       : String,
        isPublic     : Boolean,
        subId        : Number,
        made         : Date,
        completed    : Boolean,
        dateCompleted: Date
    })
};

/////////////
// Exports //
module.exports.get = schema;
