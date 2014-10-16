// Name        : renderer.js
// Author(s)   : Cerek Hillen
// Date Created: 10/16/2014
// Date Changed: 10/16/2014
//
// Description:
//   The renderer automatically injects required information into every page.
//   This includes:
//     * Whether or not the user is logged in.
//     * If they're logged in: their username.

/////////////
// Imports //
var schema = require('./schema.js');

//////////
// Code //

// Rendering and injecting the values. Then calling the callback.
function render(path, req, res, externData, callback) {
    var data = {};

    // Injecting the 'is logged in' value.
    data.logged = req.cookies.logged != undefined;

    // Injecting the user's name.
    if (data.logged) data.username = 'SHOULD BE IMPLEMENTED.'; // TODO: Implement querying for the name.
    else             data.username = '';

    // Injecting the external data.
    data.data = externData;

    // Calling the callback on the render.
    res.render(path, data, function (err, html) {
        callback(err, html);
    });
}

// Rendering and then sending the values.
function renderAndSend(path, req, res, externData) {
    // 'render'
    render(path, req, res, externData, function (err, html) {
        // 'AndSend'
        if (err)
            throw err;
        res.status(200);
        res.type('html');
        res.send(html);
    });
}

/////////////
// Exports //
module.exports.render = render;
module.exports.renderAndSend = renderAndSend;
