var browserSync = require('browser-sync');
module.exports = function(gulp, plugins, config) {

    /**
     * Rebuild Jekyll & do page reload
     */
    gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
        browserSync.reload();
    });


};


