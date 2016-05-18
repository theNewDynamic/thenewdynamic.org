var browserSync = require('browser-sync');

module.exports = function(gulp, plugins, config) {

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: "./../_site/"
        }
    });
});


};


//'sass-compile',