// Name        : login.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   The front-end scripts for the login page.

// The post to perform on login.
function postLogin() {
    var inputData = {
        username: $('#loginUsernameInput').val(),
        password: $('#loginPasswordInput').val()
    };

    $.post('/api/login/', inputData, function (data) {

    });
}

// The post to perform on register.
function postRegister() {
    var inputData = {
        username : $('#registerUsernameInput').val(),
        password : $('#registerPasswordInput').val(),
        cpassword: $('#registerCPasswordInput').val()
    };

    $.post('/api/register/', inputData, function (data) {

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
