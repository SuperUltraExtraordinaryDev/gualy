// Name        : login.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   The front-end scripts for the login page.

// The post to perform on login.
function postLogin() {
    $.ajax({
        url: '/api/login/',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(joinJSON($('#loginForm').serializeArray()))
    }).done(function (data) {
        console.log(data);
    });
}

// The post to perform on register.
function postRegister() {
    $.ajax({
        url: '/api/register/',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(joinJSON($('#loginForm').serializeArray()))
    }).done(function (data) {
        console.log(data);
    });
}

// Adding the callbacks onto the buttons.
$(document).ready(function () {
    $('#loginForm').submit(function () {
        postLogin();
        return false;
    });

    $('#registerForm').submit(function () {
        postRegister();
        return false;
    });
});
