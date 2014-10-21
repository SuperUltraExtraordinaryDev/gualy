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

    $.ajax({
        url: '/api/push/goal',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(json)
    }).done(function (data) {
        if (data.success)  {
            successMessage(data.message + ' Refreshing in a sec!');
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
        else
            dangerMessage(data.message);
    });
}

// Page initialization code.
$(document).ready(function () {
    $('.goal-editor').hide();

    $('#goalForm').submit(function () {
        pushGoal();
        return false;
    });

    $('.goal-editor').submit(function () {
        var selfRef = $(this);

        var json = joinJSON(selfRef.serializeArray());
        json.gid = selfRef.closest('li').attr('data-gid');

        $.ajax({
            url: '/api/push/goal/edit/',
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(json)
        }).done(function (data) {
            if (data.success)
                successMessage(data.message);
            else
                dangerMessage(data.message);
        });

        var li = $(this).closest('li');

        $(this).hide();
        li.find('.goal-value').html(li.find('.form-control').val());
        li.find('.goal-container').show();

        return false;
    });

    $('.goalDone').click(function () {
        $.ajax({
            url: '/api/push/goal/finish/',
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({ gid: $(this).closest('li').attr('data-gid') })
        }).done (function (data) {
            if (data.success) {
                successMessage(data.message + ' Refreshing in a sec!');
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            } else
                dangerMessage(data.message);
        });
    });

    $('.goalEdit').click(function () {
        var li = $(this).closest('li');
        var editor = li.find('.goal-editor');

        editor.find('.form-control').val(li.find('.goal-value').html());
        editor.show();
        li.find('.goal-container').hide();
    });

    $('.goalRemove').click(function () {
        var selfRef = $(this);
        
        $.ajax({
            url: '/api/push/goal/remove/',
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({ gid: selfRef.closest('li').attr('data-gid') })
        }).done (function (data) {
            if (data.success) {
                selfRef.closest('li').fadeOut(200);
                successMessage(data.message);
            } else
                dangerMessage(data.message);
        });
    });
});
