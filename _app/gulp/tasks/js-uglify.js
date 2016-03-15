module.exports = function(gulp, plugins, config) {
gulp.task('js-uglify', function() {
   gulp.src(config.scriptsSrc)
     .pipe(plugins.plumber({
         errorHandler: plugins.notify.onError("ERROR: JS Compilation Failed")
       }))
     .pipe(plugins.uglify())
     .pipe(plugins.concat('scripts.min.js'))
     .pipe(gulp.dest(config.scriptsDest))
   });
}