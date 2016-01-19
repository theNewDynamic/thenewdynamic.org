module.exports = function(gulp, plugins, config) {
gulp.task('sass-compile', function() {
   gulp.src(config.scssSrcPath + '/main.scss')


     .pipe(plugins.plumber({
         errorHandler: plugins.notify.onError("ERROR: CSS Compilation Failed - <%= error.message %>")
       }))


    .pipe(plugins.sass({
        includePaths: require('node-neat').includePaths
    }))
    //.pipe(plugins.autoprefixer(config.browserList))
    // minify
    .pipe(plugins.cssnano())
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.cssDistPath))
   });
};