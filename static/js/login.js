// Name        : login.js
// Author(s)   : Cerek Hillen
// Date Created: 10/15/2014
// Date Changed: 10/15/2014
//
// Description:
//   The front-end scripts for the login page.

// Writing a message out to the message area.
function writeMessage(data) {
    var area = $('#messageArea');

    area.fadeIn(200);

    if (data.success) {
        area.removeClass('alert-danger');
        area.addClass('alert-success');
    } else {
        area.removeClass('alert-success');
        area.addClass('alert-danger');
    }

    area.html(data.message);
}

// The post to perform on login.
function postLogin() {
    $.ajax({
        url: '/api/login/',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(joinJSON($('#loginForm').serializeArray()))
    }).done(writeMessage);
}

// The post to perform on register.
function postRegister() {
    $.ajax({
        url: '/api/register/',
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
