// Name        : manage.js
// Author(s)   : Cerek Hillen
// Date Created: 10/16/2014
// Date Changed: 10/21/2014
//
// Description:
//   Some front-end stuff for the manage page.

//////////
// Code //

// Running the AJAX call to the server for putting a new goal.
function pushGoal() {
    var json = joinJSON($('#goalForm').serializeArray());
    json.userId = $.cookie('logged');
    json.userId = json.userId.slice(3, json.userId.length - 1);

    if (json.isPublic === undefined)
        json.isPublic = 'off';
    console.log(json.isPublic);

    $.ajax({
        url: '/api/push/goal',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(json)
    }).done(function (data) {
        if (data.success)  {
            $('#noGoals').hide();
            $('#goalTitleInput').val('');
            var gl = $('#goalList');
            gl.prepend(data.block);

            var li = gl.find('[data-gid="' + data.gid + '"]');
            li.find('.goal-editor').hide();

            li.find('.goal-editor').submit(pushEditGoal);
            li.find('.goal-done').click(goalDone);
            li.find('.goal-edit').click(goalEdit);
            li.find('.goal-remove').click(goalRemove);
        }
        else
            dangerMessage(data.message);
    });
    return false;
}

// The function to run upon a goal-editor being ran.
function pushEditGoal() {
    var json = joinJSON($(this).serializeArray());
    json.gid = $(this).closest('li').attr('data-gid');

    $.ajax({
        url: '/api/push/goal/edit/',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(json)
    }).done(function (data) {
        if (data.success) {
            var li = $(this).closest('li');
            li.find('.goal-value').html(li.find('.form-control').val());
            li.find('.goal-container').show();
            $(this).hide();
        } else
            dangerMessage(data.message);
    }.bind(this));
    return false;
}

// The function to run when a goalDone is pressed.
function goalDone() {
    $.ajax({
        url: '/api/push/goal/finish/',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ gid: $(this).closest('li').attr('data-gid') })
    }).done (function (data) {
        if (data.success) {
            $('#goalList').find('[data-gid="' + data.gid + '"]').replaceWith(data.block);
            $('#goalList').find('[data-gid="' + data.gid + '"]').find('.goal-remove').click(goalRemove);
        } else
            dangerMessage(data.message);
    });
}

// The function to run when a goalEdit is pressed.
function goalEdit() {
    var li = $(this).closest('li');
    var editor = li.find('.goal-editor');

    editor.find('.form-control').val(li.find('.goal-value').html());
    editor.show();
    li.find('.goal-container').hide();
}

// The function to run when a goalRemove is passed.
function goalRemove() {
    $.ajax({
        url: '/api/push/goal/remove/',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ gid: $(this).closest('li').attr('data-gid') })
    }).done (function (data) {
        if (data.success) {
            var li = $(this).closest('li');
            $(li).fadeOut(200, function() { $(li).remove(); } );
        } else
            dangerMessage(data.message);
    }.bind(this));
}

// Page initialization code.
$(document).ready(function () {
    console.log($('.goal-editor'));
    $('.goal-editor').hide();

    $('#goalForm').submit(pushGoal);
    $('.goal-editor').submit(pushEditGoal);
    $('.goal-done').click(goalDone);
    $('.goal-edit').click(goalEdit);
    $('.goal-remove').click(goalRemove);
});
