// Name        : messagecontrol.js
// Author(s)   : Cerek Hillen
// Date Created: 10/16/2014
// Date Changed: 10/21/2014
//
// Description:
//   A module aimed to provide helper functions for manipulating the
//   #messageArea div.

//////////
// Code //

// Getting the message area.
function area() {
    return $('#messageArea');
}

var lastAlert = null;

// Setting a new alert class to the area.
function setAlert(type) {
    if (lastAlert === null) {
        area().addClass('alert-' + type);
        lastAlert = type;
        return;
    }
    
    area().removeClass('alert-' + lastAlert);
    area().addClass('alert-'+ type);
}

// Fading the area in.
function showArea() {
    area().fadeIn(100);
}

// Fading the area out.
function hideArea() {
    area().fadeOut(100);
}

// Making the area disappear.
function hideAreaHard() {
    area().hide();
}

// Setting the message in the area.
function setMessage(message) {
    showArea();
    area().html(message);
}

// Writing a success message.
function successMessage(message) {
    setAlert('success');
    setMessage(message);
}

// Writing an info message.
function infoMessage(message) {
    setAlert('info');
    setMessage(message);
}

// Writing a warning message.
function warningMessage(message) {
    setAlert('warning');
    setMessage(message);
}

// Writing a danger message.
function dangerMessage(message) {
    setAlert('danger');
    setMessage(message);
}

// Hiding the area on startup.
$(document).ready(function () {
    area().hide();
});
