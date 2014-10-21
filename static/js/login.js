// Name        : login.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/16/2014
//
// Description:
//   The front-end scripts for the login page.

// Writing a message out to the message area.
function writeMessage(data) {
    if (data.success)
        successMessage(data.message);
    else
        dangerMessage(data.message);
}

// The post to perform on login.
function postLogin() {
    $.ajax({
        url: '/api/push/login/',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(joinJSON($('#loginForm').serializeArray()))
    }).done(function (data) {
        data.message = data.message + ' Redirecting in 3 seconds...';
        writeMessage(data);

        if (data.success) {
            setTimeout(function () {
                window.location.href = '/';
            }, 3000);
        }
    });
}

// The post to perform on register.
function postRegister() {
    $.ajax({
        url: '/api/push/register/',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(joinJSON($('#registerForm').serializeArray()))
    }).done(writeMessage);
}

// Adding the callbacks onto the buttons.
$(document).ready(function () {
    $('#messageArea').hide();

    $('#loginForm').submit(function () {
        postLogin();
        return false;
    });

    $('#registerForm').submit(function () {
        postRegister();
        return false;
    });
});
