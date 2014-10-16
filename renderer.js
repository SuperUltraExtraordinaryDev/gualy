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

    // Injecting the external data.
    data.data = externData;

    // Injecting the 'is logged in' value.
    data.logged = req.cookies.logged != undefined;

    // Either injecting the name through DB callback (if the user is logged in)
    // or avoiding that whole ordeal (when the user isn't logged in).
    if (data.logged) {
        schema.get.User.findOne({
            _id: req.cookies.logged
        }, function (err, user) {
            if (err || user == null) {
                data.logged = false;
                data.name = '';
                console.log('Tried to log into non-existant user.');
            } else
                data.username = user.username;

            res.render(path, data, callback);
        });
    } else {
        data.name = '';
        res.render(path, data, callback);
    }
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
