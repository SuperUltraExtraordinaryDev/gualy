// Name        : gulpfile.js
// Author(s)   : Cerek Hillen
// Date Created: 11/6/2014
// Date Changed: 11/6/2014
//
// Description:
//   This file specifies the behavior that Gulp should take on for this project.

/////////////
// Imports //
var gulp    = require('gulp'),
    nodemon = require('nodemon');

//////////
// Code //

// Some global constants.
var JSX         = 'precomp_static/jsx/*.js';
var JSX_TARGET  = 'static/js/';
var SCSS        = 'precomp_static/scss/*.scss';
var SCSS_TARGET = 'static/css';

// Watching the node files for any changes.
gulp.task('watchNode', function () {
    nodemon({
        script: 'app.js',
        ext   : 'js',
        ignore: ['static/', 'gulpfile.js']
    }).on('restart', function () {
        console.log('Node server restarting...');
    }).on('crash', function () {
        console.log('Node server crashed - will restart upon next save.');
    });
});

// Watching a bunch of different source files for changes.
gulp.task('watch', ['watchNode'], function () {});

// Deploying a bunch of the frontend dependencies.
gulp.task('deploy', function () {
    // Moving over Bootstrap (the fonts and JS; we're using a custom theme)
    gulp.src('bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('static/fonts/'));

    gulp.src('bower_components/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('static/js/'));

    // Moving over jQuery
    gulp.src('bower_components/jquery/jquery.min.js')
        .pipe(gulp.dest('static/js/'));

    // Moving over react.
    gulp.src('bower_components/react/react.min.js')
        .pipe(gulp.dest('static/js/'));
});
