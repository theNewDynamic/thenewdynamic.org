module.exports = function(gulp, plugins, config) {
gulp.task('image-minification', function(){
   returngulp.src(config.imgSrcPath'/**/*')
     .pipe(plugins.plumber({
       errorHandler: plugins.notify.onError("ERROR: Image Minification Failed")
     }))
     .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
     .pipe(gulp.dest(config.jsDistPath));
});
};