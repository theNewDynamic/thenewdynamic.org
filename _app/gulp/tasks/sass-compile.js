module.exports = function(gulp, plugins, config) {
gulp.task('sass-compile', function() {
   gulp.src(config.scssSrc + '/*.scss')

    .pipe(plugins.plumber({
         errorHandler: plugins.notify.onError("ERROR: CSS Compilation Failed - <%= error.message %>")
       }))

    .pipe(plugins.sass({
        includePaths: require('node-neat').includePaths
    }))

    .pipe(plugins.autoprefixer({
        cascade: false, browsers: ['> 1%']
    }))

    .pipe(plugins.cssnano({
      discardComments: {removeAll: false} //being non-commital on removing comments.
    }))
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.cssDist))
   });
};