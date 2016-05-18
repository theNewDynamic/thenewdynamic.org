var gulp = require('gulp');
// Look to the config file for paths and settings
var config = require('./gulp/config.json');
//load whatever 'gulp-' prefixed plugins there are in package.json
var plugins = require('gulp-load-plugins')(); 

// JS Minification - uglify my scripts
require(config.tasksPath + '/js-uglify')(gulp, plugins, config);
require(config.tasksPath + '/js-hint')(gulp, plugins, config);

// COPY vendor files from NPM to public directory
require(config.tasksPath + '/file-copy')(gulp, plugins, config);

// SASS Compliation
require(config.tasksPath + '/sass-compile')(gulp, plugins, config);

//Image Optimization
require(config.tasksPath + '/image-minification')(gulp, plugins, config);

// BUILD Jekyll
require(config.tasksPath + '/jekyll-build')(gulp, plugins, config);

// REBUILD Jekyll
require(config.tasksPath + '/jekyll-rebuild')(gulp, plugins, config);

// BROWSERSYNC
require(config.tasksPath + '/browser-sync')(gulp, plugins, config);

// Watch Task
require(config.tasksPath + '/watch')(gulp, plugins, config);


// Default Task Triggers Watch
gulp.task('default', function() {
   gulp.start('browser-sync', ['watch']);
});

//gulp.task('default', ['browser-sync', 'watch']);