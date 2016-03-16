module.exports = function(gulp, plugins, config) {

gulp.task('js-hint', function() {
   gulp.src(config.scriptsWatch)
    .pipe(plugins.jshint())
     .pipe(plugins.jshint.reporter('default'));

   });
}
