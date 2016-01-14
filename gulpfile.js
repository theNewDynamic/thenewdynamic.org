var gulp = require('gulp');
var config = require('./gulp/config.json');
var plugins = require('gulp-load-plugins')();

// JS Minification
require(config.tasksPath + '/js-uglify')(gulp, plugins, config);

// SASS Compliation
require(config.tasksPath + '/sass-compile')(gulp, plugins, config);

// Image Optimization
//require(config.tasksPath + '/image-minification')(gulp, plugins, config);

// Watch Task
require(config.tasksPath + '/watch')(gulp, plugins, config);

// Default Task Triggers Watch
gulp.task('default', function() {
   gulp.start('watch');
});