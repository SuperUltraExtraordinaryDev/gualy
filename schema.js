// Name        : schema.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
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
        id      : Number,
        name    : String,
        password: String
    }),

    Goal: mongoose.model('Goal', {
        userId       : Number,
        subId        : Number,
        made         : Date,
        completed    : Boolean,
        dateCompleted: Date
    })
};

/////////////
// Exports //
module.exports.schema = schema;
