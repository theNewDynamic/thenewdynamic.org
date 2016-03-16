var gulp = require('gulp');
var config = require('./gulp/config.json');
var plugins = require('gulp-load-plugins')();

// JS Minification - uglify my scripts
require(config.tasksPath + '/js-uglify')(gulp, plugins, config);

require(config.tasksPath + '/js-hint')(gulp, plugins, config);

// COPY vendor files from NPM to public directory
require(config.tasksPath + '/file-copy')(gulp, plugins, config);

// SASS Compliation
require(config.tasksPath + '/sass-compile')(gulp, plugins, config);

// Image Optimization
//require(config.tasksPath + '/image-minification')(gulp, plugins, config);

// BUILD Jekyll
/////////require(config.tasksPath + '/build-jekyll')(gulp, plugins, config);

// Watch Task
require(config.tasksPath + '/watch')(gulp, plugins, config);



// Default Task Triggers Watch
gulp.task('default', function() {
   gulp.start('watch');
});