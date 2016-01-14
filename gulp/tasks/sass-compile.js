module.exports = function(gulp, plugins, config) {
gulp.task('sass-compile', function() {
   gulp.src(config.scssSrcPath + '/main.scss')
     .pipe(plugins.plumber({
         errorHandler: plugins.notify.onError("ERROR: CSS Compilation Failed")
       }))
    .pipe(plugins.sass({
        includePaths: require('node-neat').includePaths
    }))
    // minify
    .pipe(plugins.cssnano())
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.cssDistPath))
   });
};