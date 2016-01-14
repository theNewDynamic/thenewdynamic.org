module.exports = function(gulp, plugins, config) {
gulp.task('js-uglify', function() {
   gulp.src(config.jsSrcPath + '/*.js')
     .pipe(plugins.plumber({
         errorHandler: plugins.notify.onError("ERROR: JS Compilation Failed")
       }))
     .pipe(plugins.uglify())
     .pipe(gulp.dest(config.jsDistPath))
   });
}